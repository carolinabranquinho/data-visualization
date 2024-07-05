import React, { useEffect, useState } from 'react'
import { scaleLinear, ScaleLinear } from 'd3-scale'
import { CountryImpactInfo } from '../../utils/types'
import Tooltip from '../Tooltip'
import { Box, Typography } from '@mui/material'
import useTopCountriesByImpact from '../../hooks/useTopCountriesByImpact'
import MapChart from '../Map'
import { CartesianGrid, XAxis, YAxis, Legend, Bar, BarChart } from 'recharts'
import './style.css'

const geoUrl = require('../../data/map.json')

const colorScale: ScaleLinear<string, string> = scaleLinear<string, string>()
  .domain([0, 8])
  .range(['#ffedea', '#ff5233'])

const DeathPercentageMap = () => {
  const [data, setData] = useState([] as CountryImpactInfo[])
  const [hoveredCountry, setHoveredCountry] =
    useState<CountryImpactInfo | null>(null)
  const [mousePosition, setMousePosition] = useState<{
    x: number
    y: number
  } | null>(null)

  const topCountries = useTopCountriesByImpact(data, 'death-percentage', 5)

  useEffect(() => {
    setData(require('../../data/covid.json'))
  }, [])

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
    <Box className="container">
      <Box className="mapContainer">
        <MapChart
          data={data}
          geoUrl={geoUrl}
          colorScale={colorScale}
          hover={'#ff5233'}
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
      <Box className="topCountries">
        <Typography
          sx={{
            fontFamily: 'Roboto Slab',
            fontSize: '1rem',
            textAlign: 'center',
          }}
        >
          Top 5 Countries by Death Percentage
        </Typography>
        <BarChart width={400} height={150} data={topCountries}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="country" />
          <YAxis />
          <Legend />
          <Bar dataKey="death-percentage" fill="#ff5233" />
        </BarChart>
        <BarChart width={400} height={150} data={topCountries}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="country" />
          <YAxis />
          <Legend />
          <Bar dataKey="total-deaths" fill="#f09a8b" />
        </BarChart>
        <BarChart width={400} height={150} data={topCountries}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="country" />
          <YAxis />
          <Legend />
          <Bar dataKey="total-cases" fill="#c06758" />
        </BarChart>
      </Box>
    </Box>
  )
}

export default DeathPercentageMap
