/*
  Warnings:

  - The values [CLUB_HOUSE,COWORKING_SPACE] on the enum `CommonAreas` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CommonAreas_new" AS ENUM ('GYM', 'POOL', 'GRILL_AREA', 'CAFETERIA', 'EVENT_ROOM', 'ROOF_TOP', 'COWORKING');
ALTER TABLE "common_areas" ALTER COLUMN "type" TYPE "CommonAreas_new" USING ("type"::text::"CommonAreas_new");
ALTER TYPE "CommonAreas" RENAME TO "CommonAreas_old";
ALTER TYPE "CommonAreas_new" RENAME TO "CommonAreas";
DROP TYPE "public"."CommonAreas_old";
COMMIT;
