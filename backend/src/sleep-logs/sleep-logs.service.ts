import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSleepLogDto } from './dto/create-sleep-log.dto';
import { UpdateSleepLogDto } from './dto/update-sleep-log.dto';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class SleepLogsService {
  constructor(
    private prisma: PrismaService,
    private weatherService: WeatherService,
  ) {}

  async create(userId: number, createSleepLogDto: CreateSleepLogDto) {
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
        userId: userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.sleepLog.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(userId: number, id: number, updateSleepLogDto: UpdateSleepLogDto) {
    const sleepLog = await this.prisma.sleepLog.findUnique({
      where: { id },
    });

    if (!sleepLog) {
      throw new NotFoundException(`Sleep log with ID ${id} not found`);
    }

    if (sleepLog.userId !== userId) {
      throw new ForbiddenException('You are not allowed to update this sleep log');
    }

    // Filter out fields that should not be updated (weather data)
    // Actually, by using UpdateSleepLogDto which only contains editable fields, we are safe.
    // But to be explicit and safe against future DTO changes:
    const { temperature, pressure, weatherCondition, ...editableFields } = updateSleepLogDto as any;

    return this.prisma.sleepLog.update({
      where: { id },
      data: {
        bedtime: updateSleepLogDto.bedtime,
        wakeTime: updateSleepLogDto.wakeTime,
        quality: updateSleepLogDto.quality,
        vitality: updateSleepLogDto.vitality,
        memo: updateSleepLogDto.memo,
      },
    });
  }

  async remove(userId: number, id: number) {
    const sleepLog = await this.prisma.sleepLog.findUnique({
      where: { id },
    });

    if (!sleepLog) {
      throw new NotFoundException(`Sleep log with ID ${id} not found`);
    }

    if (sleepLog.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this sleep log');
    }

    return this.prisma.sleepLog.delete({
      where: { id },
    });
  }
}