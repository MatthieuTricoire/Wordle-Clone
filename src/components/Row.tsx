import { FC } from "react";
import { GuessLetter } from "../hooks/useWordle";

interface RowProps {
  guess?: GuessLetter[];
  currentGuess?: string;
  turn?: number;
}

const Row: FC<RowProps> = ({ guess, currentGuess, turn }) => {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((letter, i) => (
          <div className={letter.color} key={i}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className="row current">
        {letters.map((letter, index) => (
          <div className="filled" key={index}>
            {letter}
          </div>
        ))}
        {/* Create array of empty cell equivalent at 4 chars - current letters */}
        {[...Array(4 - letters.length)].map((emptyChar, index) => (
          <div key={index}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Row;
