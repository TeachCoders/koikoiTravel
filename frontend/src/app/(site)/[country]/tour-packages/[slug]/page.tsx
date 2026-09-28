import { redirect, notFound } from "next/navigation";
import { fetchBySlugCached } from "@/feature/destinations/api/public-server";
import type { Journey } from "@/feature/journey/type";
import { journeyParams } from "@/lib/prerender";

export const revalidate = 300;

export async function generateStaticParams() {
  return journeyParams();
}

type Props = { params: Promise<{ country: string; slug: string }> };

export default async function OldJourneyRedirectPage({ params }: Props) {
  const { slug } = await params;
  const journey = await fetchBySlugCached<Journey>("/journey/by-slug", slug);
  if (!journey) notFound();
  redirect(`/tour-packages/${journey.slug}`);
}
