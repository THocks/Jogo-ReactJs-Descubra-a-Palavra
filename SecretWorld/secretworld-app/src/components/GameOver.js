import "./GameOver.css";

const GameOver = ({ retryGame, score }) => {
  return (
    <div>
      <h1>Deseja jogar novamente ?</h1>
      <h2>
        Sua Pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={retryGame}>Jogar Novamente</button>
    </div>
  );
};

export default GameOver;
