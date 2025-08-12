import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const CARD_WIDTH = 60;
const CARD_HEIGHT = 90;

export default function MultiPlayerCardDeal({ playersCount = 4, cardsPerPlayer = 5 }) {
  const [dealtCards, setDealtCards] = useState([]);

  // Precompute positions in a circle for each player
  const radius = 200; // distance from center
  const playerPositions = Array.from({ length: playersCount }, (_, i) => {
    const angle = (i / playersCount) * 2 * Math.PI;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  });

  useEffect(() => {
    let cardIndex = 0;
    const totalCards = playersCount * cardsPerPlayer;
    const interval = setInterval(() => {
      const player = cardIndex % playersCount;
      const cardNumber = Math.floor(cardIndex / playersCount);
      setDealtCards((prev) => [...prev, { player, cardNumber }]);
      cardIndex++;
      if (cardIndex >= totalCards) clearInterval(interval);
    }, 300); // 300ms per card
    return () => clearInterval(interval);
  }, [playersCount, cardsPerPlayer]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Deck */}
      <div
        style={{
          position: "absolute",
          width: `${CARD_WIDTH}px`,
          height: `${CARD_HEIGHT}px`,
          background: "gray",
          border: "1px solid black",
          borderRadius: "8px",
          zIndex: 2
        }}
      />

      {/* Dealt Cards */}
      {dealtCards.map(({ player, cardNumber }, i) => {
        const { x, y } = playerPositions[player];
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
            animate={{
              x: x + cardNumber * 15 - CARD_WIDTH / 2, // offset each card in hand
              y: y - CARD_HEIGHT / 2,
              rotate: cardNumber * 5 - 10, // small fan spread
              opacity: 1
            }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            style={{
              position: "absolute",
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
              background: "white",
              border: "1px solid black",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              zIndex: 1
            }}
          >
            🂠
          </motion.div>
        );
      })}
    </div>
  );
}
