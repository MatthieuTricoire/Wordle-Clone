import { FC } from "react";

interface ModalProps {
  isCorrect: boolean;
  turn: number;
  wordToFind: string;
}

const Modal: FC<ModalProps> = ({ isCorrect, turn, wordToFind }) => {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You win ! </h1>
          <p className="solution">{wordToFind}</p>
          <p>You find the solution in {turn} tries !</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>You loose </h1>
          <p>The word to find was : {wordToFind}</p>
        </div>
      )}
    </div>
  );
};

export default Modal;
