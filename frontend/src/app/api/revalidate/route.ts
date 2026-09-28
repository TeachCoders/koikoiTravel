import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand revalidation, called by the backend after a CMS/journey/blog save.
 *
 * The marketing pages are statically generated with a 5 minute revalidate
 * window as a safety net, but an editor should not have to wait for it. The
 * backend POSTs here on every save so the page is regenerated immediately.
 *
 * Auth is a shared secret rather than a session cookie: the caller is the
 * backend, not a signed-in browser, and it is on the same private network.
 */
const SECRET = process.env.REVALIDATE_SECRET;

type Payload = {
  entity?: string;
  slug?: string;
  country?: string;
  state?: string;
};

/** Path prefixes whose listing pages embed the edited entity. */
const LIST_PATHS = [
  "/",
  "/destinations",
  "/tour-packages",
  "/travel-experiences",
  "/blog",
  "/packages",
];

export async function POST(request: Request) {
  if (!SECRET) {
    return NextResponse.json(
      { revalidated: false, error: "REVALIDATE_SECRET is not configured" },
      { status: 500 }
    );
  }

  if (request.headers.get("x-revalidate-secret") !== SECRET) {
    return NextResponse.json({ revalidated: false, error: "Unauthorized" }, { status: 401 });
  }

  let payload: Payload = {};
  try {
    payload = (await request.json()) as Payload;
  } catch {
    // An empty body is fine, it just means "revalidate the list pages only".
  }

  const paths = new Set<string>(LIST_PATHS);
  const { entity, slug, country, state } = payload;

  if (slug) {
    switch (entity) {
      case "blog":
        paths.add(`/blog/${slug}`);
        break;
      case "journey":
        paths.add(`/tour-packages/${slug}`);
        break;
      case "cmsPage":
        paths.add(`/${slug}`);
        break;
      case "travelExperience":
        paths.add(`/travel-experiences/${slug}`);
        break;
      case "season":
        paths.add(`/season/${slug}`);
        break;
      case "country":
        paths.add(`/tour-packages/${slug}`);
        break;
      case "state":
        if (country) paths.add(`/tour-packages/${country}/${slug}`);
        break;
      case "city":
        if (country && state) paths.add(`/tour-packages/${country}/${state}/${slug}`);
        break;
      default:
        // Unknown entity: the list paths above still cover the visible change.
        break;
    }
  }

  // A country/state/city edit also changes the descendant pages, and the
  // journey pages that list those destinations, so widen from the parent.
  if (entity === "country" || entity === "state" || entity === "city") {
    if (country) paths.add(`/tour-packages/${country}`);
  }

  for (const path of paths) revalidatePath(path);

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    paths: [...paths],
  });
}
