import '../styles/index.css';
import '../styles/gallery.css';
import '../styles/flower.css'; // ✅ Add it here
import '../styles/bye.css';
import '../styles/stars.css';

import { useEffect, useRef } from 'react';

export default function App({ Component, pageProps }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.06;

      const playAudio = () => {
        audio.play().catch(() => {
          console.log("Autoplay blocked. Waiting for user interaction.");
        });
      };

      playAudio();

      const onUserGesture = () => {
        playAudio();
        document.removeEventListener('click', onUserGesture);
        document.removeEventListener('keydown', onUserGesture);
      };

      document.addEventListener('click', onUserGesture);
      document.addEventListener('keydown', onUserGesture);
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/background-music.mp3" loop autoPlay />
      <Component {...pageProps} />
    </>
  );
}
