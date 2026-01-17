
import React from 'react';
import { Flag, Plus, Calendar, CheckCircle2 } from './Icons';
import { StatusBadge } from './ProjectShared';

const MOCK_MILESTONES = [
    { id: 1, title: '项目启动会', date: '2025-07-01', status: '已完成', description: '完成项目立项，确定核心团队成员，签署项目章程。' },
    { id: 2, title: '需求规格说明书冻结', date: '2025-07-15', status: '已完成', description: '所有核心需求已确认签字，不再接受重大变更。' },
    { id: 3, title: 'Alpha 版本内部发布', date: '2025-08-10', status: '进行中', description: '完成核心功能开发，进行内部集成测试。' },
    { id: 4, title: 'Beta 版本公测', date: '2025-08-25', status: '未开始', description: '邀请种子用户参与测试，收集反馈。' },
    { id: 5, title: 'V1.0 正式上线', date: '2025-09-10', status: '未开始', description: '全量发布，配合市场推广活动。' },
];

export const ProjectMilestones = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex flex-col">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Flag size={20} className="text-orange-500" /> 里程碑
            </h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-2">
                <Plus size={16} /> 新建里程碑
            </button>
        </div>
        <div className="flex-1 overflow-auto p-6">
            <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
                {MOCK_MILESTONES.map((m, i) => (
                    <div key={m.id} className="relative pl-6 group">
                        {/* Timeline Node */}
                        <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                            m.status === '已完成' ? 'bg-green-500' :
                            m.status === '进行中' ? 'bg-blue-500' : 'bg-slate-300'
                        }`}></div>
                        
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-slate-800 text-lg">{m.title}</h4>
                                <StatusBadge status={m.status} />
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                <span className="flex items-center gap-1 font-mono">
                                    <Calendar size={14} /> {m.date}
                                </span>
                                {m.status === '已完成' && (
                                    <span className="flex items-center gap-1 text-green-600">
                                        <CheckCircle2 size={14} /> 按期达成
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-slate-600">{m.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
