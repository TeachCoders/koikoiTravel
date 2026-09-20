-- AlterTable
ALTER TABLE "TravelExperience" ADD COLUMN     "cityOrder" INTEGER[];

-- CreateTable
CREATE TABLE "_CityToTravelExperience" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CityToTravelExperience_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CityToTravelExperience_B_index" ON "_CityToTravelExperience"("B");

-- AddForeignKey
ALTER TABLE "_CityToTravelExperience" ADD CONSTRAINT "_CityToTravelExperience_A_fkey" FOREIGN KEY ("A") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToTravelExperience" ADD CONSTRAINT "_CityToTravelExperience_B_fkey" FOREIGN KEY ("B") REFERENCES "TravelExperience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
