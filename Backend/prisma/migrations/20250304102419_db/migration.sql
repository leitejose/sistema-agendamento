/*
  Warnings:

  - The primary key for the `colaborador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `colaborador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `nome` on the `colaborador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `email` on the `colaborador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - Added the required column `cargo` to the `Colaborador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_permissao` to the `Colaborador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Colaborador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telemovel` to the `Colaborador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `colaborador` DROP PRIMARY KEY,
    ADD COLUMN `cargo` VARCHAR(45) NOT NULL,
    ADD COLUMN `id_permissao` INTEGER NOT NULL,
    ADD COLUMN `senha` VARCHAR(100) NOT NULL,
    ADD COLUMN `telemovel` VARCHAR(45) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `nome` VARCHAR(100) NOT NULL,
    MODIFY `email` VARCHAR(45) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Permissao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `Permissao_descricao_key`(`descricao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Utente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `telemovel` VARCHAR(45) NOT NULL,
    `rua` VARCHAR(100) NOT NULL,
    `cidade` VARCHAR(45) NOT NULL,
    `distrito` VARCHAR(45) NOT NULL,
    `pais` VARCHAR(45) NOT NULL,
    `codigo_postal` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NOT NULL,
    `valor` DECIMAL NOT NULL,
    `duracao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agendamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_utente` INTEGER NOT NULL,
    `id_servicos` INTEGER NOT NULL,
    `id_colaborador` INTEGER NOT NULL,
    `disponibilidade` INTEGER NOT NULL,
    `estado` VARCHAR(45) NOT NULL,
    `observacao` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disponibilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_colaborador` INTEGER NOT NULL,
    `dia_da_semana` DATETIME(3) NOT NULL,
    `hora_inicio` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Colaborador` ADD CONSTRAINT `Colaborador_id_permissao_fkey` FOREIGN KEY (`id_permissao`) REFERENCES `Permissao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_id_utente_fkey` FOREIGN KEY (`id_utente`) REFERENCES `Utente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_id_servicos_fkey` FOREIGN KEY (`id_servicos`) REFERENCES `Servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_id_colaborador_fkey` FOREIGN KEY (`id_colaborador`) REFERENCES `Colaborador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Disponibilidade` ADD CONSTRAINT `Disponibilidade_id_colaborador_fkey` FOREIGN KEY (`id_colaborador`) REFERENCES `Colaborador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
