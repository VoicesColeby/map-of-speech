# Map of Speech

An interactive map of speech and audio ML repositories on GitHub. Each dot is a repository; proximity indicates shared stargazers. This codebase removes all upstream branding and focuses the experience on speech-related projects only.

Note: This UI consumes pre-built vector tiles and group graphs. You must provide your own data endpoints (no external author endpoints are referenced in code).

## Getting Started

1) Configure data endpoints
- Provide a JSON config object before the app loads (e.g., inline in `index.html`):
```
<script>
  window.__APP_CONFIG__ = {
    dataBaseUrl: "https://YOUR-TILES-AND-GRAPHS-HOST/", // must include trailing slash
    dataVersion: "v1", // folder/version under your host
    oauth: { enabled: false }, // see OAuth section
    brand: { name: "Map of Speech" }
  };
</script>
```
- Expected structure under `dataBaseUrl`:
  - `{version}/points/{z}/{x}/{y}.pbf`
  - `{version}/borders.geojson`
  - `{version}/places.geojson`
  - `{version}/names/{a..z}.json`
  - `{version}/graphs/{groupId}.graph.dot`
  - `fonts/{fontstack}/{range}.pbf`

2) Install and run
- `npm install`
- `npm run dev`

3) Build
- `npm run build`

## Speech Filtering & Scoring
- Only repositories whose names contain at least one speech keyword are rendered on the map and in lists.
- Search/typeahead also restricts to speech.
- A simple score is computed as the number of distinct speech keywords found in a repository name.

Keywords are defined in `src/lib/speechKeywords.js`. Extend this list as needed.

## Optional Integrations
- GitHub OAuth (for higher API limits and repository metadata) — disabled by default. Provide your own `clientId`, `redirectUri`, and token exchange endpoint in `window.__APP_CONFIG__.oauth`.
- OpenAI chat (local, optional) — provide an API key in the UI; the key is stored in localStorage only.

## License

MIT. Data you host or consume may have its own licensing/attribution requirements.

