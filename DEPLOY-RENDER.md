# Deploy to Render

Steps to deploy this Next.js app (Codevault) to Render using Docker:

1. Push your repo to GitHub (or another supported Git provider) and ensure the `main` branch (or the branch you want to deploy) is up-to-date.

2. In the Render dashboard, create a new service -> "Web Service" and choose "Docker" or connect via `render.yaml` by linking your repo and enabling the manifest.

3. If not using `render.yaml`, set build and start commands manually:

```bash
npm ci
npm run build
npm run start
```

4. Set these environment variables in the Render dashboard (Factory secrets / Env):

- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL (e.g. https://xxx.supabase.co)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` = (optional) Supabase service role key if server-side operations need it
- `DATABASE_URL` = (optional) your Postgres connection string if used by server code
- `NODE_ENV` = `production`

Do NOT commit secrets to the repository. Use Render's Dashboard or CLI to set them.

5. Deploy: Render will build the Docker image (Dockerfile) and run `npm run start`.

6. Check logs in Render (Build & Live) for errors. Common issues:
- Missing environment variables → app will fail to connect to Supabase.
- Build errors → ensure node version in Render matches local (we use Node 20).

7. After successful deploy, visit the provided Render domain.

Optional: Use the Render CLI to create secrets and deploy programmatically.
