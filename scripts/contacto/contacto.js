document.addEventListener('DOMContentLoaded', function () {

  const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Referencias a los formularios
  const contactForm = document.getElementById('form-cont');
  
  // Validación del formulario de contacto
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    validateContactForm();
  });


  
  function validateContactForm() {
    const nombre = document.getElementById('nombre-c').value.trim();
    const apellido = document.getElementById('apellido-c').value.trim();
    const email = document.getElementById('email-c').value.trim();
    const comentario = document.getElementById('comentario-c').value.trim();
   
    let valid = true;


    if (!nameRegex.test(nombre) || nombre.length < 5) {
      valid = false;
      alert("Ingrese un nombre válido");
    }
    if (!nameRegex.test(apellido) || apellido.length < 8) {
      valid = false;
      alert("Ingrese un apellido válido");
    }
    if (!emailRegex.test(email)) {
      valid = false;
      alert("Ingrese un email válido");
    }
    if (comentario.length < 10) {
      valid = false;
      alert("Ingrese un comentario válido");
    }

    if (valid) {
      alert("El formulario ha sido enviado. Nos pondremos en contacto a la brevedad");
      contactForm.reset();
    }
  }
})