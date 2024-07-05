import { useEffect, useState } from 'react'
import { CountryImpactInfo, ImpactMetric } from '../utils/types'

const useTopCountriesByImpact = (
  data: CountryImpactInfo[],
  metric: ImpactMetric,
  limit: number = 5
) => {
  const [topCountries, setTopCountries] = useState<CountryImpactInfo[]>([])

  useEffect(() => {
    const calculateImpact = (
      countries: CountryImpactInfo[]
    ): CountryImpactInfo[] => {
      return countries.map((country) => ({
        ...country,
        impactScore: country[metric],
      }))
    }

    const sortedCountries = calculateImpact(data).sort(
      (a, b) => (b.impactScore ?? 0) - (a.impactScore ?? 0)
    )

    const topCountries = sortedCountries.slice(0, limit)

    setTopCountries(topCountries)
  }, [data, metric, limit])

  return topCountries
}

export default useTopCountriesByImpact
