import React from "react";

function Page2({ name, setName }) {
  const nameHandler = (e) => {
    setName(e.target.value.trim());
  };

  return (
    <>
      <div className="heading text-xl text-center">Enter your name</div>
      <div className="flex flex-col justify-center items-center text-center p-4 h-5/6">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={name}
            onChange={nameHandler}
            className="p-2 border-2"
          ></input>
        </div>
      </div>
    </>
  );
}

export default Page2;
