# Prometheus Review Desk

Prometheus reviews campaign copy against approved product facts and brand rules. The fictional Aster Watch campaign demonstrates how an evidence change affects existing approvals and how a reviewer can correct and reapprove a revision.

[Open the hosted Aster Watch demo](https://prometheus-review-desk.vercel.app/campaigns/aster)

## What to try

1. Open the Aster Watch campaign and inspect its three seeded assets.
2. In **Fact registry**, preview and publish a change to Battery life. The affected assets depend on the publication date and the exact fact version cited by each claim.
3. Open **Launch email** and select a finding to see the quoted span and source. Correct the number and operating condition, save a revision, then re-audit and approve it.
4. Inspect **Revision history** for the original decisions and evidence. **Retail poster** also includes a separate contrast check for its call to action.

The app also includes an audit sandbox, a brand rules view, a channel simulator, telemetry, and a campaign certificate view. The verifier uses deterministic rules for a bounded claim grammar. Source quotes come from reviewers and unfamiliar wording can require manual review. See the [live demo script](docs/DEMO.md), [architecture notes](docs/ARCHITECTURE.md), and [synthetic evaluation](evaluation/README.md).

## Run locally

Use Node.js **24.14 or later in the 24.x series** and npm. Run these commands in the repository root.

```sh
npm ci
npm run db:migrate
npm run db:seed
npm run dev
```

Open the [local Aster Watch campaign](http://localhost:3000/campaigns/aster). The default database is `data/prometheus.sqlite`. Set `PROMETHEUS_DB` before running the commands to choose a different SQLite file. Seeding preserves existing edits. To create a separate fictional workspace, run `npm run demo:fresh -- rehearsal` and use the database path it prints.

For a local production build, stop the development server, run `npm run build`, then `npm start`.

## Deploy on Vercel

Import this repository as a Next.js project, select Node.js **24.x**, and keep the repository root as the project root. The hosted demo migrates and seeds its own SQLite file on first use. The SQL migrations are included in the server bundle.

The live demo was deployed with the Vercel CLI. To deploy manually, authenticate with `npx vercel login`, link the checkout to your project with `npx vercel link`, then run `npx vercel deploy --prod`. [Vercel CLI deployment guide](https://vercel.com/docs/projects/deploy-from-cli)

Vercel functions use writable scratch storage for this demo. Edits can reset or differ between instances. Use fictional data, since the demo reviewer identity has no authentication. A shared production workflow requires durable storage and access controls. [Vercel filesystem documentation](https://vercel.com/docs/functions/runtimes#file-system-support)

## Verify changes

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright starts isolated local servers and temporary databases. Stop any app using ports 3000 or 3198–3200 before running it. The [release report](docs/RELEASE.md) describes the previous rehearsal and its measured limits.
