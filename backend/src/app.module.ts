import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SleepLogsModule } from './sleep-logs/sleep-logs.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SleepLogsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
