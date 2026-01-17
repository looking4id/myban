
import React from 'react';
import { GitPullRequest, Plus, MoreHorizontal, PlayCircle, RefreshCw, CheckCircle2, AlertTriangle, GitBranch, Clock } from './Icons';

export const ProjectCodeReview = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <GitPullRequest size={20} className="text-purple-500" /> 代码评审
            </h3>
             <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-2">
                <Plus size={16} /> 发起评审
            </button>
        </div>
        <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                        <th className="py-3 px-4 w-24">ID</th>
                        <th className="py-3 px-4">标题</th>
                        <th className="py-3 px-4 w-32">状态</th>
                        <th className="py-3 px-4 w-32">发起人</th>
                        <th className="py-3 px-4 w-32">评审人</th>
                        <th className="py-3 px-4 w-40">更新时间</th>
                        <th className="py-3 px-4 w-20 text-right">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { id: 'MR-101', title: 'feat: add user login api', status: 'Open', author: 'looking4id', reviewer: 'dev01', time: '10分钟前' },
                        { id: 'MR-100', title: 'fix: payment callback error', status: 'Merged', author: 'dev01', reviewer: 'looking4id', time: '2小时前' },
                        { id: 'MR-99', title: 'docs: update readme', status: 'Merged', author: 'pm01', reviewer: 'looking4id', time: '1天前' },
                    ].map(mr => (
                        <tr key={mr.id} className="border-b border-slate-100 hover:bg-slate-50 group">
                            <td className="py-3 px-4 text-xs font-mono text-slate-500">{mr.id}</td>
                            <td className="py-3 px-4">
                                <div className="font-medium text-slate-700 hover:text-blue-600 cursor-pointer">{mr.title}</div>
                            </td>
                            <td className="py-3 px-4">
                                <span className={`text-xs px-2 py-0.5 rounded border ${
                                    mr.status === 'Open' ? 'bg-green-50 text-green-600 border-green-200' : 
                                    'bg-purple-50 text-purple-600 border-purple-200'
                                }`}>{mr.status}</span>
                            </td>
                             <td className="py-3 px-4 text-sm text-slate-600">{mr.author}</td>
                             <td className="py-3 px-4 text-sm text-slate-600">{mr.reviewer}</td>
                             <td className="py-3 px-4 text-sm text-slate-500">{mr.time}</td>
                             <td className="py-3 px-4 text-right">
                                <button className="p-1 text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export const ProjectPipeline = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
         <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <PlayCircle size={20} className="text-blue-500" /> 流水线
            </h3>
             <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-2">
                <PlayCircle size={16} /> 运行流水线
            </button>
        </div>
        <div className="flex-1 overflow-auto p-6">
            <div className="space-y-4">
                {[
                    { id: '#1024', name: 'Backend-CI-Master', status: 'Success', branch: 'master', trigger: 'Push by looking4id', time: '5分钟前', duration: '2m 30s' },
                    { id: '#1023', name: 'Frontend-CI-Dev', status: 'Running', branch: 'dev', trigger: 'Merge by dev01', time: '15分钟前', duration: 'Running' },
                    { id: '#1022', name: 'Backend-CI-Master', status: 'Failed', branch: 'master', trigger: 'Push by looking4id', time: '1小时前', duration: '1m 10s' },
                ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                p.status === 'Success' ? 'bg-green-100 text-green-600' :
                                p.status === 'Running' ? 'bg-blue-100 text-blue-600 animate-pulse' :
                                'bg-red-100 text-red-600'
                            }`}>
                                {p.status === 'Running' ? <RefreshCw size={20} className="animate-spin" /> : 
                                 p.status === 'Success' ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-800">{p.name}</span>
                                    <span className="text-xs font-mono text-slate-500">{p.id}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                                    <span className="flex items-center gap-1"><GitBranch size={12}/> {p.branch}</span>
                                    <span>{p.trigger}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className={`text-sm font-medium mb-1 ${
                                p.status === 'Success' ? 'text-green-600' :
                                p.status === 'Running' ? 'text-blue-600' :
                                'text-red-600'
                             }`}>{p.status}</div>
                             <div className="text-xs text-slate-500 flex items-center gap-2 justify-end">
                                 <Clock size={12} /> {p.duration}
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
