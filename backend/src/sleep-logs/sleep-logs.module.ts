import { Module } from '@nestjs/common';
import { SleepLogsService } from './sleep-logs.service';
import { SleepLogsController } from './sleep-logs.controller';
import { WeatherModule } from '../weather/weather.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [WeatherModule, AuthModule],
  controllers: [SleepLogsController],
  providers: [SleepLogsService],
})
export class SleepLogsModule {}
