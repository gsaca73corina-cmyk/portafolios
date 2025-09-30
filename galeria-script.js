// Funcionalidad para la galería
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Agregar funcionalidad a los filtros
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      filterGallery(filter);
    });
  });
  
  // Verificar si hay filtro en la URL
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter');
  
  if (filterParam) {
    // Activar el filtro correspondiente
    const targetBtn = document.querySelector(`[data-filter="${filterParam}"]`);
    if (targetBtn) {
      filterBtns.forEach(b => b.classList.remove('active'));
      targetBtn.classList.add('active');
    }
  }
  
  loadAllPhotographs();
  
  // Aplicar filtro después de cargar
  if (filterParam) {
    setTimeout(() => {
      filterGallery(filterParam);
    }, 1000);
  }
});

// Función para agregar botón de diagnóstico
function addDiagnosticButton() {
  const diagnosticBtn = document.createElement('button');
  diagnosticBtn.textContent = 'Diagnóstico de Videos';
  diagnosticBtn.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #ff6b35;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
    font-size: 12px;
  `;
  
  diagnosticBtn.addEventListener('click', runVideoDiagnostic);
  document.body.appendChild(diagnosticBtn);
}

// Función de diagnóstico completo
function runVideoDiagnostic() {
  console.log('=== DIAGNÓSTICO COMPLETO DE VIDEOS ===');
  
  const testPaths = [
    'images/videos/video1.mp4',
    'images/videos/video2.mp4',
    'images/videos/video3.mp4',
    'images/videos/video4.mp4',
    './images/videos/video1.mp4',
    '/images/videos/video1.mp4'
  ];
  
  testPaths.forEach((path, index) => {
    const testVideo = document.createElement('video');
    testVideo.preload = 'metadata';
    
    testVideo.addEventListener('loadedmetadata', () => {
      console.log(`✓ FUNCIONA: ${path} - Duración: ${testVideo.duration}s`);
    });
    
    testVideo.addEventListener('error', (e) => {
      console.log(`✗ ERROR: ${path} - Código: ${testVideo.error ? testVideo.error.code : 'desconocido'}`);
    });
    
    setTimeout(() => {
      testVideo.src = path;
    }, index * 500);
  });
  
  // Probar con fetch
  fetch('images/videos/video1.mp4')
    .then(response => {
      console.log(`Fetch test: ${response.status} - ${response.statusText}`);
      console.log(`Tamaño: ${response.headers.get('content-length')} bytes`);
    })
    .catch(error => {
      console.log('Fetch error:', error);
    });
}

// Función para cargar todas las fotografías dinámicamente
function loadAllPhotographs() {
  const galleryGrid = document.getElementById('galleryGrid');
  
  // Cargar fotografías (del más nuevo al más viejo)
  for (let i = 50; i >= 1; i--) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-category', 'photography');
    
    galleryItem.innerHTML = `
      <img src="images/fotografias/imagen${i}.jpg" alt="Fotografía ${i}" class="item-image">
      <div class="item-overlay">
        <h3>Fotografía ${i}</h3>
        <p>Fotografía</p>
      </div>
    `;
    
    const img = galleryItem.querySelector('img');
    
    img.addEventListener('load', function() {
      galleryGrid.appendChild(galleryItem);
      
      galleryItem.addEventListener('click', () => {
        openImageModal(img.src, `Fotografía ${i}`);
      });
    });
    
    img.addEventListener('error', function() {
      // No agregar si no existe
    });
  }
  
  // Cargar videos
  loadAllVideos(galleryGrid);
  
  // Cargar dibujos
  loadAllDrawings(galleryGrid);
}

// Función para cargar videos automáticamente
function loadAllVideos(galleryGrid) {
  for (let i = 50; i >= 1; i--) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-category', 'videos');
    
    galleryItem.innerHTML = `
      <video class="item-video" preload="metadata" muted>
        <source src="images/videos/video${i}.mp4" type="video/mp4">
      </video>
      <div class="video-overlay">
        <div class="play-button">▶</div>
      </div>
      <div class="item-overlay">
        <h3>Video ${i}</h3>
        <p>Video</p>
      </div>
    `;
    
    const video = galleryItem.querySelector('video');
    
    video.addEventListener('loadeddata', function() {
      video.currentTime = 1;
      galleryGrid.appendChild(galleryItem);
      
      galleryItem.addEventListener('click', () => {
        openVideoModal(video.src, `Video ${i}`);
      });
    });
    
    video.addEventListener('error', function() {
      // No agregar si no existe
    });
  }
}

// Función para abrir imágenes en el modal
function openImageModal(imageSrc, title) {
  const modal = document.getElementById('imageModal');
  const modalImageContainer = modal.querySelector('.modal-image-container');
  
  modalImageContainer.innerHTML = `
    <button class="close-btn" onclick="closeImageModal()">×</button>
    <img id="modalImage" src="${imageSrc}" alt="${title}" style="
      width: 95vw; 
      max-width: 1200px; 
      height: auto; 
      max-height: 80vh; 
      object-fit: contain;
      border-radius: 10px;
    ">
    <div class="image-info">
      <h3>${title}</h3>
      <p>Fotografía</p>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Función para abrir videos - Múltiples opciones
function openVideoModal(videoSrc, title) {
  console.log('=== INTENTANDO REPRODUCIR VIDEO ===');
  console.log('Ruta:', videoSrc);
  
  // Opción 1: Reproductor en línea con múltiples formatos
  const videoPlayer = document.createElement('div');
  videoPlayer.className = 'inline-video-player';
  videoPlayer.innerHTML = `
    <div class="video-header">
      <h3>${title}</h3>
      <button class="close-video-btn" onclick="closeInlineVideo(this)">×</button>
    </div>
    <div class="video-options">
      <h4>Opciones de reproducción:</h4>
      <button onclick="tryVideoOption1('${videoSrc}', '${title}')">Opción 1: Reproductor HTML5</button>
      <button onclick="tryVideoOption2('${videoSrc}', '${title}')">Opción 2: Enlace directo</button>
      <button onclick="tryVideoOption3('${videoSrc}', '${title}')">Opción 3: Nueva ventana</button>
    </div>
    <div id="video-container-${Date.now()}" class="video-container"></div>
  `;
  
  // Insertar después de la galería
  const galleryGrid = document.getElementById('galleryGrid');
  galleryGrid.parentNode.insertBefore(videoPlayer, galleryGrid.nextSibling);
  
  // Probar automáticamente la primera opción
  setTimeout(() => {
    tryVideoOption1(videoSrc, title);
  }, 500);
  
  videoPlayer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Opción 1: Reproductor HTML5 estándar
function tryVideoOption1(videoSrc, title) {
  console.log('Probando Opción 1: HTML5');
  const container = document.querySelector('.video-container');
  if (!container) return;
  
  container.innerHTML = `
    <video controls preload="auto" style="width: 100%; height: auto; background: #000;">
      <source src="${videoSrc}" type="video/mp4">
      <source src="${videoSrc.replace('.mp4', '.webm')}" type="video/webm">
      <source src="${videoSrc.replace('.mp4', '.mov')}" type="video/quicktime">
      Tu navegador no soporta video HTML5.
    </video>
  `;
  
  const video = container.querySelector('video');
  video.addEventListener('loadeddata', () => {
    console.log('✓ Video cargado correctamente');
    video.play().catch(e => console.log('Error autoplay:', e));
  });
  
  video.addEventListener('error', (e) => {
    console.log('✗ Error en video HTML5:', e);
    container.innerHTML = '<p style="color: #ff4444;">Error: No se pudo cargar el video con HTML5</p>';
  });
}

// Opción 2: Enlace directo al archivo
function tryVideoOption2(videoSrc, title) {
  console.log('Probando Opción 2: Enlace directo');
  const container = document.querySelector('.video-container');
  if (!container) return;
  
  container.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <p>Haz clic para abrir el video directamente:</p>
      <a href="${videoSrc}" target="_blank" style="
        display: inline-block;
        background: #00ffff;
        color: #000;
        padding: 1rem 2rem;
        text-decoration: none;
        border-radius: 10px;
        margin: 1rem;
        font-weight: bold;
      ">Abrir ${title}</a>
    </div>
  `;
}

// Opción 3: Nueva ventana
function tryVideoOption3(videoSrc, title) {
  console.log('Probando Opción 3: Nueva ventana');
  const newWindow = window.open('', '_blank', 'width=800,height=600');
  newWindow.document.write(`
    <html>
      <head><title>${title}</title></head>
      <body style="margin: 0; background: #000; display: flex; align-items: center; justify-content: center;">
        <video controls autoplay style="max-width: 100%; max-height: 100%;">
          <source src="${videoSrc}" type="video/mp4">
        </video>
      </body>
    </html>
  `);
}

// Función para cerrar reproductor
function closeInlineVideo(button) {
  const videoPlayer = button.closest('.inline-video-player');
  videoPlayer.remove();
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Función para filtrar la galería
function filterGallery(filter) {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    const category = item.getAttribute('data-category');
    
    if (filter === 'all' || category === filter) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Función para cargar dibujos automáticamente
function loadAllDrawings(galleryGrid) {
  for (let i = 50; i >= 1; i--) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-category', 'art');
    
    galleryItem.innerHTML = `
      <img src="images/dibujos/dibujo (${i}).jpg" alt="Dibujo ${i}" class="item-image">
      <div class="item-overlay">
        <h3>Dibujo ${i}</h3>
        <p>Dibujo</p>
      </div>
    `;
    
    const img = galleryItem.querySelector('img');
    
    img.addEventListener('load', function() {
      galleryGrid.appendChild(galleryItem);
      
      galleryItem.addEventListener('click', () => {
        openImageModal(img.src, `Dibujo ${i}`);
      });
    });
    
    img.addEventListener('error', function() {
      // Probar también con formato .png
      const pngSrc = `images/dibujos/dibujo (${i}).png`;
      const testImg = new Image();
      
      testImg.addEventListener('load', () => {
        img.src = pngSrc;
        galleryGrid.appendChild(galleryItem);
        
        galleryItem.addEventListener('click', () => {
          openImageModal(pngSrc, `Dibujo ${i}`);
        });
      });
      
      testImg.addEventListener('error', () => {
        // No agregar si no existe en ningún formato
      });
      
      testImg.src = pngSrc;
    });
  }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeImageModal();
  }
});