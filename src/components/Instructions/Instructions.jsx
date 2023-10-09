import React, { useEffect, useState } from "react";
import Page1 from "./Page1";
import "../../customCSS/instructions.css";
import Page2 from "./Page2";
import click from "../../sound/click.mp3";
import Page3 from "./Page3";
import RenderModal from "../RenderModal";

function Instructions({ showInstructions = false, setShowInstructions }) {
  const [stage, setStage] = useState(1);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isnameInvalid, setIsnameInvalid] = useState(false);
  const click_effect = new Audio(click);

  useEffect(() => {
    setName(localStorage.getItem("userName"));
    setPassword(localStorage.getItem("password"));
  }, []);

  useEffect(() => {
    if (
      password != null &&
      password.length !== 0 &&
      name != null &&
      name.length >= 2 &&
      name.length <= 30
    ) {
      setIsnameInvalid(true);
    } else {
      setIsnameInvalid(false);
    }
  }, [name, password]);

  const renderPages = () => {
    if (stage === 1) {
      return <Page1 />;
    }
    if (stage === 2) {
      return (
        <Page2
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
        />
      );
    }
    if (stage == 3) {
      return <Page3 setShowInstructions={setShowInstructions} />;
    }
  };

  const nextHandler = () => {
    if (stage === 3) return;
    else {
      if (stage === 2 && isnameInvalid) {
        localStorage.setItem("userName", name);
        localStorage.setItem("password", password);
      }
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
    <RenderModal>
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
          className={`${stage === 3 && "disabled"} ${
            stage === 2 && !isnameInvalid && "disabled"
          }`}
        >
          Next
        </button>
      </div>
    </RenderModal>
  );
}

export default Instructions;
