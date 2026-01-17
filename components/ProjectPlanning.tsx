
import React from 'react';
import { Calendar } from './Icons';

export const ProjectPlanning = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg">项目规划 (Roadmap)</h3>
            <div className="flex gap-2">
                 <button className="px-3 py-1.5 border border-slate-300 rounded text-sm flex items-center gap-1 hover:bg-slate-50">
                     <Calendar size={14} /> 按月视图
                 </button>
                 <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">新建规划</button>
            </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
            <div className="space-y-8">
                {['Q3 2025', 'Q4 2025'].map(quarter => (
                    <div key={quarter}>
                        <h4 className="font-bold text-slate-400 text-sm uppercase mb-4 border-b border-slate-100 pb-2">{quarter}</h4>
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-1/4">
                                        <div className="font-bold text-slate-700 text-base">核心功能迭代 v1.{i}</div>
                                        <div className="text-sm text-slate-500 mt-1">2025-0{7+i}-01 ~ 2025-0{8+i}-01</div>
                                    </div>
                                    <div className="flex-1 relative h-12 bg-slate-50 rounded border border-slate-100">
                                        <div 
                                            className={`absolute top-2 bottom-2 rounded opacity-80 ${i===1 ? 'bg-blue-400 left-4 right-1/2' : 'bg-green-400 left-1/2 right-4'}`}
                                        >
                                            <span className="text-xs text-white font-bold px-2 py-1 absolute left-2 top-1/2 -translate-y-1/2 whitespace-nowrap">
                                                {i===1 ? '进行中: 基础架构搭建' : '计划: 高级功能开发'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
