import { Outlet } from "react-router-dom";
import Header from "./Header";
export default function Layout() {
  return (
    <div className="py-4 flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <footer className=" border-t p-5 mt-5 text-center text-gray-400">
        &copy; 2024 Airbnb Clone. All rights reserved.
      </footer>
    </div>
  );
}
