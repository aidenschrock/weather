import { IForecastThreeHourPeriod } from "./response/IOpenWeatherResponse";

export interface ISingleDayForecast {
  dayOfWeek: string;
  forecasts: IForecastThreeHourPeriod[]
}
