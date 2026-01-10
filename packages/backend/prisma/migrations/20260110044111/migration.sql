/*
  Warnings:

  - You are about to drop the column `name` on the `common_areas` table. All the data in the column will be lost.
  - Added the required column `type` to the `common_areas` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CommonAreas" AS ENUM ('GYM', 'POOL', 'CLUB_HOUSE', 'CAFETERIA', 'EVENT_ROOM', 'ROOF_TOP', 'COWORKING_SPACE');

-- AlterTable
ALTER TABLE "common_areas" DROP COLUMN "name",
ADD COLUMN     "deleted_at" TIMESTAMPTZ(6),
ADD COLUMN     "type" "CommonAreas" NOT NULL,
ALTER COLUMN "capacity" DROP NOT NULL,
ALTER COLUMN "max_hours_per_reservation" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "common_areas" ADD CONSTRAINT "common_areas_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
