import axios from 'axios';
import { auth } from './firebase';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
