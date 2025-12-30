import { Controller, Get, Post, Body } from '@nestjs/common';
import { SleepLogsService } from './sleep-logs.service';
import { CreateSleepLogDto } from './dto/create-sleep-log.dto';

@Controller('sleep-logs')
export class SleepLogsController {
  constructor(private readonly sleepLogsService: SleepLogsService) {}

  @Post()
  create(@Body() createSleepLogDto: CreateSleepLogDto) {
    return this.sleepLogsService.create(createSleepLogDto);
  }

  @Get()
  findAll() {
    return this.sleepLogsService.findAll();
  }
}