import { useState } from "react"


export interface GuessLetter {
    key: string;
    color: string //TODO comment régler ce problème ? Il faut créer un nouvelle interface ? 
}

export interface TypedLetter {
    [key: string]: string | undefined;
}

const useWordle = (wordToFind: string) => {


    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState("")
    const [guesses, setGuesses] = useState<GuessLetter[][]>([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState<string[]>([]) // each guess is a string to check if a word has been already suggested
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState<TypedLetter>({}) //used keys : e.g. {a : "green", b: "yellow", ...} 


    //format a guess into an array of letter objects
    // e.g. [{key : "a", color : "orange"}]
    const formatGuess = (): GuessLetter[] => {
        // e.g. "toma" > ["t" , "o", "m", "a"]
        let wordToFindArray: (string | null)[] = [...wordToFind];
        console.log("wordToFindArray : ", wordToFindArray)


        // Default value of each guessed letter : grey
        // e.g. "tium" > [ {key: "t", color : "grey"}, {key: "i", color : "grey"}, {key: "u", color : "grey"}, {key: "m", color : "grey"}]
        let guessArray: GuessLetter[] = [...currentGuess].map((letter) => {
            return { key: letter, color: "grey" }
        })


        // Letter contains and in the good position of the searched word
        // toma tium > _est t(green)ium

        guessArray.forEach((letter, i) => {
            if (wordToFindArray[i] === letter.key) {
                // TODO l.color = "green" identical than the next line ? 
                guessArray[i].color = "green";
                wordToFindArray[i] = null;
            }
        })

        // Letter contains but in wrong place of the searched word
        // _oma tium > _o_a t(green) iu(orange)m

        guessArray.forEach((letter, i) => {
            if (wordToFindArray.includes(letter.key) && letter.color !== "green") {
                guessArray[i].color = "orange";
                wordToFindArray[wordToFindArray.indexOf(letter.key)] = null;
            }
        })
        // return guessArray with updated color depending of matches
        console.log("guessArray ---> ", guessArray)
        return guessArray;

    }

    const addNewGuess = (guessArray: GuessLetter[]): void => {

        // Victory check
        if (currentGuess === wordToFind) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }

        // update the state with the  checkedGuess of this turn
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = guessArray;
            return newGuesses
        })

        // update the state with the current word as string
        setHistory((prevHistory) => {
            // TODO : let newHistory = [...prevHistory] newHistory.push(currentGuess)
            return [...prevHistory, currentGuess]
        })

        // update the turn count
        setTurn((prevTurn) => {
            return prevTurn + 1;
        })

        setUsedKeys((prevUsedKeys) => {
            let newKeys = { ...prevUsedKeys }

            guessArray.forEach((letter) => {
                const currentColor = newKeys[letter.key]

                if (letter.color === "green") {
                    newKeys[letter.key] = "green";
                    return;
                }

                if (letter.color === "orange" && currentColor !== "green") {
                    newKeys[letter.key] = "orange";
                    return;
                }

                if (letter.color === "grey" && currentColor !== "orange" && currentColor !== "green") {
                    newKeys[letter.key] = "grey"
                    return;
                }

            });

            return newKeys
        }

        );

        setCurrentGuess("");
    }

    const handleKeyup = (event: KeyboardEvent) => {

        // Check on guess validtion
        if (event.key === "Enter") {
            // check if turn is less than 5
            if (turn > 5) {
                console.log("You used all your guesses !")
                return;
            }

            // do not allow to validate an already submitted word  
            if (history.includes(currentGuess)) {
                console.log("You alreade tried that word !")
                return;
            }

            // word is less than 4 chars
            if (currentGuess.length !== 4) {
                console.log("a word must have 4 characters")
                return;
            }

            const checkedGuess = formatGuess();
            addNewGuess(checkedGuess);
        }

        // Add the possibility to delete a enter character
        if (event.key === "Backspace") {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1) //-1 delete the last element
            })
            return;
        }
        // Add a character as a guess character. 4 chars limit
        if (/[A-Za-z]$/.test(event.key) && event.key !== "Meta" && event.key !== "Shift" && event.key !== "Control" && event.key !== "Alt") {
            if (currentGuess.length < 4) {
                setCurrentGuess((prev) => {
                    return prev + event.key
                })
            }
        }

    }


    return { turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys }
}

export default useWordle        
