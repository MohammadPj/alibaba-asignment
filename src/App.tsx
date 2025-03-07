import "./assets/styles/global.css"
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingComponent from "./components/loading-components/LoadingComponent.tsx";
import MainLayout from "./pages/layout.tsx";

const HomePage = lazy(() => import("./pages/page.tsx"));
const HotelDetailPage = lazy(() => import("./pages/[hotel-id]/page.tsx"));
const NotFoundPage = lazy(() => import("./pages/not-found/page.tsx"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={

              <HomePage />

          }
        />
        <Route
          path=":hotel-id"
          element={
            <Suspense fallback={<LoadingComponent />}>
              <HotelDetailPage />
            </Suspense>
          }
        />
      </Route>

      <Route
        path="*"
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
