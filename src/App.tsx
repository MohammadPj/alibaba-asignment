import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingComponent from "./components/loading-components/LoadingComponent.tsx";

const HomePage = lazy(() => import("./pages/page.tsx"));
const AboutPage = lazy(() => import("./pages/about/page.tsx"));
const ContactPage = lazy(() => import("./pages/contact/page.tsx"));
const NotFoundPage = lazy(() => import("./pages/not-found/page.tsx"));

function App() {
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <Suspense fallback={<LoadingComponent />}>
            <HomePage />
          </Suspense>
        }
      />

      <Route
        path={"/about"}
        element={
          <Suspense fallback={<LoadingComponent />}>
            <AboutPage />
          </Suspense>
        }
      />

      <Route
        path={"/contact"}
        element={
          <Suspense fallback={<LoadingComponent />}>
            <ContactPage />
          </Suspense>
        }
      />

      <Route
        path={"*"}
        element={
          <Suspense fallback={<LoadingComponent />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
