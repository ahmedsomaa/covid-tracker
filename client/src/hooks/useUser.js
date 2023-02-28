import React from 'react';
import config from '../config';
import Cookies from 'universal-cookie';
import { getCurrentUser } from '../api';
import { useAuth0 } from '@auth0/auth0-react';

export default function useUser(args) {
  const cookies = new Cookies();
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const { user, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetcher = async () => {
      try {
        setLoading(true);
        const accessToken = await getAccessTokenSilently({
          authorizationParams: { audience: config.audience, scope: 'read:current_user' }
        });
        const currentUser = await getCurrentUser(accessToken, user.sub);
        cookies.set('jat', accessToken);
        setLoading(false);
        setData(currentUser);
        !currentUser && setError('Failed to retrieve current user meta data');
      } catch (error) {
        setError(error);
      }
    };
    fetcher();
  }, [args]);
  return { data, loading, error };
}
