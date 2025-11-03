"use client"
import UserTyping from "@/components/UserTyping";
import { faker } from "@faker-js/faker"
import useTyping from "@/hooks/useTyping";
import { useState, useEffect, useRef, useMemo } from "react";
import GeneratedWords from "@/components/GenetatedWords";
import Results from "@/components/Results";
import useResults from "@/hooks/useResults";


export default function Home() {
  const [timer, setTimer] = useState(60);
  const [words] = useState(() => faker.word.words(100));
  const timerStartedRef = useRef(false);

 
  const finished = false; 

  
  let gameHasEnded = finished || timer === 0;

  const { userInput, totalKeystrokes } = useTyping(!gameHasEnded); 
  const userInputArr = userInput.split("")

 
  const { 
    wpm: wpmOnFinish, 
    accuracy: accuracyOnFinish,
    finished: finalFinished 
  } = useResults({ words: words, userInput: userInputArr });
  
  gameHasEnded = finalFinished || timer === 0;





  const hasStarted = userInput.length > 0;
  
  useEffect(() => {
    if (hasStarted && !timerStartedRef.current) {
      timerStartedRef.current = true;
      
      const intervalId = setInterval(() => {
        setTimer((prev) => {
        
          if (prev <= 1 || finalFinished) { 
            clearInterval(intervalId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [hasStarted, finalFinished]); 


  const correctCount = useMemo(() => {
    let correct = 0;
    for (let i = 0; i < userInputArr.length; i++) {
        if (userInputArr[i] === words[i]) correct++;
    }
    return correct;
  }, [userInputArr, words]);

  const finalAccuracy = totalKeystrokes > 0 
    ? ((correctCount / totalKeystrokes) * 100).toFixed(1) 
    : "0.0";

  let finalWpm = 0;
  if (finalFinished) {
    finalWpm = wpmOnFinish; 
  } else if (timer === 0) {
    const timeInMinutes = 30 / 60;
    finalWpm = (correctCount / 5) / timeInMinutes;
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="text-center text-xl">Typing Test</div>
      <div>
        <CountDownTimer time={timer} />
        <div className="relative">
          {gameHasEnded ? (
            <Results accuracy={finalAccuracy} speed={Math.round(finalWpm)} />
          ) : (
            <>
              <GeneratedWords userInput={userInputArr} words={words} />
              <UserTyping className="absolute inset-0 text-xl" userInput={userInput} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}


const CountDownTimer = ({ time = 30 }: { time: number }) => {
  return <div className="text-yellow-300 font-bold text-md">Time Left: {time}</div>;
};