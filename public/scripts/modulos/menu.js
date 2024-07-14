"use strict";

const menu = document.querySelector("header .menu");
const opciones = document.querySelector("header nav");
const desplegable = document.querySelector("header .desplegable");
const usuario = document.querySelector("header .desplegable .iconos .usuario");
const carrito = document.querySelector("header .desplegable .iconos .carrito");
const sessionOnBtns = document.querySelectorAll(
  "header .desplegable .sesion .session-on"
);
const sessionOffBtns = document.querySelectorAll(
  "header .desplegable .sesion .session-off"
);
const logoutBtn = document.querySelector(
  "header .desplegable .sesion .logout"
);

//                  FUNCIONES
const desplegarMenu = () => {
  opciones.classList.toggle("activo");
  menu.classList.toggle("activo");
};

const desplegarUsuario = () => {
  desplegable.classList.toggle("usuario-activo");
};

const desplegarCarrito = () => {
  desplegable.classList.toggle("carrito-activo");
};

const cerrarSesion = () => {
  localStorage.removeItem("token");
  sessionOnBtns.forEach((btn) => (btn.style.display = "none"));
  sessionOffBtns.forEach((btn) => (btn.style.display = "block"));
};

const iniciarSesion = (token) => {
  localStorage.setItem("token", token);
  sessionOnBtns.forEach((btn) => (btn.style.display = "block"));
  sessionOffBtns.forEach((btn) => (btn.style.display = "none"));

  logoutBtn.addEventListener("click", () => {
    cerrarSesion();
    desplegarUsuario();
    document.location.href = window.location.pathname;
  });
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
    .then((data) => {
      if (data.auth === true) {
        iniciarSesion(data.token);
      } else if (data.auth === false) {
        console.log(data.message);
        cerrarSesion();
      }
    })
    .catch((error) => console.log(error))
};

//                  EVENTOS
const navBar = () => {
  document.addEventListener("DOMContentLoaded", function () {

    //  Se verifica que haya una sesion activa
    if (localStorage.getItem("token") !== null) {
      validarSesion(localStorage.getItem("token"));
    } else {
      cerrarSesion();
    }

    menu.addEventListener("click", () => {
      if (desplegable.classList.contains("carrito-activo")) {
        desplegarCarrito();
        setTimeout(() => {
          desplegarMenu();
        }, 500);
      } else if (desplegable.classList.contains("usuario-activo")) {
        desplegarUsuario();
        setTimeout(() => {
          desplegarMenu();
        }, 500);
      } else {
        desplegarMenu();
      }
    });

    usuario.addEventListener("click", () => {
      if (menu.classList.contains("activo")) {
        desplegarMenu();
        setTimeout(() => {
          desplegarUsuario();
        }, 500);
      } else if (desplegable.classList.contains("carrito-activo")) {
        desplegarCarrito();
        setTimeout(() => {
          desplegarUsuario();
        }, 500);
      } else {
        desplegarUsuario();
      }
    });

    carrito.addEventListener("click", () => {
      if (menu.classList.contains("activo")) {
        desplegarMenu();
        setTimeout(() => {
          desplegarCarrito();
        }, 500);
      } else if (desplegable.classList.contains("usuario-activo")) {
        desplegarUsuario();
        setTimeout(() => {
          desplegable.classList.toggle("carrito-activo");
        }, 500);
      } else {
        desplegarCarrito();
      }
    });
  });
};

export default navBar;
