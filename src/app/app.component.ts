import { UrlResolver } from '@angular/compiler';
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IForecastThreeHourPeriod, IOpenWeatherResponse } from 'src/models/response/IOpenWeatherResponse';
import { ISingleDayForecast } from 'src/models/ISingleDayForecast';
import { DataTracker } from 'src/lib/DataTracker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather';
  userInput: string;
  apiKey: string;
  forecastReadingsByDay: any;
  dataTrackerForcasts: any;


  constructor(private httpClient: HttpClient) {
    this.apiKey = "3c4b4a4758aef4aef45036a83dcf6281"
    this.forecastReadingsByDay = [];
    this.dataTrackerForcasts = [];
  }

  areCardsShown() {
    if (this.forecastReadingsByDay != "") {
      console.log(this.forecastReadingsByDay)
      return true
    } else {
      return false
    }
  }

  getWeather() {
    console.log(this.userInput)
    this.clearWeather()
    if (this.userInput) {
      const forecastURL = new URL('https://api.openweathermap.org/data/2.5/forecast')

      var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.userInput)

      if (isValidZip) {
        forecastURL.searchParams.append("zip", this.userInput)
      }
      else {
        forecastURL.searchParams.append("q", this.userInput)
      }
      forecastURL.searchParams.append("appid", this.apiKey)
      forecastURL.searchParams.append("units", "imperial")

      const forecastApiResponse = this.httpClient.get(forecastURL.toString()).pipe(
        map(resp => resp)
      )

      forecastApiResponse.subscribe((data: IOpenWeatherResponse) => {
        const forecastsByDay = this.chunkReadingsIntoDays(data.list);
        forecastsByDay.forEach(day => {
          this.forecastReadingsByDay.push(day)
          this.dataTrackerForcasts.push(new DataTracker(day))
        })
        console.log(this.dataTrackerForcasts)
      });

    }

  }

  clearWeather() {
    this.forecastReadingsByDay = [];
    this.dataTrackerForcasts = [];
  }

  private chunkReadingsIntoDays(forecasts: IForecastThreeHourPeriod[]) {
    const forecastReadingsByDay = [] as ISingleDayForecast[]

    const forecastsPerDay = 8
    for (let i = 0; i < forecasts.length; i += forecastsPerDay) {
      forecastReadingsByDay.push({
        dayOfWeek: new Date(forecasts[i].dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
        forecasts: forecasts.slice(i, i + (forecastsPerDay - 1))
      })
    }

    console.log(forecastReadingsByDay)
    return forecastReadingsByDay
  }
}




