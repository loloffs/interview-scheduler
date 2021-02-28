import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = function(newMode, replace = false) {
    setMode(newMode);
    setHistory((history) => {
      return [...history, newMode];
    });
    if(replace === true) {
      return setHistory(history);
    }
  };

  const back = function() {
    setHistory((history) => {
      if(history.length === 1) {
        return history;
      }
      const newHistory = [...history];
      newHistory.pop();
      setMode(newHistory[newHistory.length-1]); 
      return newHistory;
    });
  };

  return { mode, transition, back };
}
