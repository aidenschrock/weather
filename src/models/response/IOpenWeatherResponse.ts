// TODO: We created these interfaces for typescript completion when typing as well as documenation for human readability
// Reference: https://openweathermap.org/forecast5#JSON
export interface IWeather {
  id: number
  main: string
  description: string
  icon: string
}

export interface IForecastThreeHourPeriod {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: IWeather[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  rain: {
    "3h": number
  }
  snow: {
    "3h": number
  }
  sys: {
    pod: string
  }
  dt_txt: string
}

export interface IOpenWeatherResponse {
  cod: string
  message: number
  cnt: number
  list: IForecastThreeHourPeriod[]
  city: {
    coord: {
      lat: number
      lon: number
    }
    country: string
    id: number
    name: string
    population: number
    sunrise: number
    sunset: number
    timezone: number
  }
}
