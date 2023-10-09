import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Instructions from "./components/Instructions/Instructions";
import HighScores from "./components/HighScores/HighScores";

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
    </div>
  );
}

export default App;
