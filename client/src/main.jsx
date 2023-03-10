import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import config from './config';
import { Flowbite } from 'flowbite-react';
import 'react-tooltip/dist/react-tooltip.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, useNavigate } from 'react-router-dom';

const { scope, domain, audience, clientId, redirectUri } = config;

const Auth0ProviderWithRouter = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => navigate(appState?.returnTo || window.location.pathname);

  if (!(domain && clientId && redirectUri && audience && scope)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
        scope: `${scope.read} ${scope.update}`
      }}
    >
      {children}
    </Auth0Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Flowbite>
      <BrowserRouter>
        <Auth0ProviderWithRouter>
          <App />
        </Auth0ProviderWithRouter>
      </BrowserRouter>
    </Flowbite>
  </React.StrictMode>
);
