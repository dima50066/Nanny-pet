import React from "react";
import Header from "../../components/header/Header";
import { ToastContainer } from "react-toastify";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto w-full ">
      <div className="bg-main ">
        <Header />
      </div>
      <div className="pl-[100px] pr-[100px] bg-[#F3F3F3] w-full">
        <ToastContainer />
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
