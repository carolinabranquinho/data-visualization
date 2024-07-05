export type CountryImpactInfo = {
  country: string
  'other-names': string
  CODE: string
  population: number
  continent: string
  'total-cases': number
  'total-deaths': number
  'total-cases-1M-pop': number
  'total-deaths-1M-pop': number
  'death-percentage': number
  impactScore?: number
  coordinates?: []
}

export type ImpactMetric =
  | 'total-deaths'
  | 'total-cases'
  | 'death-percentage'
  | 'total-cases-1M-pop'
  | 'total-deaths-1M-pop'
  | 'population'
  | 'impactScore'
