import * as React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Navbar />
      <div className="px-24">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
