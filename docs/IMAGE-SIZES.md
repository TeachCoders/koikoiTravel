# Image sizes reference

Every image size the app relies on, where it comes from, and what to upload.
Numbers here were read out of the code and measured against the live site, so
this stays useful when a new section is added.

## The short version

**Upload banners at 1920 x 1080 (16:9) and let the panel crop it.**
The banner panels already resize to **1920 x 750**, which is the ratio almost
every banner on the site already uses. Uploading a pre-cropped image just
throws that consistency away.

| Asset | Upload | Panel outputs | Target file size |
| --- | --- | --- | --- |
| Journey / state / city / season / experience banner | 1920 x 1080 | 1920 x 750 | 150-250 KB |
| Open Graph image (SEO) | any | 400 x 300 | under 40 KB |
| Card thumbnail | 600 x 400 | as uploaded | 30-50 KB |

## Why 1920 x 750

One banner file is reused across every frame below, and those frames run from
2.18:1 to 3.7:1. A 2.56:1 source crops gently in all of them:

| Frame it appears in | Frame size | Ratio | Crop from a 1920 x 750 source |
| --- | --- | --- | --- |
| Journey detail hero tile | 401 x 184 | 2.18:1 | 15% off the sides |
| Destination card | ~528 x 220 | 2.4:1 | 6% off the sides |
| Detail hero (state, city, country, season, experience) | 1920 x 520 | 3.7:1 | 31% off the sides |

A 16:9 source would lose 52% of its height in the detail hero, which is why
the panel crops to 2.56:1 rather than passing the source ratio through.

Keep the subject centred. Everything uses `object-center`, so on a narrow
viewport the sides are what get discarded.

## Frames in the code

| Section | Height | Width | Source |
| --- | --- | --- | --- |
| Home hero | `min-h-[600px] lg:min-h-[680px]` | full bleed | `src/feature/home/components/HeroSection.tsx:32` |
| Detail hero (state, city, country, season, experience) | `h-[300px] sm:h-[380px] md:h-[520px]` | full bleed | `src/feature/destinations/components/StateDetail.tsx:188` and the four sibling detail components |
| Journey detail hero tile | `h-[260px] md:h-[380px]`, 2 x 2 grid | cell ~401 x 184 at 1920 wide | `src/feature/journey/components/JourneyDetail.tsx:198` |
| Journey detail secondary image | `h-[200px] md:h-[280px]` | full | `src/feature/journey/components/JourneyDetail.tsx:774` |
| Tour card thumbnail | `h-[240px]` | card up to 362 | `src/components/shared/TourPackageCard.tsx:56` |
| Destination card | `h-[190px] sm:h-[220px]` | `33vw` | `src/components/shared/DestinationCard.tsx:29` |

The detail hero is full bleed, so it is the widest frame at 1920 x 520. The
2 x 2 journey grid sits inside a `55fr` column of a `max-w-[1600px]` layout,
which is where the 401 x 184 figure comes from.

## Upload panel caps

| Panel | Max output | WebP quality | Source |
| --- | --- | --- | --- |
| Banner upload | 1920 x 750 | 0.80 | `src/components/shared/BannerImageUpload.tsx:220` |
| Generic crop upload | 1920 x 750 | 0.80 | `src/components/shared/ImageCropUpload.tsx:25` |
| Open Graph image | 400 x 300 | 0.85 | `src/components/shared/SeoFields.tsx:317` |

Both crop panels only ever shrink. `BannerImageUpload` does not upscale at
all, so **a source smaller than the cap stays small** and arrives soft. The
generic cropper does upscale, but the banner one does not.

The 1920 x 750 cap replaced an earlier 1200 x 400 limit that was silently
making every uploaded banner smaller than the frame it had to fill.

## Replacing an image in place

`MediaLibrary` has a replace action (pencil icon) that overwrites the file
under its existing name, so the URL and the database row are untouched. It
does **no** resizing, so the replacement has to be supplied at the target
size already, for example 1920 x 750 WebP at quality 0.80.

Replacing one image out of a set leaves the grid mixed, so replace the whole
set at once to keep the rows visually even.

## What is on the site today

Measured across `Backend/public/content`:

| Group | Count | Size | Total |
| --- | --- | --- | --- |
| Banners | 395 | 1920 x 750, avg 210 KB | 86.3 MB |
| Thumbnails | 41 | 400 x 200, avg 18 KB | 0.8 MB |

The thumbnails are slightly under the 362 x 240 they render into, so the
browser upscales them by about 20%. Worth correcting at some point, but it
is not a space problem: the whole thumbnail set is under a megabyte.

## Field to field

| Field | Holds | Typical source |
| --- | --- | --- |
| `banner.images[]` | Hero and grid images, shared everywhere | 1920 x 1080 |
| `thumbImg` | Listing card only | 600 x 400 |
| `galleryImages[]` | Lightbox slides | 1920 x 1080 |

Cards read `thumbImg` first and fall back to `banner.images[0]`, so a missing
thumbnail quietly puts a 210 KB banner into a 362 x 240 slot. Keep `thumbImg`
populated.
