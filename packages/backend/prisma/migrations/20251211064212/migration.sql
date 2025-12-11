/*
  Warnings:

  - You are about to drop the `staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `manager_id` to the `buildings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('MANAGER', 'SECURITY', 'CLEANER', 'MAINTENANCE', 'GARDENER', 'RECEPTIONIST');

-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_user_id_fkey";

-- AlterTable
ALTER TABLE "buildings" ADD COLUMN     "manager_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "staff";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "StaffRole";

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT,
    "email" TEXT NOT NULL,
    "role" "EmployeeRole" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "start_date" TIMESTAMPTZ(6) NOT NULL,
    "end_date" TIMESTAMPTZ(6),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
