import { HttpService, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { IExchangeRates } from '../interfaces';

@Injectable()

export class ExchangeService {
  exchangeData: IExchangeRates
  exchange_uri = `https://api.privatbank.ua/p24api/exchange_rates?json&date=`

  //Subscriptions
  exchangeSub: Subscription

  constructor(
    private http: HttpService
  ) {
    this.exchangeSub = this.getExchangeRates().subscribe(
      (response) => {
        console.log('ExchangeService INIT: ')
        this.exchangeData = response
        this.exchangeSub.unsubscribe()
      },
      error => {
        this.exchangeSub.unsubscribe()
      }
    )
  }

  get date(): Date {
    return new Date()
  }

  get rub(): number {
    return this.exchangeData.exchangeRate.find(item => item.currency === 'RUB').saleRateNB
  }

  get eur(): number {
    return this.exchangeData.exchangeRate.find(item => item.currency === 'EUR').saleRateNB
  }

  get usd(): number {
    return this.exchangeData.exchangeRate.find(item => item.currency === 'USD').saleRateNB
  }

  @Cron('* * 18 * * *')
  handleCron() {
    if (this.exchangeSub) this.exchangeSub.unsubscribe()

    this.exchangeSub = this.getExchangeRates()
      .subscribe(
      (response) => {
        this.exchangeData = response
        this.exchangeSub.unsubscribe()
      },
      error => {
        this.exchangeSub.unsubscribe()
      },
    );
  }

  getExchangeRates(): Observable<IExchangeRates> {
    const dateToday = `${this.date.getDate()}.${this.date.getMonth() + 1}.${this.date.getFullYear()}`
    this.exchange_uri = this.exchange_uri + dateToday

    return this.http.get<IExchangeRates>(this.exchange_uri)
      .pipe(map(response => response.data))
  }
}