import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly apiKey: string;
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY') || '';
  }

  async getCurrentWeather(lat: number = 35.6895, lon: number = 139.6917): Promise<{ temp: number; pressure: number; condition: string } | null> {
    if (!this.apiKey) {
      this.logger.warn('OPENWEATHER_API_KEY is not set. Skipping weather fetch.');
      return null;
    }

    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric', // Celsius
        },
      });

      const data = response.data;
      return {
        temp: data.main.temp,
        pressure: data.main.pressure,
        condition: data.weather[0]?.main || '',
      };
    } catch (error) {
      this.logger.error(`Failed to fetch weather data: ${error.message}`);
      return null;
    }
  }
}
