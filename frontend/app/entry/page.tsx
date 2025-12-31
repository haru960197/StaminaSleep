'use client';

import { useForm } from 'react-hook-form';
import { api, CreateSleepLogDto } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EntryPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateSleepLogDto>({
    defaultValues: {
      quality: 3,
      mood: 3,
    }
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  const watchedQuality = watch('quality');
  const watchedMood = watch('mood');

  const onSubmit = async (data: CreateSleepLogDto) => {
    try {
      // Ensure types are correct (numbers for quality/mood)
      const payload = {
        ...data,
        quality: Number(data.quality),
        mood: Number(data.mood),
        bedtime: new Date(data.bedtime).toISOString(),
        wakeTime: new Date(data.wakeTime).toISOString(),
      };
      
      await api.post('/sleep-logs', payload);
      router.push('/');
    } catch (e) {
      console.error(e);
      setError('Failed to submit sleep log');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">New Sleep Log</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bedtime</label>
          <input
            type="datetime-local"
            {...register('bedtime', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
          {errors.bedtime && <span className="text-red-500 text-xs">Required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Wake Time</label>
          <input
            type="datetime-local"
            {...register('wakeTime', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
          {errors.wakeTime && <span className="text-red-500 text-xs">Required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sleep Quality (1.0-5.0): {watchedQuality}</label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            {...register('quality', { required: true, valueAsNumber: true })}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mood (1.0-5.0): {watchedMood}</label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            {...register('mood', { required: true, valueAsNumber: true })}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Memo</label>
          <textarea
            {...register('memo')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </form>
    </div>
  );
}