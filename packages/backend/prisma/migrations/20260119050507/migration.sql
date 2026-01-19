/*
  Warnings:

  - The values [PENDING] on the enum `ReservationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `resident_id` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the `residents` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReservationStatus_new" AS ENUM ('IN_REVIEW', 'CONFIRMED', 'CANCELLED');
ALTER TABLE "public"."reservations" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "reservations" ALTER COLUMN "status" TYPE "ReservationStatus_new" USING ("status"::text::"ReservationStatus_new");
ALTER TYPE "ReservationStatus" RENAME TO "ReservationStatus_old";
ALTER TYPE "ReservationStatus_new" RENAME TO "ReservationStatus";
DROP TYPE "public"."ReservationStatus_old";
ALTER TABLE "reservations" ALTER COLUMN "status" SET DEFAULT 'IN_REVIEW';
COMMIT;

-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_resident_id_fkey";

-- DropIndex
DROP INDEX "reservations_resident_id_idx";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "resident_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'IN_REVIEW';

-- DropTable
DROP TABLE "residents";

-- CreateIndex
CREATE INDEX "reservations_user_id_idx" ON "reservations"("user_id");

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
