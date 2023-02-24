export default {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH0_API_AUDIENCE,
  redirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
  mapGeoUrl: 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'
};
