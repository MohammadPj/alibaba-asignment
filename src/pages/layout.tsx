import {FC} from 'react';
import {Outlet} from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center">

      <header className="bg-white shadow-md py-4 px-6 flex items-center gap-4 w-full">
        <img src={"/images/logo.svg"} alt={'logo'} />
        <h1 className="text-xl font-bold">رزرو هتل</h1>
      </header>

      <main className="flex-grow p-2 w-full max-w-6xl">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center py-4 w-full">
        <p>تمام حقوق محفوظ است © 2025</p>
      </footer>
    </div>
  );
};

export default MainLayout;
