// Categorías con vista previa real y enlaces
let categories = [
  { 
    name: 'Fotografías', 
    icon: '📷', 
    description: 'Capturas únicas de momentos especiales',
    link: 'galeria.html?filter=photography',
    previewImages: ['images/fotografias/imagen1.jpg', 'images/fotografias/imagen2.jpg']
  },
  { 
    name: 'Videos', 
    icon: '🎬', 
    description: 'Contenido audiovisual creativo',
    link: 'galeria.html?filter=videos',
    previewImages: ['images/videos/video1.mp4', 'images/videos/video2.mp4']
  },
  { 
    name: 'Dibujos', 
    icon: '🎨', 
    description: 'Arte digital y tradicional',
    link: 'galeria.html?filter=art',
    previewImages: ['images/dibujos/dibujo (1).jpg', 'images/dibujos/dibujo (2).jpg']
  },
  { 
    name: 'Programación', 
    icon: '💻', 
    description: 'Proyectos de desarrollo software',
    link: 'programacion.html',
    previewImages: [],
    previewItems: ['🌐 Portfolio Web', '📊 Dashboard']
  },
  { 
    name: 'Juegos', 
    icon: '🎮', 
    description: 'Experiencias interactivas y divertidas',
    link: 'programacion.html?filter=games',
    previewImages: [],
    previewItems: ['🐕 Juego de Perros', '🔮 Predicción del Futuro'],
    isNew: true
  }
];

// Cargar categorías con vista previa
function loadCategories() {
  const container = document.getElementById('categoriesContainer');
  container.innerHTML = '';
  
  categories.forEach((cat, index) => {
    const card = document.createElement('div');
    card.className = cat.isNew ? 'category-card new-item' : 'category-card';
    card.onclick = () => window.location.href = cat.link;
    
    const previewHTML = createImagePreview(cat.previewImages, index, cat.previewItems);
    
    card.innerHTML = `
      <div class="category-content">
        ${cat.isNew ? '<div class="new-badge">NUEVO</div>' : ''}
        <div class="category-icon">${cat.icon}</div>
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
        ${previewHTML}
      </div>
    `;
    container.appendChild(card);
    
    // Agregar sonidos si el audio está inicializado
    if (audioContext) {
      card.addEventListener('mouseenter', playHoverSound);
      card.addEventListener('click', playClickSound);
    }
  });
}

// Crear vista previa con imágenes reales o elementos de texto
function createImagePreview(images, categoryIndex, previewItems) {
  // Si hay elementos de texto, usarlos en lugar de imágenes
  if (previewItems && previewItems.length > 0) {
    let previewHTML = previewItems.slice(0, 2).map((item, i) => {
      return `
        <div class="preview-item text-preview" style="animation-delay: ${i * 0.2}s;">
          <div class="preview-text">${item}</div>
        </div>
      `;
    }).join('');
    
    return `
      <div class="preview-carousel">
        <div class="preview-grid">
          ${previewHTML}
        </div>
      </div>
    `;
  }
  
  // Si hay imágenes, usarlas
  if (images && images.length > 0) {
    let previewHTML = images.slice(0, 2).map((imageSrc, i) => {
    if (imageSrc.endsWith('.mp4')) {
      return `
        <div class="preview-item video-preview" style="animation-delay: ${i * 0.2}s;">
          <video muted preload="metadata" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
            <source src="${imageSrc}" type="video/mp4">
          </video>
          <div class="play-overlay">▶</div>
        </div>
      `;
    } else {
      return `
        <div class="preview-item" style="animation-delay: ${i * 0.2}s;">
          <img src="${imageSrc}" alt="Preview ${i+1}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
        </div>
      `;
    }
  }).join('');
  
  return `
    <div class="preview-carousel">
      <div class="preview-grid">
        ${previewHTML}
      </div>
    </div>
  `;
  }
  
  // Caso por defecto
  return `
    <div class="preview-carousel">
      <div class="no-preview">
        <span>Próximamente</span>
      </div>
    </div>
  `;
}

// Función para cerrar el banner
function closeBanner() {
  const banner = document.querySelector('.announcement-banner');
  banner.style.animation = 'slideUp 0.3s ease';
  setTimeout(() => {
    banner.classList.add('hidden');
  }, 300);
}

// Animación para cerrar el banner
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Mensajes dinámicos
const dynamicMessages = [
  '💡 Creando experiencias digitales únicas...',
  '🎆 Transformando ideas en realidad...',
  '🚀 Innovando con cada proyecto...',
  '🎨 Diseñando el futuro digital...',
  '✨ Donde la creatividad cobra vida...',
  '🔥 Desarrollando soluciones creativas...'
];

let messageIndex = 0;

// Cambiar mensaje dinámico
function changeDynamicMessage() {
  const messageElement = document.getElementById('dynamicText');
  if (messageElement) {
    messageElement.style.opacity = '0';
    setTimeout(() => {
      messageElement.textContent = dynamicMessages[messageIndex];
      messageElement.style.opacity = '1';
      messageIndex = (messageIndex + 1) % dynamicMessages.length;
    }, 300);
  }
}

// Animar contadores
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 50;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 40);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Observer para animar cuando sea visible
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Sistema de sonidos elegantes
let audioContext;

// Inicializar contexto de audio
function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Sonido de click elegante
function playClickSound() {
  if (!audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}

// Sonido de hover elegante
function playHoverSound() {
  if (!audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.05);
}

// Agregar eventos de sonido a elementos
function addSoundEvents() {
  // Sonidos para navegación
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('mouseenter', playHoverSound);
    link.addEventListener('click', playClickSound);
  });
  
  // Sonidos para botones CTA
  document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', playHoverSound);
    btn.addEventListener('click', playClickSound);
  });
  
  // Sonidos para tarjetas de categorías
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', playHoverSound);
    card.addEventListener('click', playClickSound);
  });
  
  // Sonidos para proyectos destacados
  document.querySelectorAll('.featured-card').forEach(card => {
    card.addEventListener('mouseenter', playHoverSound);
    card.addEventListener('click', playClickSound);
  });
  
  // Sonido para cerrar banner
  const closeBanner = document.querySelector('.close-banner');
  if (closeBanner) {
    closeBanner.addEventListener('mouseenter', playHoverSound);
    closeBanner.addEventListener('click', playClickSound);
  }
}

// Cargar categorías al iniciar
document.addEventListener('DOMContentLoaded', function() {
  loadCategories();
  
  // Iniciar mensajes dinámicos
  setInterval(changeDynamicMessage, 4000);
  
  // Observar sección de estadísticas
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
  
  // Agregar transición suave al texto dinámico
  const messageText = document.getElementById('dynamicText');
  if (messageText) {
    messageText.style.transition = 'opacity 0.3s ease';
  }
  
  // Inicializar sonidos con interacción del usuario
  document.addEventListener('click', function initSounds() {
    initAudio();
    addSoundEvents();
    document.removeEventListener('click', initSounds);
  }, { once: true });
});