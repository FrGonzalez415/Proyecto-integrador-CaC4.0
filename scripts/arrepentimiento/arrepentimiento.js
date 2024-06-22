document.addEventListener('DOMContentLoaded', function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dniRegex = /^[0-9]+$/;
    const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
    const orderRegex = /^[0-9]+$/;
    
  
    const arrepForm = document.getElementById('form-arrep');
  
    arrepForm.addEventListener('submit', function (event) {
      event.preventDefault();
      validateArrepForm();
    });
  
    function validateArrepForm() {
      const order = document.getElementById('order-arrep').value.trim();
      const email = document.getElementById('email-arrep').value.trim();
      const name = document.getElementById('name-arrep').value.trim();
      const dni = document.getElementById('dni-arrep').value.trim();
      const comentario = document.getElementById('txt-arrep').value.trim();
  
      let valid = true;
      if(!orderRegex.test(order) || order.length < 10){
        valid = false;
        alert("Ingrese un número de pedido válido");
      }
      if (!emailRegex.test(email)) {
        valid = false;
        alert("Ingrese un email válido");
      }
      if (!nameRegex.test(name) || name.length < 12) {
        valid = false;
        alert("Ingrese un nombre válido");
      }
      if(dniRegex.test(dni) || dni.length < 8) {
        valid = false;
        alert("Ingrese un número de DNI válido")
      } 
      if(comentario.length < 15 || comentario.length > 200){
        valid = false;
        alert("El comentario debe contener entre 15 y 200 caracteres")
      }
      if (valid) {
        alert('Formulario de arrepentimiento de compra enviado. Nos pondremos en contacto a la brevedad');
        arrepForm.reset();
      }
    }
  })
    
  