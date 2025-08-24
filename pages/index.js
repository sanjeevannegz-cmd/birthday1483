import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <img src="/ahri.png" alt="Ahri" className="ahri" />
      <h1 className="title">Happy Birthday Aprajita! 🎉</h1>
      <p className="message">
        You light up every room you walk into ✨<br />
        Let this day be as amazing as your smile!
      </p>

      <Link href="/stars">
        <button className="next-btn">Next ➡️</button>
      </Link>
    </div>
  );
}
