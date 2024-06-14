/*
  Warnings:

  - The primary key for the `sample` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `sample` DROP PRIMARY KEY,
    ADD COLUMN `description` TEXT NULL,
    MODIFY `id` VARCHAR(100) NOT NULL,
    ADD PRIMARY KEY (`id`);
