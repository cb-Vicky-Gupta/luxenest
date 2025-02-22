-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "mobileNumber" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
