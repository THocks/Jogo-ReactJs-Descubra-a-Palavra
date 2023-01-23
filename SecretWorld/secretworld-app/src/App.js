//CSS
import "./App.css";
//React
import { useCallback, useEffect, useState } from "react";

//Components
import TelaInicial from "./components/TelaInicial";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// data
import { wordsList } from "./data/world";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesNumber = 4;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  //hooks

  const [pickweWord, setPickWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [Letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [errorLetters, setErrorLetters] = useState([]);
  const [guesses, SetGuesses] = useState(guessesNumber);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    /* Capturando todas as categorias */
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    //pick a random wor
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);

  // Start Game
  const startGame = useCallback(() => {
    //ClearStartGame
    clearLetterState();
    // pick word and pick category
    const { word, category } = pickWordAndCategory();

    // crate an array of letter

    let worldLetters = word.split("");
    worldLetters = worldLetters.map((l) => l.toLowerCase());

    // Fill States
    setPickWord(word);
    setPickedCategory(category);
    setLetters(worldLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //Process the letter input

  const verifyLetter = (lettersL) => {
    const normalizedLetter = lettersL.toLowerCase();

    // check if letter
    if (Letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessesLetters) => [
        ...actualGuessesLetters,
        normalizedLetter,
      ]);
    } else {
      setErrorLetters((errorLetters) => [...errorLetters, normalizedLetter]);
      SetGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
  // resetando quando o jogo acabar
  function clearLetterState() {
    setGuessedLetters([]);
    setErrorLetters([]);
  }

  //check if guesses

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterState();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    if (guesses === 1) {
      alert("Você tem apenas mas uma chance");
    }
  }, [guesses]);

  //check win
  useEffect(() => {
    const uniqueLetters = [...new Set(Letters)];

    // condition
    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => (actualScore += 50));

      //restarGame
      startGame();
    }
  }, [guessedLetters, Letters, startGame]);

  // Restart
  const retryGame = () => {
    setScore(0);
    SetGuesses(guessesNumber);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <TelaInicial startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickweWord={pickweWord}
          pickedCategory={pickedCategory}
          Letters={Letters}
          guessedLetters={guessedLetters}
          errorLetters={errorLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retryGame={retryGame} score={score} />}
    </div>
  );
}

export default App;
