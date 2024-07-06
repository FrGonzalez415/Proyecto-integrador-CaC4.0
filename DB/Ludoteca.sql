-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ludoteca_db
-- -----------------------------------------------------
CREATE SCHEMA `ludoteca_db` DEFAULT CHARACTER SET utf8mb3 ;
USE `ludoteca_db` ;

-- -----------------------------------------------------
-- Table `ludoteca_db`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ludoteca_db`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

insert into usuario (email, password) values 
('admin@ludoteca.com', 'Administrador1');

-- -----------------------------------------------------
-- Table `ludoteca_db`.`datos_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ludoteca_db`.`datos_usuario` (
  `nombre` VARCHAR(20) NOT NULL,
  `apellido` VARCHAR(10) NOT NULL,
  `telefono` BIGINT NULL DEFAULT NULL,
  `fechaNacimiento` DATE NULL DEFAULT NULL,
  `pais` VARCHAR(15) NULL DEFAULT NULL,
  `provincia` VARCHAR(15) NULL DEFAULT NULL,
  `ciudad` VARCHAR(15) NULL DEFAULT NULL,
  `codigoPostal` INT NULL DEFAULT NULL,
  `calle` VARCHAR(15) NULL DEFAULT NULL,
  `numero` INT NULL DEFAULT NULL,
  `vivienda` VARCHAR(12) NULL DEFAULT NULL,
  `idusuario` INT NOT NULL,
  PRIMARY KEY (`idusuario`),
  CONSTRAINT `fk_datos_usuario_usuario1`
    FOREIGN KEY (`idusuario`)
    REFERENCES `ludoteca_db`.`usuario` (`idusuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `ludoteca_db`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ludoteca_db`.`categoria` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(15) NOT NULL,
  `imagen` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcategoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

insert into categoria (nombre, imagen) values
('Estrategia', '../categorias/estrategia.png'),
('Cartas', '../categorias/cartas.png'),
('Cooperativos', '../categorias/cooperativos.png'),
('Familiares', '../categorias/familiares.png'),
('Clasicos', '../categorias/clasicos.png');

-- -----------------------------------------------------
-- Table `ludoteca_db`.`juego`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ludoteca_db`.`juego` (
  `idjuego` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(50) NOT NULL,
  `imagen` VARCHAR(75) NOT NULL,
  `precio` INT NOT NULL,
  PRIMARY KEY (`idjuego`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

insert into juego (titulo, imagen, precio) values
('Ajedrez', '../imagenes/Juegos/ajedrez.png', '15000'),
('Aventura Z Lovecraft', '../imagenes/Juegos/aventura_z_lovecraft.png', '20000'),
('Carcasonne','../imagenes/Juegos/carcassonne.png','26800'),
('Catan', '../imagenes/Juegos/catan.png', '37500'),
('Codigo Secreto', '../imagenes/Juegos/codigo_secreto.png', '10000'),
('Codigo Secreto Duo', '../imagenes/Juegos/codigo_secreto_duo.png', '10000'),
('Codigo Secreto Imagenes', '../imagenes/Juegos/codigo_secreto_imagenes.png', '11000'),
('Damas', '../imagenes/Juegos/damas.png', '15000'),
('Dixit', '../imagenes/Juegos/dixit.png', '21450'),
('Domino', '../imagenes/Juegos/domino.png', '9700'),
('El juego de la oca', '../imagenes/Juegos/el_juego_de_la_oca.png', '10500'),
('Everdell', '../imagenes/Juegos/everdell.png', '34250'),
('Gaia Project', '../imagenes/Juegos/gaia_project.png', '40000'),
('H.D.P.', '../imagenes/Juegos/hdp.png', '12200'),
('H.D.P. Dibujame', '../imagenes/Juegos/hdp_dibujame.png', '16800'),
('H.D.P. Expansiones', '../imagenes/Juegos/hdp_expansiones.png', '8300'),
('King of Tokyo', '../imagenes/Juegos/king_of_tokyo.png', '24500'),
('Marvel Cards Game', '../imagenes/Juegos/marvel_cards_game.png', '41450'),
('Pandemic', '../imagenes/Juegos/pandemic.png', '35000'),
('Pocimas', '../imagenes/Juegos/pocimas.png', '28700'),
('Praga', '../imagenes/Juegos/praga.png', '30500'),
('Raids', '../imagenes/Juegos/raids.png', '1000'),
('Santorini', '../imagenes/Juegos/santorini.png', '30500'),
('Spirits Islands', '../imagenes/Juegos/spirits_islands.png', '36450'),
('Terra Mystica', '../imagenes/Juegos/terra_mystica.png', '31000'),
('Terraforming Mars', '../imagenes/Juegos/terraforming_mars.png', '31000'),
('Through the Ages', '../imagenes/Juegos/through_the_ages.png', '33500');

-- -----------------------------------------------------
-- Table `ludoteca_db`.`categoria_has_juego`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ludoteca_db`.`categoria_has_juego` (
  `idcategoria` INT NOT NULL,
  `idjuego` INT NOT NULL,
  PRIMARY KEY (`idcategoria`, `idjuego`),
  INDEX `fk_categoria_has_juego_juego1_idx` (`idjuego` ASC) VISIBLE,
  INDEX `fk_categoria_has_juego_categoria1_idx` (`idcategoria` ASC) VISIBLE,
  CONSTRAINT `fk_categoria_has_juego_categoria1`
    FOREIGN KEY (`idcategoria`)
    REFERENCES `ludoteca_db`.`categoria` (`idcategoria`),
  CONSTRAINT `fk_categoria_has_juego_juego1`
    FOREIGN KEY (`idjuego`)
    REFERENCES `ludoteca_db`.`juego` (`idjuego`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

insert into categoria_has_juego (idcategoria, idjuego) values
(1,1), (5,1),
(1,2), (2,2), (4,2),
(1,3),
(1,4), (3,4),
(1,5), (2,5), (3,5),
(1,6), (2,6), (3,6),
(1,7), (2,7), (3,7),
(1,8), (5,8),
(2,9), (3,9),
(1,10), (5,10),
(3,11), (5,11),
(1,12),
(1,13),
(2,14),
(2,15),
(2,16),
(1,17), (2,17), (3,17),
(1,18), (2,18), (4,18),
(4,19),
(1,20), (3,20),
(1,21),
(1,22),
(1,23), (3,23),
(1,24), (3,24), (4,24),
(1,25),
(1,26),
(1,27), (2,27);

-- -----------------------------------------------------
-- Table `ludoteca_db`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ludoteca_db`.`pedido` (
  `idpedido` INT NOT NULL AUTO_INCREMENT,
  `fechapedido` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` INT NOT NULL,
  `estado` VARCHAR(10) NOT NULL,
  `idusuario` INT NOT NULL,
  PRIMARY KEY (`idpedido`, `idusuario`),
  INDEX `fk_pedido_usuario1_idx` (`idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_usuario1`
    FOREIGN KEY (`idusuario`)
    REFERENCES `ludoteca_db`.`usuario` (`idusuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `ludoteca_db`.`pedido_has_juego`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ludoteca_db`.`pedido_has_juego` (
  `idpedido` INT NOT NULL,
  `idjuego` INT NOT NULL,
  PRIMARY KEY (`idpedido`, `idjuego`),
  INDEX `fk_pedido_has_juego_juego1_idx` (`idjuego` ASC) VISIBLE,
  INDEX `fk_pedido_has_Juego_pedido1_idx` (`idpedido` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_has_juego_juego1`
    FOREIGN KEY (`idjuego`)
    REFERENCES `ludoteca_db`.`juego` (`idjuego`),
  CONSTRAINT `fk_pedido_has_juego_pedido1`
    FOREIGN KEY (`idpedido`)
    REFERENCES `ludoteca_db`.`pedido` (`idpedido`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;