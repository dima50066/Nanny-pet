import React from "react";
import Header from "../../components/header/Header";
import { ToastContainer } from "react-toastify";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto py-8 w-full max-w-[1440px]">
      <div className="bg-main max-w-[1440px]">
        <Header />
      </div>
      <div className="container bg-[#F3F3F3] w-full">
        <ToastContainer />
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
