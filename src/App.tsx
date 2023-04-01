import { useEffect, useState } from "react";
import "./App.css";
import Wordle from "./components/Wordle";

export interface Words {
  id: number;
  word: string;
}

export const handleRandomWord = (array: Words[]): string =>
  array[Math.floor(Math.random() * array.length)].word;

export const fetchWords = async (): Promise<Words[]> => {
  try {
    const res = await fetch("http://localhost:3001/solutions");
    const words: Words[] = await res.json();
    return words;
  } catch (error) {
    console.log(error);
    return [];
  }
};

function App() {
  const [wordToFind, setWordToFind] = useState<string | null>(null);

  useEffect(() => {
    const getRandomWord = async () => {
      const words = await fetchWords();
      const randomWord = handleRandomWord(words);
      setWordToFind(randomWord);
    };
    getRandomWord();
  }, []);

  return (
    <div className="App">
      <h1>Wordle Clone</h1>
      {wordToFind && <Wordle wordToFind={wordToFind} />}
    </div>
  );
}

export default App;
