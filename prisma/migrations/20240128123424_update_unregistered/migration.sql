-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('RECORDER', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'ADMIN',

    UNIQUE INDEX `Admin_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recorder` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `subdistrict_id` INTEGER NOT NULL,
    `role` ENUM('RECORDER', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'RECORDER',

    UNIQUE INDEX `Recorder_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subdistrict` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sub_district` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `house_name` VARCHAR(191) NOT NULL,
    `house_number` VARCHAR(191) NOT NULL,
    `moo` VARCHAR(191) NOT NULL,
    `soi` VARCHAR(191) NULL,
    `street` VARCHAR(191) NULL,
    `recorder_id` VARCHAR(191) NULL,
    `subdistrictId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pet_owner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `identity_number` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `address_id` INTEGER NOT NULL,
    `recorder_id` VARCHAR(191) NULL,

    UNIQUE INDEX `Pet_owner_address_id_key`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('DOG', 'CAT') NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `defect` VARCHAR(191) NOT NULL,
    `age` DOUBLE NOT NULL DEFAULT 0.1,
    `vaccined` ENUM('VACCINED', 'NOT_VACCINED') NOT NULL DEFAULT 'NOT_VACCINED',
    `vaccine_date` VARCHAR(191) NOT NULL,
    `sterilized` ENUM('STERILIZED', 'NOT_STERILIZED') NOT NULL DEFAULT 'NOT_STERILIZED',
    `location_id` INTEGER NOT NULL,
    `nature_id` INTEGER NOT NULL,
    `pet_owner_id` INTEGER NOT NULL,
    `recorder_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,
    `name_location` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_nature` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unregistered` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address_moo` VARCHAR(191) NOT NULL,
    `dog_amount` INTEGER NOT NULL,
    `cat_amount` INTEGER NOT NULL,
    `name_info` VARCHAR(191) NOT NULL,
    `location_id` INTEGER NOT NULL,
    `vaccined` ENUM('VACCINED', 'NOT_VACCINED') NOT NULL DEFAULT 'NOT_VACCINED',
    `vaccine_date` DATETIME(3) NOT NULL,
    `sterilized` ENUM('STERILIZED', 'NOT_STERILIZED') NOT NULL DEFAULT 'NOT_STERILIZED',
    `subdistrict_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recorder` ADD CONSTRAINT `Recorder_subdistrict_id_fkey` FOREIGN KEY (`subdistrict_id`) REFERENCES `Subdistrict`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_recorder_id_fkey` FOREIGN KEY (`recorder_id`) REFERENCES `Recorder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_subdistrictId_fkey` FOREIGN KEY (`subdistrictId`) REFERENCES `Subdistrict`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pet_owner` ADD CONSTRAINT `Pet_owner_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pet_owner` ADD CONSTRAINT `Pet_owner_recorder_id_fkey` FOREIGN KEY (`recorder_id`) REFERENCES `Recorder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_nature_id_fkey` FOREIGN KEY (`nature_id`) REFERENCES `Nature`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_pet_owner_id_fkey` FOREIGN KEY (`pet_owner_id`) REFERENCES `Pet_owner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_recorder_id_fkey` FOREIGN KEY (`recorder_id`) REFERENCES `Recorder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unregistered` ADD CONSTRAINT `Unregistered_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unregistered` ADD CONSTRAINT `Unregistered_subdistrict_id_fkey` FOREIGN KEY (`subdistrict_id`) REFERENCES `Subdistrict`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
