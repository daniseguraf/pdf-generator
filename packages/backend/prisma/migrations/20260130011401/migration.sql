-- AlterEnum
ALTER TYPE "ReservationStatus" ADD VALUE 'FINISHED';

-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "deleted_at" TIMESTAMPTZ(3);
