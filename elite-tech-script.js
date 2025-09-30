// Script para efectos Elite Tech
document.addEventListener('DOMContentLoaded', function() {
  createEliteTechEffects();
  initializeEliteAnimations();
  addEliteInteractions();
});

function createEliteTechEffects() {
  // Crear líneas tecnológicas de escaneo
  const techLines = document.createElement('div');
  techLines.className = 'tech-lines';
  document.body.appendChild(techLines);
  
  // Crear partículas de energía elite
  createEliteParticles();
  
  // Agregar efectos de holografía
  addHolographicEffects();
}

function createEliteParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  `;
  document.body.appendChild(particleContainer);
  
  // Crear partículas flotantes premium
  for (let i = 0; i < 30; i++) {
    createEliteParticle(particleContainer);
  }
}

function createEliteParticle(container) {
  const particle = document.createElement('div');
  const colors = ['#00ffff', '#ff0080', '#ffd700'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  particle.style.cssText = `
    position: absolute;
    width: ${Math.random() * 4 + 2}px;
    height: ${Math.random() * 4 + 2}px;
    background: ${color};
    border-radius: 50%;
    box-shadow: 0 0 ${Math.random() * 20 + 10}px ${color};
    animation: elite-float-particle ${Math.random() * 15 + 10}s linear infinite;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    opacity: ${Math.random() * 0.7 + 0.3};
  `;
  
  container.appendChild(particle);
  
  // Recrear partícula cuando termine la animación
  particle.addEventListener('animationend', () => {
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = Math.random() * 15 + 10 + 's';
  });
}

// Agregar CSS para animación de partículas elite
const eliteParticleStyle = document.createElement('style');
eliteParticleStyle.textContent = `
  @keyframes elite-float-particle {
    0% {
      transform: translateY(0) rotate(0deg) scale(1);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg) scale(0.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(eliteParticleStyle);

function addHolographicEffects() {
  // Efecto holográfico en elementos principales
  const mainElements = document.querySelectorAll('h1, .hero h2, .category-card, .skill-card');
  
  mainElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      createHolographicGlitch(element);
    });
  });
}

function createHolographicGlitch(element) {
  const glitch = document.createElement('div');
  glitch.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      transparent 30%, 
      rgba(0, 255, 255, 0.1) 35%, 
      rgba(255, 0, 128, 0.1) 40%, 
      transparent 45%);
    pointer-events: none;
    animation: holographic-glitch 0.6s ease-out;
  `;
  
  element.style.position = 'relative';
  element.appendChild(glitch);
  
  setTimeout(() => {
    if (glitch.parentNode) {
      glitch.parentNode.removeChild(glitch);
    }
  }, 600);
}

// Agregar CSS para efecto holográfico
const holographicStyle = document.createElement('style');
holographicStyle.textContent = `
  @keyframes holographic-glitch {
    0% { transform: translateX(-100%) skewX(-10deg); opacity: 0; }
    20% { transform: translateX(0) skewX(0deg); opacity: 0.8; }
    40% { transform: translateX(20px) skewX(5deg); opacity: 0.6; }
    60% { transform: translateX(-10px) skewX(-3deg); opacity: 0.4; }
    80% { transform: translateX(5px) skewX(2deg); opacity: 0.2; }
    100% { transform: translateX(100%) skewX(10deg); opacity: 0; }
  }
`;
document.head.appendChild(holographicStyle);

function initializeEliteAnimations() {
  // Animación de entrada para elementos
  const animatedElements = document.querySelectorAll('.category-card, .skill-card, .contact-item, .gallery-item');
  
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(100px) rotateX(-30deg)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0) rotateX(0deg)';
    }, index * 150);
  });
  
  // Efecto de escritura elite para títulos
  const heroTitles = document.querySelectorAll('.hero h2, .contact-hero h1, .gallery-hero h1');
  heroTitles.forEach(title => {
    eliteTypeWriter(title);
  });
}

function eliteTypeWriter(element) {
  const text = element.textContent;
  element.textContent = '';
  element.style.borderRight = '3px solid #00ffff';
  element.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
  
  let i = 0;
  const typeInterval = setInterval(() => {
    element.textContent += text[i];
    
    // Efecto de interferencia ocasional
    if (Math.random() > 0.95) {
      const originalColor = element.style.color;
      element.style.filter = 'hue-rotate(90deg) brightness(1.5)';
      setTimeout(() => {
        element.style.filter = 'none';
      }, 100);
    }
    
    i++;
    
    if (i >= text.length) {
      clearInterval(typeInterval);
      setTimeout(() => {
        element.style.borderRight = 'none';
      }, 1500);
    }
  }, 120);
}

function addEliteInteractions() {
  // Efecto de energía al hacer clic
  const interactiveElements = document.querySelectorAll('button, .category-card, .skill-card, a');
  
  interactiveElements.forEach(element => {
    element.addEventListener('click', (e) => {
      createEnergyBurst(e);
    });
  });
  
  // Efecto de seguimiento del cursor
  addCursorTrail();
}

function createEnergyBurst(event) {
  const rect = event.target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  for (let i = 0; i < 8; i++) {
    const burst = document.createElement('div');
    const colors = ['#00ffff', '#ff0080', '#ffd700'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    burst.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 6px;
      height: 6px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 20px ${color};
      animation: energy-burst-elite 1s ease-out forwards;
      transform: rotate(${i * 45}deg);
    `;
    
    document.body.appendChild(burst);
    
    setTimeout(() => {
      if (burst.parentNode) {
        document.body.removeChild(burst);
      }
    }, 1000);
  }
}

// Agregar CSS para explosión de energía elite
const energyBurstStyle = document.createElement('style');
energyBurstStyle.textContent = `
  @keyframes energy-burst-elite {
    0% {
      transform: scale(1) translateX(0);
      opacity: 1;
    }
    100% {
      transform: scale(0.5) translateX(100px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(energyBurstStyle);

function addCursorTrail() {
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Crear rastro del cursor ocasionalmente
    if (Math.random() > 0.95) {
      createCursorTrail(mouseX, mouseY);
    }
  });
}

function createCursorTrail(x, y) {
  const trail = document.createElement('div');
  trail.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 4px;
    height: 4px;
    background: #00ffff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    box-shadow: 0 0 10px #00ffff;
    animation: cursor-trail 1s ease-out forwards;
  `;
  
  document.body.appendChild(trail);
  
  setTimeout(() => {
    if (trail.parentNode) {
      document.body.removeChild(trail);
    }
  }, 1000);
}

// Agregar CSS para rastro del cursor
const cursorTrailStyle = document.createElement('style');
cursorTrailStyle.textContent = `
  @keyframes cursor-trail {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(cursorTrailStyle);

// Efecto de interferencia global ocasional
setInterval(() => {
  const elements = document.querySelectorAll('h1, .hero h2, .category-icon, .skill-icon');
  const randomElement = elements[Math.floor(Math.random() * elements.length)];
  
  if (randomElement) {
    randomElement.style.filter = 'hue-rotate(180deg) brightness(1.3) contrast(1.2)';
    setTimeout(() => {
      randomElement.style.filter = 'none';
    }, 150);
  }
}, 5000);

// Redimensionar efectos cuando cambie el tamaño de ventana
window.addEventListener('resize', () => {
  const particleContainer = document.querySelector('div[style*="pointer-events: none"]');
  if (particleContainer) {
    particleContainer.innerHTML = '';
    for (let i = 0; i < 30; i++) {
      createEliteParticle(particleContainer);
    }
  }
});