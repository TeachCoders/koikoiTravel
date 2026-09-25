-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[];
