-- =====================================================================================
-- CƠ SỞ DỮ LIỆU: BĐS MINH VƯƠNG HOME LUXURY (NHÓM 15)
-- MÔN HỌC: PHÁT TRIỂN ỨNG DỤNG WEB (WEB APPLICATION DEVELOPMENT)
-- Hệ quản trị CSDL tương thích: MySQL 8.0+ / MariaDB 10.4+ / XAMPP / Laragon / phpMyAdmin
-- Bảng mã: UTF-8 Unicode (utf8mb4_unicode_ci)
-- =====================================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP DATABASE IF EXISTS `nhom15_batdongsan_db`;
CREATE DATABASE `nhom15_batdongsan_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `nhom15_batdongsan_db`;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    `display_name` VARCHAR(100) NOT NULL,
    `description` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `role_id` INT NOT NULL DEFAULT 3,
    `username` VARCHAR(80) NOT NULL UNIQUE,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(25) NOT NULL,
    `zalo` VARCHAR(255) DEFAULT NULL,
    `avatar` VARCHAR(500) DEFAULT NULL,
    `title` VARCHAR(150) DEFAULT NULL,
    `company` VARCHAR(150) DEFAULT 'Minh Vương Home Luxury',
    `bio` TEXT DEFAULT NULL,
    `is_verified` TINYINT(1) NOT NULL DEFAULT 1,
    `status` ENUM('active', 'inactive', 'locked') NOT NULL DEFAULT 'active',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_users_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `property_types`;
CREATE TABLE `property_types` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `icon` VARCHAR(50) NOT NULL DEFAULT 'fa-building',
    `description` TEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `region` VARCHAR(50) NOT NULL,
    `center_lat` DECIMAL(10, 7) NOT NULL,
    `center_lng` DECIMAL(10, 7) NOT NULL,
    `default_zoom` INT NOT NULL DEFAULT 12
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `investor` VARCHAR(150) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `scale` VARCHAR(100) NOT NULL,
    `status` VARCHAR(100) NOT NULL,
    `status_color` VARCHAR(50) NOT NULL DEFAULT 'bg-emerald-500',
    `price_range` VARCHAR(100) NOT NULL,
    `project_type` VARCHAR(100) NOT NULL,
    `image_url` VARCHAR(500) NOT NULL,
    `highlights` TEXT DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `properties`;
CREATE TABLE `properties` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `category` ENUM('sale', 'rent') NOT NULL DEFAULT 'sale',
    `type_id` INT NOT NULL,
    `type_name` VARCHAR(100) NOT NULL,
    `location_id` INT NOT NULL,
    `district` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `lat` DECIMAL(10, 7) NOT NULL,
    `lng` DECIMAL(10, 7) NOT NULL,
    `price_display` VARCHAR(50) NOT NULL,
    `price_value` DECIMAL(15, 2) NOT NULL,
    `unit_price` VARCHAR(50) DEFAULT NULL,
    `area` DECIMAL(10, 2) NOT NULL,
    `bedrooms` INT NOT NULL DEFAULT 0,
    `bathrooms` INT NOT NULL DEFAULT 0,
    `direction` VARCHAR(50) DEFAULT NULL,
    `balcony_direction` VARCHAR(50) DEFAULT NULL,
    `badge` VARCHAR(50) DEFAULT NULL,
    `badge_color` VARCHAR(50) DEFAULT 'bg-rose-500',
    `legal` VARCHAR(150) DEFAULT 'Sổ hồng sở hữu lâu dài',
    `furniture` VARCHAR(150) DEFAULT NULL,
    `floor` VARCHAR(100) DEFAULT NULL,
    `year_built` INT DEFAULT 2024,
    `investor` VARCHAR(150) DEFAULT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `agent_id` INT NOT NULL,
    `project_id` INT DEFAULT NULL,
    `views_count` INT NOT NULL DEFAULT 0,
    `status` ENUM('available', 'pending', 'sold', 'rented') NOT NULL DEFAULT 'available',
    `posted_at_text` VARCHAR(50) NOT NULL DEFAULT 'Hôm nay',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_properties_type` FOREIGN KEY (`type_id`) REFERENCES `property_types` (`id`) ON UPDATE CASCADE,
    CONSTRAINT `fk_properties_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON UPDATE CASCADE,
    CONSTRAINT `fk_properties_agent` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
    CONSTRAINT `fk_properties_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `property_images`;
CREATE TABLE `property_images` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `property_id` INT NOT NULL,
    `image_url` VARCHAR(500) NOT NULL,
    `is_primary` TINYINT(1) NOT NULL DEFAULT 0,
    `sort_order` INT NOT NULL DEFAULT 0,
    CONSTRAINT `fk_images_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `property_features`;
CREATE TABLE `property_features` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `property_id` INT NOT NULL,
    `feature_text` VARCHAR(255) NOT NULL,
    CONSTRAINT `fk_features_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `property_amenities`;
CREATE TABLE `property_amenities` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `property_id` INT NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `dist` VARCHAR(50) NOT NULL,
    `icon` VARCHAR(50) NOT NULL DEFAULT 'fa-location-dot',
    CONSTRAINT `fk_amenities_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `market_prices`;
CREATE TABLE `market_prices` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(50) NOT NULL UNIQUE,
    `location_id` INT NOT NULL,
    `district` VARCHAR(150) NOT NULL,
    `city_code` VARCHAR(50) NOT NULL,
    `city_name` VARCHAR(100) NOT NULL,
    `apt_min` DECIMAL(10, 1) NOT NULL,
    `apt_max` DECIMAL(10, 1) NOT NULL,
    `apt_avg` DECIMAL(10, 1) NOT NULL,
    `house_min` DECIMAL(10, 1) NOT NULL,
    `house_max` DECIMAL(10, 1) NOT NULL,
    `house_avg` DECIMAL(10, 1) NOT NULL,
    `villa_min` DECIMAL(10, 1) NOT NULL,
    `villa_max` DECIMAL(10, 1) NOT NULL,
    `villa_avg` DECIMAL(10, 1) NOT NULL,
    `land_min` DECIMAL(10, 1) NOT NULL,
    `land_max` DECIMAL(10, 1) NOT NULL,
    `land_avg` DECIMAL(10, 1) NOT NULL,
    `yoy_growth` VARCHAR(20) NOT NULL,
    `growth_value` DECIMAL(5, 2) NOT NULL,
    `liquidity` VARCHAR(50) NOT NULL,
    `rent_avg` VARCHAR(50) NOT NULL,
    `trend` VARCHAR(50) NOT NULL,
    `key_projects` TEXT DEFAULT NULL,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_market_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `author_name` VARCHAR(120) NOT NULL,
    `avatar` VARCHAR(500) DEFAULT NULL,
    `city` VARCHAR(100) NOT NULL,
    `service` VARCHAR(150) NOT NULL,
    `transaction_badge` VARCHAR(150) NOT NULL,
    `rating` TINYINT NOT NULL DEFAULT 5,
    `date_text` VARCHAR(50) NOT NULL DEFAULT 'Gần đây',
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `image` VARCHAR(500) DEFAULT NULL,
    `helpful_count` INT NOT NULL DEFAULT 0,
    `reply` TEXT DEFAULT NULL,
    `status` ENUM('approved', 'pending', 'rejected') NOT NULL DEFAULT 'approved',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `contact_inquiries`;
CREATE TABLE `contact_inquiries` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `property_id` INT DEFAULT NULL,
    `full_name` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(25) NOT NULL,
    `email` VARCHAR(150) DEFAULT NULL,
    `inquiry_type` ENUM('viewing', 'consultation', 'valuation', 'loan') NOT NULL DEFAULT 'viewing',
    `appointment_date` DATE DEFAULT NULL,
    `appointment_time` VARCHAR(50) DEFAULT NULL,
    `notes` TEXT DEFAULT NULL,
    `status` ENUM('new', 'contacted', 'completed', 'cancelled') NOT NULL DEFAULT 'new',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_inquiries_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `saved_favorites`;
CREATE TABLE `saved_favorites` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `property_id` INT NOT NULL,
    `saved_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `uq_user_property_favorite` (`user_id`, `property_id`),
    CONSTRAINT `fk_favorites_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_favorites_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `loan_calculations`;
CREATE TABLE `loan_calculations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `customer_name` VARCHAR(150) NOT NULL,
    `customer_phone` VARCHAR(25) NOT NULL,
    `property_id` INT DEFAULT NULL,
    `property_price` DECIMAL(15, 2) NOT NULL,
    `loan_percentage` DECIMAL(5, 2) NOT NULL DEFAULT 70.00,
    `loan_amount` DECIMAL(15, 2) NOT NULL,
    `loan_years` INT NOT NULL DEFAULT 20,
    `interest_rate` DECIMAL(5, 2) NOT NULL DEFAULT 6.50,
    `repayment_type` ENUM('reducing_balance', 'equal_payment') NOT NULL DEFAULT 'reducing_balance',
    `first_month_payment` DECIMAL(15, 2) DEFAULT NULL,
    `bank_name` VARCHAR(100) DEFAULT 'Vietcombank',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_loan_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
