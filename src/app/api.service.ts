import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiKey: string;

  constructor(private httpClient: HttpClient) {
    this.apiKey = "3c4b4a4758aef4aef45036a83dcf6281"
  }

  public getWeather() {

    return this.httpClient.get('https://api.openweathermap.org/data/2.5/weather')
  }
}
