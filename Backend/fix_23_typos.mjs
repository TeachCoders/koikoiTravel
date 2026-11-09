import { prisma } from "./utils/prismaConnection.js";

async function main() {
  console.log("=== FIXING 23 TYPOS ACROSS DATABASE ===");

  // ----------------------------------------------------
  // 1. 3 Days Golden Triangle (ID 2: 3-days-jaipur-agra-trip-from-delhi-golden-triangle)
  // ----------------------------------------------------
  console.log("\n[1/23] Fixing 3-days-jaipur-agra-trip-from-delhi-golden-triangle (ID 2)...");
  const j2 = await prisma.journey.findUnique({
    where: { id: 2 },
    include: { exclusion: true, days: true },
  });
  if (j2) {
    // A. PPersonal -> Personal in exclusions
    if (j2.exclusion && Array.isArray(j2.exclusion.inclusionList)) {
      const fixedExcl = j2.exclusion.inclusionList.map((item) =>
        item.replace(/\bPPersonal\b/g, "Personal")
      );
      await prisma.exclusion.update({
        where: { id: j2.exclusion.id },
        data: { inclusionList: fixedExcl },
      });
      console.log("  - Fixed PPersonal in exclusions");
    }

    // B. Toota vakya in overView (remove trailing `<p>Mughal heritage.</p>`)
    if (j2.overView) {
      let fixedOverview = j2.overView.replace(/<p>\s*Mughal heritage\.?\s*<\/p>\s*$/i, "").trim();
      await prisma.journey.update({
        where: { id: 2 },
        data: { overView: fixedOverview },
      });
      console.log("  - Fixed toota vakya in overView");
    }

    // C. Day 1: "Visit the magnificent City and enjoy" -> "City Palace"
    // D. Day 2: "Continue your drive to Agra, the city of love"
    for (const d of j2.days) {
      let desc = d.description || "";
      let changed = false;

      // Fix "Visit the magnificent City and enjoy"
      if (desc.includes("Visit the magnificent City and enjoy")) {
        desc = desc.replace(
          "Visit the magnificent City and enjoy",
          "Visit the magnificent City Palace and enjoy"
        );
        changed = true;
      }

      // Fix "city of love" phrasing
      if (desc.includes("Agra, the city of love")) {
        desc = desc.replace(
          "Agra, the city of love",
          "Agra, home to the timeless Taj Mahal"
        );
        changed = true;
      }

      // Check any "Ariva" typo
      if (/\bAriva\b/i.test(desc) || /\bAriva\b/i.test(d.day)) {
        desc = desc.replace(/\bAriva\b/gi, "Arrival");
        const fixedDayTitle = d.day.replace(/\bAriva\b/gi, "Arrival");
        await prisma.journeyDay.update({
          where: { id: d.id },
          data: { day: fixedDayTitle, description: desc },
        });
        console.log(`  - Fixed Ariva in Day ${d.id}`);
        changed = false;
      } else if (changed) {
        await prisma.journeyDay.update({
          where: { id: d.id },
          data: { description: desc },
        });
        console.log(`  - Updated Day ${d.id} content`);
      }
    }
  }

  // ----------------------------------------------------
  // 2. 10 Days South India (ID 141: 10-days-south-india-tour-package)
  // ----------------------------------------------------
  console.log("\n[2/23] Fixing 10-days-south-india-tour-package (ID 141)...");
  const j141 = await prisma.journey.findUnique({
    where: { id: 141 },
  });
  if (j141 && Array.isArray(j141.highlights)) {
    const fixedHighlights = j141.highlights.map((h) => {
      let s = h;
      if (s.includes("Meenakshi Temple in Madura")) {
        s = s.replace("Meenakshi Temple in Madura", "Meenakshi Temple in Madurai");
      }
      if (s.includes("KoiKoi Trave") && !s.includes("KoiKoi Travel")) {
        s = s.replace(/KoiKoi Trave\b/g, "KoiKoi Travel");
      }
      return s;
    });
    await prisma.journey.update({
      where: { id: 141 },
      data: { highlights: fixedHighlights },
    });
    console.log("  - Fixed Madura -> Madurai and KoiKoi Trave -> Travel in highlights");
  }

  // ----------------------------------------------------
  // 3. 6 Days Kerala Honeymoon (ID 136: 6-days-kerala-honeymoon-tour)
  // ----------------------------------------------------
  console.log("\n[3/23] Fixing 6-days-kerala-honeymoon-tour (ID 136)...");
  const j136 = await prisma.journey.findUnique({
    where: { id: 136 },
    include: { days: true },
  });
  if (j136) {
    if (j136.seoTitle && j136.seoTitle.includes("|s")) {
      const fixedTitle = j136.seoTitle.replace(/\|s\s*/g, "| ").trim();
      await prisma.journey.update({
        where: { id: 136 },
        data: { seoTitle: fixedTitle },
      });
      console.log(`  - Fixed seoTitle: "${fixedTitle}"`);
    }

    // Remove duplicate <p><strong>Overnight:</strong> ...</p>
    for (const d of j136.days) {
      let desc = d.description || "";
      if (desc.includes("Overnight Stay:") && desc.includes("<p><strong>Overnight:</strong>")) {
        // Remove trailing <p><strong>Overnight:</strong> ...</p>
        desc = desc.replace(/<p>\s*<strong>\s*Overnight:\s*<\/strong>.*?<\/p>\s*$/gi, "").trim();
        await prisma.journeyDay.update({
          where: { id: d.id },
          data: { description: desc },
        });
        console.log(`  - Removed duplicate Overnight in Day ${d.id}`);
      } else if (desc.includes("<p><strong>Overnight:</strong> <strong>None</strong></p>")) {
        desc = desc.replace(/<p>\s*<strong>\s*Overnight:\s*<\/strong>\s*<strong>\s*None\s*<\/strong>\s*<\/p>\s*$/gi, "").trim();
        await prisma.journeyDay.update({
          where: { id: d.id },
          data: { description: desc },
        });
        console.log(`  - Removed Overnight None in final Day ${d.id}`);
      }
    }
  }

  // ----------------------------------------------------
  // 4. 10 Days Rajasthan + GT (ID 102: 10-days-rajasthan-trip-including-golden-triangle)
  // ----------------------------------------------------
  console.log("\n[4/23] Fixing 10-days-rajasthan-trip-including-golden-triangle (ID 102)...");
  const j102 = await prisma.journey.findUnique({
    where: { id: 102 },
    include: { days: true },
  });
  if (j102) {
    if (j102.overView && j102.overView.includes("<p>lanning Rajasthan")) {
      const fixedOverView = j102.overView.replace("<p>lanning Rajasthan", "<p>Planning Rajasthan");
      await prisma.journey.update({
        where: { id: 102 },
        data: { overView: fixedOverView },
      });
      console.log("  - Fixed 'lanning' -> 'Planning' in overView");
    }

    for (const d of j102.days) {
      let desc = d.description || "";
      if (desc.includes("10 Days Rajasthan Trip Includin")) {
        desc = desc.replace(
          /<p>Your\s*<strong>10 Days Rajasthan Trip Includin<\/strong><\/p>/gi,
          "<p>Your <strong>10 Days Rajasthan Trip Including Golden Triangle</strong> comes to an end with wonderful memories. We wish you a safe onward journey.</p>"
        );
        desc = desc.replace(
          /10 Days Rajasthan Trip Includin\b/gi,
          "10 Days Rajasthan Trip Including Golden Triangle"
        );
        await prisma.journeyDay.update({
          where: { id: d.id },
          data: { description: desc },
        });
        console.log(`  - Fixed "Trip Includin" kata in Day ${d.id}`);
      }
    }
  }

  // ----------------------------------------------------
  // 5. 15 Days North India Wildlife (ID 109: 15-days-north-india-wildlife-cultural-tour)
  // ----------------------------------------------------
  console.log("\n[5/23] Fixing 15-days-north-india-wildlife-cultural-tour (ID 109)...");
  const j109 = await prisma.journey.findUnique({
    where: { id: 109 },
    include: { exclusion: true, days: true },
  });
  if (j109) {
    if (j109.exclusion && Array.isArray(j109.exclusion.inclusionList)) {
      const fixedExcl = j109.exclusion.inclusionList.map((item) =>
        item.replace(/beyond contr\b/gi, "beyond control")
      );
      await prisma.exclusion.update({
        where: { id: j109.exclusion.id },
        data: { inclusionList: fixedExcl },
      });
      console.log("  - Fixed 'beyond contr' -> 'beyond control' in exclusions");
    }

    for (const d of j109.days) {
      let desc = d.description || "";
      if (desc.includes("Penc</p>")) {
        desc = desc.replace(/Penc<\/p>/gi, "Pench</p>");
        await prisma.journeyDay.update({
          where: { id: d.id },
          data: { description: desc },
        });
        console.log(`  - Fixed 'Penc' -> 'Pench' in Day ${d.id}`);
      }
    }
  }

  // ----------------------------------------------------
  // 6. 7 Days Rajasthan (ID 117: 7-days-rajasthan-tour-packages)
  // ----------------------------------------------------
  console.log("\n[6/23] Fixing 7-days-rajasthan-tour-packages (ID 117)...");
  const faqs117 = await prisma.faq.findMany({
    where: { entityId: 117, entityType: "Journey" },
  });
  for (const faq of faqs117) {
    if (faq.ans && faq.ans.includes("Udaip") && !faq.ans.includes("Udaipur")) {
      const fixedAns = faq.ans.replace(/Udaip\b/g, "Udaipur");
      await prisma.faq.update({
        where: { id: faq.id },
        data: { ans: fixedAns },
      });
      console.log(`  - Fixed 'Udaip' -> 'Udaipur' in FAQ ${faq.id}`);
    }
  }

  // ----------------------------------------------------
  // 7. 8 Days GT + Rishikesh Yoga (ID 73: 8-days-golden-triangle-with-rishikesh-yoga-tour)
  // ----------------------------------------------------
  console.log("\n[7/23] Fixing 8-days-golden-triangle-with-rishikesh-yoga-tour (ID 73)...");
  const faqs73 = await prisma.faq.findMany({
    where: { entityId: 73, entityType: "Journey" },
  });
  for (const faq of faqs73) {
    if (faq.ans && faq.ans.includes("treatm")) {
      const fixedAns = faq.ans.replace(/treatm\b/g, "treatments");
      await prisma.faq.update({
        where: { id: faq.id },
        data: { ans: fixedAns },
      });
      console.log(`  - Fixed 'treatm' -> 'treatments' in FAQ ${faq.id}`);
    }
  }

  // ----------------------------------------------------
  // 8. Manali Leh Bike Trip (ID 127: manali-to-leh-ladakh-bike-trip)
  // ----------------------------------------------------
  console.log("\n[8/23] Fixing manali-to-leh-ladakh-bike-trip (ID 127)...");
  const faqs127 = await prisma.faq.findMany({
    where: { entityId: 127, entityType: "Journey" },
  });
  for (const faq of faqs127) {
    if (faq.ques && faq.ques.includes("high mountai")) {
      const fixedQues = faq.ques.replace(/high mountai\b/gi, "high mountain passes?");
      await prisma.faq.update({
        where: { id: faq.id },
        data: { ques: fixedQues },
      });
      console.log(`  - Fixed 'high mountai' -> 'high mountain passes?' in FAQ ${faq.id}`);
    }
  }

  // ----------------------------------------------------
  // 9. India (destination) (Country ID 4)
  // ----------------------------------------------------
  console.log("\n[9/23] Fixing country India (ID 4)...");
  const c4 = await prisma.country.findUnique({ where: { id: 4 } });
  if (c4 && c4.moreDescription && c4.moreDescription.includes("KoiKoi Travles")) {
    const fixedMoreDesc = c4.moreDescription.replace(/KoiKoi Travles\b/g, "KoiKoi Travel");
    await prisma.country.update({
      where: { id: 4 },
      data: { moreDescription: fixedMoreDesc },
    });
    console.log("  - Fixed 'KoiKoi Travles' -> 'KoiKoi Travel' in Country 4");
  }

  // ----------------------------------------------------
  // 10. Nubra Valley (City ID 86)
  // ----------------------------------------------------
  console.log("\n[10/23] Fixing city Nubra Valley (ID 86)...");
  const city86 = await prisma.city.findUnique({ where: { id: 86 } });
  if (city86) {
    let updateData = {};
    if (city86.attractions && city86.attractions.includes("Diskit Monaste") && !city86.attractions.includes("Diskit Monastery")) {
      updateData.attractions = city86.attractions.replace(/Diskit Monaste\b/g, "Diskit Monastery");
    }
    if (city86.overView && city86.overView.includes("Diskit Monaste") && !city86.overView.includes("Diskit Monastery")) {
      updateData.overView = city86.overView.replace(/Diskit Monaste\b/g, "Diskit Monastery");
    }
    if (Object.keys(updateData).length > 0) {
      await prisma.city.update({
        where: { id: 86 },
        data: updateData,
      });
      console.log("  - Fixed 'Diskit Monaste' -> 'Diskit Monastery' in City 86");
    }
  }

  // ----------------------------------------------------
  // 11–19. KoKoi -> KoiKoi across ALL database tables
  // ----------------------------------------------------
  console.log("\n[11-19/23] Fixing all 'KoKoi' -> 'KoiKoi' typos database-wide...");

  // A. JourneyDay descriptions
  const daysWithKoKoi = await prisma.journeyDay.findMany({
    where: { description: { contains: "KoKoi" } },
  });
  console.log(`  - Found ${daysWithKoKoi.length} JourneyDays with 'KoKoi'`);
  for (const d of daysWithKoKoi) {
    const fixed = d.description.replace(/\bKoKoi\b/g, "KoiKoi");
    await prisma.journeyDay.update({
      where: { id: d.id },
      data: { description: fixed },
    });
  }

  // B. FAQs
  const faqsWithKoKoi = await prisma.faq.findMany({
    where: {
      OR: [
        { ques: { contains: "KoKoi" } },
        { ans: { contains: "KoKoi" } },
      ],
    },
  });
  console.log(`  - Found ${faqsWithKoKoi.length} FAQs with 'KoKoi'`);
  for (const f of faqsWithKoKoi) {
    const fixedQues = f.ques ? f.ques.replace(/\bKoKoi\b/g, "KoiKoi") : f.ques;
    const fixedAns = f.ans ? f.ans.replace(/\bKoKoi\b/g, "KoiKoi") : f.ans;
    await prisma.faq.update({
      where: { id: f.id },
      data: { ques: fixedQues, ans: fixedAns },
    });
  }

  // C. Journey fields (title, overView, moreDescription, seoTitle, seoDescription)
  const journeysWithKoKoi = await prisma.journey.findMany({
    where: {
      OR: [
        { title: { contains: "KoKoi" } },
        { overView: { contains: "KoKoi" } },
        { moreDescription: { contains: "KoKoi" } },
        { seoTitle: { contains: "KoKoi" } },
        { seoDescription: { contains: "KoKoi" } },
      ],
    },
  });
  console.log(`  - Found ${journeysWithKoKoi.length} Journeys with 'KoKoi'`);
  for (const j of journeysWithKoKoi) {
    await prisma.journey.update({
      where: { id: j.id },
      data: {
        title: j.title?.replace(/\bKoKoi\b/g, "KoiKoi"),
        overView: j.overView?.replace(/\bKoKoi\b/g, "KoiKoi"),
        moreDescription: j.moreDescription?.replace(/\bKoKoi\b/g, "KoiKoi"),
        seoTitle: j.seoTitle?.replace(/\bKoKoi\b/g, "KoiKoi"),
        seoDescription: j.seoDescription?.replace(/\bKoKoi\b/g, "KoiKoi"),
      },
    });
  }

  // D. Blog posts, Country, State, City, CmsPage using Prisma
  const blogsWithKoKoi = await prisma.blogPost.findMany({
    where: {
      OR: [
        { moreDescription: { contains: "KoKoi" } },
        { title: { contains: "KoKoi" } },
      ],
    },
  });
  for (const b of blogsWithKoKoi) {
    await prisma.blogPost.update({
      where: { id: b.id },
      data: {
        title: b.title.replace(/\bKoKoi\b/g, "KoiKoi"),
        moreDescription: b.moreDescription?.replace(/\bKoKoi\b/g, "KoiKoi"),
      },
    });
  }

  const countriesWithKoKoi = await prisma.country.findMany({
    where: {
      OR: [
        { moreDescription: { contains: "KoKoi" } },
        { overView: { contains: "KoKoi" } },
      ],
    },
  });
  for (const c of countriesWithKoKoi) {
    await prisma.country.update({
      where: { id: c.id },
      data: {
        moreDescription: c.moreDescription?.replace(/\bKoKoi\b/g, "KoiKoi"),
        overView: c.overView?.replace(/\bKoKoi\b/g, "KoiKoi"),
      },
    });
  }

  const statesWithKoKoi = await prisma.state.findMany({
    where: {
      OR: [
        { moreDescription: { contains: "KoKoi" } },
        { overView: { contains: "KoKoi" } },
      ],
    },
  });
  for (const s of statesWithKoKoi) {
    await prisma.state.update({
      where: { id: s.id },
      data: {
        moreDescription: s.moreDescription?.replace(/\bKoKoi\b/g, "KoiKoi"),
        overView: s.overView?.replace(/\bKoKoi\b/g, "KoiKoi"),
      },
    });
  }

  const citiesWithKoKoi = await prisma.city.findMany({
    where: {
      OR: [
        { moreDescription: { contains: "KoKoi" } },
        { overView: { contains: "KoKoi" } },
        { attractions: { contains: "KoKoi" } },
      ],
    },
  });
  for (const ct of citiesWithKoKoi) {
    await prisma.city.update({
      where: { id: ct.id },
      data: {
        moreDescription: ct.moreDescription?.replace(/\bKoKoi\b/g, "KoiKoi"),
        overView: ct.overView?.replace(/\bKoKoi\b/g, "KoiKoi"),
        attractions: ct.attractions?.replace(/\bKoKoi\b/g, "KoiKoi"),
      },
    });
  }
  console.log("  - Database-wide KoKoi cleanup completed.");

  // ----------------------------------------------------
  // 20–23. Duplicate "Overnight" cleanup
  // ----------------------------------------------------
  console.log("\n[20-23/23] Cleaning duplicate 'Overnight' entries in targeted tours...");
  const targetOvernightSlugs = [
    "10-days-golden-triangle-with-shimla-tour",
    "8-days-golden-triangle-tour-with-ranthambore-tiger-safari-tour",
    "9-days-kerala-tour-package-cochin-kovalam",
    "kumarakom-ayurveda-wellness-retreat-3-days",
    "6-days-kerala-honeymoon-tour",
  ];

  for (const slug of targetOvernightSlugs) {
    const j = await prisma.journey.findUnique({
      where: { slug },
      include: { days: true },
    });
    if (!j) continue;
    console.log(`  Cleaning Overnight in ${slug} (${j.days.length} days)...`);
    for (const d of j.days) {
      let desc = d.description || "";
      let modified = false;

      // Case A: Has both `Overnight Stay:` in <li> and `<p><strong>Overnight:</strong>...</p>` after </ul>
      if (desc.includes("Overnight Stay:") && /<p>\s*<strong>\s*Overnight:\s*<\/strong>/i.test(desc)) {
        desc = desc.replace(/<p>\s*<strong>\s*Overnight:\s*<\/strong>.*?<\/p>\s*$/gi, "").trim();
        modified = true;
      }

      // Case B: Final departure day with `<p><strong>Overnight:</strong> <strong>None</strong></p>` or `<p><strong>Overnight:</strong> None</p>`
      if (/<p>\s*<strong>\s*Overnight:\s*<\/strong>\s*(?:<strong>)?\s*None\s*(?:<\/strong>)?\s*<\/p>\s*$/i.test(desc)) {
        desc = desc.replace(/<p>\s*<strong>\s*Overnight:\s*<\/strong>\s*(?:<strong>)?\s*None\s*(?:<\/strong>)?\s*<\/p>\s*$/gi, "").trim();
        modified = true;
      }

      if (modified) {
        await prisma.journeyDay.update({
          where: { id: d.id },
          data: { description: desc },
        });
        console.log(`    - Cleaned Day ${d.id}`);
      }
    }
  }

  console.log("\n=== ALL 23 TYPO FIXES APPLIED SUCCESSFULLY ===");
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
