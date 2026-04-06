import { useEffect, useRef } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

export function UltraBackground() {
  const { performanceLevel } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (performanceLevel !== 'ultra') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Ultra mode colors - COMPLETELY DIFFERENT
    const ultraColors = {
      bg: '#050008',
      blackHole: '#000000',
      electricBlue: '#00ffff',
      electricPurple: '#ff00ff',
      electricYellow: '#ffff00',
      glow: '#0066ff'
    };

    // Black hole position
    const centerX = () => canvas.width / 2;
    const centerY = () => canvas.height / 2;

    // Lightning bolts
    class LightningBolt {
      x: number;
      y: number;
      endX: number;
      endY: number;
      life: number;
      color: string;
      branches: Array<{ x: number; y: number }>;

      constructor() {
        const angle = Math.random() * Math.PI * 2;
        const distance = 120 + Math.random() * 50;
        this.x = centerX() + Math.cos(angle) * distance;
        this.y = centerY() + Math.sin(angle) * distance;
        
        const length = 200 + Math.random() * 300;
        this.endX = this.x + Math.cos(angle) * length;
        this.endY = this.y + Math.sin(angle) * length;
        
        this.life = 1;
        this.color = [ultraColors.electricBlue, ultraColors.electricPurple, ultraColors.electricYellow][Math.floor(Math.random() * 3)];
        
        // Create branches
        this.branches = [];
        const numBranches = 8 + Math.floor(Math.random() * 12);
        for (let i = 0; i < numBranches; i++) {
          const t = i / numBranches;
          const branchX = this.x + (this.endX - this.x) * t;
          const branchY = this.y + (this.endY - this.y) * t;
          this.branches.push({
            x: branchX + (Math.random() - 0.5) * 100,
            y: branchY + (Math.random() - 0.5) * 100
          });
        }
      }

      update() {
        this.life -= 0.05;
      }

      draw() {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life;
        
        // Main bolt
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 30;
        ctx.shadowColor = this.color;
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        this.branches.forEach(branch => {
          ctx.lineTo(branch.x, branch.y);
        });
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();

        // Glow
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 50;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        this.branches.forEach(branch => {
          ctx.lineTo(branch.x, branch.y);
        });
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();

        ctx.restore();
      }
    }

    const lightningBolts: LightningBolt[] = [];

    // Orbiting particles
    class Particle {
      angle: number;
      distance: number;
      speed: number;
      size: number;
      color: string;

      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = 150 + Math.random() * 250;
        this.speed = 0.01 + Math.random() * 0.02;
        this.size = 2 + Math.random() * 2;
        this.color = [ultraColors.electricBlue, ultraColors.electricPurple, ultraColors.electricYellow][Math.floor(Math.random() * 3)];
      }

      update() {
        this.angle += this.speed;
        this.distance -= 0.2;
        
        if (this.distance < 120) {
          this.distance = 150 + Math.random() * 250;
          this.angle = Math.random() * Math.PI * 2;
        }
      }

      draw() {
        const x = centerX() + Math.cos(this.angle) * this.distance;
        const y = centerY() + Math.sin(this.angle) * this.distance;

        ctx.save();
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }

    // Electric arcs around black hole
    class ElectricArc {
      angle: number;
      radius: number;
      arcLength: number;
      color: string;
      phase: number;

      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = 100 + Math.random() * 80;
        this.arcLength = 0.3 + Math.random() * 0.5;
        this.color = [ultraColors.electricBlue, ultraColors.electricPurple][Math.floor(Math.random() * 2)];
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.phase += 0.05;
        this.angle += 0.01;
      }

      draw() {
        const intensity = 0.5 + Math.sin(this.phase) * 0.5;
        
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = intensity;
        ctx.shadowBlur = 25;
        ctx.shadowColor = this.color;

        ctx.beginPath();
        ctx.arc(centerX(), centerY(), this.radius, this.angle, this.angle + this.arcLength);
        ctx.stroke();
        ctx.restore();
      }
    }

    const electricArcs: ElectricArc[] = [];
    for (let i = 0; i < 10; i++) {
      electricArcs.push(new ElectricArc());
    }

    function animate() {
      time += 0.016;

      // Clear with fade
      ctx.fillStyle = 'rgba(5, 0, 8, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw event horizon glow
      const gradient = ctx.createRadialGradient(
        centerX(), centerY(), 0,
        centerX(), centerY(), 300
      );
      gradient.addColorStop(0, 'rgba(0, 102, 255, 0.3)');
      gradient.addColorStop(0.4, 'rgba(0, 102, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gravitational rings
      for (let i = 0; i < 3; i++) {
        const radius = 130 + i * 60;
        const pulse = Math.sin(time * 2 + i) * 0.3 + 0.4;
        
        ctx.save();
        ctx.strokeStyle = ultraColors.glow;
        ctx.lineWidth = 2;
        ctx.globalAlpha = pulse * 0.3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = ultraColors.glow;
        ctx.beginPath();
        ctx.arc(centerX(), centerY(), radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Update and draw electric arcs
      electricArcs.forEach(arc => {
        arc.update();
        arc.draw();
      });

      // Draw black hole
      const blackHoleGradient = ctx.createRadialGradient(
        centerX(), centerY(), 0,
        centerX(), centerY(), 120
      );
      blackHoleGradient.addColorStop(0, '#000000');
      blackHoleGradient.addColorStop(0.7, '#000000');
      blackHoleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = blackHoleGradient;
      ctx.beginPath();
      ctx.arc(centerX(), centerY(), 120, 0, Math.PI * 2);
      ctx.fill();

      // Core glow
      ctx.save();
      ctx.fillStyle = ultraColors.glow;
      ctx.shadowBlur = 60;
      ctx.shadowColor = ultraColors.glow;
      ctx.globalAlpha = 0.5 + Math.sin(time * 3) * 0.2;
      ctx.beginPath();
      ctx.arc(centerX(), centerY(), 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Generate lightning
      if (Math.random() < 0.08 && lightningBolts.length < 5) {
        lightningBolts.push(new LightningBolt());
      }

      // Update and draw lightning
      lightningBolts.forEach((bolt, index) => {
        bolt.update();
        bolt.draw();
        if (bolt.life <= 0) {
          lightningBolts.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [performanceLevel]);

  if (performanceLevel !== 'ultra') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        background: '#050008'
      }}
    />
  );
}
