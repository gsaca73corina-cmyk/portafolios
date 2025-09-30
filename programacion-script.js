// Proyectos de programación separados por categoría
const projects = [
  // Programas Utilitarios
  {
    name: "Portfolio Web",
    icon: "🌐",
    techStack: "HTML, CSS, JavaScript",
    description: "Portfolio personal con diseño moderno y efectos interactivos. Incluye galería de imágenes, formulario de contacto y navegación fluida.",
    category: "programs",
    demoLink: "#",
    codeLink: "#"
  },
  {
    name: "App de Tareas",
    icon: "📝",
    techStack: "React, Node.js, MongoDB",
    description: "Aplicación web para gestión de tareas con autenticación de usuarios, categorías personalizables y sincronización en tiempo real.",
    category: "programs",
    demoLink: "#",
    codeLink: "#"
  },
  {
    name: "E-commerce",
    icon: "🛒",
    techStack: "Vue.js, Express, MySQL",
    description: "Plataforma de comercio electrónico con carrito de compras, pasarela de pagos y panel de administración completo.",
    category: "programs",
    demoLink: "#",
    codeLink: "#"
  },
  {
    name: "Chat en Tiempo Real",
    icon: "💬",
    techStack: "Socket.io, Node.js, Redis",
    description: "Aplicación de chat con mensajería instantánea, salas privadas, notificaciones push e historial de conversaciones.",
    category: "programs",
    demoLink: "#",
    codeLink: "#"
  },
  {
    name: "API REST",
    icon: "🔌",
    techStack: "Python, FastAPI, PostgreSQL",
    description: "API robusta para gestión de datos con autenticación JWT, documentación automática y rate limiting.",
    category: "programs",
    demoLink: "#",
    codeLink: "#"
  },
  {
    name: "Dashboard Analytics",
    icon: "📊",
    techStack: "D3.js, Python, Flask",
    description: "Panel de control con visualizaciones interactivas, métricas en tiempo real y reportes exportables.",
    category: "programs",
    demoLink: "#",
    codeLink: "#"
  },
  // Juegos
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
  {
    name: "Juego de Plataformas",
    icon: "🎮",
    techStack: "Unity, C#",
    description: "Juego de plataformas 2D con físicas realistas, sistema de puntuación, power-ups y múltiples niveles de dificultad.",
    category: "games",
    demoLink: "#",
    codeLink: "#"
  },
  {
    name: "Puzzle Game",
    icon: "🧩",
    techStack: "JavaScript, Canvas",
    description: "Juego de rompecabezas web con mecánicas innovadoras, sistema de pistas y clasificación online.",
    category: "games",
    demoLink: "#",
    codeLink: "#"
  },
  {
    name: "RPG Adventure",
    icon: "⚔️",
    techStack: "Godot, GDScript",
    description: "Juego de rol con sistema de combate por turnos, inventario, misiones y mundo abierto para explorar.",
    category: "games",
    demoLink: "#",
    codeLink: "#"
  },
  {
    name: "Racing Game",
    icon: "🏎️",
    techStack: "Unreal Engine, Blueprint",
    description: "Juego de carreras 3D con físicas de vehículos realistas, pistas personalizables y modo multijugador.",
    category: "games",
    demoLink: "#",
    codeLink: "#"
  }
];

// Cargar proyectos con filtros
function loadProjects(filter = 'all') {
  const container = document.getElementById('projectsGrid');
  container.innerHTML = '';
  
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  
  filteredProjects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    
    const thumbnailUrl = project.demoLink !== '#' ? 
      `https://image.thum.io/get/width/400/crop/600/${project.demoLink}` : 
      null;
    
    card.innerHTML = `
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
});