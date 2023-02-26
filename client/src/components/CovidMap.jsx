import React from 'react';
import config from '../config';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from 'react-simple-maps';

export default function CovidMap({ data, geoUrl, setTooltipContent }) {
  const colorScale = scaleLinear()
    .domain([1, Math.max(...data.map((d) => d.cases))])
    .range(['#fef2f2', '#7f1d1d']);

  return (
    <>
      <ComposableMap
        projectionConfig={{ scale: 148 }}
        data-tip=''
        onClick={(e) => {
          // The map container has a width and the SVGs for countries do not.
          // E.g., checks if the user is clicking on the map itself.
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
                      const message = record
                        ? `: ${record.cases} reported cases with avg. temp: ${record.temperature}°C `
                        : '';
                      setTooltipContent(`${geo.properties.name}${message}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    fill={record ? colorScale(record.cases) : '#f8fafc'}
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
