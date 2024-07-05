import React, { useState } from 'react'
import { ScaleLinear } from 'd3-scale'
import { CountryImpactInfo, ImpactMetric } from '../../utils/types'
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  ZoomableGroup,
} from 'react-simple-maps'
import Tooltip from '../Tooltip'
import { Box } from '@mui/material'
import './style.css'
import useTopCountriesByImpact from '../../hooks/useTopCountriesByImpact'

type MapChartProps = {
  data: CountryImpactInfo[]
  colorScale: ScaleLinear<string, string>
  geoUrl: string
  hover: string
  metric: ImpactMetric
  handleMouseEnter: (
    geo: any,
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => void
  handleMouseLeave: () => void
}

const MapChart = ({
  data,
  colorScale,
  geoUrl,
  hover,
  metric,
  handleMouseLeave,
  handleMouseEnter,
}: MapChartProps) => {
  const colorScaleValue = (country: CountryImpactInfo) => {
    const countryValue = country[metric] as number
    return colorScale(countryValue)
  }

  const topCountries = useTopCountriesByImpact(data, metric, 5)
  console.log('topCountries', topCountries)

  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <ZoomableGroup center={[0, 0]} zoom={1} minZoom={1} maxZoom={5}>
        <Sphere
          stroke="#E4E5E6"
          strokeWidth={0.5}
          id="map-sphere"
          fill="transparent"
        />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              return geographies.map((geo) => {
                const country = data.find((s) => s.CODE === geo.id)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => handleMouseEnter(geo, e)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      default: {
                        fill: country
                          ? `${colorScaleValue(country)}`
                          : '#F5F4F6',
                        transition: 'fill 0.2s ease-in-out',
                      },
                      hover: {
                        fill: hover,
                        outline: 'none',
                        transform: 'scale(1.001)',
                        zIndex: 1,
                      },
                    }}
                  />
                )
              })
            }}
          </Geographies>
        )}
      </ZoomableGroup>
      {/* {topCountries?.map((country) => (
        <Annotation
          key={country.CODE}
          subject={country.coordinates}
          dx={-30}
          dy={-30}
          connectorProps={{
            stroke: '#FF5533',
            strokeWidth: 2,
            strokeLinecap: 'round',
          }}
        >
          <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
            {country.country}: {country['death-percentage']}
          </text>
        </Annotation>
      ))} */}
    </ComposableMap>
  )
}

export default MapChart
