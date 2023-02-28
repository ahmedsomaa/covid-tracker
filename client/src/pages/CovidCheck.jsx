import React from 'react';
import messages from '../constants';
import { createRecord } from '../api';
import Cookies from 'universal-cookie';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Typography/Title';
import ToastResult from '../components/ToastResult';
import Subtitle from '../components/Typography/Subtitle';
import { Label, TextInput, Card, ToggleSwitch, Button, Toast } from 'flowbite-react';

// ------ cookies object
const cookies = new Cookies();

export default function CovidCheckPage() {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const latitudeRef = React.useRef();
  const longtiudeRef = React.useRef();
  const [reqEvent, updateReqEvent] = React.useReducer((prev, next) => ({ ...prev, ...next }), {
    toast: '',
    isLoading: ''
  });
  const [form, updateForm] = React.useReducer((prev, next) => ({ ...prev, ...next }), {
    temperature: 28,
    fatigue: false,
    cough: false,
    sore: false,
    headaches: false,
    nose: false,
    breath: false,
    body: false,
    smell: false,
    diarrhea: false,
    vomiting: false
  });

  // ------ hooks
  React.useEffect(() => {
    if ('geolocation' in navigator) {
      // get current position
      navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
        // displau current position to user
        if (latitudeRef.current && longtiudeRef.current) {
          latitudeRef.current.value = latitude;
          longtiudeRef.current.value = longitude;
        }
      });
    }
  }, []);

  // ------ handlers
  const onSubmit = (event) => {
    event.preventDefault();

    // retrieve user token
    const token = cookies.get('jwt');

    // prepare location
    const location = { lng: parseFloat(longtiudeRef.current.value), lat: parseFloat(latitudeRef.current.value) };

    // prepare symptopms
    const { temperature, ...symptomps } = form;

    // user, temp, location, sysmptops
    const record = {
      patientId: user.sub,
      location,
      temperature: parseFloat(temperature),
      symptomps
    };

    // call api service here
    updateReqEvent({ isLoading: true });
    createRecord(token, record).then(
      (data) =>
        updateReqEvent({
          isLoading: false,
          toast: `INF,${data.infected ? messages.infected : messages.notInfected}`
        }),
      (_err) => updateReqEvent({ isLoading: false, toast: `ERR,${messages.checkError}` })
    );
  };

  const onCancel = () => navigate('/app/dashboard');

  const onToggleSwitch = (checked, toggle) => updateForm({ [toggle]: checked });

  // ------ handle normal state
  return (
    <>
      <Title>Covid Check</Title>

      {reqEvent.toast && (
        <Toast className='my-3 flex !items-start'>
          {reqEvent.toast.split(',')[0] === 'INF' ? (
            <ToastResult message={reqEvent.toast.split(',')[1]} />
          ) : (
            <ToastResult success={false} message={reqEvent.toast.split(',')[1]} />
          )}
          <Toast.Toggle />
        </Toast>
      )}

      <Card className='font-serif flex flex-col w-full py-2 px-4 shadow-none'>
        <form onSubmit={onSubmit} className='space-y-4 md:space-y-6'>
          <Subtitle>Basic Info</Subtitle>
          <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <div>
              <Label htmlFor='longtiude'>Current Longtiude</Label>
              <TextInput shadow disabled required type='text' id='longtiude' ref={longtiudeRef} />
            </div>
            <div>
              <Label htmlFor='latitude'>Current Latitude</Label>
              <TextInput shadow disabled required type='text' id='latitude' ref={latitudeRef} />
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='temperature'>Temperature (celsius)</Label>
            <TextInput
              shadow
              min={9}
              max={42}
              required
              step='any'
              type='number'
              id='temperature'
              value={form.temperature}
              placeholder='Enter your body temperature in celsius'
              onChange={({ target }) => updateForm({ temperature: target.value })}
              helperText='Note: Human beings can live with a temperature from 9 to 42 celsius.'
            />
          </div>
          <Subtitle>Covid Symptopms</Subtitle>
          <div className='grid gap-6 mb-6 md:grid-cols-2' id='toggle'>
            <ToggleSwitch
              id='fatigue'
              color='success'
              label='Fatigue'
              checked={form.fatigue}
              onChange={(checked) => onToggleSwitch(checked, 'fatigue')}
            />
            <ToggleSwitch
              id='cough'
              label='Cough'
              color='success'
              checked={form.cough}
              onChange={(checked) => onToggleSwitch(checked, 'cough')}
            />
          </div>
          <div className='grid gap-6 mb-6 md:grid-cols-2' id='toggle'>
            <ToggleSwitch
              id='sore'
              color='success'
              label='Sore Throat'
              checked={form.sore}
              onChange={(checked) => onToggleSwitch(checked, 'sore')}
            />
            <ToggleSwitch
              id='headaches'
              color='success'
              label='Headaches'
              checked={form.headaches}
              onChange={(checked) => onToggleSwitch(checked, 'headaches')}
            />
          </div>
          <div className='grid gap-6 mb-6 md:grid-cols-2' id='toggle'>
            <ToggleSwitch
              id='nose'
              color='success'
              label='Stuffy Nose'
              checked={form.nose}
              onChange={(checked) => onToggleSwitch(checked, 'nose')}
            />
            <ToggleSwitch
              id='breath'
              color='success'
              checked={form.breath}
              label='Shortness of Breath'
              onChange={(checked) => onToggleSwitch(checked, 'breath')}
            />
          </div>
          <div className='grid gap-6 mb-6 md:grid-cols-2' id='toggle'>
            <ToggleSwitch
              id='body'
              color='success'
              label='Body Aches'
              checked={form.body}
              onChange={(checked) => onToggleSwitch(checked, 'body')}
            />
            <ToggleSwitch
              id='smell'
              color='success'
              checked={form.smell}
              label='Loss of Taste of Smell'
              onChange={(checked) => onToggleSwitch(checked, 'smell')}
            />
          </div>
          <div className='grid gap-6 mb-6 md:grid-cols-2' id='toggle'>
            <ToggleSwitch
              id='diarrhea'
              color='success'
              label='Diarrhea'
              checked={form.diarrhea}
              onChange={(checked) => onToggleSwitch(checked, 'diarrhea')}
            />
            <ToggleSwitch
              id='vomiting'
              color='success'
              label='Vomiting'
              checked={form.vomiting}
              onChange={(checked) => onToggleSwitch(checked, 'vomiting')}
            />
          </div>
          <hr />
          <div className='flex flex-row-reverse gap-2'>
            <Button type='submit' color='success' disabled={reqEvent.isLoading}>
              {!reqEvent.isLoading ? 'Check' : 'Checking...'}
            </Button>
            <Button type='button' color='light' onClick={onCancel} disabled={reqEvent.isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}
