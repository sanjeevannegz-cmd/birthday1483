import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const wishes = [
  { lang: 'English', front: 'Happy Birthday!', back: 'You deserve all the love, laughter, and happiness the world can give — today and always! 💖' },
  { lang: 'Hindi', front: 'जन्मदिन मुबारक!', back: 'आपका दिन खुशियों से भरा हो! 🎂' },
  { lang: 'English', front: 'Cheers to you!', back: 'Your smile lights up lives — may it shine brighter this year!💖' },
  { lang: 'Hindi', front: 'बधाई हो!', back: 'मुस्कुराते रहो हमेशा, यही दुआ है हमारी!🎈' },
];

export default function Wishes() {
  const [step, setStep] = useState('cards');
  const bunnyAudioRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const bgAudio = document.getElementById('background-music');
    if (bgAudio) {
      bgAudio.volume = 1;
      bgAudio.play().catch(() => {});
    }
  }, []);

  const handleNextFromCards = () => {
    const bgAudio = document.getElementById('background-music');
    if (bgAudio) {
      bgAudio.volume = 0.1;
    }

    setStep('bunny');

    setTimeout(() => {
      if (bunnyAudioRef.current) {
        bunnyAudioRef.current.currentTime = 0;
        bunnyAudioRef.current.volume = 1;
        bunnyAudioRef.current.play().catch(() => {});
      }
    }, 100);
  };

  const handleBunnyEnded = () => {
    const bgAudio = document.getElementById('background-music');
    if (bgAudio) {
      bgAudio.volume = 1;
    }
  };

  const handleNextFromBunny = () => {
    if (bunnyAudioRef.current) {
      bunnyAudioRef.current.pause();
      bunnyAudioRef.current.currentTime = 0;
    }
    router.push('/flower'); // Navigate to flower guessing page
  };

  return (
    <div className="container">
      <audio ref={bunnyAudioRef} src="/happy-birthday-song.mp3" onEnded={handleBunnyEnded} />

      {step === 'cards' && (
        <>
          <h1 className="title">Birthday Wishes for Aprajita 🎉</h1>
          <div className="rope-line" />
          <div className="cards-container">
            {wishes.map((wish, idx) => (
              <div key={idx} className="hanging-card">
                <div className="string" />
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">{wish.lang} 🎂</div>
                    <div className="flip-card-back">{wish.back}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="next-btn" onClick={handleNextFromCards}>
            Next ➡️
          </button>
        </>
      )}

      {step === 'bunny' && (
        <>
          <h1 className="title">Bunny Mascot 🎵</h1>
          <div className="bunny-container">
            <img src="/bunny.jpeg" alt="Bunny Mascot" className="bunny-image" />
            <p>Singing birthday song 🎶</p>
          </div>
          <button className="next-btn" onClick={handleNextFromBunny}>
            Next ➡️
          </button>
        </>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 40px 20px;
          text-align: center;
          background: linear-gradient(to bottom right, #e0f7ff, #ffffff);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #004466;
        }
        .title {
          font-size: 2.5rem;
          margin-bottom: 30px;
          font-weight: 700;
        }
        .rope-line {
          width: 100%;
          height: 4px;
          background: #996633;
          position: relative;
          margin-bottom: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .cards-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
          margin-bottom: 40px;
          max-width: 1000px;
        }
        .hanging-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: sway 3s ease-in-out infinite alternate;
        }
        .string {
          width: 2px;
          height: 40px;
          background: #444;
          margin-bottom: -10px;
        }
        @keyframes sway {
          0% { transform: rotate(-2deg); }
          100% { transform: rotate(2deg); }
        }
        .flip-card {
          background-color: transparent;
          width: 180px;
          height: 180px;
          perspective: 1000px;
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner,
        .flip-card:focus-within .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 119, 204, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 15px;
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
        }
        .flip-card-front {
          background: linear-gradient(135deg, #0077cc, #004466);
        }
        .flip-card-back {
          background: linear-gradient(135deg, #ff4081, #d5005f);
          transform: rotateY(180deg);
        }
        .next-btn {
          background-color: #0077cc;
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 30px;
          font-size: 1.2rem;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 119, 204, 0.3);
          transition: background-color 0.3s ease;
        }
        .next-btn:hover {
          background-color: #004466;
        }
        .bunny-container {
          user-select: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        .bunny-image {
          width: 180px;
          max-width: 80vw;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        .bunny-image:hover {
          transform: scale(1.05);
        }
        p {
          font-size: 1.1rem;
          color: #004466;
          margin: 0;
          user-select: none;
        }
        @media (max-width: 600px) {
          .flip-card {
            width: 140px;
            height: 140px;
          }
          .flip-card-front,
          .flip-card-back {
            font-size: 1rem;
            padding: 10px;
          }
          .title {
            font-size: 1.8rem;
          }
          .next-btn {
            font-size: 1rem;
            padding: 10px 25px;
          }
          .bunny-image {
            width: 140px;
          }
          .string {
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
}
