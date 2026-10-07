-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'SUPERVISOR');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'RENOVATION');

-- CreateEnum
CREATE TYPE "WorkerCategory" AS ENUM ('MASONS', 'HELPERS', 'ELECTRICIANS', 'PLUMBERS', 'CARPENTERS', 'PAINTERS', 'STEEL_WORKERS', 'OTHER');

-- CreateEnum
CREATE TYPE "MaterialName" AS ENUM ('CEMENT', 'SAND', 'STEEL_RODS', 'BRICKS', 'BLUE_METAL', 'M_SAND', 'WOOD', 'ELECTRICAL_MATERIALS', 'PLUMBING_MATERIALS');

-- CreateEnum
CREATE TYPE "MaterialUnit" AS ENUM ('BAGS', 'TONS', 'KG', 'NUMBERS', 'CUBIC_FEET');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "OtpStatus" AS ENUM ('PENDING', 'VERIFIED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "code" TEXT NOT NULL,
    "status" "OtpStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "companyName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "siteAddress" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "budget" DOUBLE PRECISION,
    "numberOfFloors" INTEGER,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supervisor" (
    "id" TEXT NOT NULL,
    "supervisorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Supervisor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyUpdate" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supervisorId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "DailyUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkerEntry" (
    "id" TEXT NOT NULL,
    "category" "WorkerCategory" NOT NULL,
    "headcount" INTEGER NOT NULL,
    "dailyWage" DOUBLE PRECISION NOT NULL,
    "totalSalary" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dailyUpdateId" TEXT NOT NULL,

    CONSTRAINT "WorkerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialRequest" (
    "id" TEXT NOT NULL,
    "material" "MaterialName" NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" "MaterialUnit" NOT NULL,
    "urgencyLevel" "UrgencyLevel" NOT NULL DEFAULT 'MEDIUM',
    "requiredByDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dailyUpdateId" TEXT NOT NULL,

    CONSTRAINT "MaterialRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Otp_phone_role_idx" ON "Otp"("phone", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_phone_key" ON "Owner"("phone");

-- CreateIndex
CREATE INDEX "Owner_phone_idx" ON "Owner"("phone");

-- CreateIndex
CREATE INDEX "Project_ownerId_idx" ON "Project"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Supervisor_supervisorId_key" ON "Supervisor"("supervisorId");

-- CreateIndex
CREATE UNIQUE INDEX "Supervisor_phone_key" ON "Supervisor"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Supervisor_email_key" ON "Supervisor"("email");

-- CreateIndex
CREATE INDEX "Supervisor_phone_idx" ON "Supervisor"("phone");

-- CreateIndex
CREATE INDEX "Supervisor_projectId_idx" ON "Supervisor"("projectId");

-- CreateIndex
CREATE INDEX "DailyUpdate_supervisorId_idx" ON "DailyUpdate"("supervisorId");

-- CreateIndex
CREATE INDEX "DailyUpdate_projectId_idx" ON "DailyUpdate"("projectId");

-- CreateIndex
CREATE INDEX "DailyUpdate_date_idx" ON "DailyUpdate"("date");

-- CreateIndex
CREATE INDEX "WorkerEntry_dailyUpdateId_idx" ON "WorkerEntry"("dailyUpdateId");

-- CreateIndex
CREATE INDEX "MaterialRequest_dailyUpdateId_idx" ON "MaterialRequest"("dailyUpdateId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supervisor" ADD CONSTRAINT "Supervisor_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyUpdate" ADD CONSTRAINT "DailyUpdate_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Supervisor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyUpdate" ADD CONSTRAINT "DailyUpdate_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerEntry" ADD CONSTRAINT "WorkerEntry_dailyUpdateId_fkey" FOREIGN KEY ("dailyUpdateId") REFERENCES "DailyUpdate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialRequest" ADD CONSTRAINT "MaterialRequest_dailyUpdateId_fkey" FOREIGN KEY ("dailyUpdateId") REFERENCES "DailyUpdate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
