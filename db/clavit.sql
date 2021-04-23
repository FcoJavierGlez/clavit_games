-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-04-2021 a las 13:16:45
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `clavit`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `account_access_games`
--

CREATE TABLE `account_access_games` (
  `id` int(11) NOT NULL,
  `uid` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `gid` int(11) NOT NULL,
  `accessed` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `account_access_games`
--

INSERT INTO `account_access_games` (`id`, `uid`, `gid`, `accessed`) VALUES
(1, '1A34F', 1, 0),
(2, '1A34F', 2, 0),
(3, '1A34F', 3, 0),
(4, '1A34F', 4, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clavit_games`
--

CREATE TABLE `clavit_games` (
  `id` int(11) NOT NULL,
  `name` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `ui_name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `ios` tinyint(1) NOT NULL DEFAULT 1,
  `android` tinyint(4) NOT NULL DEFAULT 1,
  `fechaInsercion` date NOT NULL DEFAULT current_timestamp(),
  `version` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `fechaMod` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `clavit_games`
--

INSERT INTO `clavit_games` (`id`, `name`, `ui_name`, `ios`, `android`, `fechaInsercion`, `version`, `fechaMod`) VALUES
(1, 'snake', 'snake', 1, 1, '2021-04-21', '1.0.0', '2021-04-21'),
(2, 'seven_and_a_half', '7 y media', 1, 1, '2021-04-21', '1.0.0', '2021-04-21'),
(3, 'simon_says', 'simon says', 1, 1, '2021-04-21', '1.0.0', '2021-04-21'),
(4, 'couples', 'parejas', 1, 1, '2021-04-21', '1.0.0', '2021-04-21');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `account_access_games`
--
ALTER TABLE `account_access_games`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clavit_games`
--
ALTER TABLE `clavit_games`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `account_access_games`
--
ALTER TABLE `account_access_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `clavit_games`
--
ALTER TABLE `clavit_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
