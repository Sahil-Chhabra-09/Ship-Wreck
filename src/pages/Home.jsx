import React, { useEffect, useState } from "react";
import "../customCSS/home.css";
import drop from "../sound/drop.mp3";
import success from "../sound/success.mp3";
import failed from "../sound/failed.mp3";
import levelComplete from "../sound/levelComplete.mp3";
import background from "../sound/background.mp3";
import axios from "axios";
import { useMediaQuery } from "@mui/material";

function Home() {
  const [deliver, setDeliver] = useState(false);
  const [ships, setShips] = useState(5);
  const [cargo, setCargo] = useState(0);
  const [supplied, setSupplied] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [limits, setLimits] = useState([]);
  const [drowned, setDrowned] = useState(false);
  const [isBgMusicDisabled, setisBgMusicDisabled] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const drop_effect = new Audio(drop);
  const success_effect = new Audio(success);
  const failed_effect = new Audio(failed);
  const levelComplete_effect = new Audio(levelComplete);
  const background_effect = new Audio(background);
  const isDesktop = useMediaQuery("(min-width:640px)");

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    generateRandomNumbers(50, 9);
    generateRandomNumbers(50, 9);
    generateRandomNumbers(50, 9);
    generateRandomNumbers(50, 9);
    generateRandomNumbers(50, 9);
  }, []);

  useEffect(() => {
    if (intervalId === null && isBgMusicDisabled === false) {
      const tempInterval = setInterval(checkBackgroundAudio, 300);
      setIntervalId(tempInterval);
    } else {
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  }, [isBgMusicDisabled]);

  useEffect(() => {
    if (ships <= 0) {
      levelComplete_effect.play();
      setGameEnded(true);
    } else if (cargo !== 0 && isBgMusicDisabled) {
      success_effect.play();
    }
    setCargo(0);
  }, [ships]);

  useEffect(() => {
    if (cargo === 0 && drowned) {
      if (isBgMusicDisabled) failed_effect.play();
      setShips((prev) => prev - 1);
      setCargo(0);
      setTimeout(() => {
        setDeliver(false);
      }, 2000);
    }
  }, [cargo, drowned]);

  useEffect(() => {
    if (gameEnded && ships === 0) {
      updateScoresInDb();
    }
  }, [gameEnded]);

  const checkBackgroundAudio = () => {
    background_effect.play();
  };

  const updateScoresInDb = async () => {
    try {
      await axios.patch(`${apiUrl}/scores`, {
        name: localStorage.getItem("userName"),
        password: localStorage.getItem("password"),
        score: supplied,
      });
    } catch (error) {
      console.log("Couldn't update scores in DB ", error.message);
    }
  };

  const generateRandomNumbers = (sum, count) => {
    const randomNumbers = [];
    let remainingSum = sum;

    for (let i = 0; i < count - 1; i++) {
      const max = remainingSum - (count - i - 1);
      const randomNumber = Math.ceil(Math.random() * 10);
      randomNumbers.push(randomNumber);
      remainingSum -= randomNumber;
    }

    randomNumbers.push(remainingSum < 0 ? 0 : remainingSum);
    setLimits((prev) => [...prev, ...randomNumbers]);
  };

  const handleDeliver = () => {
    setDeliver(true);
    setShips((prev) => prev - 1);
    setSupplied((prev) => prev + cargo);
    setTimeout(() => {
      setDeliver(false);
    }, 2000);
  };

  const handleCargo = () => {
    if (gameEnded) return;
    if (cargo + 1 > limits[ships - 1]) {
      setDrowned(true);
      setTimeout(() => {
        setDrowned(false);
      }, 2000);
      setCargo(0);
      return;
    }
    if (isBgMusicDisabled) drop_effect.play();
    setCargo((prev) => prev + 1);
  };

  const handlePlayMusic = () => {
    setisBgMusicDisabled((prev) => !prev);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="parent">
        {/*Numbers */}
        {isDesktop ? (
          <div className="display flex justify-center items-center space-x-2">
            <div>Ships : {ships}</div>
            <div>Cargo : {cargo}</div>
            <div>Supplied : {supplied}</div>
          </div>
        ) : (
          <div className="w-full mt-4 px-2 flex flex-col justify-center items-center space-y-2">
            <div className="w-full">Ships : {ships}</div>
            <div className="w-full">Cargo : {cargo}</div>
            <div className="w-full">Supplied : {supplied}</div>
          </div>
        )}

        <div className="sun">
          <img src="../sun.png" />
        </div>

        {/*prevents drag, drop and svg selection of ship and waves */}
        <div className="overlook max-sm:hidden"></div>

        {/* Entirety of ship and waves */}
        {isDesktop ? (
          <div className="ship-container">
            <div
              className={`ship ${deliver ? "shipgo" : "shipcome"} ${
                drowned && "drowned"
              }`}
            >
              <img src="../ship.png"></img>
            </div>
            <div className="waves sm:h-0 md:h-4 lg:h-6 xl:h-8 2xl:h-16">
              <img className="wave wave1" src="../waves/wave1.svg"></img>
              <img className="wave wave2" src="../waves/wave2.svg"></img>
              <img className="wave wave3" src="../waves/wave3.svg"></img>
              <img className="wave wave4" src="../waves/wave4.svg"></img>
            </div>
          </div>
        ) : (
          <div className="ship-container-2">
            <div
              className={`ship-2 ${deliver ? "shipgo-2" : "shipcome-2"} ${
                drowned && "drowned-2"
              }`}
            >
              <img src="../ship.png"></img>
            </div>
            <div className="waves sm:h-0 md:h-4 lg:h-6 xl:h-8 2xl:h-16">
              <img className="wave wave1" src="../waves/wave1.svg"></img>
              <img className="wave wave2" src="../waves/wave2.svg"></img>
              <img className="wave wave3" src="../waves/wave3.svg"></img>
              <img className="wave wave4" src="../waves/wave4.svg"></img>
            </div>
          </div>
        )}

        {/* Control Panel */}
        <div className="controls">
          {isDesktop ? (
            <div className="space-x-2 md:space-x-12 max-sm:space-x-0 max-sm:w-full max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-white">
              <button onClick={gameEnded ? () => {} : handleCargo}>
                Add Cargo
              </button>
              <button onClick={gameEnded ? () => {} : handleDeliver}>
                Deliver
              </button>
            </div>
          ) : (
            <div className="mb-2 space-y-1 w-full flex flex-col justify-center items-center">
              <button onClick={gameEnded ? () => {} : handleCargo}>
                Add Cargo
              </button>
              <button onClick={gameEnded ? () => {} : handleDeliver}>
                Deliver
              </button>
            </div>
          )}
        </div>
        <div
          className="music absolute bottom-0 right-0 cursor-pointer"
          onClick={handlePlayMusic}
        >
          <img
            src="../music.png"
            className={`${isBgMusicDisabled && "disabled"}`}
          />
          <div className={`slash ${!isBgMusicDisabled && "hidden"}`}>/</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
