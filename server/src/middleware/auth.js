import config from '../config';
import { auth } from 'express-oauth2-jwt-bearer';

const validateAuth0Token = auth({
  audience: config.auth0.audience,
  issuerBaseURL: `https://${config.auth0.domain}`
});

export default { validateAuth0Token };
