/*
  Warnings:

  - You are about to alter the column `valor` on the `servico` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Changed the type of `duracao` on the `servico` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `servico` MODIFY `valor` DECIMAL NOT NULL,
    DROP COLUMN `duracao`,
    ADD COLUMN `duracao` INTEGER NOT NULL;
