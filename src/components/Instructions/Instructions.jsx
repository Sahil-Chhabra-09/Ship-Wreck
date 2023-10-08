import React, { useState } from "react";
import Page1 from "./Page1";
import "../../customCSS/instructions.css";
import Page2 from "./Page2";
import click from "../../sound/click.mp3";

function Instructions({ showInstructions = false, setShowInstructions }) {
  const [stage, setStage] = useState(1);
  const click_effect = new Audio(click);

  const renderPages = () => {
    if (stage === 1) {
      return <Page1 />;
    }
    if (stage === 2) {
      return <Page2 setShowInstructions={setShowInstructions} />;
    }
  };

  const nextHandler = () => {
    if (stage === 2) return;
    else {
      setStage((prev) => prev + 1);
      click_effect.play();
    }
  };

  const prevHandler = () => {
    if (stage === 1) return;
    else {
      setStage((prev) => prev - 1);
      click_effect.play();
    }
  };

  if (!showInstructions) return <></>;
  return (
    <div className="modal w-screen h-screen absolute z-10">
      <div className="container border-2 border-white w-1/2 h-2/3 bg-white relative">
        {renderPages()}
        <div
          className="absolute bottom-0 flex justify-around items-center h-12 border-t-2"
          style={{ width: "100%" }}
        >
          <button
            onClick={prevHandler}
            className={`${stage === 1 && "disabled"}`}
          >
            Prev
          </button>
          <button
            onClick={nextHandler}
            className={`${stage === 2 && "disabled"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
