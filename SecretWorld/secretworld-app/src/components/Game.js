import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickweWord,
  pickedCategory,
  Letters,
  guessedLetters,
  errorLetters,
  guesses,
  score,
}) => {
  const [lettersL, setLetter] = useState();
  const letterInputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(lettersL);

    setLetter("");

    letterInputRef.current.focus();
  };
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação:{score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas(s)</p>
      <div className="wordContainer">
        {Letters.map((Letters, i) =>
          guessedLetters.includes(Letters) ? (
            <span key={i} className="letter">
              {Letters}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente advinha uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={lettersL}
            ref={letterInputRef}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>Letra já utilizadas:</p>
        {errorLetters.map((Letters, i) => (
          <span key={i}>{Letters},</span>
        ))}
      </div>
    </div>
  );
};

export default Game;
