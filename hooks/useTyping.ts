// In your "@/hooks/useTyping.js" file

import { useState, useEffect } from "react";

const useTyping = (enabled: boolean) => {
  const [userInput, setUserInput] = useState("");
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!enabled) return;

      if (e.key === "Backspace") {
        setUserInput((prev) => prev.slice(0, -1));
  
      } else if (e.key.length === 1) { 
       setUserInput((prev) => prev + e.key);
        setTotalKeystrokes((prev) => prev + 1); 
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled]);
  return { userInput, totalKeystrokes };
};

export default useTyping;