import { useRef,useEffect, useState, useMemo } from "react";
const useResults = ({ words, userInput }: { words: string, userInput: string[] }) => {

    const [finished, setFinished] = useState(false);
        const [timeTaken, setTimeTaken] = useState(0); 
        const startTimeRef = useRef<number | null>(null);
        const endTimeRef = useRef<number | null>(null);
    
        useEffect(() => {
            if (userInput.length === 1 && startTimeRef.current === null) {
                startTimeRef.current = Date.now();
            }
    
            if (
                userInput.length === words.length && 
                endTimeRef.current === null &&
                startTimeRef.current !== null
            ) {
                endTimeRef.current = Date.now();
    
                const durationInSeconds = (endTimeRef.current - startTimeRef.current) / 1000;
                setTimeTaken(durationInSeconds);
    
                setFinished(true);
            }
        }, [userInput, words.length]);
    
        const { correctCount, totalTyped } = useMemo(() => {
            let correct = 0;
            const total = userInput.length;
    
            for (let i = 0; i < userInput.length; i++) {
                if (userInput[i] === words[i]) correct++;
            }
    
            return { correctCount: correct, totalTyped: total };
        }, [userInput, words]);
    
        const accuracy = totalTyped > 0 ? ((correctCount / totalTyped) * 100).toFixed(1) : "0.0";
    
    
        const wpm = timeTaken > 0 ? (words.length / 5) / (timeTaken / 60) : 0;
    return{
        wpm,
        accuracy,
        finished
    }
}

export default useResults