import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ss from 'simple-statistics';

@Injectable()
export class AnalysisService {
  constructor(private prisma: PrismaService) {}

  async getAnalysis() {
    const logs = await this.prisma.sleepLog.findMany();

    if (logs.length === 0) {
      return {
        averageSleepDuration: 0,
        pressureMoodCorrelation: 0,
        goodSleepConditions: { temp: null, pressure: null },
        feedback: "No data available yet.",
      };
    }

    // 1. Average Sleep Time
    const durations = logs.map(log => {
      const diff = new Date(log.wakeTime).getTime() - new Date(log.bedtime).getTime();
      return diff / (1000 * 60 * 60); // Hours
    });
    const avgDuration = durations.length > 0 ? ss.mean(durations) : 0;

    // 2. Correlation: Pressure vs Mood
    // Filter logs that have pressure
    const pressureMoodData = logs
      .filter(l => l.pressure !== null && l.mood !== null)
      .map(l => [l.pressure, l.mood]);
    
    let correlation = 0;
    if (pressureMoodData.length > 2) {
        // simple-statistics sampleCorrelation takes two arrays
        const pressure = pressureMoodData.map(d => d[0] as number);
        const mood = pressureMoodData.map(d => d[1] as number);
        correlation = ss.sampleCorrelation(pressure, mood);
    }

    // 3. Good Sleep Conditions (Quality >= 4)
    const goodLogs = logs.filter(l => l.quality >= 4);
    const goodTemps = goodLogs.filter(l => l.temperature !== null).map(l => l.temperature);
    const goodPressures = goodLogs.filter(l => l.pressure !== null).map(l => l.pressure);

    const avgGoodTemp = goodTemps.length > 0 ? ss.mean(goodTemps as number[]) : null;
    const avgGoodPressure = goodPressures.length > 0 ? ss.mean(goodPressures as number[]) : null;

    // Feedback Generation
    let feedback = "";
    if (correlation > 0.3) {
      feedback += "You tend to feel better when the atmospheric pressure is higher. ";
    } else if (correlation < -0.3) {
      feedback += "You tend to feel better when the atmospheric pressure is lower. ";
    }
    
    if (avgGoodTemp) {
        feedback += `Your sleep quality is better around ${avgGoodTemp.toFixed(1)}°C. `;
    }

    if (!feedback) feedback = "Keep logging to get more insights!";

    return {
      averageSleepDuration: avgDuration,
      pressureMoodCorrelation: correlation,
      goodSleepConditions: {
        temp: avgGoodTemp,
        pressure: avgGoodPressure,
      },
      feedback,
    };
  }
}
