'use client';

import { useEffect, useState } from 'react';
import { api, SleepLog } from '@/lib/api';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts';

interface AnalysisData {
  averageSleepDuration: number;
  pressureMoodCorrelation: number;
  goodSleepConditions: {
    temp: number | null;
    pressure: number | null;
  };
  feedback: string;
}

export default function Dashboard() {
  const [logs, setLogs] = useState<SleepLog[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  useEffect(() => {
    // Fetch logs
    api.get<SleepLog[]>('/sleep-logs')
      .then((res) => setLogs(res.data))
      .catch((err) => console.error(err));

    // Fetch analysis
    api.get<AnalysisData>('/analysis')
      .then((res) => setAnalysis(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Prepare data for Bar Chart (Last 7 days)
  const last7DaysLogs = logs.slice(0, 7).reverse().map(log => {
      const duration = (new Date(log.wakeTime).getTime() - new Date(log.bedtime).getTime()) / (1000 * 60 * 60);
      return {
          date: new Date(log.bedtime).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }),
          duration: parseFloat(duration.toFixed(2)),
      };
  });

  // Prepare data for Scatter Chart (Pressure vs Mood)
  const scatterData = logs
    .filter(log => log.pressure != null && log.mood != null)
    .map(log => ({
      pressure: log.pressure,
      mood: log.mood,
    }));

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sleep Dashboard</h1>
        <Link href="/entry" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Add Log
        </Link>
      </div>

      {/* Analysis Feedback Section */}
      {analysis && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {/* Icon */}
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700 font-medium">
                {analysis.feedback}
              </p>
              <p className="text-xs text-blue-500 mt-1">
                Avg Sleep: {analysis.averageSleepDuration.toFixed(1)}h | Correlation: {analysis.pressureMoodCorrelation.toFixed(2)}
              </p>
              {analysis.goodSleepConditions.temp && (
                 <p className="text-xs text-blue-500">
                    Ideal conditions: ~{analysis.goodSleepConditions.temp.toFixed(1)}°C
                 </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart: Sleep Duration */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Sleep Duration (Last 7 Logs)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7DaysLogs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="duration" fill="#8884d8" name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scatter Chart: Pressure vs Mood */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">hPa vs. Mood</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="pressure" name="Pressure" unit="hPa" domain={['auto', 'auto']} />
                <YAxis type="number" dataKey="mood" name="Mood" unit="" domain={[0, 6]} tickCount={6} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Logs" data={scatterData} fill="#82ca9d" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* List (Existing) */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <h2 className="px-4 py-4 sm:px-6 text-lg font-semibold border-b border-gray-200">Recent Logs</h2>
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
                <div className="ml-2 flex-shrink-0 flex items-center space-x-2">
                   {log.weatherCondition && (
                      <span className="text-xs text-gray-500">
                          {log.weatherCondition} ({log.temperature?.toFixed(1)}°C)
                      </span>
                   )}
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Q: {log.quality}
                  </span>
                  <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    M: {log.mood}
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
