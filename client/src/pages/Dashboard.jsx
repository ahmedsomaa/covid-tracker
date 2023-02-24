import React from 'react';
import config from '../config';
import covidData from '../data';
import { Card } from 'flowbite-react';
import CovidMap from '../components/CovidMap';
import Title from '../components/Typography/Title';

export default function DashboardPage() {
  return (
    <>
      <Title className='font-poppins'>Dashboard</Title>
      {/* Map goes here */}
      <Card className='font-serif flex flex-col w-full py-2 px-4 shadow-none'>
        <CovidMap geoUrl={config.mapGeoUrl} data={covidData} />
      </Card>
    </>
  );
}
