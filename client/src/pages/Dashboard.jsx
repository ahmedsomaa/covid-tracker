import React from 'react';
import config from '../config';
import { Card } from 'flowbite-react';
import { getAllRecords } from '../api';
import CovidMap from '../components/CovidMap';
import Redirect from '../components/Redirect';
import Title from '../components/Typography/Title';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export default function DashboardPage() {
  const [tooltipContent, setTooltipContent] = React.useState(null);
  const [request, setRequest] = React.useState({
    data: [],
    error: '',
    isLoading: false
  });

  React.useEffect(() => {
    setRequest({ ...request, isLoading: true });
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
          <CovidMap geoUrl={config.mapGeoUrl} data={request.data} setTooltipContent={setTooltipContent} />
          {tooltipContent && (
            <ReactTooltip anchorSelect='.map-tooltip' place='top'>
              {tooltipContent}
            </ReactTooltip>
          )}
        </Card>
      )}
    </>
  );
}
