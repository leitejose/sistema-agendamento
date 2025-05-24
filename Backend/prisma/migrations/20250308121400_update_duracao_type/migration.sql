/*
  Warnings:

  - You are about to drop the column `cargo` on the `colaborador` table. All the data in the column will be lost.
  - You are about to alter the column `valor` on the `servico` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `id_cargo` to the `Colaborador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `colaborador` DROP COLUMN `cargo`,
    ADD COLUMN `id_cargo` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `servico` MODIFY `valor` DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE `cargo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Colaborador` ADD CONSTRAINT `Colaborador_id_cargo_fkey` FOREIGN KEY (`id_cargo`) REFERENCES `cargo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
