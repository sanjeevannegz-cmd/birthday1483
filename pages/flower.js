import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Flower() {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleNext = () => {
    router.push('/bye');
  };

  return (
    <div className="flower-container">
      <div className="flower-heading-wrapper">
        <h1 className="flower-heading">Guess the Flower 🌸</h1>
      </div>

      <div className="flower-image-wrapper">
        <img src="/flower.jpeg" alt="Guess the Flower" className="flower-image" />
      </div>

      {!submitted && (
        <form className="flower-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your guess here"
            className="flower-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <button type="submit" className="flower-button">
            Submit
          </button>
        </form>
      )}

      {submitted && (
        <>
          <div className="flower-answer">
            Answer is: <strong>You 💖</strong>
          </div>

          <div className="screenshot-wrapper">
            <img src="/screenshot.png" alt="Screenshot" className="screenshot" />
          </div>

          <button onClick={handleNext} className="next-button">
            Next ➡️
          </button>
        </>
      )}
    </div>
  );
}
