import React from 'react';
import config from '../config';
import useUser from '../hooks/useUser';
import { updateCurrentUser } from '../api';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Typography/Title';
import Subtitle from '../components/Typography/Subtitle';
import { Alert, Avatar, Button, Card, Label, TextInput } from 'flowbite-react';

export default function ProfilePage() {
  const naviagate = useNavigate();
  const [name, setName] = React.useState('');
  const { user, getAccessTokenSilently } = useAuth0();
  const [updating, setUpdating] = React.useState(false);
  const [rerender, setRerender] = React.useState(false);
  const { data, loading, error } = useUser(rerender);

  // ------ handlers
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setUpdating(true);
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: config.audience, scope: 'update:current_user_metadata' }
      });
      await updateCurrentUser(token, user.sub, { user_metadata: { name } });
      setUpdating(false);
      setRerender(!rerender);
    } catch (error) {
      setUpdating(false);
      console.log(error);
    }
  };

  const onCancel = () => naviagate('/app/dashboard');

  return (
    <>
      <Title>Profile</Title>

      {!loading && error ? (
        <Alert color='failure' className='font-serif'>
          <span>{error.toString()}</span>
        </Alert>
      ) : (
        <Card className='font-serif w-full py-2 px-4 shadow-none'>
          <div className='flex flex-col items-center space-y-2'>
            <Avatar rounded size='xl' alt={`${user.name}'s profile picture`} img={data?.picture} />
            {loading ? (
              <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>
            ) : (
              <p className='font-bold text-lg block text-gray-900 dark:text-white'>{data?.user_metadata?.name}</p>
            )}
            {loading ? (
              <div className='w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
            ) : (
              <p className='font-serif block text-sm font-medium text-gray-500 truncate dark:text-gray-400'>
                {data?.email}
              </p>
            )}
          </div>
          <hr />
          <form onSubmit={onSubmit} className='space-y-4 md:space-y-6'>
            <Subtitle>Edit Profile</Subtitle>
            <div className='flex flex-col gap-4'>
              <Label htmlFor='temperature'>Name</Label>
              <TextInput
                shadow
                required
                id='name'
                type='text'
                value={name}
                placeholder='Enter a new name'
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <hr />
            <div className='flex flex-row-reverse gap-2'>
              <Button type='submit' color='success' disabled={updating}>
                {!updating ? 'Update' : 'Updating...'}
              </Button>
              <Button type='button' color='gray' disabled={updating} onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
}
