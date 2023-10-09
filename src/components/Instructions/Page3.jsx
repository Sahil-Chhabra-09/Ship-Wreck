import React from "react";
import game_start from "../../sound/game_start.mp3";

function Page3({ setShowInstructions }) {
  const game_start_effect = new Audio(game_start);

  return (
    <>
      <div className="heading text-xl text-center">Choose mode</div>
      <div className="flex flex-col justify-center items-center text-center p-4 h-5/6">
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => {
              setShowInstructions(false);
              game_start_effect.play();
            }}
          >
            Single Player
          </button>
          <button className="disabled">Multi Player</button>
        </div>
      </div>
    </>
  );
}

export default Page3;
