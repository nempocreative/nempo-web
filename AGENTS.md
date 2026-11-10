<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Architecture rules
- The whole NEMPO site (main pages, `/cms`, `/nempo-feed`) was migrated from nempocreative/remix-of-remix-of-remix-of-remix-of-nempo-feed-migration-4; its schema was rebuilt from the old generated types and is recorded in `docs/schema-baseline/0000_nempo_garut_schema.sql` and `docs/schema-baseline/0001_tighten_visitor_privileges.sql`; why: the source repo carried no migrations, so those files are the schema of record.
- The Drizzle migration set starts empty at the live schema: this project's database was provisioned with the full schema before any migration was recorded, so every new migration must only add or change things and must never recreate a table, type, policy or grant that already exists; why: re-applying the baseline would fail on the existing objects and block every later migration.
- CMS admins are granted only by the `on_auth_user_confirmed_grant_admin` trigger when a verified email matches `admin_allowlist`, or by an existing admin; the CMS login offers activate (sign up + verify) and password reset; why: migrated admins get new auth IDs and must prove email ownership before receiving access.
- Media pointers under `src/assets/` must belong to this project's own storage (re-upload with `lovable-assets create` when bringing files from another project); why: a foreign project's pointer breaks once published.
- MusiComedy's opening bumper lives in its own feed tab with a 4:3 landscape animated stage (ending on a menu-ordering message) and a pre-rendered MP4 download; why: event playback and export must match without changing existing slides.
- Bumper 2 lives in `NempoLogoOpening` with its own `nlo-` styles, separate transparent tagline images, a 12 s CSS timeline shared with a synthesized gamelan track in `public/audio/`, and a prerecorded MP4 with that audio; why: each phrase must animate independently, audio uses public URLs, and playback and download must stay in sync.
- The bumper shows the NEMPO logo and the date/venue footer only in the opening segment and never uses dancer silhouettes; why: the owner asked both to be opening-only/removed, and the stage stays clean for the performers segment.
- MusiComedy slide variants share the frame component through a mode prop: slide 31 shows the performers, slide 32 the scoped cafe animation (respecting reduced motion), slides 33 and 34 neither; slide 33 keeps SlideThirtyThreeReminder (JSX phone mockup and reminder callouts) and slide 34 has its own song-request content in SlideThirtyFourSongRequest (rentetan list lagu + WhatsApp call to action); why: the owner turned slide 34 into the request-a-song slide while slide 33 must stay unchanged.
- Page-level routing inside the NEMPO app goes through `src/lib/wouter.tsx`, a wouter-compatible API backed by TanStack Router; why: keeps one router without rewriting every page. New pages are added to the `Switch` in `src/nempo-app.tsx`.
- tsconfig strict extras (noUncheckedIndexedAccess, exactOptionalPropertyTypes, etc.) are off; why: the imported code was written without them.
- Lazily loaded pages and apps use `lazyWithRetry` from `src/lib/lazy-with-retry.ts` instead of React `lazy`; why: a page file that fails to load after an update otherwise blanks the whole screen — it retries once, then reloads once.
- Nempo Feed slides 32, 33 and 34 each have a downloadable prebuilt MP4 (1080×1440, 30 fps, 30 s) shipped as a pointer in `src/assets/`; slides 33 and 34's videos are recorded from the live preview with CSS animations time-stepped via `document.getAnimations()` (900 frames, deterministic 30 fps) and also keep their real files next to the pointers since they are under 10 MB; why: the CSS animations must export at preview fidelity, and slide 32's file exceeds the repo's 10 MB limit so it stays pointer-only.
- Bumper 3 (Dangdut Halloween) lives in `DangdutHalloweenBumper` with its own `ddh-` styles, a 14 s CSS timeline, and a videotron size switch offering landscape 3:2 and portrait 3:4 (4:3 was removed at the owner's request so the bumper focuses on 3:2); the company logo is a true transparent cut-out, the event name is live typeset lettering (web fonts + CSS outlines, no dark shadow layer, no generated logo image, no stars or sparkles) framed by separate transparent pumpkin, bat and kendang cut-outs, it never shows a "mempersembahkan" line and has no extra captions beyond the event name; each size downloads a pointer-only prebuilt MP4 (1620×1080 / 1080×1440, 30 fps, 14 s) recorded by time-stepping the preview animations; why: it is a separate event and must not change Bumper 1 or 2, and the owner asked for no background box, no small captions and lettering that does not look AI-made.
- GGS Feed slides 7 and 8 share `GgsRatusPromoSlide` with a subject prop and scoped `ggr-` styles, independent client/equipment timelines, stationary original header/footer overlay, and separate 1080×1440 30 fps MP4s captured by time-stepping preview animations; slide 7 uses the tested phase schedule in `ggs-ratus-timeline.ts` and H.264 High, CRF 16, slow preset, yuv420p, faststart from original frames captured at exact integer artboard bounds with no preview frame or rounding overflow; why: text changes and borderless downloads must match the preview without changing slide 8.
- GGS Feed slides 8 and 9 are static photo slides (`GgsRatusBenefitSlide`, `GgsNailPahlawanSlide`) sharing the original header/footer overlay; each download is a prebuilt 3240×4320 PNG in `src/assets/`, prefetched by `PrebuiltPngDownload` (blob link on computers, share sheet on iPad/iPhone), regenerated from the preview (1080 CSS px element at 3× scale, saved as RGB) whenever the slide changes; why: rendering a ~14 MB PNG in the browser fails on iPhones.
- Lock Nempo Feed (and later CMS/backup) pages off published domains (preview only); why: owner wants only the organizer site live. Implemented in src/lib/hosting-lock.ts via Start request middleware.
- Some subdirectories have their own `AGENTS.md` (`src/apps/`); read the nearest one before changing files there; why: those rules are scoped to that folder.
