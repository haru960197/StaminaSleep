'use client';

import { useForm } from 'react-hook-form';
import { api, SleepLog, UpdateSleepLogDto } from '@/lib/api';
import { useState } from 'react';

interface EditSleepLogFormProps {
  log: SleepLog;
  onClose: () => void;
  onSuccess: () => void;
}

function toLocalISOString(dateString: string): string {
  const date = new Date(dateString);
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const localDate = new Date(date.getTime() - offsetMs);
  return localDate.toISOString();
}

export function EditSleepLogForm({ log, onClose, onSuccess }: EditSleepLogFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<UpdateSleepLogDto>({
    defaultValues: {
      bedtime: toLocalISOString(log.bedtime).slice(0, 16),
      wakeTime: toLocalISOString(log.wakeTime).slice(0, 16),
      quality: log.quality,
      vitality: log.vitality || undefined,
      memo: log.memo || '',
    }
  });
  const [error, setError] = useState<string | null>(null);

  const watchedQuality = watch('quality');
  const watchedVitality = watch('vitality');

  const onSubmit = async (data: UpdateSleepLogDto) => {
    try {
      const payload = {
        ...data,
        quality: Number(data.quality),
        vitality: data.vitality ? Number(data.vitality) : undefined,
        bedtime: new Date(data.bedtime!).toISOString(),
        wakeTime: new Date(data.wakeTime!).toISOString(),
      };
      
      await api.patch(`/sleep-logs/${log.id}`, payload);
      onSuccess();
      onClose();
    } catch (e) {
      console.error(e);
      setError('Failed to update sleep log');
    }
  };

  return (
    <div className="mt-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bedtime</label>
          <input
            type="datetime-local"
            {...register('bedtime', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Wake Time</label>
          <input
            type="datetime-local"
            {...register('wakeTime', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
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
          <label className="block text-sm font-medium text-gray-700">Vitality (1.0-5.0): {watchedVitality ?? 'Not set'}</label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            {...register('vitality', { required: false, valueAsNumber: true })}
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

        <div className="flex justify-end space-x-2">
            <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
            Cancel
            </button>
            <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
            Update
            </button>
        </div>
      </form>
    </div>
  );
}
