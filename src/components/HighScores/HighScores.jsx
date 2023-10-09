import React from "react";
import RenderScores from "./RenderScores";
import click from "../../sound/click.mp3";
import RenderModal from "../RenderModal";

function HighScores({ showHighScores, setShowHighScores }) {
  const closeHighScoresModal = () => {
    setShowHighScores(false);
  };
  const click_effect = new Audio(click);

  if (showHighScores === false) return <></>;

  return (
    <RenderModal>
      <div className="heading text-xl text-center">HighScores</div>
      <div className="border-2 text-center overflow-y-scroll h-5/6">
        <RenderScores />
        <div
          className="absolute bottom-0 flex justify-around items-center h-12 border-t-2"
          style={{ width: "100%" }}
        >
          <button
            onClick={() => {
              closeHighScoresModal();
              click_effect.play();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </RenderModal>
  );
}

export default HighScores;
