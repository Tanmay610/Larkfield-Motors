# Larkfield Motors

A family-run car dealer's site: every car for sale with its own page and the price on the window, a service page, a page for business buyers, and a test drive booking form.

## Pages

- `/`: Home
- `/cars`: Cars for sale
- `/service`: Service
- `/business`: Business
- `/test-drive`: Book a test drive
- `/cars/<id>`: one page per entry, built under `items` in the page file

## Change the words

Every page's words are in `src/pages/site/larkfield-motors.tsx`. The home page is `hero` and `after` (either may be empty); each other page is an entry under `pages`, with its `title` and `content`. The header and footer links are in the same file, under `header` and `footer`. The home page's browser tab title is set in `index.html` and again in `src/pages/site/index.tsx`; change both.

## Change the photos

Photos are listed in `src/pages/site/media.ts`, each with a `src` and an `alt`. Point `src` at your own image, and keep `alt` describing what the photo shows. Use images at least twice as wide as they appear on screen, so they stay sharp on high-resolution displays.

## Change the look

Colours, fonts and type sizes live in one file: `src/style-packs/larkfield.ts`. Change them there and most of the site follows. Some sections also set colours of their own: 9 colour values are typed straight into the files in `src/pages/site/` (search them for `#`); change those there too. See [docs/design.md](docs/design.md).

## Add a page

Add an entry under `pages` in `src/pages/site/larkfield-motors.tsx`, with a `title` and its `content`, built from the components in [docs/components.md](docs/components.md). It appears at `/<its name>`. Add a link to it in the header or footer in the same file.

## Messages from the contact form

The contact form saves each message to the `contact_messages` table. Sign in at `/sign-in` and read them at `/admin/messages`.