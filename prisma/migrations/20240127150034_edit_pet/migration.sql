/*
  Warnings:

  - A unique constraint covering the columns `[pet_id]` on the table `Registered` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `registered` ADD COLUMN `pet_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Registered_pet_id_key` ON `Registered`(`pet_id`);

-- AddForeignKey
ALTER TABLE `Registered` ADD CONSTRAINT `Registered_pet_id_fkey` FOREIGN KEY (`pet_id`) REFERENCES `Pet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
