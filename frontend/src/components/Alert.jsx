import React from "react";

const Alert = ({ message, type }) => {
  const color = type === "error" ? "bg-red-500" : "bg-green-500";
  return (
    <div className={`${color} text-white px-4 py-2 rounded-md text-center mb-4`}>
      {message}
    </div>
  );
};

export default Alert;
