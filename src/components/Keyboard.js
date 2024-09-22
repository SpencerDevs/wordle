import React from 'react';
import './Keyboard.css';

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
];

function Keyboard({ handleKeyPress, keyStatus }) {
  const getKeyClass = (key) => {
    if (keyStatus[key]) {
      switch (keyStatus[key]) {
        case 'correct':
          return 'btn btn-success';
        case 'present':
          return 'btn btn-warning';
        case 'absent':
          return 'btn btn-dark';
        default:
          return 'btn btn-secondary';
      }
    }
    return 'btn btn-secondary';
  };

  return (
    <div className="keyboard">
      {keys.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`${getKeyClass(key)} m-1`}
              onClick={() => handleKeyPress(key === 'Backspace' ? 'Backspace' : key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
