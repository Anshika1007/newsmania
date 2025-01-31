// components/NoNavbarLayout.js
import React from "react";

const NoNavbarLayout = ({ children }) => {
  return <div className="flex flex-col min-h-screen">{children}</div>;
};

export default NoNavbarLayout;
