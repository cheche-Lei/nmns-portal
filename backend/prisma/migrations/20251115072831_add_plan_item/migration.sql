-- CreateTable
CREATE TABLE `plan_items` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `plan_id` BIGINT NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `all_day` BOOLEAN NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `start_timezone` VARCHAR(191) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `end_timezone` VARCHAR(191) NOT NULL,
    `note` TEXT NULL,
    `location_textchar` VARCHAR(191) NULL,
    `location_url` VARCHAR(191) NULL,
    `type_id` INTEGER NULL,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `plan_items` ADD CONSTRAINT `plan_items_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
