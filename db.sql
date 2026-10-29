create database if not exists soporte_db;
use soporte_db;

CREATE TABLE `soporte_db`.`peticiones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `asunto` VARCHAR(200) NOT NULL,
  `solicitante` VARCHAR(100) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `categoria` VARCHAR(50) NOT NULL,
  `prioridad` VARCHAR(20) NOT NULL,
  `estado` VARCHAR(20) NOT NULL,
  `fechaRegistro` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);