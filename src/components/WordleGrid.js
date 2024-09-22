import React from 'react';
import './WordleGrid.css';

function WordleGrid({ guesses, solution, currentGuess }) {
  const grid = [];

  for (let i = 0; i < 6; i++) {
    const row = guesses[i] || (i === guesses.length ? currentGuess.padEnd(5, ' ') : ' '.repeat(5));
    grid.push(row.split(''));
  }

  return (
    <div className="grid-container">
      {grid.map((row, i) => (
        <div key={i} className="row">
          {row.map((char, j) => {
            let colorClass = 'bg-dark';
            if (guesses[i]) {
              if (solution[j] === char) {
                colorClass = 'bg-success';
              } else if (solution.includes(char)) {
                colorClass = 'bg-warning';
              } else {
                colorClass = 'bg-secondary';
              }
            }
            return (
              <div key={j} className={`tile ${colorClass}`}>
                {char.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default WordleGrid;
