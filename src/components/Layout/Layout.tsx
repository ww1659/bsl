import { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Header } from "./Header";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <NavBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        {/* main used to have the className = 'grid', but I have removed */}
        <main className="flex flex-1 p-4 sm:px-6 sm:py-0 justify-center">
          <div className="w-9/12">
            <div className="grid auto-rows-max items-start gap-4 md:gap-10 lg:col-span-2">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
