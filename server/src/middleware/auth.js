import config from '../config';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';

const checkScopes = requiredScopes('read:current_user update:current_user_metadata');

const validateAuth0Token = auth({
  audience: config.auth0.audience,
  issuerBaseURL: `https://${config.auth0.domain}`
});

export default { checkScopes, validateAuth0Token };
