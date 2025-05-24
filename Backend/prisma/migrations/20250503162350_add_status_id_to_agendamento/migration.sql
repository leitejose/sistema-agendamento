/*
  Warnings:

  - You are about to drop the column `disponibilidade` on the `agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `observacao` on the `agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `id_cargo` on the `colaborador` table. All the data in the column will be lost.
  - You are about to drop the column `id_permissao` on the `colaborador` table. All the data in the column will be lost.
  - You are about to alter the column `valor` on the `servico` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(10,2)`.
  - You are about to alter the column `duracao` on the `servico` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the column `cidade` on the `utente` table. All the data in the column will be lost.
  - You are about to drop the column `rua` on the `utente` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Colaborador` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `atualizado_em` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_agendamento` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_inicio` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `agendamento` DROP FOREIGN KEY `Agendamento_id_colaborador_fkey`;

-- DropForeignKey
ALTER TABLE `agendamento` DROP FOREIGN KEY `Agendamento_id_servicos_fkey`;

-- DropForeignKey
ALTER TABLE `agendamento` DROP FOREIGN KEY `Agendamento_id_utente_fkey`;

-- DropForeignKey
ALTER TABLE `colaborador` DROP FOREIGN KEY `Colaborador_id_cargo_fkey`;

-- DropForeignKey
ALTER TABLE `colaborador` DROP FOREIGN KEY `Colaborador_id_permissao_fkey`;

-- DropIndex
DROP INDEX `Colaborador_id_cargo_fkey` ON `colaborador`;

-- DropIndex
DROP INDEX `Colaborador_id_permissao_fkey` ON `colaborador`;

-- DropIndex
DROP INDEX `Permissao_descricao_key` ON `permissao`;

-- AlterTable
ALTER TABLE `agendamento` DROP COLUMN `disponibilidade`,
    DROP COLUMN `estado`,
    DROP COLUMN `observacao`,
    ADD COLUMN `atualizado_em` DATETIME(3) NOT NULL,
    ADD COLUMN `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `data_agendamento` DATETIME(3) NOT NULL,
    ADD COLUMN `hora_fim` DATETIME(3) NULL,
    ADD COLUMN `hora_inicio` DATETIME(3) NOT NULL,
    ADD COLUMN `observacoes` VARCHAR(191) NULL,
    ADD COLUMN `statusId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `cargo` MODIFY `descricao` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `colaborador` DROP COLUMN `id_cargo`,
    DROP COLUMN `id_permissao`,
    ADD COLUMN `cargoId` INTEGER NULL,
    ADD COLUMN `permissaoId` INTEGER NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `senha` VARCHAR(191) NOT NULL,
    MODIFY `telemovel` VARCHAR(191) NOT NULL,
    MODIFY `descricao` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `permissao` MODIFY `descricao` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `servico` MODIFY `valor` DECIMAL(10, 2) NOT NULL,
    MODIFY `duracao` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `utente` DROP COLUMN `cidade`,
    DROP COLUMN `rua`,
    ADD COLUMN `concelho` VARCHAR(191) NULL,
    ADD COLUMN `morada` VARCHAR(191) NULL,
    MODIFY `nome` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `telemovel` VARCHAR(191) NULL,
    MODIFY `distrito` VARCHAR(191) NULL,
    MODIFY `pais` VARCHAR(191) NULL,
    MODIFY `codigo_postal` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `status_agendamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Colaborador_email_key` ON `Colaborador`(`email`);

-- AddForeignKey
ALTER TABLE `Colaborador` ADD CONSTRAINT `Colaborador_cargoId_fkey` FOREIGN KEY (`cargoId`) REFERENCES `Cargo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Colaborador` ADD CONSTRAINT `Colaborador_permissaoId_fkey` FOREIGN KEY (`permissaoId`) REFERENCES `Permissao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `FK_Agendamento_Utente` FOREIGN KEY (`id_utente`) REFERENCES `Utente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `FK_Agendamento_Colaborador` FOREIGN KEY (`id_colaborador`) REFERENCES `Colaborador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `FK_Agendamento_Servico` FOREIGN KEY (`id_servicos`) REFERENCES `Servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `status_agendamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
