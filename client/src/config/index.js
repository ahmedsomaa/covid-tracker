const {
  VITE_BASE_URL,
  VITE_AUTH0_DOMAIN,
  VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_API_AUDIENCE,
  VITE_AUT0_READ_API_SCOPE,
  VITE_AUTH0_UPDATE_API_SCOPE,
  VITE_AUTH0_REDIRECT_URIVITE_AUTH0_REDIRECT_URI
} = import.meta.env;

export default {
  scope: {
    read: VITE_AUT0_READ_API_SCOPE.replaceAll(',', ' '),
    update: VITE_AUTH0_UPDATE_API_SCOPE.replaceAll(',', ' ')
  },
  domain: VITE_AUTH0_DOMAIN,
  baseUrl: VITE_BASE_URL,
  clientId: VITE_AUTH0_CLIENT_ID,
  audience: VITE_AUTH0_API_AUDIENCE,
  redirectUri: VITE_AUTH0_REDIRECT_URI,
  mapGeoUrl: 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'
};
