
import React from 'react';
import { BarChart2, Activity } from './Icons';

export const ProjectMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-auto p-1">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BarChart2 size={20} className="text-indigo-500" /> 需求交付周期
            </h3>
            <div className="h-64 flex items-end justify-between px-4 pb-6 border-b border-slate-100 relative">
                {[5, 7, 4, 6, 8, 5, 3].map((h, i) => (
                    <div key={i} className="w-8 bg-indigo-500 rounded-t hover:bg-indigo-600 transition-colors relative group" style={{ height: `${h * 10}%` }}>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{h}天</div>
                    </div>
                ))}
            </div>
             <div className="flex justify-between mt-2 text-xs text-slate-400 px-4">
                <span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span><span>周日</span>
            </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Activity size={20} className="text-green-500" /> 团队吞吐量
            </h3>
            <div className="h-64 flex items-end justify-between px-4 pb-6 border-b border-slate-100 relative">
                {[12, 15, 10, 18, 20, 14, 8].map((h, i) => (
                    <div key={i} className="w-8 bg-green-500 rounded-t hover:bg-green-600 transition-colors relative group" style={{ height: `${h * 4}%` }}>
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{h}个</div>
                    </div>
                ))}
            </div>
             <div className="flex justify-between mt-2 text-xs text-slate-400 px-4">
                <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span>
            </div>
        </div>
        
         <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 md:col-span-2">
             <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2">缺陷密度分布</h3>
             </div>
             <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                 <div className="bg-green-500 w-[60%]" title="低优先级"></div>
                 <div className="bg-yellow-500 w-[25%]" title="中优先级"></div>
                 <div className="bg-orange-500 w-[10%]" title="高优先级"></div>
                 <div className="bg-red-500 w-[5%]" title="紧急"></div>
             </div>
             <div className="flex gap-6 mt-4 text-xs text-slate-500 justify-center">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> 低 (60%)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> 中 (25%)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> 高 (10%)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> 紧急 (5%)</div>
             </div>
         </div>
    </div>
);
