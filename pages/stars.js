import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import * as THREE from 'three';

const StarryText = ({ text }) => {
  return <h1 className="starry-text">{text}</h1>;
};

const createMoonTexture = () => {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#b0b0b0';
  ctx.fillRect(0, 0, size, size);
  
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = Math.random() * 50 + 5;
    const darkness = Math.random() * 0.3 + 0.1;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 0, 0, ${darkness})`;
    ctx.fill();
  }

  for (let i = 0; i < 15; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = Math.random() * 100 + 30;
    const darkness = Math.random() * 0.2 + 0.2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 0, 0, ${darkness})`;
    ctx.fill();
  }
  
  return new THREE.CanvasTexture(canvas);
};

export default function Stars() {
  const canvasRef = useRef(null);
  const moonContainerRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Star {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.alpha = 0;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005; 
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
        ctx.closePath();
      }

      twinkle() {
        this.alpha += this.twinkleSpeed * this.twinkleDirection;
        if (this.alpha <= 0 || this.alpha >= 1) {
          this.twinkleDirection *= -1;
        }
      }
    }

    const backgroundStars = [];
    const numBackgroundStars = 500;
    for (let i = 0; i < numBackgroundStars; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.5 + 0.5;
      const color = '255, 255, 255';
      backgroundStars.push(new Star(x, y, radius, color));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      backgroundStars.forEach(star => {
        const speed = star.radius * 2;
        star.x -= speed;  
        if (star.x < 0) {
          star.x = canvas.width;
        }
        star.twinkle();
        star.draw();
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !moonContainerRef.current) return;

    const container = moonContainerRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const moonTexture = createMoonTexture();
    const isMobile = window.innerWidth <= 768;
    const moonGeometry = new THREE.SphereGeometry(isMobile ? 0.9 : 2.5, 64, 64); // 🔧 Changed here
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(0, 0, -5);
    scene.add(moon);

    const animate = () => {
      requestAnimationFrame(animate);
      if (moon) {
        moon.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #0d1117;
          color: #ffffff;
          font-family: 'Arial', sans-serif;
          height: 100vh;
        }

        .starry-sky-page {
          position: relative;
          width: 100vw;
          height: 100vh;
        }

        .starry-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .moon-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
        }

        .ahri-dialogue {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 20px;
          z-index: 3;
          width: 80%;
          max-width: 600px;
          color: #ffffff;
        }

        .ahri-dialogue.top {
          top: 10%;
          flex-direction: column;
          text-align: center;
        }

        .ahri-dialogue.bottom {
          bottom: 10%;
          flex-direction: column;
          text-align: center;
        }

        .ahri-image {
          width: 150px;
          height: auto;
          filter: drop-shadow(0 0 10px #ff66aa);
        }

        .dialogue {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px 25px;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          font-size: 1.2rem;
          line-height: 1.6;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          animation: fadeIn 2s ease-in-out;
        }

        .next-btn {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 1rem;
          font-weight: bold;
          border: none;
          border-radius: 20px;
          background-color: #ff66aa;
          color: #ffffff;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .next-btn:hover {
          background-color: #e05c93;
        }
        
        .starry-text {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: clamp(2rem, 10vw, 5rem);
            font-weight: bold;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #f66, 0 0 40px #f66;
            animation: textGlow 1.5s ease-in-out infinite alternate;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes textGlow {
            from { text-shadow: 0 0 10px #fff, 0 0 20px #fff; }
            to { text-shadow: 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #f66, 0 0 50px #f66; }
        }
      `}</style>
      <div className="starry-sky starry-sky-page">
        <canvas ref={canvasRef} className="starry-canvas"></canvas>
        <div ref={moonContainerRef} className="moon-container"></div>
        <StarryText text="HAPPY BIRTHDAY APRAJITA" />
        <div className="ahri-dialogue top">
          <img src="/ahri.png" alt="Ahri" className="ahri-image" />
          <div className="dialogue">
            May your birthday be as peaceful as moonlight and your year ahead full of shining moments.
          </div>
        </div>
        <div className="ahri-dialogue bottom">
          <div className="dialogue"></div>
          <Link href="/gallery">
            <button className="next-btn">Next ➡️</button>
          </Link>
        </div>
      </div>
    </>
  );
}
