import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('analysis')
@UseGuards(AuthGuard)
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get()
  getAnalysis(@CurrentUser() user: any) {
    return this.analysisService.getAnalysis(user.id);
  }
}
