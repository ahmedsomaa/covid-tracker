export default function httpClient(enpoint, { method, requestHeaders, body } = {}) {
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const config = {
    method,
    headers: {
      ...defaultHeaders,
      ...requestHeaders
    }
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(enpoint, config)
    .then(async (response) => {
      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        return Promise.reject(error.message);
      }
    })
    .catch((err) => Promise.reject(err.message));
}
