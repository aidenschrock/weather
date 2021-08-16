import { ISingleDayForecast } from "src/models/ISingleDayForecast";
import { mode, mean, min, max, round } from "mathjs";

export class DataTracker {
  private _min: number;
  private _max: number;
  private _mean: number;
  private _mode: number;

  constructor(forecast?: ISingleDayForecast) {
    this.insert(forecast)
  }

  insert(value: ISingleDayForecast) {
    this._min = min(value.forecasts.map(forecast => forecast.main.temp_min))
    this._max = max(value.forecasts.map(forecast => forecast.main.temp_max))
    this._mean = mean(value.forecasts.map(forecast => forecast.main.temp))
    this._mode = mode(value.forecasts.map(forecast => round(forecast.main.temp)))
  }

  showMin() {
    return this._min
  }

  showMax() {
    return this._max
  }

  showMean() {
    return this._mean
  }

  showMode() {
    return this._mode
  }
}
