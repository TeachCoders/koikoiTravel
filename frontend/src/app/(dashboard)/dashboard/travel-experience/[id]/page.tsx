"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import TravelExperienceFormPage from "@/feature/travelExperience/components/TravelExperienceForm";
import { useGetTravelExperienceById } from "@/feature/travelExperience/api/useTravelExperience";
import PageLoader from "@/components/shared/PageLoader";

export default function EditTravelExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();

  // If Golden Triangle (id 6), always redirect to State 30 dashboard
  useEffect(() => {
    if (Number(id) === 6) {
      router.replace("/dashboard/state/30");
    }
  }, [id, router]);

  const { travelExperience, isLoading } = useGetTravelExperienceById(Number(id));

  if (Number(id) === 6 || isLoading) return <PageLoader size="page" />;
  if (!travelExperience) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-sm">Travel Experience not found</p>
      </div>
    );
  }

  return <TravelExperienceFormPage initialData={travelExperience} mode="edit" />;
}
