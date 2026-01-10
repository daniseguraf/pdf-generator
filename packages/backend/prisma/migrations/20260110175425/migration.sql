/*
  Warnings:

  - The `days_available` column on the `common_areas` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DaysOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "common_areas" DROP COLUMN "days_available",
ADD COLUMN     "days_available" "DaysOfWeek"[] DEFAULT ARRAY[]::"DaysOfWeek"[];
