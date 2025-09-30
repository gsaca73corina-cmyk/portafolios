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
    previewImages: []
  },
  { 
    name: 'Juegos', 
    icon: '🎮', 
    description: 'Experiencias interactivas y divertidas',
    link: 'programacion.html',
    previewImages: []
  }
];

// Cargar categorías con vista previa
function loadCategories() {
  const container = document.getElementById('categoriesContainer');
  container.innerHTML = '';
  
  categories.forEach((cat, index) => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.onclick = () => window.location.href = cat.link;
    
    const previewHTML = createImagePreview(cat.previewImages, index);
    
    card.innerHTML = `
      <div class="category-content">
        <div class="category-icon">${cat.icon}</div>
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
        ${previewHTML}
      </div>
    `;
    container.appendChild(card);
  });
}

// Crear vista previa con imágenes reales
function createImagePreview(images, categoryIndex) {
  if (!images || images.length === 0) {
    return `
      <div class="preview-carousel">
        <div class="no-preview">
          <span>Próximamente</span>
        </div>
      </div>
    `;
  }
  
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

// Cargar categorías al iniciar
document.addEventListener('DOMContentLoaded', function() {
  loadCategories();
});