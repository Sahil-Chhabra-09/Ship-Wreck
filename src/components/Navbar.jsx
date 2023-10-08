import React from "react";
import "../customCSS/navbar.css";
import click from "../sound/click.mp3";

function Navbar({ setShowInstructions }) {
  const click_effect = new Audio(click);

  return (
    <div className="navbar absolute top-0 w-screen h-12 flex justify-between items-center p-4">
      <div
        className="cursor-pointer"
        onClick={() => {
          setShowInstructions(true);
          click_effect.play();
        }}
      >
        Instructions
      </div>
      <div className="ship-wreck hidden md:block">Ship Wreck</div>
      <img
        src="../favicon.ico"
        style={{ width: "50px", height: "50px" }}
        className="md:hidden"
      ></img>
      <div className="cursor-pointer">High Scores</div>
    </div>
  );
}

export default Navbar;
