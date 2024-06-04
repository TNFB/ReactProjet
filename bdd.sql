-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 04 juin 2024 à 20:18
-- Version du serveur : 5.7.24
-- Version de PHP : 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `front_back`
--

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

CREATE TABLE `avis` (
  `idAvis` int(11) NOT NULL,
  `idArticle` int(11) NOT NULL,
  `avis` text NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `avis`
--

INSERT INTO `avis` (`idAvis`, `idArticle`, `avis`, `idUser`) VALUES
(1, 1, 'ouais 1er test', 1),
(2, 1, 'omg le 2ème ?', 2),
(3, 1, 'nan c\'est trop bien#', 1),
(4, 1, 'ok test d\'envoi d\'avis', 1),
(5, 1, 'tro nul', 0),
(6, 1, 'avis test', 2);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(5) NOT NULL DEFAULT 'user',
  `nom` varchar(255) NOT NULL DEFAULT 'Non défini',
  `prenom` varchar(255) NOT NULL DEFAULT 'Non défini',
  `adresse` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `email`, `password`, `role`, `nom`, `prenom`, `adresse`) VALUES
(1, 'tom@tom.tom', '$2b$10$.f8ws.SzPt6AjM2gEuYYdO1KVspEaYL6dDB.Q9it/RRJ/DCE7JRcK', 'user', 'herault', 'tomm', '14bis Avenue du Général Patton, 49000 Angers'),
(2, 'admin@admin.com', '$2b$10$noF1roFWbjURYQMjkysAZeRyPA5usYI93PM/.q5Ot9NVRQqIExgmy', 'admin', 'admin', 'root', 'sudo');

-- --------------------------------------------------------

--
-- Structure de la table `vetement`
--

CREATE TABLE `vetement` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `isSpecialOffer` tinyint(1) DEFAULT NULL,
  `taille` varchar(255) DEFAULT NULL,
  `confort` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `vetement`
--

INSERT INTO `vetement` (`id`, `name`, `cover`, `category`, `isSpecialOffer`, `taille`, `confort`, `price`) VALUES
(1, 'pull', 'http://localhost:8000/images/2.jpg', 'haut', NULL, 'L', 1, 15),
(2, 'robe', 'http://localhost:8000/images/8.jpg', 'bas', 1, 'XS', 2, 26),
(3, 'pantalon', 'http://localhost:8000/images/3.jpg', 'bas', NULL, 'M', 3, 12);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`idAvis`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vetement`
--
ALTER TABLE `vetement`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `idAvis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `vetement`
--
ALTER TABLE `vetement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
