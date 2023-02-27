import React from 'react';
import config from '../config';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from 'react-simple-maps';

export default function CovidMap({ data, geoUrl, setTooltipContent }) {
  const colorScale = scaleLinear().domain([0, 1]).range(['#fca5a5', '#991b1b']);

  return (
    <>
      <ComposableMap
        projectionConfig={{ scale: 148 }}
        data-tip=''
        onClick={(e) => {
          if (e.target.width) {
            setTooltipContent(null);
          }
        }}
      >
        <Sphere stroke='#475569' strokeWidth={0.5} />
        <Graticule stroke='#475569' strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const record = data.find((s) => s.iso3 === geo.id);
                return (
                  <Geography
                    geography={geo}
                    key={geo.rsmKey}
                    stroke='#475569'
                    className='map-tooltip'
                    onMouseEnter={() => {
                      const message = record ? `: ${record.cases} infected cases out of ${record.total}` : '';
                      setTooltipContent(`${geo.properties.name}${message}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    fill={record ? colorScale(record.spreadRate) : '#f8fafc'}
                  />
                );
              })
            }
          </Geographies>
        )}
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
