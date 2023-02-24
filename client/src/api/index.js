import config from '../config';

const BASE_URL = `https://${config.domain}/api/v2`;

// ------ Users Endpoints
// GET /users/userId
const getCurrentUser = async (token, userId) => {
  try {
    const resp = await fetch(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return resp.ok ? await resp.json() : null;
  } catch (error) {
    return error;
  }
};

// PATCH /users/userId
const updateCurrentUser = async (token, userId, user) => {
  try {
    const resp = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...user })
    });
    return resp.ok ? await resp.json() : null;
  } catch (error) {
    return error;
  }
};

// ------ Data Endpoints
// GET /patients

// POST /patients

export { getCurrentUser, updateCurrentUser };
