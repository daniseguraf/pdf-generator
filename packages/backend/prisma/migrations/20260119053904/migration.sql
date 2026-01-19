/*
  Warnings:

  - Made the column `capacity` on table `common_areas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `close_time` on table `common_areas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `max_hours_per_reservation` on table `common_areas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `open_time` on table `common_areas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "common_areas" ALTER COLUMN "capacity" SET NOT NULL,
ALTER COLUMN "close_time" SET NOT NULL,
ALTER COLUMN "max_hours_per_reservation" SET NOT NULL,
ALTER COLUMN "max_hours_per_reservation" DROP DEFAULT,
ALTER COLUMN "open_time" SET NOT NULL;

-- AlterTable
ALTER TABLE "reservations" ALTER COLUMN "attendees" DROP DEFAULT;
