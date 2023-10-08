import React, { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Instructions from "./components/Instructions/Instructions";

function App() {
  const [showInstructions, setShowInstructions] = useState(true);
  return (
    <div>
      <Instructions
        showInstructions={showInstructions}
        setShowInstructions={setShowInstructions}
      />
      <Navbar setShowInstructions={setShowInstructions} />
      <Home />
    </div>
  );
}

export default App;
