import React from 'react';

const EndGameMenu = ({ hasWon, solution, onPlayAgain }) => {
  return (
    <div className="end-game-menu">
      {hasWon ? (
        <h2 className="text-success">🎉 You won! 🎉</h2>
      ) : (
        <h2 className="text-danger">😢 You lost! The word was {solution}</h2>
      )}
      <button className="btn btn-primary mt-3" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default EndGameMenu;
