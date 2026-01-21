-- AlterTable
ALTER TABLE "users" ADD COLUMN     "building_id" INTEGER;

-- CreateIndex
CREATE INDEX "users_building_id_idx" ON "users"("building_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
