import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSleepLogDto } from './dto/create-sleep-log.dto';

@Injectable()
export class SleepLogsService {
  constructor(private prisma: PrismaService) {}

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

    return this.prisma.sleepLog.create({
      data: {
        ...createSleepLogDto,
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