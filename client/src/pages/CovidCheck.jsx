import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Typography/Title';
import Subtitle from '../components/Typography/Subtitle';
import { Label, TextInput, Card, ToggleSwitch, Button } from 'flowbite-react';

export default function CovidCheckPage() {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const latitudeRef = React.useRef();
  const longtiudeRef = React.useRef();
  const [form, setForm] = React.useState({
    temperature: 28,
    fatigue: false,
    cough: false,
    sore: false,
    headaches: false,
    nose: false,
    breath: false,
    body: false,
    smell: false,
    sneeze: false,
    itchy: false
  });

  // ------ hooks
  React.useEffect(() => {
    if ('geolocation' in navigator) {
      // get current position
      navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
        // displau current position to user
        latitudeRef.current.value = latitude;
        longtiudeRef.current.value = longitude;
      });
    }
  }, []);

  // ------ handlers
  const onSubmit = (event) => {
    event.preventDefault();

    // prepare location
    const location = { lng: parseFloat(longtiudeRef.current.value), lat: parseFloat(latitudeRef.current.value) };

    // prepare symptopms
    const { temperature, ...symptomps } = form;

    // user, temp, location, sysmptops
    const request_body = {
      patientId: user.sub,
      location,
      temperature: parseInt(temperature),
      symptomps
    };

    // call api service here
    console.log(request_body);
  };

  const onCancel = () => navigate('/app/dashboard');

  const onToggleSwitch = (checked, toggle) => setForm({ ...form, [toggle]: checked });

  return (
    <>
      <Title>Covid Check</Title>

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
              type='number'
              id='temperature'
              value={form.temperature}
              placeholder='Enter your body temperature in celsius'
              onChange={({ target }) => setForm({ ...form, temperature: target.value })}
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
              id='sneeze'
              color='success'
              label='Sneezing'
              checked={form.sneeze}
              onChange={(checked) => onToggleSwitch(checked, 'sneeze')}
            />
            <ToggleSwitch
              id='itchy'
              color='success'
              checked={form.itchy}
              label='Itchy or Watery Eyes'
              onChange={(checked) => onToggleSwitch(checked, 'itchy')}
            />
          </div>
          <hr />
          <div className='flex flex-row-reverse gap-2'>
            <Button type='submit' color='success'>
              Check
            </Button>
            <Button type='button' color='gray' onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}
