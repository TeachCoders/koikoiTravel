import { revalidatePath, revalidateTag } from "next/cache";
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

  if (entity) {
    try {
      (revalidateTag as any)(entity, { expire: 0 });
    } catch {}
  }
  if (slug) {
    try {
      (revalidateTag as any)(slug, { expire: 0 });
      if (entity) (revalidateTag as any)(`${entity}-${slug}`, { expire: 0 });
    } catch {}
  }
  try {
    (revalidateTag as any)("public-cache", { expire: 0 });
  } catch {}

  if (entity === "global") {
    try {
      revalidatePath("/", "layout");
    } catch (err) {
      console.error("[revalidate] Global layout revalidate error:", err);
    }
  }

  if (slug) {
    switch (entity) {
      case "blog":
      case "blogPost":
        paths.add(`/blog/${slug}`);
        break;
      case "journey":
      case "tourPackage":
        paths.add(`/tour-packages/${slug}`);
        if (country) paths.add(`/${country}/tour-packages/${slug}`);
        paths.add(`/india/tour-packages/${slug}`);
        break;
      case "cmsPage":
        paths.add(`/${slug}`);
        break;
      case "travelExperience":
      case "holiday":
        paths.add(`/travel-experiences/${slug}`);
        break;
      case "season":
      case "month":
        paths.add(`/season/${slug}`);
        break;
      case "country":
        paths.add(`/tour-packages/${slug}`);
        break;
      case "state":
        if (country) paths.add(`/tour-packages/${country}/${slug}`);
        paths.add(`/tour-packages/india/${slug}`);
        break;
      case "city":
        if (country && state) paths.add(`/tour-packages/${country}/${state}/${slug}`);
        if (state) paths.add(`/tour-packages/india/${state}/${slug}`);
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
    paths.add("/tour-packages/india");
  }

  for (const path of paths) {
    try {
      revalidatePath(path);
      revalidatePath(path, "page");
    } catch (err) {
      console.error(`[revalidate] Error revalidating ${path}:`, err);
    }
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    paths: [...paths],
  });
}
