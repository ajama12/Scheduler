import { useState } from "react";

export default function useVisualMode(initialMode) {

const [mode, setMode] = useState(initialMode);
const [history, setHistory] = useState([initialMode]);

function transition(newMode, replace = false) {
  if (replace) {
    setMode(newMode);
    setHistory(prevHistory => {
      const updatedHistory = [...prevHistory];
      updatedHistory.pop();
      updatedHistory.push(newMode);
      return updatedHistory;
    });
  } else {
    setMode(newMode);
    setHistory(prevHistory => [...prevHistory, newMode]);
  }
}

function back() {
  if (history.length > 1) {
    const previousModes = [...history]; 
    previousModes.pop();
    const previousMode = previousModes[previousModes.length - 1];
    setMode(previousMode);
    setHistory(previousModes);
  }
};

return {mode, transition, back};

};