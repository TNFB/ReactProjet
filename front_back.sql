-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:32561
-- Généré le : jeu. 06 juin 2024 à 10:47
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
(6, 1, 'avis test', 2),
(7, 1, 'teste', 1),
(8, 1, 'retest pour voir', 1),
(9, 3, 'ouais', 2),
(10, 5, 'banger la musique', 9);

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `idCommande` int(11) NOT NULL,
  `contenu` json NOT NULL,
  `userID` int(11) NOT NULL,
  `etat` varchar(255) NOT NULL DEFAULT 'Préparation'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`idCommande`, `contenu`, `userID`, `etat`) VALUES
(1, '[{\"name\": \"pull\", \"price\": 15, \"amount\": 1}]', 2, 'Préparation'),
(2, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 1}, {\"name\": \"pantalon\", \"price\": 12, \"amount\": 1}]', 1, 'En transit'),
(3, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Livré'),
(4, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(5, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(6, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(7, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(8, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(9, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(10, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(11, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(12, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(13, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(14, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(15, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(16, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(17, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(18, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(19, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(20, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 3}]', 2, 'Préparation'),
(21, '[{\"name\": \"pull\", \"price\": 15, \"amount\": 2}, {\"name\": \"testimg\", \"price\": 1, \"amount\": 5}]', 2, 'Préparation'),
(22, '[{\"name\": \"pull\", \"price\": 15, \"amount\": 1}, {\"name\": \"robe\", \"price\": 26, \"amount\": 2}, {\"name\": \"pantalon\", \"price\": 12, \"amount\": 3}]', 1, 'Préparation'),
(23, '[{\"name\": \"robe\", \"price\": 26, \"amount\": 1}, {\"name\": \"pantalon\", \"price\": 12, \"amount\": 2}]', 9, 'Préparation');

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
  `adresse` varchar(255) NOT NULL DEFAULT 'Non défini'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `email`, `password`, `role`, `nom`, `prenom`, `adresse`) VALUES
(0, 'Anonyme', 'Anonyme', 'user', 'Anonyme', 'Anonyme', 'Anonyme'),
(1, 'tom@tom.tom', '$2b$10$tRH..gRqlDm/wdwmYwrq7etEsx7SyhQ4V0w1o8pOWhZofgEZMmxqW', 'user', 'herault', 'tommmm', '14bis Avenue du Général Patton, 49000 Angers'),
(2, 'admin@admin.com', '$2b$10$noF1roFWbjURYQMjkysAZeRyPA5usYI93PM/.q5Ot9NVRQqIExgmy', 'admin', 'admin-famille', 'admin', 'admin-adresse'),
(3, 'test@test.com', '$2b$10$AEQMKSNoU/Jvltelso8Z0u0M2jsjZKSiIDMonFC4bhF./62QJLFZq', 'user', 'Non défini', 'Non défini', 'Non défini'),
(4, '2@2.com', '$2b$10$WhkrYPlE5vhTWpcJ8FTM2.kTDMaqes56zTC54sns22GZSzAu23NJK', 'user', 'Non défini', 'Non défini', 'Non défini'),
(5, '3@3.com', '$2b$10$mNjGjUxMwgn7tXIQT7kGN.t4X2WF/WniXLYqBmPOdkDsetmwkBBxy', 'user', 'Non défini', 'Non défini', 'Non défini'),
(6, '4@4.com', '$2b$10$CqiX4WWJaBdrlYBH1SCLOO6zJSX1wbPgq9M4SUIdovaHMPwpE9DMO', 'user', 'Non défini', 'Non défini', 'Non défini'),
(7, '7@7.com', '$2b$10$pDga8kPHg9ILXP0M0ShoEuMjdhXZdfSdQ7odBJdMSlp3Y17wmTEl.', 'user', 'oui', 'sti', 'ti'),
(9, 'fin@fin.fin', '$2b$10$dbPi8W87orY3lEk.S8MrNe1/cB6Wex0BF9FK4uzp7Pg.3Yibus4GC', 'user', 'finnom', 'finprenom', 'finaddr');

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
  `confort` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `vetement`
--

INSERT INTO `vetement` (`id`, `name`, `cover`, `category`, `isSpecialOffer`, `taille`, `confort`, `price`, `video`) VALUES
(1, 'pull', 'http://localhost:8000/images/2.jpg', 'haut', 1, 'M', '1', 15, 'https://www.youtube.com/embed/O1DduwpIP0s?si=_Am4ScFiIyaINkLu'),
(2, 'robe', 'http://localhost:8000/images/8.jpg', 'bas', 1, 'XS', '2', 26, NULL),
(3, 'pantalon', 'http://localhost:8000/images/3.jpg', 'bas', 0, 'M', '3', 12, NULL),
(5, 'testimg', 'http://localhost:3001/images/1717606549915-hollup.jpg', 'test', 0, 'XS', '-1', 1, 'https://www.youtube.com/embed/SChnJDfmrSU?si=XESTxZFlC-k-tdvV'),
(7, 'chemisier', 'http://localhost:3001/images/1717614163743-chemisier.jpg', 'haut', 1, 'L', 'Serré', 9999, 'https://www.youtube.com/embed/nwuW98yLsgY?si=deLokq0A7V7Dhk0T');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`idAvis`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`idCommande`);

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
  MODIFY `idAvis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `idCommande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `vetement`
--
ALTER TABLE `vetement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
