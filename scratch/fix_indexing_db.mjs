import { prisma } from "./utils/prismaConnection.js";

const CANCELLATION_POLICY_HTML = `
<h2>1. Overview & Commitment to Transparency</h2>
<p>
  At <strong>KoiKoi Travel</strong>, we understand that travel plans can sometimes change unexpectedly due to personal emergencies, flight delays, health concerns, or unforeseen events. We strive to provide transparent, fair, and traveler-friendly cancellation and refund terms while respecting our commitments to partnered hotels, safari operators, and transport providers across India.
</p>

<h2>2. Tour Package Cancellation Terms</h2>
<p>
  Cancellation requests must be submitted in writing via email to <strong>booking@koikoitravel.com</strong> or through your dedicated KoiKoi Travel relationship manager. The effective cancellation date is the date on which written communication is received during regular business hours (10:00 AM – 6:00 PM IST).
</p>
<p>
  Standard refund calculations based on notice prior to the tour start date are as follows:
</p>
<ul>
  <li><strong>30 Days or More Prior to Arrival:</strong> Full refund of package deposit minus standard administrative processing fee (₹1,500 / $25 USD per booking) and any non-refundable permits or non-refundable train/flight tickets already issued.</li>
  <li><strong>15 to 29 Days Prior to Arrival:</strong> 75% refund of total tour package cost minus actual non-refundable hotel deposits.</li>
  <li><strong>7 to 14 Days Prior to Arrival:</strong> 50% refund of total tour package cost.</li>
  <li><strong>Less than 7 Days / No-Show:</strong> 100% cancellation charges apply (no refund), as accommodations, vehicles, and guides are fully committed.</li>
</ul>

<h2>3. High Peak Season Policy</h2>
<p>
  For tours scheduled during national peak holiday periods—specifically <strong>Diwali festive week, Christmas & New Year (December 20 to January 5), Pushkar Camel Fair dates, and Ladakh summer peak (June–July)</strong>—hotels enforce strict non-refundable retention policies. Cancellations made within 30 days of arrival during peak periods may incur up to 100% cancellation charges based on individual hotel contracts.
</p>

<h2>4. Jungle Safari & Monument Tickets</h2>
<p>
  Government safari zones (e.g., Ranthambore, Jim Corbett, Kaziranga, Bandhavgarh) and special heritage monument permits are issued directly by forest and archaeological authorities in the traveler's name. As per government rules, <strong>safari booking fees and monument entry permits are 100% non-refundable and non-transferable</strong> once booked.
</p>

<h2>5. Date Rescheduling & Trip Postponement</h2>
<p>
  If you need to postpone your trip rather than cancel, KoiKoi Travel offers free trip rescheduling subject to hotel availability and seasonal tariff differences:
</p>
<ul>
  <li>Rescheduling requests made at least <strong>15 days prior to arrival</strong> will carry over 100% of your booking amount to future travel dates valid for up to 12 months.</li>
  <li>Any seasonal price differences (e.g., moving from low season to peak season) will be adjusted in the final balance.</li>
</ul>

<h2>6. Refund Processing Timelines & Mode</h2>
<p>
  Approved refunds are initiated within <strong>3 to 5 business days</strong> following cancellation confirmation. Depending on your banking institution or card issuer, funds typically reflect in your original payment method (Credit Card, Debit Card, Net Banking, UPI, or International Wire Transfer) within <strong>7 to 10 working days</strong>.
</p>

<h2>7. Force Majeure & Natural Calamities</h2>
<p>
  In the rare event that travel becomes impossible due to acts of God, extreme natural disasters, government travel bans, or road closures (such as landslides in mountainous terrain), KoiKoi Travel will make every effort to reroute itineraries, reschedule stays, or provide credit vouchers for future travel without penalizing travelers.
</p>

<h2>8. Contact Us Regarding Your Booking</h2>
<p>
  For cancellation, amendment, or refund queries, please contact our support desk:
</p>
<ul>
  <li><strong>Email:</strong> support@koikoitravel.com / booking@koikoitravel.com</li>
  <li><strong>Support Hours:</strong> Monday – Saturday (9:30 AM to 7:00 PM IST)</li>
  <li><strong>Emergency WhatsApp:</strong> Available 24/7 for travelers currently on active tours</li>
</ul>
`.trim();

async function main() {
  console.log("=== FIXING INDEXING & DATABASE ISSUES ===");

  // 1. Activate Kanchipuram
  const kanchi = await prisma.city.update({
    where: { slug: "kanchipuram" },
    data: { isActive: true }
  });
  console.log("✅ Activated Kanchipuram city:", { id: kanchi.id, slug: kanchi.slug, isActive: kanchi.isActive });

  // 2. Upsert cancellation-and-refund CMS page
  const cancel1 = await prisma.cmsPage.upsert({
    where: { slug: "cancellation-and-refund" },
    update: {
      title: "Cancellation and Refund Policy",
      seoTitle: "Cancellation & Refund Policy",
      h1Title: "Cancellation & Refund Policy",
      seoDescription: "Review KoiKoi Travel's clear and transparent cancellation, rescheduling, and refund terms for customized India holiday tour packages.",
      seoKeyword: "cancellation policy, refund policy, tour booking cancellation, KoiKoi Travel refunds",
      moreDescription: CANCELLATION_POLICY_HTML,
      canonical: "/cancellation-and-refund",
      isActive: true,
    },
    create: {
      slug: "cancellation-and-refund",
      title: "Cancellation and Refund Policy",
      seoTitle: "Cancellation & Refund Policy",
      h1Title: "Cancellation & Refund Policy",
      seoDescription: "Review KoiKoi Travel's clear and transparent cancellation, rescheduling, and refund terms for customized India holiday tour packages.",
      seoKeyword: "cancellation policy, refund policy, tour booking cancellation, KoiKoi Travel refunds",
      moreDescription: CANCELLATION_POLICY_HTML,
      canonical: "/cancellation-and-refund",
      isActive: true,
    }
  });
  console.log("✅ Upserted cancellation-and-refund CMS page:", { id: cancel1.id, slug: cancel1.slug });

  // 3. Upsert cancellation-and-refund-policy CMS page as mirror
  const cancel2 = await prisma.cmsPage.upsert({
    where: { slug: "cancellation-and-refund-policy" },
    update: {
      title: "Cancellation and Refund Policy",
      seoTitle: "Cancellation & Refund Policy",
      h1Title: "Cancellation & Refund Policy",
      seoDescription: "Review KoiKoi Travel's clear and transparent cancellation, rescheduling, and refund terms for customized India holiday tour packages.",
      seoKeyword: "cancellation policy, refund policy, tour booking cancellation, KoiKoi Travel refunds",
      moreDescription: CANCELLATION_POLICY_HTML,
      canonical: "/cancellation-and-refund",
      isActive: true,
    },
    create: {
      slug: "cancellation-and-refund-policy",
      title: "Cancellation and Refund Policy",
      seoTitle: "Cancellation & Refund Policy",
      h1Title: "Cancellation & Refund Policy",
      seoDescription: "Review KoiKoi Travel's clear and transparent cancellation, rescheduling, and refund terms for customized India holiday tour packages.",
      seoKeyword: "cancellation policy, refund policy, tour booking cancellation, KoiKoi Travel refunds",
      moreDescription: CANCELLATION_POLICY_HTML,
      canonical: "/cancellation-and-refund",
      isActive: true,
    }
  });
  console.log("✅ Upserted cancellation-and-refund-policy CMS page:", { id: cancel2.id, slug: cancel2.slug });
}

main()
  .catch((e) => {
    console.error("Error executing fix_indexing_db:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

