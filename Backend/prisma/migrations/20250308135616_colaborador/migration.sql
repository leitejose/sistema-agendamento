/*
  Warnings:

  - You are about to drop the column `nome` on the `colaborador` table. All the data in the column will be lost.
  - You are about to alter the column `valor` on the `servico` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `descricao` to the `Colaborador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `colaborador` DROP COLUMN `nome`,
    ADD COLUMN `descricao` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `servico` MODIFY `valor` DECIMAL NOT NULL;
