// Proyectos de programación separados por categoría
const projects = [
  // Programas Utilitarios
{
  name: "App de Tareas",
  icon: "📝",
  techStack: "React, Node.js, MongoDB",
  description: "Aplicación web para gestión de tareas con autenticación de usuarios, categorías personalizables y sincronización en tiempo real.",
  category: "programs",
  demoLink: "https://gsaca73corina-cmyk.github.io/gestor_tareas/main",
  codeLink: "#"
},

 {
  name: "E-commerce",
  icon: "🛒",
  techStack: "Vue.js, Express, MySQL",
  description: "Plataforma de comercio electrónico con carrito de compras, pasarela de pagos y panel de administración completo.",
  category: "programs",
  demoLink: "https://gsaca73corina-cmyk.github.io/carrito_compras/carrito",
  codeLink: "#"
},

  {
  name: "Chat en Tiempo Real",
  icon: "💬",
  techStack: "Socket.io, Node.js, Redis",
  description: "Aplicación de chat con mensajería instantánea, salas privadas, notificaciones push e historial de conversaciones.",
  category: "programs",
  demoLink: "https://gsaca73corina-cmyk.github.io/chat/chat",
  codeLink: "#"
},

  {
  name: "API REST",
  icon: "🔌",
  techStack: "Python, FastAPI, PostgreSQL",
  description: "API robusta para gestión de datos con autenticación JWT, documentación automática y rate limiting.",
  category: "programs",
  demoLink: "https://gsaca73corina-cmyk.github.io/api/api",
  codeLink: "#"
},

  {
  name: "Dashboard Analytics",
  icon: "📊",
  techStack: "D3.js, Python, Flask",
  description: "Panel de control con visualizaciones interactivas, métricas en tiempo real y reportes exportables.",
  category: "programs",
  demoLink: "https://gsaca73corina-cmyk.github.io/finanzas/finanzas",
  codeLink: "#"
},

  // Juegos
  {
  name: "Neon Sphere",
  icon: "🔵",
  techStack: "HTML5, CSS3, JavaScript",
  description: "Juego de carreras en túneles 3D con controles intuitivos y música envolvente. Desarrollado con Three.js para una experiencia visual dinámica.",
  category: "games",
  demoLink: "https://gsaca73corina-cmyk.github.io/tunel_rush/juego",
  codeLink: "https://github.com/gsaca73corina-cmyk/tunel_rush",
  isNew: true
  },

    {
    name: "Carrera de Autos",
    icon: "🏎️",
    techStack: "HTML5, CSS3, JavaScript",
    description: "Juego de carreras en 3D con perspectiva dinámica y controles fluidos. Desarrollado con Three.js para ofrecer una experiencia visual inmersiva y velocidad realista.",
    category: "games",
    demoLink: "https://gsaca73corina-cmyk.github.io/carros/inicio.html",
    codeLink: "https://github.com/gsaca73corina-cmyk/carros",
    isNew: true
  },

  {
    name: "Juego de Perros",
    icon: "🐕",
    techStack: "HTML5, CSS3, JavaScript",
    description: "Juego interactivo con temática canina. Experiencia divertida y entretenida con mecánicas únicas, efectos visuales atractivos y sonidos inmersivos.",
    category: "games",
    demoLink: "https://gsaca73corina-cmyk.github.io/perros/",
    codeLink: "https://github.com/gsaca73corina-cmyk/perros",
    isNew: true
  },
  {
    name: "Predicción del Futuro",
    icon: "🔮",
    techStack: "HTML5, CSS3, JavaScript",
    description: "Aplicación web interactiva de predicciones y adivinación. Interfaz atractiva con animaciones y efectos visuales para una experiencia mística y divertida.",
    category: "games",
    demoLink: "https://gsaca73corina-cmyk.github.io/pagina_prediccion/",
    codeLink: "https://github.com/gsaca73corina-cmyk/pagina_prediccion"
  },
  {
    name: "Zuno",
    icon: "🎲",
    techStack: "HTML5, CSS3, JavaScript",
    description: "Juego web interactivo con mecánicas únicas y diseño colorido. Experiencia de juego fluida y entretenida desarrollada completamente en tecnologías web.",
    category: "games",
    demoLink: "https://gsaca73corina-cmyk.github.io/Zuno/main",
    codeLink: "https://github.com/gsaca73corina-cmyk/Zuno"
  },

];

// Cargar proyectos con filtros
function loadProjects(filter = 'all') {
  const container = document.getElementById('projectsGrid');
  container.innerHTML = '';
  
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  
  filteredProjects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = project.isNew ? 'project-card new-item' : 'project-card';
    card.setAttribute('data-category', project.category);
    
    const thumbnailUrl = project.demoLink !== '#' ? 
      `https://image.thum.io/get/width/400/crop/600/${project.demoLink}` : 
      null;
    
    card.innerHTML = `
      ${project.isNew ? '<div class="new-badge">NUEVO</div>' : ''}
      ${thumbnailUrl ? `<div class="project-thumbnail">
        <img src="${thumbnailUrl}" alt="${project.name} preview" onerror="this.style.display='none'">
      </div>` : ''}
      <div class="project-header">
        <div class="project-icon">${project.icon}</div>
        <div class="project-info">
          <h3>${project.name}</h3>
          <div class="tech-stack">${project.techStack}</div>
        </div>
      </div>
      <div class="project-description">
        ${project.description}
      </div>
      <div class="project-links">
        <a href="${project.demoLink}" class="project-link" target="_blank">Ver Demo</a>
        <a href="${project.codeLink}" class="project-link" target="_blank">Ver Código</a>
      </div>
    `;
    
    // Animación de entrada
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    container.appendChild(card);
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      
      // Agregar sonidos si el audio está inicializado
      if (audioContext) {
        card.addEventListener('mouseenter', playHoverSound);
        const links = card.querySelectorAll('.project-link');
        links.forEach(link => {
          link.addEventListener('click', playClickSound);
        });
      }
    }, index * 150);
  });
}

// Función para filtrar proyectos
function filterProjects(filter) {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const category = card.getAttribute('data-category');
    
    if (filter === 'all' || category === filter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Sistema de sonidos elegantes
let audioContext;

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

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

// Cargar proyectos al iniciar
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Agregar funcionalidad a los filtros
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      filterProjects(filter);
    });
  });
  
  loadProjects();
  
  // Agregar sonidos a filtros
  filterBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (audioContext) playHoverSound();
    });
    btn.addEventListener('click', () => {
      if (audioContext) playClickSound();
    });
  });
  
  // Inicializar sonidos con primera interacción
  document.addEventListener('click', function initSounds() {
    initAudio();
    document.removeEventListener('click', initSounds);
  }, { once: true });
});