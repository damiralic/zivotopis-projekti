-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2023 at 01:39 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `songfinderdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `moods`
--

CREATE TABLE `moods` (
  `ID` int(11) NOT NULL,
  `mood` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `moods`
--

INSERT INTO `moods` (`ID`, `mood`) VALUES
(6, 'dark'),
(4, 'epic'),
(1, 'happy'),
(3, 'peaceful'),
(2, 'sad'),
(5, 'wierd');

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `filename` varchar(50) NOT NULL,
  `favorited` int(1) DEFAULT 0,
  `mood` varchar(20) NOT NULL,
  `songFilename` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`ID`, `name`, `description`, `filename`, `favorited`, `mood`, `songFilename`) VALUES
(13, 'test', 'test', 'cover5.jpeg', 0, 'peaceful', NULL),
(15, 'dark', 'dark song', 'cover2.jpg', 0, 'dark', NULL),
(17, 'songadd', 'songadd', 'cover8.jpg', 1, 'wierd', NULL),
(18, 'songtest', 'songtest', 'cover4.jpg', 1, 'sad', NULL),
(20, 'plase', 'worke', 'img.jpg', 1, 'epic', 'Bounce.mp3'),
(22, 'another one', 'this is another song', 'cover1.jpg', 1, 'wierd', 'shotgun.mp3'),
(23, 'aaaaaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaa', 'img.jpg', 0, 'happy', 'a.mp3');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `username`, `password`, `email`, `role`) VALUES
(6, 'admin', 'd00b510fdd0dccff2bc5bb9c9fe54728', 'admin@gmail.com', 'creator'),
(7, 'user', 'd00b510fdd0dccff2bc5bb9c9fe54728', 'user@gmail.com', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `moods`
--
ALTER TABLE `moods`
  ADD PRIMARY KEY (`mood`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `mood_id` (`mood`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `mood_id` FOREIGN KEY (`mood`) REFERENCES `moods` (`mood`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
