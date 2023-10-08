import React from "react";

function Page1() {
  return (
    <>
      <div className="heading text-xl text-center">How to play?</div>
      <div className="flex flex-col justify-center items-center text-center p-4 max-md:h-5/6">
        <div className="overflow-y-scroll md:overflow-hidden h-5/6">
          <div>Hello adventurer!</div>
          <div>
            You have in your possession 45 ships and you have to load up some
            cargo for your adventure.
          </div>
          <div>.</div>
          <div>
            The only issue is you have no idea how much a ship can carry. If you
            add up too much cargo than the ship's capacity, it can sink.
          </div>
          <div>.</div>

          <div>
            It's up to you and your guts on whether to load more cargo or to
            deliver the present cargo.
          </div>
          <div>.</div>

          <div>Try to carry as much cargo as you can.</div>
        </div>
      </div>
    </>
  );
}

export default Page1;
