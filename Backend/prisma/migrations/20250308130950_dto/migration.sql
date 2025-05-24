/*
  Warnings:

  - You are about to alter the column `valor` on the `servico` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `servico` MODIFY `valor` DECIMAL NOT NULL;
