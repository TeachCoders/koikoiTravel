"use client";

import {
  SingleDestinationReusableCard,
  SingleDestinationReusableCardProps,
} from "./SingleDestinationReusableCard";

export type DestinationCardProps = SingleDestinationReusableCardProps;

/**
 * DestinationCard (alias / wrapper for SingleDestinationReusableCard)
 * Preserved for backwards compatibility while maintaining a single shared implementation.
 */
export default function DestinationCard(props: DestinationCardProps) {
  return <SingleDestinationReusableCard {...props} />;
}

export { SingleDestinationReusableCard };
