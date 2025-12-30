import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSleepLogDto } from './dto/create-sleep-log.dto';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class SleepLogsService {
  constructor(
    private prisma: PrismaService,
    private weatherService: WeatherService,
  ) {}

  async create(createSleepLogDto: CreateSleepLogDto) {
    // Ensure dummy user exists
    const user = await this.prisma.user.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        email: 'dummy@example.com',
      },
    });

    // Fetch weather data
    let weatherData = {};
    try {
      const weather = await this.weatherService.getCurrentWeather();
      if (weather) {
        weatherData = {
          temperature: weather.temp,
          pressure: weather.pressure,
          weatherCondition: weather.condition,
        };
      }
    } catch (e) {
      console.error('Failed to fetch weather', e);
    }

    return this.prisma.sleepLog.create({
      data: {
        ...createSleepLogDto,
        ...weatherData,
        userId: user.id,
      },
    });
  }

  async findAll() {
    return this.prisma.sleepLog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}