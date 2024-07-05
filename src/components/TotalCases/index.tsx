import React, { useEffect, useState } from 'react'
import { scaleLinear, ScaleLinear } from 'd3-scale'
import { CountryImpactInfo } from '../../utils/types'
import Tooltip from '../Tooltip'
import { Box, Typography } from '@mui/material'
import MapChart from '../Map'
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from 'recharts'
import './style.css'
import useTopCountriesByImpact from '../../hooks/useTopCountriesByImpact'

const geoUrl = require('../../data/map.json')

const colorScale: ScaleLinear<string, string> = scaleLinear<string, string>()
  .domain([0, 100000])
  .range(['#C2F9FF', '#5AB7D4'])

const TotalCasesMap = () => {
  const [data, setData] = useState([] as CountryImpactInfo[])
  const [hoveredCountry, setHoveredCountry] =
    useState<CountryImpactInfo | null>(null)
  const [mousePosition, setMousePosition] = useState<{
    x: number
    y: number
  } | null>(null)

  const topCountries = useTopCountriesByImpact(data, 'total-cases-1M-pop', 5)

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
          hover={'#5AB7D4'}
          metric={'total-cases-1M-pop'}
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
        />
        {hoveredCountry && mousePosition && (
          <Tooltip x={mousePosition.x} y={mousePosition.y}>
            <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
              {hoveredCountry.country}
            </p>
            <p>Total Cases per 1M: {hoveredCountry['total-cases-1M-pop']}</p>
            <p>Total Deaths per 1M: {hoveredCountry['total-deaths-1M-pop']}</p>
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
          Top 5 Countries by Cases per 1M Population
        </Typography>
        <BarChart width={400} height={150} data={topCountries}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="country" />
          <YAxis />
          <Legend />
          <Bar dataKey="total-cases-1M-pop" fill="#5AB7D4" />
        </BarChart>
        <BarChart width={400} height={150} data={topCountries}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="country" />
          <YAxis />
          <Legend />
          <Bar dataKey="total-deaths-1M-pop" fill="#338fab" />
        </BarChart>
        <BarChart width={400} height={150} data={topCountries}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="country" />
          <YAxis />
          <Legend />
          <Bar dataKey="death-percentage" fill="#7eb7c8" />
        </BarChart>
      </Box>
    </Box>
  )
}

export default TotalCasesMap
