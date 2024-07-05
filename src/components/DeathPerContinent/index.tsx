import React, { useEffect, useState } from 'react'
import { scaleLinear, ScaleLinear } from 'd3-scale'
import { CountryImpactInfo } from '../../utils/types'
import Tooltip from '../Tooltip'
import { Box } from '@mui/material'
import useTopCountriesByImpact from '../../hooks/useTopCountriesByImpact'
import MapChart from '../Map'
import useGroupBy from '../../hooks/useGroupBy'

const geoUrl = require('../../data/map.json')

type ContinentData = { totalCases: number; totalDeaths: number }

const colorScale: ScaleLinear<string, string> = scaleLinear<string, string>()
  .domain([0, 10])
  .range(['#B34892', '#725496'])

const DeathPerContinentMap = () => {
  const [data, setData] = useState<CountryImpactInfo[]>([])
  const [hoveredCountry, setHoveredCountry] =
    useState<CountryImpactInfo | null>(null)
  const [mousePosition, setMousePosition] = useState<{
    x: number
    y: number
  } | null>(null)

  const handleMouseEnter = (
    geo: any,
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    const d = data.find((s) => s.CODE === geo.id)
    if (d) {
      setHoveredCountry(d)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseLeave = () => {
    setHoveredCountry(null)
    setMousePosition(null)
  }

  return (
    <Box className="mapContainer">
      <MapChart
        data={data}
        geoUrl={geoUrl}
        colorScale={colorScale}
        hover={'#725496'}
        metric={'death-percentage'}
        handleMouseLeave={handleMouseLeave}
        handleMouseEnter={handleMouseEnter}
      />
      {hoveredCountry && mousePosition && (
        <Tooltip x={mousePosition.x} y={mousePosition.y}>
          <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
            {hoveredCountry.country}
          </p>
          <p>Total Cases: {hoveredCountry['total-cases']}</p>
          <p>Total Deaths: {hoveredCountry['total-deaths']}</p>
          <p>Death Percentage: {hoveredCountry['death-percentage']}%</p>
        </Tooltip>
      )}
    </Box>
  )
}

export default DeathPerContinentMap
