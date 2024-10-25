import { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Header } from "./Header";
import { useLocation } from "react-router-dom";
import { Toaster } from "../ui/toaster";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideNav = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {!hideNav && <NavBar />}
      <div
        className={`flex flex-col sm:gap-4 ${
          !hideNav ? "sm:pl-14 sm:py-4" : ""
        }`}
      >
        {!hideNav && <Header />}
        <main className="flex flex-1 p-4 sm:px-6 sm:py-0 justify-center">
          <div className="w-full lg:w-9/12">
            <div className="grid auto-rows-max items-start gap-4 2xl:gap-6 lg:col-span-2">
              {children}
            </div>
          </div>
        </main>
        <Toaster />
      </div>
    </div>
  );
};

export default Layout;
