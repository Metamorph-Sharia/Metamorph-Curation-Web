# Metamorph Curation Web

The Metamorph team's console for reviewing and correcting the legal knowledge base. It is built with Next.js (App Router) and TypeScript.

The console has no data or rules of its own. Everything it shows and every change it makes goes through the **curation JSON API**: `metamorph api` in [Metamorph-Knowledge-Platform](../Metamorph-Knowledge-Platform). The design and the migration plan are in that repository, at `docs/curation-web-separation-design.md`.

> **Status (2026-10-20): the curation console**, with the reader, lineage, search and browsing of Pasal.id's gap analysis (`docs/pasal-id-gap-analysis.md` in the platform). It replaced the platform's first, server-rendered curation app, which is retired. Locally, the platform's compose `web` service builds this repository and serves it at http://localhost:8000.

## Pages

| Page | What a curator does there |
|---|---|
| **Overview** `/` | Sees what the publish gate holds back, what waits for review, ingestion health, the registry and the latest loads |
| **Held** `/held?check=` | Works through the documents the publish gate holds back, filtered by check. Those whose last good version is still published come first |
| **Review** `/review?kind=` | Resolves or dismisses conflicts, unlinked citations and quarantined lines, each with a note |
| **Documents** `/documents?q=&kind=&issuer=&family=&year=&status=&state=` | Finds documents by ID, citation, title, alias or words in their published text, and the matching articles (`kind=articles`), with filters and their counts. Without a query, lists every document the filters leave |
| **Browse** `/browse`, `/browse/{issuer}/{family}?year=` | Every series the registry holds; a series by year and number, with the numbers not held marked |
| **A document** `/documents/{id}` | Sees why it is held, or that it is suppressed. On the same page, the curator can: correct and withdraw fields; approve a text's problems as they are; open its files and texts; link citations; decide conflicts; assign an ID; suppress and restore |
| **Read the text** `/documents/{id}/read?text=&part=&at=&pdf=1` | Reads a text as the parser cut it: the outline, each article in full, gaps in the numbering, what later documents changed (and their new wording), references to other articles as links, the PDF beside it. Each article can be linked, cited, opened at its PDF page, or corrected |
| **Correct the text** `…/texts/{sha}/edit` | Fixes a main text's wording in an editor (CodeMirror) that keeps page markers as they are. Saving parses, checks and publishes at once |
| **Text correction** `…/texts/{sha}/correction` | Compares a correction with the source's wording, line by line |
| **Add Document** `/documents/new` | Adds a document no connector holds. Its file goes straight from the browser to the object store |

## How it is built

```
browser ──▶ Next.js server (this app) ──▶ curation API (private network) ──▶ PostgreSQL, S3
              pages: server components read; server actions change
browser ──▶ S3, only through short-lived links the API signs (opening a file, uploading one)
```

- **The browser talks only to this app** (ADR-2), apart from files, which go to and from the object store through short-lived signed links (ADR-5). The API's address and the curator's token stay on the server.
- **The curator's session** is the API's short-lived token, kept in an httpOnly, SameSite=Lax cookie. The cookie is Secure outside local development (ADR-4). `src/proxy.ts` only checks that the cookie exists. The API checks that the session is valid on every request.
- **Curation data is always live.** Every read happens at request time (`connection()`), behind a `<Suspense>` boundary. The page's frame prerenders, and the data streams in.
- **Every change is a server action that calls one API action.** The API runs the use case, then parses, publishes and re-checks the publish gate, then answers. On success the action redirects back with a notice (`?done=…`). When the change can't apply, the action answers its form, and the form shows why beside itself while keeping what the curator typed. Leaving a page with unsent entries asks first.

| Path | What it is |
|---|---|
| `src/app/` | Routes. `sign-in/` is the form and its action. `(console)/` is the signed-in frame, its pages, and the server actions in each page's `actions.ts` |
| `src/lib/api/` | **The only code that knows the API.** It is server-only. `schema.d.ts` is generated from the contract. `curation.ts` holds the reads; `changes.ts` holds `perform()`, which the actions call. `errors.ts` holds the API's error shapes |
| `src/lib/` | The session cookie, and the pure presentation rules: dates and values, labels and notices, links, page markers |
| `src/components/` | The views (plain data in, markup out), and the forms: `ActionForm` for every action, the text editor (`text-editor/`, loaded on its page only), and the add-document form (`add-document/`) |

Dependencies point one way: `app/` → `components/` and `lib/`. Only `lib/api/` knows the API exists, and views never import it.

The visual design is a legal reader's, after [pasal.id](https://pasal.id): warm paper, white cards with hairline borders, one deep-green accent, an 8px radius, and light and dark modes from the same tokens (`src/app/globals.css`). Headings are set in Instrument Serif, text in Instrument Sans, IDs and code in Geist Mono. The shared looks (card, control, link, button, notice) are class lists in `src/components/styles.ts`.

## Run it

**As the team uses it:** `docker compose up -d web` in Metamorph-Knowledge-Platform. That builds this repository, starts the API it needs, and serves the console at http://localhost:8000.

**To develop it,** you need Node 22, and the curation API running: `docker compose up -d api` in Metamorph-Knowledge-Platform, at http://localhost:8001.

```bash
cp .env.example .env.local
npm install
npm run dev                 # http://localhost:3000; sign in with a curation account (METAMORPH_CURATORS on the API)
```

To add documents from the browser, the bucket must let this app's origin upload into it:

```bash
uv run --env-file .env metamorph storage init --upload-origin http://localhost:3000   # in the platform repository
                                                                                     # (and :8000 for the compose web service)
```

## The contract

The API's types are generated from its OpenAPI document, `docs/api/openapi.json` in the platform repository, which a platform test keeps in step with the API's code.

```bash
npm run api:types           # regenerate src/lib/api/schema.d.ts (METAMORPH_OPENAPI points at another copy)
npm run api:check           # fail if the committed types no longer match the contract (CI does this)
```

## Check it

```bash
npm run lint
npm run typecheck
npm test                    # unit tests (Vitest): presentation rules, views, the editor's page-marker protection
npm run test:e2e            # Playwright: every page and action, on a production build, against the real API
```

**The end-to-end tests change data, so they run in a world of their own:**
- the `metamorph_e2e` database and the `metamorph-e2e` bucket;
- the API on port 8012 (`e2e/api.sh`), with a test account;
- a fresh seed for each spec file (`e2e/seed.sh`, about two seconds), loading `e2e/fixtures/bundle`: one published paged document, the regulation amending it, two held for their structure, and one held for its identity.

They need the platform repository beside this one (or `METAMORPH_PLATFORM`), its compose `postgres` and `objectstore`, and `uv`. They include adding and correcting a 1.8 MB text, the longest the platform holds. CI (`.github/workflows/ci.yml`) runs all of the checks.

## Deploy

`Dockerfile` builds Next.js's standalone output. Run it:
- with `METAMORPH_API_URL` set to the API's private address;
- behind the HTTPS load balancer, in the same AWS network as the API.

With more than one instance, set the same `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` on all of them. The bucket must allow uploads from the app's origin: `metamorph storage init --upload-origin https://<the app's domain>`.
