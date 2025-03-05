import React, { useCallback, useState } from "react";
import Card from "./components/Card";
import "./styles/index.css";

const App: React.FC = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [cardCounter, setCardCounter] = useState(0);

  const addCard = useCallback(() => {
    setCardCounter((prev) => prev + 1);
    setCards((prevCards) => [...prevCards, `card-${cardCounter + 1}`]);
  }, [cardCounter]);

  const resetGrid = useCallback(() => {
    setCards([]);
    setCardCounter(0);
    // Immediately add 12 new cards
    const initialCards = Array.from({ length: 12 }, (_, i) => `card-${i + 1}`);
    setCards(initialCards);
    setCardCounter(12);
  }, []);

  // Initialize with 12 cards on first render
  React.useEffect(() => {
    resetGrid();
  }, []);

  return (
    <div className="container">
      <h1>Resizable Card Grid</h1>

      <div className="actions">
        <button onClick={addCard}>Add Card</button>
        <button onClick={resetGrid}>Reset Grid</button>
      </div>

      <div className="card-grid">
        {cards.map((cardId) => (
          <Card key={cardId} id={cardId} />
        ))}
      </div>
    </div>
  );
};

export default App;
