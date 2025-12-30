import { Module } from '@nestjs/common';
import { SleepLogsController } from './sleep-logs.controller';
import { SleepLogsService } from './sleep-logs.service';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [WeatherModule],
  controllers: [SleepLogsController],
  providers: [SleepLogsService]
})
export class SleepLogsModule {}
