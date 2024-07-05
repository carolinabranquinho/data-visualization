import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import './App.css'
import DeathPercentageMap from './components/DeathPercentage'
import TotalCasesMap from './components/TotalCases'
import DeathPerContinentMap from './components/DeathPerContinent'
import { useState } from 'react'

function App() {
  const [isDeathPercentage, setIsDeathPercentage] = useState(true)

  const handleMapChange = (event: any) => {
    setIsDeathPercentage(event.target.value === 'death-percentage')
  }

  return (
    <Box className="App">
      <Box>
        <Typography
          sx={{ fontFamily: 'Roboto Slab', fontSize: '2rem' }}
          variant="h1"
        >
          COVID-19 Impact Data
        </Typography>
        <Typography
          sx={{ fontFamily: 'Roboto Slab', fontSize: '1rem' }}
          variant="h2"
        >
          Hover over a country to see its impact
        </Typography>
      </Box>
      <Box>
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ fontFamily: 'Roboto Slab', fontSize: '0.9rem' }}
          >
            Data
          </FormLabel>
          <RadioGroup row sx={{ fontFamily: 'Roboto Slab' }}>
            <FormControlLabel
              value="death-percentage"
              checked={isDeathPercentage}
              control={<Radio />}
              label="Death Percentage"
              componentsProps={{
                typography: {
                  sx: { fontSize: '0.8rem', fontFamily: 'inherit' },
                },
              }}
              onChange={handleMapChange}
            />
            <FormControlLabel
              value="total-cases"
              checked={!isDeathPercentage}
              control={<Radio />}
              label="Total Cases per 1M"
              componentsProps={{
                typography: {
                  sx: { fontSize: '0.8rem', fontFamily: 'inherit' },
                },
              }}
              onChange={handleMapChange}
            />
            {/* <FormControlLabel
              value="death-per-continent"
              control={<Radio />}
              label="Death per continent"
              componentsProps={{
                typography: {
                  sx: { fontSize: '0.8rem', fontFamily: 'inherit' },
                },
              }}
              onChange={handleMapChange}
            /> */}
          </RadioGroup>
        </FormControl>
      </Box>
      {!isDeathPercentage && <TotalCasesMap />}
      {isDeathPercentage && <DeathPercentageMap />}
    </Box>
  )
}

export default App
