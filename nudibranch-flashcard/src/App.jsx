import React, { useState } from 'react';
import './App.css';

const initialCards = [
  { question: 'Why are nudibranches often brightly colored?', answer: 'They tend to excrete toxins or unpleasant chemicals to avoid being eaten' },
  { question: 'What do they use hteir tentacles(rhinophores) for?', answer: 'For smell' },
  { question: 'How can some nudibranch use photosynthesis', answer: 'They eat algae and absorb chloroplasts into their own cells' },
  { question: 'How do nudibranch communicate?', answer: 'Their trails of slime have chemical markers can share info to others' },
  { question: 'How long do nudibranch live?', answer: 'Around 1 year' },
  { question: 'How how many species are there', answer: '3000+' },
  { question: 'What do nudibranch eat?', answer: 'Theyre carnivores and will eat anamone, coral, algae, sponges, and other nudis!' },
  { question: 'What are their predators', answer: 'Sea turtles, fish, seastars, and other nudis' },
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }  const handleGuessSubmit = (e) => {
    e.preventDefault();
    const answer = cards[currentIndex].answer;
    const trimmedGuess = guess.trim();
    if (
      trimmedGuess.length > 0 &&
      isPartialMatch(trimmedGuess, answer.trim())
    ) {
      setFeedback('Correct!');
      setIsFlipped(true);
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) setLongestStreak(newStreak);
    } else {
      setFeedback('Incorrect, try again!');
      setCurrentStreak(0);
    }
  };
  return arr;
}

// Helper: Remove punctuation and compare partial matches
function normalize(str) {
  return str.replace(/[^\w\s]|_/g, '').toLowerCase();
}
function isPartialMatch(guess, answer) {
  const guessNorm = normalize(guess);
  const answerNorm = normalize(answer);
  return (
    answerNorm.includes(guessNorm) ||
    guessNorm.includes(answerNorm) ||
    guessNorm.split(' ').some(word => answerNorm.includes(word))
  );
}

const Flashcard = ({ card, isFlipped, onFlip }) => (
  <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
    <div className="flashcard-inner">
      <div className="flashcard-front">{card.question}</div>
      <div className="flashcard-back">{card.answer}</div>
    </div>
  </div>
);

const App = () => {
  const [cards, setCards] = useState(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [mastered, setMastered] = useState([]);
  const [showMastered, setShowMastered] = useState(false);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  const handleGuessSubmit = (e) => {
  e.preventDefault();
  const answer = cards[currentIndex].answer;
  const trimmedGuess = guess.trim();
  if (
    trimmedGuess.length > 0 &&
    isPartialMatch(trimmedGuess, answer.trim())
  ) {
    setFeedback('Correct!');
    setIsFlipped(true);
    const newStreak = currentStreak + 1;
    setCurrentStreak(newStreak);
    if (newStreak > longestStreak) setLongestStreak(newStreak);
  } else {
    setFeedback('Incorrect, try again!');
    setCurrentStreak(0);
  }
};

  const goToNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setGuess('');
      setFeedback('');
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setGuess('');
      setFeedback('');
    }
  };

  const handleShuffle = () => {
    setCards(shuffleArray(cards));
    setCurrentIndex(0);
    setIsFlipped(false);
    setGuess('');
    setFeedback('');
  };

  const handleMastered = () => {
    const masteredCard = cards[currentIndex];
    setMastered([...mastered, masteredCard]);
    const newCards = cards.filter((_, idx) => idx !== currentIndex);
    setCards(newCards);
    setIsFlipped(false);
    setGuess('');
    setFeedback('');
    if (newCards.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= newCards.length) {
      setCurrentIndex(newCards.length - 1);
    }
  };

  return (
    <div className="App">
      <h1>Nudibranch Knowledge</h1>
      <h3>Learn some more about nudibranch (sea slug) facts!</h3>
      <h3>Count: {cards.length}</h3>
      <div>
        <button onClick={handleShuffle}>Shuffle Cards</button>
        <button onClick={() => setShowMastered((v) => !v)}>
          {showMastered ? 'Hide' : 'Show'} Mastered Cards
        </button>
      </div>
      {cards.length > 0 ? (
        <>
          <Flashcard card={cards[currentIndex]} isFlipped={isFlipped} onFlip={handleFlip} />
          <form onSubmit={handleGuessSubmit} className="guess-form">
            <label>
              Your Guess:
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                disabled={isFlipped}
              />
            </label>
            <button type="submit" disabled={isFlipped}>Submit</button>
          </form>
          {feedback && (
            <div className={`feedback ${feedback === 'Correct!' ? 'correct' : 'incorrect'}`}>
              {feedback}
            </div>
          )}
          <div className="button-container">
            <button onClick={goToPrev} disabled={currentIndex === 0}>Back</button>
            <button onClick={goToNext} disabled={currentIndex === cards.length - 1}>Next</button>
            <button onClick={handleMastered} disabled={!isFlipped}>Mark as Mastered</button>
          </div>
        </>
      ) : (
        <div>All cards mastered! 🎉</div>
      )}
      <div className="streaks">
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {longestStreak}</p>
      </div>
      {showMastered && (
        <div className="mastered-list">
          <h4>Mastered Cards:</h4>
          <ul>
            {mastered.map((card, idx) => (
              <li key={idx}>{card.question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;