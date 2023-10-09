import React from "react";
import "../customCSS/instructions.css";

function RenderModal({ children }) {
  return (
    <div className="modal w-screen h-screen absolute z-10">
      <div className="container border-2 border-white w-5/6 md:w-1/2 h-2/3 bg-white relative">
        {children}
      </div>
    </div>
  );
}

export default RenderModal;
