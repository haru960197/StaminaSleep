import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SleepLogsService } from './sleep-logs.service';
import { CreateSleepLogDto } from './dto/create-sleep-log.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('sleep-logs')
@UseGuards(AuthGuard)
export class SleepLogsController {
  constructor(private readonly sleepLogsService: SleepLogsService) {}

  @Post()
  create(@CurrentUser() user: any, @Body() createSleepLogDto: CreateSleepLogDto) {
    return this.sleepLogsService.create(user.id, createSleepLogDto);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.sleepLogsService.findAll(user.id);
  }
}