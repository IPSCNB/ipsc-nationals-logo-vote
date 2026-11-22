# IPSC Nationals 2027 — Logo Voting Website

Five choices, required voter name, optional notes, repeat votes allowed, private admin dashboard and CSV export.

**This is not a Google Form and is not live yet.** This is a static website requiring a GitHub Pages (or other static hosting) deployment and a Supabase project for persistent vote storage.

1. Create a free Supabase project and run `supabase.sql` in SQL Editor. (For a previously configured database, migration is needed; this SQL is intended for a fresh project.)
2. Create an administrator under Authentication > Users, then insert their UUID into `public.admins` with the commented SQL command.
3. Copy the Supabase Project URL and publishable/anon key into `config.js`. Never use a service role key.
4. Upload **all** files, including `assets/`, to the root of a public GitHub repository and enable GitHub Pages for the main branch root.
5. Configure Supabase Auth URL settings for your site's `/admin.html` page. Share the public `index.html` URL with voters; keep `admin.html` for authorized admins.

**Privacy:** Names and notes are not publicly readable via the configured database rules. Anyone with the link can submit multiple votes. A name is self-reported, not verified. Only approved administrator accounts can read submissions. For large voting volumes, the admin view currently loads the newest 10,000 records.
