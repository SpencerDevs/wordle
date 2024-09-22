import React, { useState, useEffect } from 'react';
import './App.css';
import WordleGrid from './components/WordleGrid';
import Keyboard from './components/Keyboard';
import EndGameMenu from './components/EndGameMenu';

const MAX_GUESSES = 6;

function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [solution, setSolution] = useState('');
  const [keyStatus, setKeyStatus] = useState({});
  const [errorMessage, setErrorMessage] = useState(''); // For showing validation errors
  const [gameOver, setGameOver] = useState(false); // To track if the game is over
  const [hasWon, setHasWon] = useState(false); // To track if the user has won

  // Fetch a random word when the game starts
  useEffect(() => {
    fetchRandomWord();
  }, []);

  // Add event listener for physical keyboard input
  useEffect(() => {
    const handleKeydown = (event) => {
      const key = event.key.toUpperCase();

      // Handle letter keys, Enter, and Backspace
      if (/[A-Z]/.test(key) && key.length === 1) {
        handleKeyPress(key);
      } else if (key === 'ENTER') {
        handleKeyPress('Enter');
      } else if (key === 'BACKSPACE') {
        handleKeyPress('Backspace');
      }
    };

    window.addEventListener('keydown', handleKeydown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [currentGuess, gameOver]); // Only re-add listener if the game is not over

  const fetchRandomWord = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word?number=1&length=5');
      const data = await response.json();
      setSolution(data[0].toUpperCase());
      setGameOver(false); // Reset game over state
      setHasWon(false); // Reset win state
      setGuesses([]); // Reset guesses
      setKeyStatus({}); // Reset key colors
    } catch (error) {
      console.error("Error fetching random word:", error);
    }
  };

  const updateKeyStatus = (guess) => {
    const newStatus = { ...keyStatus };
    for (let i = 0; i < guess.length; i++) {
      const char = guess[i];
      if (solution[i] === char) {
        newStatus[char] = 'correct';
      } else if (solution.includes(char)) {
        if (newStatus[char] !== 'correct') {
          newStatus[char] = 'present';
        }
      } else {
        newStatus[char] = 'absent';
      }
    }
    setKeyStatus(newStatus);
  };

  // Validate if the guess is a valid word
  const validateWord = async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
      if (response.ok) {
        return true; // Word is valid
      } else {
        return false; // Word is invalid
      }
    } catch (error) {
      console.error("Error validating word:", error);
      return false;
    }
  };

  const handleKeyPress = async (key) => {
    if (gameOver) return; // Don't process key presses if the game is over

    if (key === 'Enter') {
      if (currentGuess.length === 5) {
        const isValidWord = await validateWord(currentGuess);

        if (isValidWord) {
          setErrorMessage('');
          const newGuesses = [...guesses, currentGuess];
          setGuesses(newGuesses);
          updateKeyStatus(currentGuess);

          if (currentGuess === solution) {
            setHasWon(true); // Player has won
            setGameOver(true);
          } else if (newGuesses.length === MAX_GUESSES) {
            setGameOver(true); // Player ran out of guesses
          }

          setCurrentGuess('');
        } else {
          setErrorMessage(`${currentGuess.toUpperCase()} is not a valid word!`);
        }
      }
    } else if (key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const handlePlayAgain = () => {
    fetchRandomWord(); // Reset game with a new word
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="text-cyan">werdle 😎</h1>
      <WordleGrid guesses={guesses} solution={solution} currentGuess={currentGuess} />
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <Keyboard handleKeyPress={handleKeyPress} keyStatus={keyStatus} />

      {gameOver && (
        <EndGameMenu
          hasWon={hasWon}
          solution={solution}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default App;
