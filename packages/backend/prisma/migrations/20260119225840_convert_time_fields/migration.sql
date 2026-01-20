-- AlterTable buildings (cambio de precisión)
ALTER TABLE "buildings"
  ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
  ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3),
  ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable users (cambio de precisión)
ALTER TABLE "users"
  ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
  ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable common_areas (convertir String a TIME)
ALTER TABLE "common_areas"
  ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
  ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3),
  ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ(3),
  -- Convertir open_time de String a TIME
  ALTER COLUMN "open_time" TYPE TIME(0) USING open_time::TIME,
  -- Convertir close_time de String a TIME
  ALTER COLUMN "close_time" TYPE TIME(0) USING close_time::TIME;

-- AlterTable reservations (convertir String a TIMESTAMPTZ)
ALTER TABLE "reservations"
  ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
  ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3),
  ALTER COLUMN "date" SET DATA TYPE TIMESTAMPTZ(3),
  -- Convertir start_time de String a TIMESTAMPTZ
  ALTER COLUMN "start_time" TYPE TIMESTAMPTZ(3) USING start_time::TIMESTAMPTZ,
  -- Convertir end_time de String a TIMESTAMPTZ
  ALTER COLUMN "end_time" TYPE TIMESTAMPTZ(3) USING end_time::TIMESTAMPTZ;

-- CreateIndex
CREATE INDEX IF NOT EXISTS "reservations_common_area_id_start_time_end_time_idx"
  ON "reservations"("common_area_id", "start_time", "end_time");