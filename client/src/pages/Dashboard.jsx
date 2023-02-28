import React from 'react';
import config from '../config';
import Cookies from 'universal-cookie';
import { getAllRecords } from '../api';
import ArrowPath from '../icons/ArrowPath';
import CovidMap from '../components/CovidMap';
import Redirect from '../components/Redirect';
import Title from '../components/Typography/Title';
import { Alert, Button, Card } from 'flowbite-react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

// ------ cookies object
const cookies = new Cookies();

export default function DashboardPage() {
  const [tooltipContent, setTooltipContent] = React.useState(null);
  const [event, updateEvent] = React.useReducer((prev, next) => ({ ...prev, ...next }), {
    data: [],
    error: '',
    isLoading: false
  });

  // ------ hooks
  React.useEffect(() => {
    getRecords();
  }, [updateEvent]);

  const getRecords = () => {
    const token = cookies.get('jwt');
    if (token) {
      updateEvent({ isLoading: true });
      getAllRecords(token).then(
        (data) => updateEvent({ isLoading: false, data }),
        (error) => updateEvent({ isLoading: false, error })
      );
    }
  };

  /// ------ handle error state
  if (event.error) {
    return (
      <>
        <Title className='font-poppins'>Dashboard</Title>
        <Alert color='failure' className='font-serif' withBorderAccent={true}>
          <p>{event.error.message}</p>
        </Alert>
      </>
    );
  }

  // ------ handle loading state
  if (event.isLoading) {
    return <Redirect message='Wait while we load covid data records...' />;
  }

  // ------ handle normal state
  return (
    <>
      <Title className='font-poppins'>Dashboard</Title>
      <Card className='font-serif flex flex-col w-full py-2 px-4 shadow-none'>
        <div className='w-25 flex flex-row justify-end'>
          <Button color='success' onClick={getRecords}>
            <ArrowPath className='mr-2 h-5 w-5' />
            Refresh
          </Button>
        </div>
        <CovidMap geoUrl={config.mapGeoUrl} data={event.data} setTooltipContent={setTooltipContent} />
        {tooltipContent && (
          <ReactTooltip anchorSelect='.map-tooltip' place='top'>
            {tooltipContent}
          </ReactTooltip>
        )}
      </Card>
    </>
  );
}
