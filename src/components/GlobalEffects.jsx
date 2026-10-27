import React, { useEffect, useRef } from 'react';

export const GlobalEffects = ({ isLockdown = false, isFinalReveal = false }) => {
  const canvasRef = useRef(null);

  // Floating embers / dust particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = isFinalReveal ? 80 : 35;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (isFinalReveal ? 3.5 : 2) + 0.5,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: -Math.random() * (isFinalReveal ? 2.2 : 1.0) - 0.2,
      opacity: Math.random() * 0.7 + 0.2,
      color: isFinalReveal 
        ? (Math.random() > 0.4 ? '#fbbf24' : '#f59e0b') // Golden sparks
        : (isLockdown ? '#ef4444' : '#737373') // Red or ash embers
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = isFinalReveal ? 10 : 4;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLockdown, isFinalReveal]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* CRT Scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px]" 
      />

      {/* Cinematic Vignette */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)]" 
      />

      {/* Film Grain Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Emergency Lockdown Red Strobe Lighting */}
      {isLockdown && (
        <div className="absolute inset-0 bg-red-600/15 animate-[pulse_0.7s_infinite] mix-blend-color-dodge pointer-events-none" />
      )}
    </div>
  );
};
