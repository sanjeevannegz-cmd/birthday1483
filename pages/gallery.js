import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const images = [
  '/aprajita1.jpg',
  '/aprajita2.jpg',
  '/aprajita3.jpg',
  '/aprajita4.jpg',
  '/aprajita5.jpg',
  '/aprajita6.jpg'
];

export default function Gallery() {
  const [showRotation, setShowRotation] = useState(false);

  useEffect(() => {
    const entryDuration = 1000;
    const timer = setTimeout(() => {
      setShowRotation(true);
    }, entryDuration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="gallery-wrapper">
      <h1 className="gallery-title">A journey through your smiles 🌈</h1>

      <div className="gallery-content">
        <div className="balloons">
          <div className="balloon red" />
          <div className="balloon blue" />
          <div className="balloon green" />
          <div className="balloon yellow" />
          <div className="balloon purple" />
          <div className="balloon pink" />
          <div className="balloon cyan" />
          <div className="balloon orange" />
          <div className="balloon white" />
          <div className="balloon lime" />
        </div>
        <div className="background-text">🎉 Happy Birthday Aprajita 🎉</div>
        <div className={`carousel entry ${showRotation ? 'show-rotation' : ''}`}>
          <div className="carousel-track">
            {images.map((src, index) => (
              <div key={index} className="carousel-item">
                <img src={src} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="next-button-wrapper">
        <Link href="/wishes">
          <button className="next-button">Next ➡️</button>
        </Link>
      </div>

      <footer className="footer">
        <div className="ahri-dialogue">
          <img src="/ahri.png" alt="Ahri" className="ahri-image" />
          <div className="dialogue">
            Every picture tells a story of your light 💖
          </div>
        </div>
      </footer>
    </div>
  );
}
