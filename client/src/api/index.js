import config from '../config';
import httpClient from '../utils/http';

const AUTH0_BASE_URL = `https://${config.domain}/api/v2`;

// ------ Users Endpoints
// GET /users/userId
const getCurrentUser = (token, userId) =>
  httpClient(`${AUTH0_BASE_URL}/users/${userId}`, {
    method: 'GET',
    requestHeaders: { Authorization: `Bearer ${token}` }
  });

// PATCH /users/userId
const updateCurrentUser = async (token, userId, user) =>
  httpClient(`${AUTH0_BASE_URL}/users/${userId}`, {
    body: user,
    method: 'PATCH',
    requestHeaders: { Authorization: `Bearer ${token}` }
  });

// ------ Records Endpoints
// GET /records
const getAllRecords = (token) =>
  httpClient(`${config.baseUrl}/records`, {
    method: 'GET',
    requestHeaders: { Authorization: `Bearer ${token}` }
  });

// POST /patients
const createRecord = (token, record) =>
  httpClient(`${config.baseUrl}/records`, {
    body: record,
    method: 'POST',
    requestHeaders: { Authorization: `Bearer ${token}` }
  });

export { getCurrentUser, updateCurrentUser, getAllRecords, createRecord };
