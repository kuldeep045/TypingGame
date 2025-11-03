
const GeneratedWords = ({ words, userInput }: { words: string, userInput: string[] }) => {
    

    return (
        <div className="max-w-2xl mx-auto text-xl text-slate-600">
            {words.split("").map((char, idx) => {
                const typedChar = userInput[idx];
                if (typedChar === undefined) {
                    return <span key={`${char}_${idx}`}>{char}</span>;
                }
                if (typedChar === char) {
                    return (
                        <span className="text-amber-300" key={`${char}_${idx}`}>
                            {char}
                        </span>
                    );
                }
                return (
                    <span className="text-red-600 bg-slate-400" key={`${char}_${idx}`}>
                        {char}
                    </span>
                );
            })}
        </div>
    );
};

export default GeneratedWords;