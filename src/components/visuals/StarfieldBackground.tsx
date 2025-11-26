import React, { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    opacity: number;
}

export const StarfieldBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let stars: Star[] = [];
        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const initStars = () => {
            stars = [];
            const numStars = Math.floor((width * height) / 4000); // Density
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    z: Math.random() * 2, // Depth
                    size: Math.random() * 1.5,
                    opacity: Math.random(),
                });
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw stars
            stars.forEach((star) => {
                // Update opacity for twinkling effect
                star.opacity += (Math.random() - 0.5) * 0.02;
                if (star.opacity > 1) star.opacity = 1;
                if (star.opacity < 0.2) star.opacity = 0.2;

                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.5})`; // Subtle white
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                // Optional: Slight movement for parallax feel (very subtle)
                star.y -= 0.05 * star.z;
                if (star.y < 0) star.y = height;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};
