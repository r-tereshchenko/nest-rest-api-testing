export interface IExchangeRates {
  date: string
  back: string
  baseCurrency: number
  baseCurrencyLit: string
  exchangeRate: IExchangeRateItem[]
}

export interface IExchangeRateItem {
  baseCurrency?: string
  currency?: string
  saleRateNB?: number
  purchaseRateNB?: number
  saleRate?: number
  purchaseRate?: number
}