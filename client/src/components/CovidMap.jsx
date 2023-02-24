import React from 'react';
import config from '../config';
import PropTypes from 'prop-types';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

export default function CovidMap({ data, geoUrl }) {
  return (
    <>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => <Geography fill='#f8fafc' stroke='#475569' key={geo.rsmKey} geography={geo} />)
          }
        </Geographies>
        {data.map(({ id, coords, infected }) => (
          <Marker key={id} coordinates={coords}>
            <circle r={3} fill={infected ? '#dc2626' : '#16a34a'} />
          </Marker>
        ))}
      </ComposableMap>
    </>
  );
}

CovidMap.defaultProps = {
  geoUrl: config.mapGeoUrl
};

CovidMap.propTypes = {
  data: PropTypes.array.isRequired,
  geoUrl: PropTypes.string.isRequired
};
