// Funcionalidad para el formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const submitBtn = contactForm.querySelector('.submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  // Manejar envío del formulario
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Mostrar estado de carga
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    // Simular envío (aquí conectarías con tu backend)
    setTimeout(() => {
      // Mostrar mensaje de éxito
      showSuccessMessage();
      
      // Resetear formulario
      contactForm.reset();
      
      // Restaurar botón
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }, 2000);
  });

  // Función para mostrar mensaje de éxito
  function showSuccessMessage() {
    // Crear elemento de mensaje
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
      <div class="success-content">
        <div class="success-icon">✅</div>
        <h3>¡Mensaje Enviado!</h3>
        <p>Gracias por contactarme. Te responderé pronto.</p>
      </div>
    `;
    
    // Agregar estilos
    successMessage.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(10, 14, 39, 0.95);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      animation: fadeIn 0.3s ease;
    `;
    
    const successContent = successMessage.querySelector('.success-content');
    successContent.style.cssText = `
      background: var(--bg-secondary);
      padding: 3rem;
      border-radius: 20px;
      text-align: center;
      border: 1px solid rgba(99, 102, 241, 0.3);
      animation: slideUp 0.3s ease;
    `;
    
    const successIcon = successMessage.querySelector('.success-icon');
    successIcon.style.cssText = `
      font-size: 4rem;
      margin-bottom: 1rem;
    `;
    
    // Agregar al DOM
    document.body.appendChild(successMessage);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      successMessage.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 300);
    }, 3000);
  }

  // Validación en tiempo real
  const inputs = contactForm.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
  });

  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remover errores previos
    clearError(e);
    
    // Validaciones específicas
    if (field.hasAttribute('required') && !value) {
      showFieldError(field, 'Este campo es obligatorio');
      return false;
    }
    
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field, 'Ingresa un email válido');
        return false;
      }
    }
    
    return true;
  }

  function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    
    // Crear elemento de error si no existe
    let errorElement = formGroup.querySelector('.field-error');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'field-error';
      errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      `;
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    field.style.borderColor = '#ef4444';
  }

  function clearError(e) {
    const field = e.target;
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    
    if (errorElement) {
      errorElement.remove();
    }
    
    field.style.borderColor = 'rgba(99, 102, 241, 0.3)';
  }
});