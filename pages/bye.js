import React, { useState, useEffect } from "react";

function Confetti() {
  // Create 30 confetti pieces with random horizontal positions and delays
  const confettis = Array.from({ length: 30 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 3}s`,
      animationDelay: `${Math.random() * 5}s`,
      width: `${6 + Math.random() * 4}px`,
      height: `${6 + Math.random() * 4}px`,
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      backgroundColor: ["#e91e63", "#ff4081", "#f06292"][i % 3],
    };
    return <div key={i} className="confetti-piece" style={style} />;
  });

  return <div className="confetti-wrapper" aria-hidden="true">{confettis}</div>;
}

export default function Bye() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpen) setIsOpen(true);
  };

  const handleNextClick = () => {
    setShowGoodbye(true);
  };

  // Accessibility: focus on goodbye section when shown
  useEffect(() => {
    if (showGoodbye) {
      const el = document.getElementById("goodbye-section");
      if (el) el.focus();
    }
  }, [showGoodbye]);

  return (
    <div className="bye-container" role="main">
      {!showGoodbye ? (
        <>
          <div className="open-letter-prompt" aria-live="polite">
            {isOpen
              ? "Here's the secret of happiness, just for you 💙"
              : "Click the letter to reveal the secret of happiness 💌"}
          </div>

          <div
            className={`envelope${isOpen ? " open" : ""}`}
            onClick={handleEnvelopeClick}
            role="button"
            tabIndex={0}
            aria-label="Open the secret letter"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleEnvelopeClick();
              }
            }}
          >
            <div className="envelope-front" aria-hidden={isOpen}>
              💌 Secret Letter
            </div>
            <div className="envelope-back" aria-hidden={!isOpen}>
              <div className="secret-quote">
                The secret to happiness is 
              </div>
              <div className="secret-message">
                You just need to SMILE 😊
                <br />
                And if you're smiling right now, just keep it up!{" "}
                <span className="smiley" role="img" aria-label="smile">
                  😊
                </span>
              </div>
            </div>
          </div>

          {isOpen && (
            <button
              className="next-button"
              onClick={handleNextClick}
              aria-label="Go to goodbye message"
            >
              Next ➡️
            </button>
          )}
        </>
      ) : (
        <section
          id="goodbye-section"
          className="goodbye-wrapper"
          tabIndex={-1}
          aria-live="polite"
          aria-label="Goodbye message"
        >
          <Confetti />
          <div className="heart" aria-hidden="true">❤️</div>
          <h2 className="goodbye-title">Goodbye, Aprajita!</h2>
          <p className="goodbye-message">
            Okay fir itna hi tha mere paas content.<br />
            Itna hi bor krna tha aapko mujhe, vese abhi kaafi late ho gya hu aapko wish krne ke liye mai<br />
            Once again Happy Birthday Aprajita💖 <br /><br />
            Stay Safe, Happy and Healthy <br /><br />
            You are cherished beyond words! 🎉💖
          </p>
        </section>
      )}
    </div>
  );
}
