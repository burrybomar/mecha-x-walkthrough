import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const MinimalistCandleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        // Candle class for artistic rendering
        class Candle {
            x: number;
            y: number;
            width: number;
            height: number;
            wickHeight: number;
            speed: number;
            opacity: number;
            color: string;
            isBullish: boolean;
            phase: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.width = Math.random() * 4 + 2; // Very thin, minimalist
                this.height = Math.random() * 60 + 20;
                this.wickHeight = Math.random() * 40 + 10;
                this.speed = Math.random() * 0.2 + 0.05;
                this.opacity = Math.random() * 0.15 + 0.05; // Very subtle
                this.isBullish = Math.random() > 0.5;
                // Glacier Blue (bullish) or Light Grey (bearish)
                this.color = this.isBullish ? '120, 180, 220' : '180, 180, 180';
                this.phase = Math.random() * Math.PI * 2;
            }

            update() {
                this.y -= this.speed;
                this.phase += 0.01;

                // Reset if off screen
                if (this.y + this.height + this.wickHeight < -100) {
                    this.y = height + 100;
                    this.x = Math.random() * width;
                }

                // Gentle pulsing
                this.opacity = 0.1 + Math.sin(this.phase) * 0.05;
            }

            draw() {
                if (!ctx) return;

                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.strokeStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.lineWidth = 1;

                // Wick
                ctx.beginPath();
                ctx.moveTo(this.x + this.width / 2, this.y - this.wickHeight);
                ctx.lineTo(this.x + this.width / 2, this.y + this.height + this.wickHeight);
                ctx.stroke();

                // Body
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }

        const candles: Candle[] = Array.from({ length: 50 }, () => new Candle());

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Subtle gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#f0f4f8'); // Very light grey/blue top
            gradient.addColorStop(1, '#e0e6ed'); // Slightly darker bottom
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            candles.forEach(candle => {
                candle.update();
                candle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)' }}
        />
    );
};
