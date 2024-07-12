import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import AltHeader from "./AltHeader";

export default function Layout() {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <div className="py-4 flex flex-col min-h-screen">
      {pathName !== "/" && <Header />}
      {/* <AltHeader /> */}
      <Outlet />
      <footer className=" border-t p-5 mt-5 text-center text-gray-400">
        &copy; 2024 Airbnb Clone. All rights reserved.
      </footer>
    </div>
  );
}
