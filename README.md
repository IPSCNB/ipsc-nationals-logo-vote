# IPSC Nationals 2027 logo voting website

## What's included
- `index.html`: public, mobile-friendly ballot with three logo choices and optional notes.
- `admin.html`: organizer-only vote counts, percentages, comments, and CSV export.
- `assets/`: artwork cropped from the two uploaded images.
- `supabase.sql`: database tables and row-level security policies.
- `config.js`: connection settings to fill in.

## Publish (GitHub Pages + Supabase)
1. Create a free project at https://supabase.com and open **SQL Editor**. Run the contents of `supabase.sql`.
2. In Supabase **Authentication > Users**, create/invite the organizer's account. Copy its user UUID and run:
   `insert into public.admins(user_id) values ('THE-USER-UUID');`
3. In **Authentication > URL Configuration**, set Site URL to your eventual GitHub Pages voting URL. Add `https://YOURNAME.github.io/YOUR-REPO/admin.html` to Redirect URLs. For passwordless login, configure the email provider as needed and make sure the organizer can receive OTP/magic-link emails. In some Supabase configurations, `shouldCreateUser:false` means the admin must be created in advance.
4. Copy **Project URL** and **publishable/anon key** from Supabase API settings into `config.js`. Never use a secret/service-role key.
5. Create a **new public GitHub repository** for the poll and upload the files at the repository root. Under **Settings > Pages**, deploy from `main` branch / root. Wait for Pages to publish.
6. Share `https://YOURNAME.github.io/YOUR-REPO/` for voting. Keep `.../admin.html` for organizer access. The admin URL itself is not a secret; database row-level security enforces privacy.
7. Test one public vote and a login from the approved admin email before sharing widely.

## Important limitations
- Duplicate protection uses browser local storage plus a unique browser-generated token. It blocks straightforward repeat votes in the same browser but **cannot enforce one vote per human**. Someone using another browser/device or clearing browser data can vote again. For stronger protection, add email verification, CAPTCHA and server-side rate limiting / edge function.
- The public insert endpoint is exposed to spam/automated votes; for a high-stakes election, implement server-side anti-abuse controls before publication.
- The dashboard fetches up to 10,000 votes in a single query; Supabase default API max rows may be 1,000. For large polls, implement paginated reads or server-side aggregates.
- Admins cannot read data unless their auth UUID is present in `public.admins`. Public users cannot read votes or notes.
- Supabase project, admin account, GitHub repository and credentials must be configured by the site owner. The site is **not live** until these steps are done.
