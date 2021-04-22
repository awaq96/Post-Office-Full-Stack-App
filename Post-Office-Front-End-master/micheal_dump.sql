-- MariaDB dump 10.17  Distrib 10.4.12-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: postoffice
-- ------------------------------------------------------
-- Server version	10.4.12-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `username` varchar(128) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `userType` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('11111','qqq','$2b$10$8PfdkaC7CCZeuMxKO9mLeuZHzOp8tfOR3.1Pio',NULL),('12','as','$2b$10$o3fKhStpO2fBEmGbtxH0ZOMq2T1f5esyWv5gn7',NULL),('123','dssd@dfdsfs','$2b$10$2RtIvipRr6uufu7OACroceswW0SmWNLj7nxv7b',NULL),('1234','ouyang','$2b$10$1HjoOYjzKh9XnGqPe8pvCOlbjRaxxxG0DQqwgS',NULL),('12345','abc@gmail.com','123',NULL),('1234567','45','$2b$10$/rRUfYjJX4uz1tj7fNePt.LFJDtaac7NJLI0G/',NULL),('154464','affa','$2b$10$C1dDYcC2n100wiBuLHYtdOAq5a0G7DhjXS4oPK',NULL),('5464','fssdf','$2b$10$evLQT0IK.V2t82vkoTr1aeUhtAoMURmSs1YezD',NULL),('54645','hu','$2b$10$ZjtI4f66Z1D7M3lc8.O.QeFD04.g66SSMoeWxN',NULL),('564646','sgsgs','$2b$10$K9uZU9QTCuBC3VwtxSSmTO.kD/tNMzkQeU5NJ8',NULL),('56465','ouyang','$2b$10$D5hI6XqgKoHUTsSgqSA68eObjFBCTIF5dl6g8u',NULL),('6666','faas','$2b$10$EMWRWbQhL9wJOK2.sELEUOVOELZgoY2fAC4bTc',NULL),('77777','asasf','$2b$10$W/CNVeUWm3woDBBkUbivYOJvGSOpJQ/RS2PBUM',NULL),('9874','oiu','$2b$10$aoWJDre4nS71E0ikLQmHCuOhd4WtT2vqxuo0nT',NULL),('bosco2','jay@gmail.com','fsfsfsg',NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `postoffice`.`account_AFTER_INSERT` AFTER INSERT ON `account` FOR EACH ROW
BEGIN
	CALL LogActivity('Account Creation', CURRENT_TIMESTAMP, new.username);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_type` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activity_date` datetime DEFAULT NULL,
  `activity_user` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,'pkg_deliv','2020-04-17 20:16:59','22'),(2,'pkg_update','2020-04-17 20:21:50','22'),(3,'pkg_update','2020-04-18 13:54:19','22'),(4,'pkg_deliv','2020-04-19 20:42:14','22'),(5,'pkg_update','2020-04-19 20:42:37','22');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `is_recipient` tinyint(4) DEFAULT NULL,
  `is_registered` tinyint(4) DEFAULT NULL,
  `email_address` varchar(45) DEFAULT NULL,
  `notes` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (2,'Hank Hill','123 Rainey Street','5741641420',1,1,'hank@strickland.com',''),(12,'Dale Gribble','999 Fake Street','1111111111',0,0,'rustyshackleford@dalesdeadbug.com',NULL),(22,'Eddie Stilson','533 Uguu Blvd','1234567890',1,1,'stilson@gmail.com','One of your packages is ready for pickup');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `is_admin` tinyint(4) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `schedule` varchar(45) DEFAULT NULL,
  `payroll` int(11) DEFAULT NULL,
  `vacation` date DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (0,'John',0,2147483647,'cashier','fulltime',100,'2020-01-02'),(1,'Bob',1,2147483647,'Manager','fulltime',1000,'2020-05-23'),(2,'Larry',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `office`
--

DROP TABLE IF EXISTS `office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `office` (
  `off_id` int(11) NOT NULL,
  `off_name` varchar(45) DEFAULT NULL,
  `off_zip` char(5) DEFAULT NULL,
  `off_numPkgs` int(11) DEFAULT NULL,
  `off_numEmpl` int(11) DEFAULT NULL,
  PRIMARY KEY (`off_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `office`
--

LOCK TABLES `office` WRITE;
/*!40000 ALTER TABLE `office` DISABLE KEYS */;
INSERT INTO `office` VALUES (1,'test','12345',111,33);
/*!40000 ALTER TABLE `office` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `package` (
  `package_id` int(11) NOT NULL,
  `package_type` varchar(45) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `dimension` varchar(45) DEFAULT NULL,
  `tracking_number` int(11) DEFAULT NULL,
  `digital_signature` varchar(45) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `insurance` varchar(45) DEFAULT NULL,
  `pkgvalue` int(11) DEFAULT NULL,
  `recipient_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  `is_delivered` tinyint(4) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `destination` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`package_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES (0,'box',10,'5x3x8',1234,'no',10,'no',10,22,12,'',0,'Alvin','Houston'),(1,'box',15,'8x6x10',1235,'yes',20,'yes',100,23,13,NULL,0,'Dallas','Corpus Christi'),(2,'letter',1,'6x9',1236,'no',3,'no',5,24,14,NULL,0,'San Antonio','Dallas');
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `postoffice`.`package_create` AFTER INSERT ON `package` FOR EACH ROW
BEGIN
	CALL LogActivity('pkg_create', CURRENT_TIMESTAMP, 'emp id here');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER package_location_update
AFTER UPDATE ON package FOR EACH ROW
BEGIN
	IF new.location = new.destination THEN
		UPDATE customer SET notes = 'One of your packages is ready for pickup' 
        WHERE customer_id = new.recipient_id;
        CALL LogActivity('pkg_deliv', CURRENT_TIMESTAMP, new.recipient_id);
    ELSE
		CALL LogActivity('pkg_update', CURRENT_TIMESTAMP, new.recipient_id);
    END IF;    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tracking`
--

DROP TABLE IF EXISTS `tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tracking` (
  `tracking_number` int(11) NOT NULL,
  `final_location` varchar(45) DEFAULT NULL,
  `current_location` varchar(45) DEFAULT NULL,
  `previous_location` varchar(45) DEFAULT NULL,
  `sent_date` datetime DEFAULT NULL,
  `Pkgstatus` varchar(45) DEFAULT NULL,
  `is_delivered` tinyint(4) DEFAULT NULL,
  `estimated_arrival` datetime DEFAULT NULL,
  PRIMARY KEY (`tracking_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracking`
--

LOCK TABLES `tracking` WRITE;
/*!40000 ALTER TABLE `tracking` DISABLE KEYS */;
/*!40000 ALTER TABLE `tracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profile` (
  `user_id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `user_Type` int(11) DEFAULT NULL,
  `email_address` varchar(256) DEFAULT NULL,
  `P.O box` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES (0,'John Doe','123 Street','12811234567',0,'JohnDoe@gmail.com','11');
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicle` (
  `vehicle_id` int(11) NOT NULL AUTO_INCREMENT,
  `plate_number` varchar(45) DEFAULT NULL,
  `vehicle_description` varchar(45) DEFAULT NULL,
  `miles_driven` int(11) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `VIM` varchar(45) DEFAULT NULL,
  `capacity` varchar(45) DEFAULT NULL,
  `current_location` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (2,'5P33DY','small',150000,'office','44f4g06f9k','50',NULL),(12,'89DG221','small',68000,'office','663889fgfs','50',''),(22,'KL88D63','large',99055,'office','489h9ojklfd','200','');
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'postoffice'
--

--
-- Dumping routines for database 'postoffice'
--
/*!50003 DROP PROCEDURE IF EXISTS `LogActivity` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `LogActivity`(
	log_type VARCHAR(45), 
    log_date DATETIME, 
    log_user VARCHAR(128)
)
BEGIN
	INSERT INTO activity (activity_type, activity_date, activity_user)
    VALUES (log_type, log_date, log_user);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-20  0:24:37
