# Larkfield Motors

A family-run car dealer's site: every car for sale with its own page and the price on the window, a service page, a page for business buyers, and a test drive booking form.

## Where things are

- Pages: `src/pages/site/larkfield-motors.tsx` holds every page's content: home, /cars, /service, /business, /test-drive, and one page per entry at /cars/<id> (built under `items`). `src/pages/site/index.tsx` picks the page from the address.
- Photos: `src/pages/site/media.ts`, one entry per photo with its alt text.
- Look: `src/style-packs/larkfield.ts` sets the colours, fonts and type sizes. Change them there, not in components.
- Sections: `action-tiles`, `body-stage`, `car-index`, `card-action`, `center-hero`, `contact-details`, `contact-panel`, `feature-cards`, `help-cards`, `menu-list`, `product-row`, `showroom-band`, `site-footer`, `site-header`, `size-chart`, `spec-strip`, `statement-section`, `trim-compare`, `window-sticker` in `src/components/`.
- Contact form: saves to the `contact_messages` table; the admin pages read it.

## Rules

- Type comes from the pack's seven styles: `text-h1` to `text-h4`, `text-large`, body, `text-small`. Never set a font size or a font family in a component.
- Keep every page's single h1, and words people can read in its first screen.
- New database tables go through a migration, not by editing `supabase/migrations/` by hand.
- The first account to sign in owns the inbox: an `auth.users` insert trigger creates a `profiles` row, `public.get_site_owner()` returns the oldest profile, and the contact form tags each message with that id via `supabase.rpc("get_site_owner")`. Keep that chain intact — if the trigger, the function or the tag is removed, enquiries save but nobody can read them.
