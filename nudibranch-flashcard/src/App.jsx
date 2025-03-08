
import React, { useState } from 'react';
import './App.css';

const cards = [{ question: 'Why are nudibranches often brightly colored?', answer: 'They tend to excrete toxins or unpleasant chemicals to avoid being eaten' },
  { question: 'What do they use hteir tentacles(rhinophores) for?', answer: 'For smell' },
  { question: 'How can some nudibranch use photosynthesis', answer: 'They eat algae and absorb chloroplasts into their own cells' },
  { question: 'How do nudibranch communicate?', answer: 'Their trails of slime have chemical markers can share info to others' },
  { question: 'How long do nudibranch live?', answer: 'Around 1 year' },
  { question: 'How how many species are there', answer: '3000+' },
  { question: 'What do nudibranch eat?', answer: 'Theyre carnivores and will eat anamone, coral, algae, sponges, and other nudis!' },
  { question: 'What are their predators', answer: 'Sea turtles, fish, seastars, and other nudis' },
];

const Flashcard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
      <div className="flashcard-inner">
        <div className="flashcard-front">{card.question}</div>
        <div className="flashcard-back">{card.answer}</div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [isShuffled, setIsShuffled] = useState(true);

  const nextCard = () => {
    let newIndex;
    do {
      newIndex = isShuffled ? Math.floor(Math.random() * cards.length) : (currentIndex + 1) % cards.length;
    } while (newIndex === previousIndex);
    
    setPreviousIndex(currentIndex);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="App">
      <h1>Nudibranch Knowledge</h1>
      <h3>Learn some more about nudibranch(sea slug) facts!</h3>
      <h3>Count : 8</h3>
      <Flashcard card={cards[currentIndex]} />
      <div className="button-container">
        <button onClick={nextCard}>Next Card</button>
        <button onClick={() => setIsShuffled(!isShuffled)}>{isShuffled ? 'Disable Shuffle' : 'Enable Shuffle'}
        </button>
    </div>
    </div>
  );
};

export default App;