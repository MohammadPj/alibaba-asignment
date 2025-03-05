import './App.css'
import "./index.css"
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/page.tsx";
import AboutPage from "./pages/about/page.tsx";
import ContactPage from "./pages/contact/page.tsx";
import NotFoundPage from "./pages/not-found/page.tsx";

function App() {


  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/about"} element={<AboutPage />} />
      <Route path={"/contact"} element={<ContactPage />} />
      <Route path={"*"} element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
