import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export interface SleepLog {
  id: number;
  userId: number;
  bedtime: string;
  wakeTime: string;
  quality: number;
  mood: number;
  memo?: string;
  temperature?: number;
  pressure?: number;
  weatherCondition?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSleepLogDto {
  bedtime: string;
  wakeTime: string;
  quality: number;
  mood: number;
  memo?: string;
  temperature?: number;
  pressure?: number;
  weatherCondition?: string;
}
