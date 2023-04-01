import { FC, useEffect } from "react";
import { useState } from "react";
import { TypedLetter } from "../hooks/useWordle";

interface Letter {
  key: string;
}

interface KeyboardProps {
  usedKeys: TypedLetter;
}

const Keyboard: React.FC<KeyboardProps> = ({ usedKeys }) => {
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/letters")
      .then((res) => res.json())
      .then((json) => setLetters(json));
  }, []);

  return (
    <div className="keyboard">
      {letters &&
        letters.map((letter) => {
          const color = usedKeys[letter.key];
          return (
            <div key={letter.key} className={color}>
              {letter.key}
            </div>
          );
        })}
    </div>
  );
};

export default Keyboard;
