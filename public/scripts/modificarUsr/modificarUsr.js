//                  IMPORTS
import navBar from "../modulos/menu.js";

//                  NAVBAR
//  se cargan las funcionalidades de la barra de navegación
navBar();

//                  VARIABLES
//  Se obtiene el formulario de registro del DOM
const modifUsuarioForm = document.getElementById("form-modif-usuario");
const sesionActiva = document.querySelector("main .sesion-activa");
const sesionInactiva = document.querySelector("main .sesion-inactiva");

//                  REGEX
//  Expresiones regulares para validar los campos del formulario

const phoneRegex = /^[0-9]+$/;
const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
const birthdateRegex = /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
const zipRegex = /^[0-9]+$/;
const numberRegex = /^[0-9]+$/;

//                  FUNCIONES
//  Validación del formulario
function validateModifUsuarioForm() {
  //  Se inicializa la variable valid en true
  let valid = true;

  //  Se obtienen los elementos del formulario provenientes del DOM
  const cellphone = document.getElementById("cellphone-modif").value.trim();
  const name = document.getElementById("name-modif").value.trim();
  const surname = document.getElementById("surname-modif").value.trim();
  const birthdate = document.getElementById("birthdate-modif").value.trim();
  const country = document.getElementById("country-modif").value.trim();
  const province = document.getElementById("province-modif").value.trim();
  const city = document.getElementById("city-modif").value.trim();
  const zip = document.getElementById("zip-modif").value.trim();
  const street = document.getElementById("street-modif").value.trim();
  const number = document.getElementById("number-modif").value.trim();
  const optionCasa = document.getElementById("option-modif").checked;
  const optionDepto = document.getElementById("option2-modif").checked;
  const vivienda = optionCasa ? "Casa" : optionDepto ? "Departamento" : "";

  //  Se validan los campos del formulario
  if (!nameRegex.test(name) || name.length < 5) {
    valid = false;
    alert("Ingrese un nombre válido");
  }
  if (!nameRegex.test(surname) || surname.length < 4) {
    valid = false;
    alert("Ingrese un apellido válido");
  }

  if (!phoneRegex.test(cellphone) || cellphone.length < 10) {
    valid = false;
    alert("Ingrese un número de celular válido");
  }
  if (!birthdate || !birthdateRegex.test(birthdate)) {
    valid = false;
    alert("Ingrese una fecha de cumpleaños válida");
  }
  if (country == "") {
    valid = false;
    alert("Ingrese un país válido");
  }
  if (!nameRegex.test(province) || province.length < 5) {
    valid = false;
    alert("Ingrese una provincia válida");
  }
  if (!nameRegex.test(city) || city.length < 5) {
    valid = false;
    alert("Ingrese una ciudad válida");
  }
  if (!zipRegex.test(zip) || zip.length < 2) {
    valid = false;
    alert("Ingrese un código postal válido");
  }
  if (!nameRegex.test(street) || street.length < 5) {
    valid = false;
    alert("Ingrese un nombre de calle válido");
  }
  if (!numberRegex.test(number) || number.length < 2) {
    valid = false;
    alert("Ingrese un número de calle válido");
  }
  if (!optionCasa && !optionDepto) {
    valid = false;
    alert("Seleccione una opción");
  }

  // Si todos los campos son válidos, se envía el formulario y se resetea
  if (valid) {
    fetch("/api/modificar-usuario", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        nombre: name,
        apellido: surname,
        telefono: cellphone,
        fechaNacimiento: birthdate,
        pais: country,
        provincia: province,
        ciudad: city,
        codigoPostal: zip,
        calle: street,
        numero: number,
        vivienda: vivienda,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            console.log(error);
            Promise.reject(error);
          });
        }
        return response.json();
      })
      .then((data) => {
        alert(`Los datos fueron modificados con éxito`);
      })
      .catch((error) => {
        alert(`${error.error}`);
      });
    modifUsuarioForm.reset();
  }
}

const iniciarSesion = (token) => {
  localStorage.setItem("token", token);
  sesionActiva.style.display = "flex";
  sesionInactiva.style.display = "none";
};

const cerrarSesion = () => {
  localStorage.removeItem("token");
  sesionActiva.style.display = "none";
  sesionInactiva.style.display = "flex";
};

const validarSesion = (token) => {
  fetch("/api/verificar-token", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          cerrarSesion();
          Promise.reject(error);
        });
      }
      return res.json();
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.auth === true) {
        iniciarSesion(data.token);
      } else if (data.auth === false) {
        console.log(data.message);
        cerrarSesion();
      }
    })
    .catch((error) => console.log(error));
};

//                  EVENTOS
//  Validación del formulario de registro
document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/datos-usuario", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          console.log(error.message);
          Promise.reject(error);
        });
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("name-modif").value = data.nombre;
      document.getElementById("surname-modif").value = data.apellido;
      document.getElementById("cellphone-modif").value = data.telefono;
      document.getElementById("birthdate-modif").value = data.fechaNacimiento;
      document.getElementById("country-modif").value = data.pais;
      document.getElementById("province-modif").value = data.provincia;
      document.getElementById("city-modif").value = data.ciudad;
      document.getElementById("zip-modif").value = data.codigoPostal;
      document.getElementById("street-modif").value = data.calle;
      document.getElementById("number-modif").value = data.numero;
      if (data.vivienda === "Casa") {
        document.getElementById("option-modif").checked = true;
      } else if (data.vivienda === "Departamento") {
        document.getElementById("option2-modif").checked = true;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  modifUsuarioForm.addEventListener("submit", function (event) {
    event.preventDefault();
    validateModifUsuarioForm();
  });

  //  Se verifica que haya una sesion activa
  if (localStorage.getItem("token") !== null) {
    validarSesion(localStorage.getItem("token"));
  } else {
    cerrarSesion();
  }
});
