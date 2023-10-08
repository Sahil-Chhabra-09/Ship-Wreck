import React, { useEffect, useState } from "react";
import "../customCSS/home.css";
import drop from "../sound/drop.mp3";
import success from "../sound/success.mp3";
import failed from "../sound/failed.mp3";
import levelComplete from "../sound/levelComplete.mp3";

function Home() {
  const [deliver, setDeliver] = useState(false);
  const [ships, setShips] = useState(45);
  const [cargo, setCargo] = useState(0);
  const [supplied, setSupplied] = useState(0);
  const [loading, setLoading] = useState(false);
  const [limits, setLimits] = useState([]);
  const [drowned, setDrowned] = useState(false);
  const drop_effect = new Audio(drop);
  const success_effect = new Audio(success);
  const failed_effect = new Audio(failed);
  const levelComplete_effect = new Audio(levelComplete);

  useEffect(() => {
    generateRandomNumbers(50, 9);
    generateRandomNumbers(50, 9);
    generateRandomNumbers(50, 9);
    generateRandomNumbers(50, 9);
    generateRandomNumbers(50, 9);
  }, []);

  useEffect(() => {
    if (ships <= 0) {
      levelComplete_effect.play();
      setLoading(true);
    }
  }, [ships]);

  function generateRandomNumbers(sum, count) {
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
  }

  const handleDeliver = () => {
    setDeliver(true);
    setShips((prev) => prev - 1);
    if (cargo !== 0) {
      success_effect.play();
    }
    setSupplied((prev) => prev + cargo);
    setCargo(0);
    setTimeout(() => {
      setDeliver(false);
    }, 2000);
  };

  useEffect(() => {
    if (cargo === 0 && drowned) {
      failed_effect.play();
      setShips((prev) => prev - 1);
      setCargo(0);
      setTimeout(() => {
        setDeliver(false);
      }, 2000);
    }
  }, [cargo, drowned]);

  const handleCargo = () => {
    if (loading) return;
    if (cargo + 1 > limits[ships - 1]) {
      setDrowned(true);
      setTimeout(() => {
        setDrowned(false);
      }, 2000);
      setCargo(0);
      return;
    }
    drop_effect.play();
    setCargo((prev) => prev + 1);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="parent">
        <div className="display flex justify-center items-center space-x-2">
          <div>Ships : {ships}</div>
          <div>Cargo : {cargo}</div>
          <div>Supplied : {supplied}</div>
        </div>
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
        <div className="controls">
          <div className="space-x-2 md:space-x-12">
            <button onClick={!loading ? handleCargo : () => {}}>
              Add Cargo
            </button>
            <button onClick={!loading ? handleDeliver : () => {}}>
              Deliver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
