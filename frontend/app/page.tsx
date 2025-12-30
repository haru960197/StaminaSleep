'use client';

import { useEffect, useState } from 'react';
import { api, SleepLog } from '@/lib/api';
import Link from 'next/link';

export default function Dashboard() {
  const [logs, setLogs] = useState<SleepLog[]>([]);

  useEffect(() => {
    api.get<SleepLog[]>('/sleep-logs')
      .then((res) => setLogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sleep Logs</h1>
        <Link href="/entry" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Add Log
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {logs.length === 0 && (
            <li className="p-4 text-center text-gray-500">No logs found.</li>
          )}
          {logs.map((log) => (
            <li key={log.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-indigo-600 truncate">
                  {new Date(log.bedtime).toLocaleString()} - {new Date(log.wakeTime).toLocaleString()}
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Quality: {log.quality}
                  </span>
                  <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Mood: {log.mood}
                  </span>
                </div>
              </div>
              {log.memo && (
                <div className="mt-2 text-sm text-gray-500">
                  {log.memo}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}