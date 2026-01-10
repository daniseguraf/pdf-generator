-- AlterTable
ALTER TABLE "common_areas" ALTER COLUMN "close_time" DROP NOT NULL,
ALTER COLUMN "close_time" DROP DEFAULT,
ALTER COLUMN "open_time" DROP NOT NULL,
ALTER COLUMN "open_time" DROP DEFAULT;
