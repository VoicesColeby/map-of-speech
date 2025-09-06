// App/runtime configuration. Provide overrides via `window.__APP_CONFIG__`.
const runtime = (typeof window !== 'undefined' && window.__APP_CONFIG__) || {};
const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
const version = runtime.dataVersion || params.get('v') || 'v1';
const server = runtime.dataBaseUrl || '';

function orNull(v) { return v || null; }

export default {
  brand: {
    name: (runtime.brand && runtime.brand.name) || 'Map of Speech',
  },
  oauth: runtime.oauth || { enabled: false },

  // Data endpoints (null when not configured)
  vectorTilesTiles: orNull(server ? `${server}${version}/points/{z}/{x}/{y}.pbf` : null),
  glyphsSource: orNull(server ? `${server}/fonts/{fontstack}/{range}.pbf` : null),
  bordersSource: orNull(server ? `${server}${version}/borders.geojson` : null),
  placesSource: orNull(server ? `${server}${version}/places.geojson` : null),

  namesEndpoint: orNull(server ? `${server}${version}/names` : null),
  graphsEndpoint: orNull(server ? `${server}${version}/graphs` : null),
};
