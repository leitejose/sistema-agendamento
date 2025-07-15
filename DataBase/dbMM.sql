-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: appointments_db
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('19b5f939-f377-4189-b1ef-25ec7b62ee55','efe951d9317e9dbda7ec79c796bf59d51c5797d650c8a00d1a9f2366772cc8e1','2025-05-03 16:23:41.752','20250303225538_init',NULL,NULL,'2025-05-03 16:23:41.714',1),('2575fecf-95ca-4d75-960e-f3de55c3d6fe','e99c0558fe32380159266d77f04f4627442123daacd616393568610b5bc0fefa','2025-05-03 16:23:42.414','20250304102419_db',NULL,NULL,'2025-05-03 16:23:41.756',1),('2701ed0e-19d8-4915-8558-6e930b0e4eff','a32a022991e7810566c060b32a44451df85eb69375750895311e37a4dd6bd0f1','2025-05-03 16:23:42.449','20250308105825_update_duracao_type',NULL,NULL,'2025-05-03 16:23:42.419',1),('3d9f1cda-b8b0-4950-aa49-0e77e55b54a1','5ae078ffa0274f2e4c31297353da0827e4a5a8e8402490317e0475dba7652e88','2025-05-03 16:23:42.659','20250308135616_colaborador',NULL,NULL,'2025-05-03 16:23:42.617',1),('461c5427-c2c1-4bf9-be3f-ca717d9b1371','0d02ccce3c5050ae3307f33fa69ebc4198dc5d4e6e1105eba77b19d50e0998c1','2025-05-03 16:23:42.591','20250308121400_update_duracao_type',NULL,NULL,'2025-05-03 16:23:42.453',1),('b75d8fb0-38e1-44a6-89e8-2b1625f6cb25','10d437b593dda1e893853fe7cc32c88f2dc797981070686bf5ba819901ef0d0c','2025-05-03 16:23:52.088','20250503162350_add_status_id_to_agendamento',NULL,NULL,'2025-05-03 16:23:51.008',1),('c53a788e-4398-4160-a617-241f20283dfa','673c7ac7ef2bfb6ca3cc3c473788286a636d114bf05ba82c4b55edd0f21abbf4','2025-05-03 16:23:42.613','20250308130950_dto',NULL,NULL,'2025-05-03 16:23:42.595',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agendamento`
--

DROP TABLE IF EXISTS `agendamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_utente` int NOT NULL,
  `id_servicos` int NOT NULL,
  `id_colaborador` int NOT NULL,
  `atualizado_em` datetime(3) NOT NULL,
  `criado_em` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `data_agendamento` datetime(3) NOT NULL,
  `hora_fim` datetime(3) DEFAULT NULL,
  `hora_inicio` datetime(3) NOT NULL,
  `observacoes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statusId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Agendamento_Utente` (`id_utente`),
  KEY `FK_Agendamento_Colaborador` (`id_colaborador`),
  KEY `FK_Agendamento_Servico` (`id_servicos`),
  KEY `Agendamento_statusId_fkey` (`statusId`),
  CONSTRAINT `Agendamento_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `status_agendamento` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_Agendamento_Colaborador` FOREIGN KEY (`id_colaborador`) REFERENCES `colaborador` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_Agendamento_Servico` FOREIGN KEY (`id_servicos`) REFERENCES `servico` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_Agendamento_Utente` FOREIGN KEY (`id_utente`) REFERENCES `utente` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamento`
--

LOCK TABLES `agendamento` WRITE;
/*!40000 ALTER TABLE `agendamento` DISABLE KEYS */;
INSERT INTO `agendamento` VALUES (4,1,2,3,'2025-06-09 23:06:53.973','2025-05-07 22:31:43.686','2025-06-06 00:00:00.000','2025-06-06 14:00:00.000','2025-06-06 14:00:00.000','Atualizado1232',3),(7,1,1,3,'2025-05-24 14:09:51.141','2025-05-07 22:43:46.895','2025-05-16 00:00:00.000','2025-05-16 14:00:00.000','2025-05-16 14:00:00.000','Atualizado novo',2),(10,1,1,3,'2025-06-07 22:23:53.391','2025-05-17 21:37:47.127','2025-05-17 00:00:00.000','2025-05-17 11:00:00.000','2025-05-17 10:00:00.000','Atualizado',1),(11,1,1,3,'2025-05-24 10:01:44.611','2025-05-17 23:36:51.675','2025-05-16 00:00:00.000','2025-05-16 14:00:00.000','2025-05-16 14:00:00.000','Atualizado novo 2232',1),(12,3,2,3,'2025-05-24 11:17:11.705','2025-05-24 09:53:46.698','2025-06-20 00:00:00.000','2025-06-20 14:00:00.000','2025-06-20 14:00:00.000','novo teste',2),(13,3,2,3,'2025-07-10 15:12:45.750','2025-05-25 22:13:21.334','2025-07-31 00:00:00.000','2025-07-31 15:30:00.000','2025-07-31 14:00:00.000','',3),(14,1,1,3,'2025-06-18 18:27:18.997','2025-06-18 18:27:18.997','2025-06-19 00:00:00.000','2025-06-19 11:00:00.000','2025-06-19 10:00:00.000','Atualizado novo',1),(15,1,1,6,'2025-06-27 09:29:48.066','2025-06-24 16:26:15.449','2025-06-06 00:00:00.000','2025-06-06 09:00:00.000','2025-06-06 09:00:00.000','Atualizado novo',1),(16,1,1,6,'2025-06-24 16:26:17.011','2025-06-24 16:26:17.011','2025-06-06 00:00:00.000',NULL,'2025-06-06 08:00:00.000','Atualizado novo',1),(17,1,2,6,'2025-06-24 16:26:21.624','2025-06-24 16:26:21.624','2025-06-06 00:00:00.000','2025-06-06 09:00:00.000','2025-06-06 08:00:00.000','Atualizado novo',1),(18,3,2,6,'2025-06-24 16:26:24.134','2025-06-24 16:26:24.134','2025-06-06 00:00:00.000','2025-06-06 09:00:00.000','2025-06-06 08:00:00.000','Atualizado novo',1),(19,1,2,3,'2025-07-08 12:44:46.699','2025-07-08 12:44:46.699','2025-08-25 00:00:00.000','2025-08-25 14:21:00.000','2025-08-25 12:51:00.000','teste',1),(20,1,2,3,'2025-07-08 12:45:06.628','2025-07-08 12:45:06.628','2025-08-25 00:00:00.000','2025-08-25 14:21:00.000','2025-08-25 12:51:00.000','teste',1),(21,1,2,3,'2025-07-08 12:45:57.991','2025-07-08 12:45:57.991','2025-08-25 00:00:00.000','2025-08-25 14:21:00.000','2025-08-25 12:51:00.000','teste',1),(22,3,2,3,'2025-07-08 12:48:16.862','2025-07-08 12:48:16.862','2025-08-25 00:00:00.000','2025-08-25 19:21:00.000','2025-08-25 17:51:00.000','teste',1),(23,3,1,3,'2025-07-14 15:31:20.018','2025-07-08 12:50:55.361','2025-07-13 00:00:00.000','2025-07-13 12:00:00.000','2025-07-13 11:00:00.000','Alterando status',3),(24,1,1,6,'2025-07-14 15:13:24.201','2025-07-08 12:54:25.468','2025-07-08 00:00:00.000','2025-07-08 15:00:00.000','2025-07-08 14:00:00.000','',3),(25,1,2,3,'2025-07-08 13:05:07.824','2025-07-08 13:05:07.824','2025-07-08 00:00:00.000',NULL,'2025-07-08 12:00:00.000','Atualizado12',1),(26,1,1,3,'2025-07-08 13:07:21.542','2025-07-08 13:07:21.542','2025-07-07 23:00:00.000','2025-07-08 15:30:00.000','2025-07-08 14:30:00.000','Atualizado novo 1',1),(27,3,2,3,'2025-07-14 16:39:08.554','2025-07-08 13:08:15.432','2025-07-21 00:00:00.000',NULL,'2025-07-21 14:00:00.000','Atualizado novo',3),(28,3,1,3,'2025-07-10 15:27:05.833','2025-07-08 13:12:50.287','2025-07-06 00:00:00.000','2025-07-06 17:21:00.000','2025-07-06 16:21:00.000','teste',3),(29,3,1,3,'2025-07-10 15:14:17.515','2025-07-08 13:17:25.281','2025-07-07 00:00:00.000','2025-07-07 18:00:00.000','2025-07-07 17:00:00.000','',3),(30,3,2,3,'2025-07-14 16:42:28.626','2025-07-08 13:36:08.512','2025-07-07 00:00:00.000','2025-07-07 17:00:00.000','2025-07-07 15:30:00.000','',3),(31,1,2,6,'2025-07-08 13:40:05.520','2025-07-08 13:40:05.520','2025-08-03 23:00:00.000',NULL,'2025-08-04 09:00:00.000','',1),(32,1,2,3,'2025-07-08 13:59:12.322','2025-07-08 13:59:12.322','2025-07-22 00:00:00.000',NULL,'2025-07-22 16:00:00.000','Atualizado novo',1),(34,1,2,3,'2025-07-08 14:33:53.116','2025-07-08 14:33:53.116','2025-07-22 00:00:00.000','2025-07-22 19:00:00.000','2025-07-22 17:30:00.000','',1),(35,1,2,3,'2025-07-08 14:34:42.954','2025-07-08 14:34:42.954','2025-07-22 00:00:00.000',NULL,'2025-07-22 17:00:00.000','',1),(36,1,1,3,'2025-07-08 14:36:56.222','2025-07-08 14:36:56.222','2025-07-08 00:00:00.000','2025-07-08 18:30:00.000','2025-07-08 17:30:00.000','',1),(37,3,1,3,'2025-07-10 15:18:55.076','2025-07-08 14:38:20.912','2025-07-08 00:00:00.000','2025-07-08 15:00:00.000','2025-07-08 14:00:00.000','',3),(38,1,1,6,'2025-07-08 14:40:19.646','2025-07-08 14:40:19.646','2025-07-08 00:00:00.000','2025-07-08 14:00:00.000','2025-07-08 13:00:00.000','',1),(39,3,2,3,'2025-07-09 16:28:19.742','2025-07-09 16:28:19.742','2025-08-25 00:00:00.000','2025-08-25 15:21:00.000','2025-08-25 13:51:00.000','',1),(40,3,1,3,'2025-07-11 13:36:35.808','2025-07-09 16:32:11.394','2025-07-28 00:00:00.000','2025-07-28 20:51:00.000','2025-07-28 19:51:00.000','',4),(41,1,2,3,'2025-07-09 16:41:06.216','2025-07-09 16:41:06.216','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(42,3,1,3,'2025-07-09 16:43:44.671','2025-07-09 16:43:44.671','2025-08-05 00:00:00.000','2025-08-05 18:00:00.000','2025-08-05 17:00:00.000','',1),(43,1,2,3,'2025-07-09 16:52:48.699','2025-07-09 16:52:48.699','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(44,3,2,3,'2025-07-09 16:53:30.388','2025-07-09 16:53:30.388','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(45,3,2,3,'2025-07-09 16:56:43.539','2025-07-09 16:56:43.539','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(46,3,2,3,'2025-07-09 16:57:10.695','2025-07-09 16:57:10.695','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(47,3,2,3,'2025-07-09 16:59:59.702','2025-07-09 16:59:59.702','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(48,3,2,3,'2025-07-10 15:35:59.775','2025-07-10 15:35:59.775','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(49,3,2,3,'2025-07-10 15:37:32.916','2025-07-10 15:37:32.916','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(50,3,2,3,'2025-07-10 15:38:19.676','2025-07-10 15:38:19.676','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(51,3,2,3,'2025-07-10 15:43:00.054','2025-07-10 15:43:00.054','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(52,3,2,3,'2025-07-10 15:45:52.595','2025-07-10 15:45:52.595','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(53,3,2,3,'2025-07-10 15:51:24.004','2025-07-10 15:51:24.004','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(54,3,2,3,'2025-07-10 16:02:38.652','2025-07-10 16:02:38.652','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(55,3,2,3,'2025-07-10 16:03:26.547','2025-07-10 16:03:26.547','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(56,3,2,3,'2025-07-10 16:05:16.746','2025-07-10 16:05:16.746','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(57,3,2,3,'2025-07-10 16:05:46.245','2025-07-10 16:05:46.245','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(58,3,2,3,'2025-07-10 16:07:50.601','2025-07-10 16:07:50.601','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(59,3,2,3,'2025-07-10 16:13:19.408','2025-07-10 16:13:19.408','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(60,3,2,3,'2025-07-10 16:15:33.563','2025-07-10 16:15:33.563','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(61,3,2,3,'2025-07-10 16:20:39.561','2025-07-10 16:20:39.561','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1),(62,3,2,3,'2025-07-11 13:40:28.788','2025-07-11 13:40:28.788','2025-07-10 00:00:00.000','2025-07-10 10:30:00.000','2025-07-10 10:00:00.000','Teste',1);
/*!40000 ALTER TABLE `agendamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--

LOCK TABLES `cargo` WRITE;
/*!40000 ALTER TABLE `cargo` DISABLE KEYS */;
INSERT INTO `cargo` VALUES (3,'Suporte nv2'),(4,'Atendimento'),(14,'Recepcionista'),(19,'Administrador'),(20,'Médico');
/*!40000 ALTER TABLE `cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargo_permissoes`
--

DROP TABLE IF EXISTS `cargo_permissoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargo_permissoes` (
  `cargo_id` int NOT NULL,
  `permissao_id` int NOT NULL,
  PRIMARY KEY (`cargo_id`,`permissao_id`),
  KEY `IDX_57b474c85ecbfcd6cc421f46e8` (`cargo_id`),
  KEY `IDX_cee926c9f8446750c17f7d6356` (`permissao_id`),
  CONSTRAINT `FK_57b474c85ecbfcd6cc421f46e81` FOREIGN KEY (`cargo_id`) REFERENCES `cargo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_cee926c9f8446750c17f7d6356b` FOREIGN KEY (`permissao_id`) REFERENCES `permissao` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo_permissoes`
--

LOCK TABLES `cargo_permissoes` WRITE;
/*!40000 ALTER TABLE `cargo_permissoes` DISABLE KEYS */;
INSERT INTO `cargo_permissoes` VALUES (3,16),(3,17),(3,18),(3,19),(3,20),(3,21),(3,22),(3,23),(3,24),(4,16),(4,17),(4,18),(4,19),(4,20),(4,21),(4,22),(4,23),(4,24),(14,16),(14,17),(14,18),(14,19),(14,20),(14,21),(14,22),(14,23),(14,24),(19,16),(19,17);
/*!40000 ALTER TABLE `cargo_permissoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colaborador`
--

DROP TABLE IF EXISTS `colaborador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colaborador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cargoId` int DEFAULT NULL,
  `descricao` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telemovel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagem_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cor` varchar(22) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_2c7cab1392c28313e5880d941b` (`email`),
  KEY `FK_084fb63ed0f5810c87764c3987c` (`cargoId`),
  CONSTRAINT `FK_084fb63ed0f5810c87764c3987c` FOREIGN KEY (`cargoId`) REFERENCES `cargo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colaborador`
--

LOCK TABLES `colaborador` WRITE;
/*!40000 ALTER TABLE `colaborador` DISABLE KEYS */;
INSERT INTO `colaborador` VALUES (3,3,'José Neto','joseleite688@gmail.com','960001464','$2b$10$oGs1CsfsBwdf8r.kY4NiM.lYx4hQNCs7vH2NONP61QAVURUiHip4.',NULL,'#FF5733'),(6,20,'Dra. Maria do Céu','MC@gmail.com','967504452','$2b$10$OU.tmlFN9piUhZ6MpBypdOUafdce4De6GQp8mEDf1/OtIlNfalKW2','/uploads/file-1752322556598.jpg','#ff33e4'),(20,20,'Dr. Carlos Barata','C..Barata@gmail.com','456789123','$2b$10$cOHkNPWNAHCnzLPStwRcP.wM77wURMG.vLd4IpZWbDduWxxphqCMm','/uploads/file-1752322510399.jpg','#d21947'),(21,20,'Dr. Fernando Loureiro','fl@gmail.com','452458985','$2b$10$Xny6Pxzpdv8LwAVHSgFwgOY.Bkv7m4bQ4eZm7wGdV6kwBHC7XshpG','/uploads/file-1752322724258.jpg','#1cd219'),(22,20,'Dra, Joana Mesquita','jm@gmail.com','856321458','$2b$10$NlkB./QeqQ3YVvQqct17i.yR2.lseYLi0lxAGuqfaM9o4oFC6rOAS','/uploads/file-1752322866088.jpg','#1976d2'),(23,20,'Dr. Paulo Santos','ps@gmail.com','852456958','$2b$10$otNLU0x/toU5vd4P4OqznuAayhQK2tivdlBWsUCHE.5u71cbKZWCC','/uploads/file-1752323044454.jpg','#1976d2'),(24,20,'Dra. Felipa marques','fm@gmail.com','854478856','$2b$10$E0rIlIsY7Bbx6LSUMJOtceG8rrSl0MefNknkbzAM5II8jWtnuBy0W','/uploads/file-1752323223944.jpg','#1976d2'),(25,14,'Clévina Dantas','cd@gmail.com','854478522','$2b$10$xMbtHYnEHl3tXWV6T8zGYeA5hu7J5sbNlFYcDTMucMfnPDlgJ4E9e',NULL,'#1976d2');
/*!40000 ALTER TABLE `colaborador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disponibilidade`
--

DROP TABLE IF EXISTS `disponibilidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disponibilidade` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_colaborador` int NOT NULL,
  `dia_da_semana` tinyint NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fim` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Disponibilidade_id_colaborador_fkey` (`id_colaborador`),
  CONSTRAINT `Disponibilidade_id_colaborador_fkey` FOREIGN KEY (`id_colaborador`) REFERENCES `colaborador` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disponibilidade`
--

LOCK TABLES `disponibilidade` WRITE;
/*!40000 ALTER TABLE `disponibilidade` DISABLE KEYS */;
INSERT INTO `disponibilidade` VALUES (78,3,1,'13:00:00','18:02:00'),(79,3,3,'12:00:00','18:00:00'),(80,6,0,'10:00:00','15:30:00'),(81,6,1,'13:00:00','18:00:00'),(82,6,0,'15:11:00','21:11:00'),(84,3,2,'10:00:00','15:00:00'),(85,3,2,'10:00:00','11:00:00');
/*!40000 ALTER TABLE `disponibilidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ferias`
--

DROP TABLE IF EXISTS `ferias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ferias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date NOT NULL,
  `colaborador_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_ferias_colaborador` (`colaborador_id`),
  CONSTRAINT `fk_ferias_colaborador` FOREIGN KEY (`colaborador_id`) REFERENCES `colaborador` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ferias`
--

LOCK TABLES `ferias` WRITE;
/*!40000 ALTER TABLE `ferias` DISABLE KEYS */;
INSERT INTO `ferias` VALUES (4,'Férias de verão','2025-07-01','2025-07-15',3,'2025-06-11 03:29:00'),(5,'Frontend','2025-06-13','2025-06-14',3,'2025-06-11 03:32:18'),(6,'verao','2025-07-01','2025-07-31',6,'2025-07-08 18:23:43');
/*!40000 ALTER TABLE `ferias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissao`
--

DROP TABLE IF EXISTS `permissao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissao`
--

LOCK TABLES `permissao` WRITE;
/*!40000 ALTER TABLE `permissao` DISABLE KEYS */;
INSERT INTO `permissao` VALUES (16,'Gerenciar Utilizadores'),(17,'Gerenciar Utentes'),(18,'Gerenciar Serviços'),(19,'Gerenciar Marcações'),(20,'Gerenciar Horários'),(21,'Visualizar Relatórios'),(22,'Gerar Relatório'),(23,'Gerenciar Permissões'),(24,'Gerenciar Funções');
/*!40000 ALTER TABLE `permissao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servico`
--

DROP TABLE IF EXISTS `servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `duracao` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servico`
--

LOCK TABLES `servico` WRITE;
/*!40000 ALTER TABLE `servico` DISABLE KEYS */;
INSERT INTO `servico` VALUES (1,'Pediatria',99.99,60),(2,'Consulta ginecologica',100.00,90);
/*!40000 ALTER TABLE `servico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_agendamento`
--

DROP TABLE IF EXISTS `status_agendamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_agendamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_agendamento`
--

LOCK TABLES `status_agendamento` WRITE;
/*!40000 ALTER TABLE `status_agendamento` DISABLE KEYS */;
INSERT INTO `status_agendamento` VALUES (1,'Agendado','#007bff'),(2,'Confirmado','#28a745'),(3,'Cancelado','#dc3545'),(4,'Concluído','#6c757d'),(5,'Não compareceu','#ffc107');
/*!40000 ALTER TABLE `status_agendamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utente`
--

DROP TABLE IF EXISTS `utente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telemovel` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `distrito` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pais` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codigo_postal` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `concelho` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `morada` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
INSERT INTO `utente` VALUES (1,'João Silva','joao.silva@example.com','965004156','Lisboa','Portugal','1234567','Sintra','Rua das Flores, 123'),(3,'josé leite','joseleite688@gmail.com','960001464','Li','PT','3000271','CNT','Av Marnoco E Sousa');
/*!40000 ALTER TABLE `utente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-15 15:01:52
