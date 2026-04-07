import { useEffect, useRef } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

/**
 * UltraEnergyField Component
 * ULTRA MODE EXCLUSIVE
 * Creates an electromagnetic energy field effect with plasma waves
 * Features:
 * - Plasma wave simulation
 * - Electric arcs
 * - Energy pulses
 * - Quantum foam effect
 */
export function UltraEnergyField() {
  const { getColor, theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      getColor('accent1'),
      getColor('accent2'),
      getColor('accent3'),
    ];

    interface EnergyNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      energy: number;
      connections: number[];
      pulsePhase: number;
    }

    const nodes: EnergyNode[] = [];
    const nodeCount = 40;

    // Create energy nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        energy: Math.random(),
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    let animationFrameId: number;

    const drawElectricArc = (x1: number, y1: number, x2: number, y2: number, color: string, segments: number = 10) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);

      for (let i = 1; i < segments; i++) {
        const t = i / segments;
        const x = x1 + dx * t + (Math.random() - 0.5) * distance * 0.1;
        const y = y1 + dy * t + (Math.random() - 0.5) * distance * 0.1;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      time += 0.03;
      
      // Semi-transparent clear for trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${isDark ? 0.1 : 0.05})`;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Update nodes
      nodes.forEach((node, index) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += 0.05;
        node.energy = Math.sin(node.pulsePhase) * 0.5 + 0.5;

        // Bounce off edges
        if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
        if (node.y < 0 || node.y > window.innerHeight) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(window.innerWidth, node.x));
        node.y = Math.max(0, Math.min(window.innerHeight, node.y));

        // Find connections
        node.connections = [];
        for (let j = 0; j < nodes.length; j++) {
          if (j === index) continue;
          const dx = nodes[j].x - node.x;
          const dy = nodes[j].y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 200) {
            node.connections.push(j);
          }
        }
      });

      // Draw energy connections with electric arcs
      nodes.forEach((node, index) => {
        node.connections.forEach((connIndex) => {
          if (connIndex > index) { // Draw each connection once
            const other = nodes[connIndex];
            const color = colors[Math.floor((time * 2 + index) % colors.length)];
            const distance = Math.sqrt(
              Math.pow(other.x - node.x, 2) + Math.pow(other.y - node.y, 2)
            );
            const opacity = Math.floor((1 - distance / 200) * 100 * (node.energy + other.energy) / 2);
            
            if (Math.random() > 0.7) { // Random electric arcs
              drawElectricArc(node.x, node.y, other.x, other.y, `${color}${opacity.toString(16).padStart(2, '0')}`, 8);
            } else {
              // Regular glowing line
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `${color}${opacity.toString(16).padStart(2, '0')}`;
              ctx.lineWidth = 1;
              ctx.shadowBlur = 10;
              ctx.shadowColor = color;
              ctx.stroke();
              ctx.shadowBlur = 0;
            }
          }
        });
      });

      // Draw nodes with pulsing energy
      nodes.forEach((node, index) => {
        const size = 6 + node.energy * 8;
        const color = colors[index % colors.length];

        // Outer glow rings
        for (let ring = 3; ring > 0; ring--) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, size * (1 + ring * 0.4), 0, Math.PI * 2);
          const alpha = Math.floor(((node.energy * 0.3) / ring) * 255);
          ctx.fillStyle = `${color}${alpha.toString(16).padStart(2, '0')}`;
          ctx.shadowBlur = 20;
          ctx.shadowColor = color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Main node
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 30;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // White core
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Energy burst effect
        if (node.energy > 0.9 && Math.random() > 0.95) {
          const burstSize = size * 3;
          ctx.beginPath();
          ctx.arc(node.x, node.y, burstSize, 0, Math.PI * 2);
          ctx.strokeStyle = `${color}80`;
          ctx.lineWidth = 3;
          ctx.shadowBlur = 40;
          ctx.shadowColor = color;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      // Quantum foam effect - random energy particles
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 2 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(Math.random() * 150 + 100).toString(16)}`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, getColor, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 1, 
        mixBlendMode: isDark ? 'screen' : 'multiply',
        opacity: isDark ? 0.7 : 0.5,
      }}
    />
  );
}
