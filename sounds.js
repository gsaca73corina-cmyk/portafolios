// Sistema de sonidos global para todo el portfolio
class SoundSystem {
  constructor() {
    this.audioContext = null;
    this.isInitialized = false;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.isInitialized = true;
    }
  }

  playClickSound() {
    if (!this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(110, this.audioContext.currentTime + 0.2);
    oscillator.type = 'triangle';
    
    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.2);
  }

  playHoverSound() {
    if (!this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
    oscillator.type = 'triangle';
    
    gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.15);
  }

  addSoundsToAllElements() {
    // Todos los botones
    document.querySelectorAll('button, .btn, .cta-btn, .filter-btn, .project-link, .load-more-btn, .submit-btn, .modal-buttons button').forEach(btn => {
      btn.addEventListener('mouseenter', () => this.playHoverSound());
      btn.addEventListener('click', () => this.playClickSound());
    });

    // Todos los enlaces
    document.querySelectorAll('a, nav a').forEach(link => {
      link.addEventListener('mouseenter', () => this.playHoverSound());
      link.addEventListener('click', () => this.playClickSound());
    });

    // Todas las tarjetas interactivas
    document.querySelectorAll('.category-card, .project-card, .featured-card, .gallery-item, .skill-card, .contact-item, .timeline-content').forEach(card => {
      card.addEventListener('mouseenter', () => this.playHoverSound());
      card.addEventListener('click', () => this.playClickSound());
    });

    // Elementos de formulario
    document.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('focus', () => this.playHoverSound());
    });

    // Elementos especiales
    document.querySelectorAll('.close-banner, .close-btn, .close-video-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => this.playHoverSound());
      btn.addEventListener('click', () => this.playClickSound());
    });
  }
}

// Crear instancia global
const soundSystem = new SoundSystem();

// Inicializar automáticamente cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar sonidos con la primera interacción del usuario
  function initSounds() {
    soundSystem.init();
    soundSystem.addSoundsToAllElements();
    
    // Remover el listener después de la primera inicialización
    document.removeEventListener('click', initSounds);
    document.removeEventListener('keydown', initSounds);
    document.removeEventListener('touchstart', initSounds);
  }

  // Múltiples formas de activar los sonidos
  document.addEventListener('click', initSounds, { once: true });
  document.addEventListener('keydown', initSounds, { once: true });
  document.addEventListener('touchstart', initSounds, { once: true });

  // Re-aplicar sonidos cuando se carga contenido dinámico
  const observer = new MutationObserver(() => {
    if (soundSystem.isInitialized) {
      soundSystem.addSoundsToAllElements();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});