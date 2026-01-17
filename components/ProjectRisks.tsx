
import React from 'react';
import { ShieldAlert, Search, Plus, MoreHorizontal } from './Icons';
import { StatusBadge } from './ProjectShared';

const MOCK_RISKS = [
    { id: 'R-001', title: '第三方支付接口政策变动', probability: '高', impact: '高', status: '处理中', owner: 'looking4id', strategy: '规避', created: '2025-07-05' },
    { id: 'R-002', title: '服务器并发预估不足', probability: '中', impact: '高', status: '已识别', owner: 'dev01', strategy: '减轻', created: '2025-07-08' },
    { id: 'R-003', title: 'UI设计师临时请假', probability: '低', impact: '中', status: '已关闭', owner: 'pm01', strategy: '接受', created: '2025-07-10' },
    { id: 'R-004', title: '竞品提前上线', probability: '中', impact: '中', status: '已识别', owner: 'pm01', strategy: '转移', created: '2025-07-12' },
];

export const ProjectRisks = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <ShieldAlert size={20} className="text-red-500" /> 风险管理
            </h3>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <input type="text" placeholder="搜索风险..." className="pl-8 pr-4 py-1.5 text-sm border border-slate-300 rounded focus:border-blue-500 outline-none w-64" />
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm flex items-center gap-2">
                    <Plus size={16} /> 登记风险
                </button>
            </div>
        </div>
        <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                        <th className="py-3 px-4 w-24">ID</th>
                        <th className="py-3 px-4">风险标题</th>
                        <th className="py-3 px-4 w-24">可能性</th>
                        <th className="py-3 px-4 w-24">影响程度</th>
                        <th className="py-3 px-4 w-32">应对策略</th>
                        <th className="py-3 px-4 w-24">负责人</th>
                        <th className="py-3 px-4 w-24">状态</th>
                        <th className="py-3 px-4 w-24 text-right">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_RISKS.map(risk => {
                        const isCritical = risk.probability === '高' && risk.impact === '高';
                        return (
                            <tr key={risk.id} className={`border-b border-slate-100 hover:bg-slate-50 group ${isCritical ? 'bg-red-50/30' : ''}`}>
                                <td className="py-3 px-4 text-xs font-mono text-slate-500">{risk.id}</td>
                                <td className="py-3 px-4">
                                    <div className="font-medium text-slate-700 group-hover:text-blue-600 cursor-pointer">{risk.title}</div>
                                    <div className="text-xs text-slate-400 mt-1">创建于: {risk.created}</div>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`text-xs px-2 py-0.5 rounded ${
                                        risk.probability === '高' ? 'bg-red-100 text-red-700' :
                                        risk.probability === '中' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                    }`}>{risk.probability}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`text-xs px-2 py-0.5 rounded ${
                                        risk.impact === '高' ? 'bg-red-100 text-red-700' :
                                        risk.impact === '中' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                    }`}>{risk.impact}</span>
                                </td>
                                <td className="py-3 px-4 text-sm text-slate-600">{risk.strategy}</td>
                                <td className="py-3 px-4 text-sm text-slate-600">{risk.owner}</td>
                                <td className="py-3 px-4"><StatusBadge status={risk.status} /></td>
                                <td className="py-3 px-4 text-right">
                                    <button className="p-1 text-slate-400 hover:text-slate-600">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
);
