import React from "react";
import Header from "../../components/header/Header";
import { ToastContainer } from "react-toastify";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="w-full bg-[#F3F3F3]">
      <div className="bg-main w-full">
        <Header />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToastContainer />
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
