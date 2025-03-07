import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "src") }],
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "بلیط هواپیما | علی بابا",
        short_name: "علی بابا",
        description:
          "خرید بلیط هواپیما از علی‌بابا : با سابقه ترین و معتبرترین سامانه رزرو بلیط هواپیما و خرید اینترنتی بلیط هواپیما چارتر و سیستمی، قطار و اتوبوس",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        screenshots: [],
        icons: [],
      },
      workbox: {
        runtimeCaching: [
          {
            // Cache API requests
            urlPattern: /^https:\/\/api\.yourdomain\.com\/.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // Cache for 1 day
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            // Cache images
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for 1 week
              },
            },
          },
          {
            // Cache static assets (CSS & JS)
            urlPattern: /\.(?:css|js)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 30 days
              },
            },
          },
        ],
      },
    }),
  ],

});
