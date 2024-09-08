import React, { children } from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <SearchBar />
      <div className="container mx-auto py-10 flex-1">
        <div className="px-2 sm:px-0 ">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
