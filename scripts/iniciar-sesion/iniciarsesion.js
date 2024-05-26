document.addEventListener('DOMContentLoaded', function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    const loginForm = document.getElementById('form-is');
  
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      validateLoginForm();
    });
  
    function validateLoginForm() {
      const email = document.getElementById('email-is').value.trim();
      const password = document.getElementById('password-is').value.trim();
  
      let valid = true;
  
      if (!emailRegex.test(email)) {
        valid = false;
        alert('Por favor, ingrese un email válido.');
      }
      if (!passwordRegex.test(password)) {
        valid = false;
        alert("La contraseña debe contener al menos una minúscula, una mayúscula, un número y 8 caracteres");
      }
  
      if (valid) {
        alert("Sesión iniciada");
        loginForm.reset();
      }
    }
  });
  
  
  
  
  
  
  
  