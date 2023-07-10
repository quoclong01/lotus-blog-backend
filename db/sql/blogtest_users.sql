-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: blogtest
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `isAdmin` tinyint(1) DEFAULT '0',
  `followers` int DEFAULT '0',
  `followings` int DEFAULT '0',
  `verifyAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `displayName` (`displayName`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ngodacquoclong@gmail.com','Ngo Dac Quoc','Long','0984974164','male','12/12/2001','quoclong01','https://lh3.googleusercontent.com/a/AAcHTtelaBviXwq8AkNDL2YM3bvbHYWQh0OBc-x4gXCQ5Q=s96-c',1,0,0,1,NULL,'2023-06-21 15:22:14','2023-06-22 02:18:42'),(2,'caoky@gmail.com','Cao','Ky','0349612812','male','05/02/2001','caoky01','https://res.cloudinary.com/dgm6yxclz/image/upload/v1687361615/juh0uz8bjrdtfc9czwjg.jpg',1,0,2,0,'2023-06-21 15:29:11','2023-06-21 15:29:05','2023-07-05 13:23:32'),(3,'thanhdat@gmail.com','Thanh','Dat',NULL,'male','12/11/2001','thanhdat2001',NULL,1,0,1,0,'2023-06-21 15:40:44','2023-06-21 15:40:38','2023-07-05 14:29:27'),(4,'minhtri@gmail.com','Phan Huu','Tri','0349612811','male','25/11/2001','minhtri123','https://res.cloudinary.com/dgm6yxclz/image/upload/v1687400484/deoelmdrelsjjxa20bbt.jpg',1,0,1,1,'2023-06-21 17:08:03','2023-06-21 17:07:55','2023-07-09 16:47:02'),(5,'quoclong@gmail.com','Quoc','Long','0349612811','male','17/12/2001','long1712','https://res.cloudinary.com/dgm6yxclz/image/upload/v1687367804/qwiq9lmouplfx3hiyukn.jpg',1,0,1,3,'2023-06-21 17:16:23','2023-06-21 17:16:18','2023-07-09 16:47:02'),(6,'admin@gmail.com','admin','long','0349612811','male','17/12/2001','admin',NULL,1,1,0,0,'2023-06-22 01:32:04','2023-06-22 01:31:43','2023-06-22 01:32:04');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-10 21:00:41
