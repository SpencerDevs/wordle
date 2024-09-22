import React from 'react';

const EndGameMenu = ({ hasWon, solution, onPlayAgain }) => {
  return (
    <div className="end-game-menu d-flex flex-column justify-content-center align-items-center bg-dark p-4 rounded-3">
      {hasWon ? (
        <h2 className="text-success">🎉 You won! 🎉</h2>
      ) : (
        <h2 className="text-danger">😢 You lost! The word was <span className="text-warning">{solution}</span></h2>
      )}
      <button className="btn btn-cyan mt-3" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default EndGameMenu;
