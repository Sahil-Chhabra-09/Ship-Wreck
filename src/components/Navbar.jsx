import React from "react";
import "../customCSS/navbar.css";
import click from "../sound/click.mp3";

function Navbar({ setShowInstructions, setShowHighScores }) {
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

      <div
        className="cursor-pointer"
        onClick={() => {
          setShowHighScores(true);
          click_effect.play();
        }}
      >
        High Scores
      </div>
    </div>
  );
}

export default Navbar;
