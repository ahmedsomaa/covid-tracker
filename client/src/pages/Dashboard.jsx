import React from 'react';
import config from '../config';
import { Card } from 'flowbite-react';
import { getAllRecords } from '../api';
import CovidMap from '../components/CovidMap';
import Redirect from '../components/Redirect';
import Title from '../components/Typography/Title';

export default function DashboardPage() {
  const [request, setRequest] = React.useState({
    data: [],
    error: '',
    isLoading: false
  });

  React.useEffect(() => {
    setRequest({ ...request, isLoading: false });
    getAllRecords().then(
      (data) => setRequest({ ...request, data }),
      (error) => setRequest({ ...request, error })
    );
    setRequest({ ...request, isLoading: false });
  }, []);

  return (
    <>
      <Title className='font-poppins'>Dashboard</Title>
      {/* Map goes here */}
      {request.isLoading ? (
        <Redirect message='Please wait while we fetch the records' />
      ) : (
        <Card className='font-serif flex flex-col w-full py-2 px-4 shadow-none'>
          <CovidMap geoUrl={config.mapGeoUrl} data={request.data} />
        </Card>
      )}
    </>
  );
}
