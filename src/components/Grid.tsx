import { FC } from "react";
import { GuessLetter } from "../hooks/useWordle";
import Row from "./Row";

// TODO est-ce que je suis obligé d'importer à chaque fois les types ?
interface GridProps {
  currentGuess: string;
  guesses: GuessLetter[][];
  turn: number;
}

const Grid: FC<GridProps> = ({ currentGuess, guesses, turn }) => {
  return (
    <div>
      {guesses.map((guess: GuessLetter[], i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} />;
        }
        return <Row key={i} guess={guess} />;
      })}
    </div>
  );
};

export default Grid;
