import { Controller, Get, Post, Body, UseGuards, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { SleepLogsService } from './sleep-logs.service';
import { CreateSleepLogDto } from './dto/create-sleep-log.dto';
import { UpdateSleepLogDto } from './dto/update-sleep-log.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('sleep-logs')
@UseGuards(AuthGuard)
export class SleepLogsController {
  constructor(private readonly sleepLogsService: SleepLogsService) {}

  @Post()
  create(@CurrentUser() user: any, @Body() createSleepLogDto: CreateSleepLogDto) {
    console.log('Create Sleep Log Payload:', createSleepLogDto);
    return this.sleepLogsService.create(user.id, createSleepLogDto);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.sleepLogsService.findAll(user.id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSleepLogDto: UpdateSleepLogDto,
  ) {
    return this.sleepLogsService.update(user.id, id, updateSleepLogDto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: any, @Param('id', ParseIntPipe) id: number) {
    return this.sleepLogsService.remove(user.id, id);
  }
}
