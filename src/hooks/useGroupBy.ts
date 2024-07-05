import { useEffect, useMemo, useState } from 'react'
import { CountryImpactInfo } from '../utils/types'

export type ContinentData = {
  [continent: string]: {
    totalCases: number
    totalDeaths: number
  }
}

const useContinentData = (data: CountryImpactInfo[]) => {
  const [continentData, setContinentData] = useState<ContinentData>({})

  useEffect(() => {
    const calculateContinentData = () => {
      const newData: ContinentData = data.reduce((acc, country) => {
        const continent = country.continent
        if (!acc[continent]) {
          acc[continent] = {
            totalCases: 0,
            totalDeaths: 0,
          }
        }
        acc[continent].totalCases += parseInt(country['total-cases'] as any)
        acc[continent].totalDeaths += parseInt(country['total-deaths'] as any)
        return acc
      }, {} as ContinentData)
      setContinentData(newData)
    }

    calculateContinentData()
  }, [data])

  return continentData
}

export default useContinentData
