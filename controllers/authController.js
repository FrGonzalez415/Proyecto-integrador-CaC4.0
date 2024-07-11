"use strict";

import jwt from "jsonwebtoken";
import config from "../config/config.js";

const Auth = {
  // Método para generar un token
  generarToken(payload) {
    console.log( payload);
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        config.secretKey,
        { expiresIn: config.tokenExpiresIn },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  },

  // Método para verificar un token
  verificarToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  },
};

export default Auth;
