-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2024 at 10:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_feedback_rcciit`
--

-- --------------------------------------------------------

--
-- Table structure for table `program_master`
--

CREATE TABLE `program_master` (
  `p_id` int(11) NOT NULL COMMENT 'program id',
  `p_name` varchar(20) NOT NULL COMMENT 'program name',
  `p_sem` int(3) NOT NULL COMMENT 'program''s no of sem'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_master`
--

INSERT INTO `program_master` (`p_id`, `p_name`, `p_sem`) VALUES
(1, 'MCA', 4),
(3, 'B Tech - IT', 8),
(5, 'B Tech - CSE', 8),
(6, 'BCA', 6),
(7, 'BSC', 6),
(8, 'B Com', 6);

-- --------------------------------------------------------

--
-- Table structure for table `session master`
--

CREATE TABLE `session master` (
  `s_id` varchar(25) NOT NULL COMMENT 'session id',
  `s_desc` varchar(50) NOT NULL COMMENT 'session description',
  `s_srt_date` varchar(10) NOT NULL COMMENT 'session start date',
  `s_end_date` varchar(10) NOT NULL COMMENT 'session end date',
  `s_cre_date` varchar(25) NOT NULL COMMENT 'session creation date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `session master`
--

INSERT INTO `session master` (`s_id`, `s_desc`, `s_srt_date`, `s_end_date`, `s_cre_date`) VALUES
('24BTech-IT11', '2024 - 2025_B Tech - IT_1_1', '2024-06-30', '2024-07-03', 'Tue Jul 23 2024'),
('24BTech-IT12', '2024 - 2025_B Tech - IT_1_2', '2024-06-30', '2024-07-03', 'Tue Jul 23 2024'),
('24MCA11', '2024 - 2025_MCA_1_1', '2024-06-30', '2024-07-01', 'Tue Jul 23 2024'),
('24MCA12', '2024 - 2025_MCA_1_2', '2024-06-30', '2024-07-03', 'Tue Jul 23 2024'),
('24MCA21', '2024 - 2025_MCA_2_1', '2024-06-02', '2024-07-02', 'Tue Jul 23 2024'),
('24MCA22', '2024 - 2025_MCA_2_2', '2024-06-02', '2024-07-02', 'Tue Jul 23 2024');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `s_roll` varchar(15) NOT NULL COMMENT 'student roll number',
  `s_email` varchar(30) NOT NULL COMMENT 'student email address',
  `s_number` bigint(13) UNSIGNED NOT NULL COMMENT 'student phone number',
  `s_name` varchar(50) NOT NULL COMMENT 'student name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`s_roll`, `s_email`, `s_number`, `s_name`) VALUES
('mca2023026', 'naskarkalyan2000@gmail.com', 9875638109, 'Kalyan Naskar');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `program_master`
--
ALTER TABLE `program_master`
  ADD PRIMARY KEY (`p_id`),
  ADD UNIQUE KEY `p_name` (`p_name`);

--
-- Indexes for table `session master`
--
ALTER TABLE `session master`
  ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`s_roll`),
  ADD UNIQUE KEY `s_email` (`s_email`),
  ADD UNIQUE KEY `s_number` (`s_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `program_master`
--
ALTER TABLE `program_master`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'program id', AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
