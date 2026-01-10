/*
  Warnings:

  - The values [All] on the enum `DaysOfWeek` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DaysOfWeek_new" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'ALL');
ALTER TABLE "public"."common_areas" ALTER COLUMN "days_available" DROP DEFAULT;
ALTER TABLE "common_areas" ALTER COLUMN "days_available" TYPE "DaysOfWeek_new"[] USING ("days_available"::text::"DaysOfWeek_new"[]);
ALTER TYPE "DaysOfWeek" RENAME TO "DaysOfWeek_old";
ALTER TYPE "DaysOfWeek_new" RENAME TO "DaysOfWeek";
DROP TYPE "public"."DaysOfWeek_old";
ALTER TABLE "common_areas" ALTER COLUMN "days_available" SET DEFAULT ARRAY[]::"DaysOfWeek"[];
COMMIT;
