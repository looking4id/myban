
import React, { useState } from 'react';
import { MoreHorizontal, Plus, Layers, Link, Lock, Edit3, Printer, Share2, Settings, CheckCircle2, Maximize2, Users, Calendar } from './Icons';
import { StatusBadge, StatRing } from './ProjectShared';

const IterationDashboard = ({ onBack }: { onBack: () => void }) => {
    const tabs = ['概览', '列表', '看板', '成员任务跟踪', '工时报告', '进度图', '仪表盘'];
    const [activeTab, setActiveTab] = useState('概览');

    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-y-auto custom-scrollbar">
            {/* Iteration Header */}
            <div className="bg-white border-b border-slate-200 px-6 pt-5 pb-0 shadow-sm sticky top-0 z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div 
                            className="bg-blue-500 text-white p-2 rounded-lg shadow-sm cursor-pointer hover:bg-blue-600 transition-colors"
                            onClick={onBack}
                        >
                             {/* Placeholder Project Icon */}
                             <Layers size={24} />
                        </div>
                        <div>
                             <div className="flex items-center gap-2 mb-1">
                                 <h2 className="text-xl font-bold text-slate-800">【买家应用】迭代2</h2>
                                 <Link size={14} className="text-slate-400 hover:text-blue-500 cursor-pointer" />
                                 <Lock size={14} className="text-slate-400" />
                             </div>
                             <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                                 <span>2025-12-08 ~ 2025-12-19</span>
                             </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded">
                            <Edit3 size={18} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded">
                            <Printer size={18} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded">
                            <Share2 size={18} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded">
                            <MoreHorizontal size={18} />
                        </button>
                         <button className="px-3 py-1.5 bg-white border border-blue-500 text-blue-500 text-sm rounded hover:bg-blue-50 font-medium">
                            开启
                        </button>
                         <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded">
                            <Settings size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {tabs.map(tab => (
                        <div 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 cursor-pointer text-sm font-medium border-b-2 transition-colors ${
                                activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            {tab}
                        </div>
                    ))}
                    <button className="ml-auto mb-2 text-slate-400 hover:text-blue-600"><Plus size={16} /></button>
                     <button className="mb-2 text-slate-400 hover:text-slate-600"><Settings size={16} /></button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-6">
                
                {/* Top Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     {/* Delayed */}
                     <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                         <div className="flex flex-col justify-between h-full">
                             <div className="font-bold text-slate-800 text-base mb-4">延期工作</div>
                             <div className="w-24 h-24 rounded-full border-8 border-slate-100 flex items-center justify-center">
                                 <span className="text-3xl font-bold text-slate-800">0</span>
                             </div>
                         </div>
                     </div>
                     
                     {/* Unfinished */}
                     <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
                         <div className="font-bold text-slate-800 text-base mb-4">未完成需求</div>
                         <div className="flex justify-center">
                             <StatRing total={3} label="3" colorClass="blue-500" subLabel="需求 3" />
                         </div>
                     </div>

                     {/* Stagnant */}
                      <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                         <div className="font-bold text-slate-800 text-base mb-4">状态停留超过三天</div>
                          <div className="flex justify-center">
                             <div className="w-24 h-24 rounded-full border-8 border-slate-100 flex items-center justify-center">
                                 <span className="text-3xl font-bold text-slate-800">0</span>
                             </div>
                          </div>
                     </div>

                     {/* Total Work */}
                      <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
                         <div className="font-bold text-slate-800 text-base mb-4">总工作</div>
                         <div className="flex justify-center">
                             <StatRing total={3} label="3" colorClass="blue-500" subLabel="需求 3" />
                         </div>
                     </div>
                </div>

                {/* Timeline Section */}
                <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                    <div className="font-bold text-slate-800 text-base mb-6">关键时间</div>
                    <div className="relative flex items-center justify-between px-20 py-8">
                         {/* Line */}
                         <div className="absolute left-[20%] right-[20%] h-0.5 bg-blue-500 top-1/2 -translate-y-1/2 z-0"></div>
                         
                         {/* Stamp */}
                         <div className="absolute left-20 top-0 border-2 border-green-500 text-green-500 rounded-full w-24 h-24 flex items-center justify-center transform -rotate-12 opacity-80 z-0">
                             <div className="text-center leading-none">
                                 <div className="text-xs font-bold mb-1">PUBLISHED</div>
                                 <div className="text-xl font-black">已发布</div>
                             </div>
                         </div>

                         {/* Start Node */}
                         <div className="relative z-10 flex flex-col items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                                 <CheckCircle2 size={16} />
                             </div>
                             <div className="text-center">
                                 <div className="font-bold text-slate-700">开始时间</div>
                                 <div className="text-xs text-slate-500 font-mono mt-1">2025-12-08</div>
                             </div>
                         </div>

                         {/* End Node */}
                         <div className="relative z-10 flex flex-col items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                                 <CheckCircle2 size={16} />
                             </div>
                             <div className="text-center">
                                 <div className="font-bold text-slate-700">结束时间</div>
                                 <div className="text-xs text-slate-500 font-mono mt-1">2025-12-19</div>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Info Split Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm min-h-[300px] flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="font-bold text-slate-800 text-base">基本信息</h3>
                        </div>
                        
                        <div className="bg-slate-50/50 p-4 rounded-lg flex items-start gap-4 mb-8">
                             <div className="w-10 h-10 rounded bg-blue-500 flex items-center justify-center text-white">
                                 <Layers size={20} />
                             </div>
                             <div>
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-slate-800">【买家应用】迭代2</span>
                                    <span className="text-xs text-blue-600 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-full">开启</span>
                                    <span className="text-xs text-orange-500 flex items-center gap-1 cursor-pointer hover:underline">
                                        <Lock size={10} /> 需求范围
                                    </span>
                                 </div>
                                 <div className="text-xs text-slate-500 mt-4 flex items-center gap-8">
                                     <span className="flex items-center gap-1"><Users size={12}/> 创建人 TAPD</span>
                                     <span className="flex items-center gap-1"><Calendar size={12}/> 创建时间 2026-01-01 14:01:47</span>
                                 </div>
                             </div>
                        </div>

                        <div className="flex-1"></div>

                        {/* Progress Bars */}
                        <div className="mt-auto space-y-4">
                             <div className="flex items-center gap-4">
                                 <div className="w-24 text-4xl font-bold text-slate-800">0/8</div>
                                 <div className="flex-1">
                                     <div className="flex justify-between text-xs text-slate-500 mb-1">
                                         <span>需求</span>
                                         <span>0/3</span>
                                     </div>
                                     <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                         <div className="h-full bg-blue-500 w-[0%]"></div>
                                     </div>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4">
                                 <div className="w-24 text-4xl font-bold text-slate-800">0/0</div>
                                 <div className="flex-1">
                                     <div className="flex justify-between text-xs text-slate-500 mb-1">
                                         <span>缺陷</span>
                                         <span>0/0</span>
                                     </div>
                                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                         <div className="h-full bg-red-500 w-[0%]"></div>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Iteration Goal */}
                     <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm min-h-[300px]">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="font-bold text-slate-800 text-base">迭代目标</h3>
                            <div className="flex gap-2">
                                <button className="p-1 text-slate-400 hover:text-slate-600"><Maximize2 size={14}/></button>
                                <button className="p-1 text-slate-400 hover:text-slate-600"><Edit3 size={14}/></button>
                                <button className="p-1 text-slate-400 hover:text-slate-600"><MoreHorizontal size={14}/></button>
                            </div>
                        </div>
                        <div className="text-sm text-slate-600">
                            完成买家应用主要功能开发
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ProjectIterations = () => {
     const [selectedSprintId, setSelectedSprintId] = useState<string | null>(null);

     if (selectedSprintId) {
         return <IterationDashboard onBack={() => setSelectedSprintId(null)} />;
     }

     return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
                 { id: 'sp1', name: 'Sprint 1: 功能优化', status: '进行中', progress: 65, start: '2025/08/01', end: '2025/08/14' },
                 { id: 'sp2', name: '【买家应用】迭代2', status: '未开始', progress: 0, start: '2025/12/08', end: '2025/12/19' }, // Matches prototype name
                 { id: 'sp3', name: 'Sprint 3: 报表优化', status: '未开始', progress: 0, start: '2025/08/29', end: '2025/09/12' },
             ].map((sprint, i) => (
                 <div 
                    key={i} 
                    onClick={() => setSelectedSprintId(sprint.id)}
                    className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer group"
                 >
                     <div className="flex justify-between items-start mb-4">
                         <div>
                             <div className="font-bold text-slate-800 text-lg mb-1 group-hover:text-blue-600 transition-colors">{sprint.name}</div>
                             <StatusBadge status={sprint.status} />
                         </div>
                         <MoreHorizontal size={16} className="text-slate-400 hover:text-slate-600" />
                     </div>
                     <div className="space-y-4">
                         <div className="flex justify-between text-sm text-slate-500">
                             <span>时间:</span>
                             <span className="font-mono">{sprint.start} - {sprint.end}</span>
                         </div>
                         <div>
                             <div className="flex justify-between text-xs text-slate-500 mb-1">
                                 <span>完成度</span>
                                 <span>{sprint.progress}%</span>
                             </div>
                             <div className="w-full bg-slate-100 rounded-full h-2">
                                 <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${sprint.progress}%` }}></div>
                             </div>
                         </div>
                         <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-sm">
                             <div className="flex -space-x-2">
                                 {[1,2,3].map(u => (
                                     <div key={u} className="w-6 h-6 rounded-full bg-slate-200 border border-white"></div>
                                 ))}
                             </div>
                             <span className="text-blue-600 hover:underline">详情 &gt;</span>
                         </div>
                     </div>
                 </div>
             ))}
             <div className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 cursor-pointer min-h-[200px] transition-colors">
                 <Plus size={32} className="mb-2" />
                 <span>创建新迭代</span>
             </div>
         </div>
     );
};
