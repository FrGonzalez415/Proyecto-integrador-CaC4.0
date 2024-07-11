"use strict";

import Auth from "../controllers/authController.js";

const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ auth: "false", message: "No se proveyó un token" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ auth: "false", message: "formato del token erroneo" });
  }
  console.log(token);
  Auth.verificarToken(token)
    .then((decoded) => {
      req.idusuario = decoded;
      next();
    })
    .catch((error) => {
      return res.status(401).json({ auth: "false", message: "No autorizado" });
    });
};

export default AuthMiddleware;
