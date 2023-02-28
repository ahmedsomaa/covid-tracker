import React from 'react';
import config from '../config';
import { updateCurrentUser } from '../api';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Typography/Title';
import Subtitle from '../components/Typography/Subtitle';
import { Avatar, Button, Card, Label, TextInput } from 'flowbite-react';

export default function ProfilePage() {
  const naviagate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();
  const [reqEvent, updateReqEvent] = React.useReducer((prev, next) => ({ ...prev, ...next }), {
    name: '',
    error: '',
    isLoading: ''
  });

  // ------ current user info
  const current = JSON.parse(localStorage.getItem('metadata'));

  // ------ handlers
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      updateReqEvent({ isLoading: true });
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: config.audience,
          scope: config.scope.update
        }
      });
      const metadata = await updateCurrentUser(token, user.sub, {
        user_metadata: { name: reqEvent.name }
      });
      localStorage.setItem('metadata', JSON.stringify(metadata));
      updateReqEvent({ isLoading: false });
    } catch (error) {
      updateReqEvent({ isLoading: false, error: error.message });
    }
  };

  const onCancel = () => naviagate('/app/dashboard');

  // ------ handle normal state
  return (
    <>
      <Title>Profile</Title>
      <Card className='font-serif w-full py-2 px-4 shadow-none'>
        <div className='flex flex-col items-center space-y-2'>
          <Avatar rounded size='lg' alt={`${current?.name}'s profile picture`} img={current?.picture} />
          {reqEvent.isLoading ? (
            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>
          ) : (
            <p className='font-bold text-lg block text-gray-900 dark:text-white'>{current?.user_metadata?.name}</p>
          )}
          {reqEvent.isLoading ? (
            <div className='w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
          ) : (
            <p className='font-serif block text-sm font-medium text-gray-500 truncate dark:text-gray-400'>
              {current?.email}
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
              value={reqEvent.name}
              placeholder='Enter a new name'
              onChange={({ target }) => updateReqEvent({ name: target.value })}
            />
          </div>
          <hr />
          <div className='flex flex-row-reverse gap-2'>
            <Button type='submit' color='success' disabled={reqEvent.isLoading}>
              {!reqEvent.isLoading ? 'Update' : 'Updating...'}
            </Button>
            <Button type='button' color='light' disabled={reqEvent.isLoading} onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}
