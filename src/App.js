import React, { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Instructions from "./components/Instructions/Instructions";
import HighScores from "./components/HighScores/HighScores";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [showHighScores, setShowHighScores] = useState(false);

  return (
    <div>
      <Instructions
        showInstructions={showInstructions}
        setShowInstructions={setShowInstructions}
      />
      <HighScores
        showHighScores={showHighScores}
        setShowHighScores={setShowHighScores}
      />
      <Navbar
        setShowInstructions={setShowInstructions}
        setShowHighScores={setShowHighScores}
      />
      <Home />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme="light"
        className="text-black"
      />
    </div>
  );
}

export default App;
