-- CreateTable
CREATE TABLE `userTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `member_id` BIGINT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NULL,
    `username` VARCHAR(50) NULL,
    `birth_date` DATETIME(3) NULL,
    `gender` ENUM('M', 'F', 'X') NULL,
    `country` VARCHAR(50) NULL,
    `city` VARCHAR(100) NULL,
    `address` VARCHAR(255) NULL,
    `postal_code` VARCHAR(20) NULL,
    `phone_number` VARCHAR(20) NULL,
    `email` VARCHAR(255) NOT NULL,
    `passport_number` VARCHAR(20) NULL,
    `passport_expiry` DATETIME(3) NULL,
    `password` VARCHAR(255) NOT NULL,
    `avatar_choice` INTEGER NULL,
    `mileage` INTEGER NULL DEFAULT 0,
    `membership_level` ENUM('Green', 'Silver', 'Gold', 'Platinum') NULL DEFAULT 'Green',
    `member_status` ENUM('Active', 'Suspended', 'Inactive') NULL DEFAULT 'Active',
    `is_verified` BOOLEAN NULL DEFAULT false,
    `last_login` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `members_email_key`(`email`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `avatar_options` (
    `avatar_id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_path` VARCHAR(255) NOT NULL,
    `label` VARCHAR(50) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`avatar_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `country_id` BIGINT NOT NULL AUTO_INCREMENT,
    `country_code` CHAR(2) NOT NULL,
    `country_name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `countries_country_code_key`(`country_code`),
    PRIMARY KEY (`country_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `city_id` BIGINT NOT NULL AUTO_INCREMENT,
    `city_name` VARCHAR(191) NOT NULL,
    `country_id` BIGINT NOT NULL,

    PRIMARY KEY (`city_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `airports` (
    `airport_id` BIGINT NOT NULL AUTO_INCREMENT,
    `airport_code` CHAR(3) NOT NULL,
    `airport_name` VARCHAR(150) NOT NULL,
    `city_id` BIGINT NOT NULL,

    UNIQUE INDEX `airports_airport_code_key`(`airport_code`),
    PRIMARY KEY (`airport_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flights` (
    `flight_id` BIGINT NOT NULL AUTO_INCREMENT,
    `flight_number` VARCHAR(6) NOT NULL,
    `flight_date` DATE NOT NULL,
    `origin_iata` CHAR(3) NOT NULL,
    `destination_iata` CHAR(3) NOT NULL,
    `dep_time_utc` DATETIME(3) NULL,
    `arr_time_utc` DATETIME(3) NULL,
    `status` ENUM('SCHEDULED', 'CANCELED') NOT NULL,

    PRIMARY KEY (`flight_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `booking_id` BIGINT NOT NULL AUTO_INCREMENT,
    `pnr` VARCHAR(6) NOT NULL,
    `member_id` BIGINT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NULL,
    `nationality` CHAR(2) NULL,
    `passport_no` VARCHAR(191) NULL,
    `cabin_class` VARCHAR(191) NOT NULL,
    `currency` CHAR(3) NOT NULL,
    `total_amount` INTEGER NOT NULL,
    `payment_status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `bookings_pnr_key`(`pnr`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking_details` (
    `detail_id` BIGINT NOT NULL AUTO_INCREMENT,
    `booking_id` BIGINT NOT NULL,
    `flight_id` BIGINT NOT NULL,
    `trip_type` VARCHAR(191) NULL,
    `seat_id` BIGINT NULL,
    `meal_id` BIGINT NULL,
    `baggage_id` BIGINT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `booking_details_booking_id_idx`(`booking_id`),
    INDEX `booking_details_flight_id_idx`(`flight_id`),
    INDEX `booking_details_seat_id_idx`(`seat_id`),
    INDEX `booking_details_meal_id_idx`(`meal_id`),
    INDEX `booking_details_baggage_id_idx`(`baggage_id`),
    PRIMARY KEY (`detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seat_options` (
    `seat_id` BIGINT NOT NULL AUTO_INCREMENT,
    `flight_id` BIGINT NOT NULL,
    `seat_number` VARCHAR(5) NOT NULL,
    `cabin_class` VARCHAR(191) NOT NULL,
    `is_available` BOOLEAN NOT NULL DEFAULT true,
    `seat_fee` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `seat_options_flight_id_seat_number_key`(`flight_id`, `seat_number`),
    PRIMARY KEY (`seat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `baggage_options` (
    `baggage_id` BIGINT NOT NULL AUTO_INCREMENT,
    `weight_kg` INTEGER NOT NULL,
    `fee` INTEGER NOT NULL,
    `currency` CHAR(3) NOT NULL DEFAULT 'TWD',

    UNIQUE INDEX `baggage_options_weight_kg_currency_key`(`weight_kg`, `currency`),
    PRIMARY KEY (`baggage_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meal_options` (
    `meal_id` BIGINT NOT NULL AUTO_INCREMENT,
    `meal_code` VARCHAR(10) NOT NULL,
    `meal_name` VARCHAR(100) NOT NULL,
    `meal_type` VARCHAR(30) NULL,
    `meal_fee` INTEGER NOT NULL DEFAULT 0,
    `currency` CHAR(3) NOT NULL DEFAULT 'TWD',
    `meal_image_path` VARCHAR(255) NULL,

    UNIQUE INDEX `meal_options_meal_code_key`(`meal_code`),
    PRIMARY KEY (`meal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plan` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NOT NULL,
    `start_timezone` VARCHAR(191) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `end_timezone` VARCHAR(191) NOT NULL,
    `note` TEXT NULL,
    `cover_image` VARCHAR(191) NULL,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `members_avatar_choice_fkey` FOREIGN KEY (`avatar_choice`) REFERENCES `avatar_options`(`avatar_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `cities_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`country_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `airports` ADD CONSTRAINT `airports_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`city_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flights` ADD CONSTRAINT `flights_origin_iata_fkey` FOREIGN KEY (`origin_iata`) REFERENCES `airports`(`airport_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flights` ADD CONSTRAINT `flights_destination_iata_fkey` FOREIGN KEY (`destination_iata`) REFERENCES `airports`(`airport_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `members`(`member_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_details` ADD CONSTRAINT `booking_details_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_details` ADD CONSTRAINT `booking_details_flight_id_fkey` FOREIGN KEY (`flight_id`) REFERENCES `flights`(`flight_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_details` ADD CONSTRAINT `booking_details_seat_id_fkey` FOREIGN KEY (`seat_id`) REFERENCES `seat_options`(`seat_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_details` ADD CONSTRAINT `booking_details_meal_id_fkey` FOREIGN KEY (`meal_id`) REFERENCES `meal_options`(`meal_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_details` ADD CONSTRAINT `booking_details_baggage_id_fkey` FOREIGN KEY (`baggage_id`) REFERENCES `baggage_options`(`baggage_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seat_options` ADD CONSTRAINT `seat_options_flight_id_fkey` FOREIGN KEY (`flight_id`) REFERENCES `flights`(`flight_id`) ON DELETE CASCADE ON UPDATE CASCADE;
