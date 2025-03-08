import fs from "node:fs/promises";
import express from "express";
import jsonServer from "json-server";
import crypto from "crypto";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3003;
const base = process.env.BASE || "/";

// Cached production assets
const templateHtml = isProduction ? await fs.readFile("./dist/client/index.html", "utf-8") : "";

// Create http server
const app = express();

// create json-server
const router = jsonServer.router("./src/db/db.json5");
const middlewares = jsonServer.defaults();

// add json-server to /api
app.use("/api", middlewares);

// add etag middleware
app.use("/api", (req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        if (req.method === "GET") {
            const etag = crypto.createHash("md5").update(JSON.stringify(body)).digest("hex");
            res.set("ETag", etag);

            if (req.get("If-None-Match") === etag) {
                res.status(304).end();
                return;
            }
        }
        originalSend.call(this, body);
    };
    next();
});

// use json-server
app.use("/api", router);

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
    const { createServer } = await import("vite");
    vite = await createServer({
        server: { middlewareMode: true },
        appType: "custom",
        base,
    });
    app.use(vite.middlewares);
} else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*", async (req, res) => {
    try {
        const url = req.originalUrl.replace(base, "");

        /** @type {string} */
        let template;
        /** @type {import('./src/entry-server.ts').render} */
        let render;
        if (!isProduction) {
            // Always read fresh template in development
            template = await fs.readFile("./index.html", "utf-8");
            template = await vite.transformIndexHtml(url, template);
            render = (await vite.ssrLoadModule("./src/entry-server.tsx")).render;
        } else {
            template = templateHtml;
            render = (await import("./dist/server/entry-server.js")).render;
        }

        const rendered = await render(url);

        const html = template.replace(`<!--app-head-->`, rendered.head ?? "").replace(`<!--app-html-->`, rendered.html ?? "");

        res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (e) {
        vite?.ssrFixStacktrace(e);
        console.log(e.stack);
        res.status(500).end(e.stack);
    }
});

// Start http server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
    console.log(`JSON Server running at http://localhost:${port}/api`);
});
