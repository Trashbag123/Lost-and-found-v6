/**
 * Detects device capabilities and maps them to a performance tier.
 * Used to scale visual effects — disable heavy effects on low-end devices.
 */

export type PerformanceLevel = 'ultra' | 'high' | 'medium' | 'low';

// Add FPS monitoring for dynamic performance adjustment
let lastFrameTime = performance.now();
let fps = 60;
let fpsHistory: number[] = [];

export function updateFPS() {
  const now = performance.now();
  const delta = now - lastFrameTime;
  lastFrameTime = now;
  
  const currentFps = 1000 / delta;
  fpsHistory.push(currentFps);
  
  // Keep only last 60 frames
  if (fpsHistory.length > 60) {
    fpsHistory.shift();
  }
  
  // Calculate average FPS
  fps = fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length;
  
  return fps;
}

export function getCurrentFPS(): number {
  return fps;
}

export function detectPerformanceLevel(): PerformanceLevel {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'medium'; // Default for SSR
  }

  // Check for reduced motion preference first
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return 'low';
  }

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2;
  
  // deviceMemory is not in the standard TS lib yet — cast to access it
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;

  // Check if mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check GPU info (if available)
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const hasWebGL = !!gl;
  
  // Check for high-end GPU features
  const glContext = gl as WebGLRenderingContext | null;
  const debugInfo = glContext?.getExtension('WEBGL_debug_renderer_info') ?? null;
  const renderer = debugInfo && glContext
    ? (glContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string)
    : '';
  const hasHighEndGPU = /RTX|AMD Radeon RX|Apple M1|Apple M2|Apple M3|GeForce GTX 1080|Radeon VII/i.test(renderer);
  
  // Performance scoring
  let score = 0;
  
  // CPU cores scoring
  if (cores >= 16)      score += 5;
  else if (cores >= 12) score += 4;
  else if (cores >= 8) score += 3;
  else if (cores >= 4) score += 2;
  else score += 1;
  
  // Memory scoring (if available)
  if (memory) {
    if (memory >= 16) score += 4;
    else if (memory >= 8) score += 3;
    else if (memory >= 4) score += 2;
    else score += 1;
  } else {
    score += 2; // Default middle score if unknown
  }
  
  // WebGL bonus
  if (hasWebGL) score += 1;
  
  // High-end GPU bonus
  if (hasHighEndGPU) score += 3;
  
  // Mobile penalty
  if (isMobile) score -= 2;
  
  // FPS-based adjustment
  if (fps < 30) score -= 2;
  else if (fps < 45) score -= 1;
  else if (fps >= 60) score += 1;
  
  // Determine performance level with ULTRA tier
  if (score >= 12) return 'ultra';
  if (score >= 8) return 'high';
  if (score >= 4) return 'medium';
  return 'low';
}

export function getParticleCount(level: PerformanceLevel): number {
  switch (level) {
    case 'ultra': return 800;
    case 'high': return 200;
    case 'medium': return 80;
    case 'low': return 30;
  }
}

export function getShapeCount(level: PerformanceLevel): number {
  switch (level) {
    case 'ultra': return 40;
    case 'high': return 15;
    case 'medium': return 8;
    case 'low': return 4;
  }
}

export function shouldEnableEffect(effect: string, level: PerformanceLevel): boolean {
  const effectConfig: Record<string, PerformanceLevel[]> = {
    neonEffects: ['ultra', 'high', 'medium'],
    glitchBorder: ['ultra', 'high', 'medium'],
    scanlines: ['ultra', 'high'],
    complexAnimations: ['ultra', 'high', 'medium'],
    heavyBlur: ['ultra', 'high'],
    mouseTrail: ['ultra', 'high', 'medium'],
    parallax3D: ['ultra', 'high', 'medium'],
    chromaticAberration: ['ultra', 'high'],
    liquidMorph: ['ultra', 'high'],
    lightningEffect: ['ultra', 'high', 'medium'],
    auroraEffect: ['ultra', 'high'],
    matrixRain: ['ultra', 'high', 'medium'],
    insaneEffects: ['ultra'],
  };
  
  return effectConfig[effect]?.includes(level) ?? false;
}

// Throttle helper for animations
export function throttleRAF(callback: () => void, fps: number = 60): () => void {
  let lastTime = 0;
  const interval = 1000 / fps;
  
  return () => {
    const now = performance.now();
    const delta = now - lastTime;
    
    if (delta >= interval) {
      lastTime = now - (delta % interval);
      callback();
    }
  };
}