
import React from 'react';
import { Priority } from '../types';

export const DonutChart = ({ percentage, color, label }: { percentage: number; color: string; label: string }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="transform -rotate-90 w-full h-full">
          <circle cx="48" cy="48" r={radius} stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-lg font-bold text-slate-700">{percentage}%</span>
      </div>
      <span className="text-sm text-slate-500 mt-1">{label}</span>
    </div>
  );
};

export const StatRing = ({ total, label, colorClass, subLabel }: { total: number, label: string, colorClass: string, subLabel: string }) => {
    return (
        <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex items-center justify-center">
                 {/* Background Circle */}
                <div className="absolute inset-0 rounded-full border-[8px] border-slate-100"></div>
                 {/* Active Circle (Simulated for non-zero) */}
                 {total > 0 && (
                     <div className={`absolute inset-0 rounded-full border-[8px] border-transparent border-t-${colorClass} border-r-${colorClass} rotate-45`}></div>
                 )}
                 {/* Inner Content */}
                 <div className="text-3xl font-bold text-slate-800 z-10">{total}</div>
            </div>
            <div>
                 <div className="font-bold text-base text-slate-800 mb-1">{label}</div>
                 <div className="text-xs text-slate-400">{subLabel}</div>
            </div>
        </div>
    );
};

export const StatusBadge = ({ status }: { status: string }) => {
    let colorClass = 'bg-slate-100 text-slate-600';
    if (status === '进行中' || status === '处理中' || status === '开启') colorClass = 'bg-blue-50 text-blue-600 border-blue-200';
    if (status === '已完成' || status === '已关闭' || status === '通过') colorClass = 'bg-green-50 text-green-600 border-green-200';
    if (status === '已逾期' || status === '失败' || status === 'Warning') colorClass = 'bg-red-50 text-red-600 border-red-200';
    if (status === '未开始' || status === '已识别') colorClass = 'bg-gray-50 text-gray-500 border-gray-200';
    
    return (
        <span className={`text-xs px-2.5 py-1 rounded border ${colorClass}`}>
            {status}
        </span>
    );
};

export const PriorityBadge = ({ priority }: { priority?: Priority }) => {
    if (priority === Priority.Urgent) {
      return <span className="text-xs px-1.5 py-0.5 rounded border border-red-200 text-red-600 bg-red-50 font-medium">紧急</span>;
    }
    if (priority === Priority.High) {
      return <span className="text-xs px-1.5 py-0.5 rounded border border-orange-200 text-orange-500 bg-orange-50 font-medium">高</span>;
    }
    return <span className="text-xs px-1.5 py-0.5 rounded border border-slate-200 text-slate-500 bg-slate-50 font-medium">普通</span>;
};
