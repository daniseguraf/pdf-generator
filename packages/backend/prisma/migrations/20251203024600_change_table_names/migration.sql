/*
  Warnings:

  - You are about to drop the `Building` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommonArea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommonArea" DROP CONSTRAINT "CommonArea_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_buildingId_fkey";

-- DropTable
DROP TABLE "Building";

-- DropTable
DROP TABLE "CommonArea";

-- DropTable
DROP TABLE "Staff";

-- CreateTable
CREATE TABLE "buildings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "yearBuilt" INTEGER,
    "propertyType" "PropertyType" NOT NULL DEFAULT 'RESIDENTIAL',
    "street" TEXT,
    "avenue" TEXT,
    "number" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postalCode" TEXT,
    "floors" INTEGER NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commonAreas" (
    "id" SERIAL NOT NULL,
    "buildingId" INTEGER,

    CONSTRAINT "commonAreas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "buildingId" INTEGER,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "buildings_email_key" ON "buildings"("email");

-- AddForeignKey
ALTER TABLE "commonAreas" ADD CONSTRAINT "commonAreas_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
