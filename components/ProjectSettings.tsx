
import React from 'react';
import { Project } from '../types';
import { MOCK_USERS } from '../constants';

export const ProjectSettings = ({ project }: { project: Project }) => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 max-w-3xl">
        <h3 className="font-bold text-slate-800 mb-6 text-lg border-b border-slate-100 pb-4">项目设置</h3>
        
        <div className="space-y-6">
            <div>
                <label className="block text-base font-medium text-slate-700 mb-1">项目名称</label>
                <input type="text" defaultValue={project.name} className="w-full border border-slate-300 rounded px-3 py-2 focus:border-blue-500 outline-none text-base" />
            </div>
            
            <div>
                <label className="block text-base font-medium text-slate-700 mb-1">项目标识 (Key)</label>
                <input type="text" defaultValue={project.code} disabled className="w-full border border-slate-200 bg-slate-50 rounded px-3 py-2 text-slate-500 text-base" />
                <p className="text-sm text-slate-400 mt-1">项目标识创建后不可修改。</p>
            </div>

            <div>
                <label className="block text-base font-medium text-slate-700 mb-1">描述</label>
                <textarea className="w-full border border-slate-300 rounded px-3 py-2 focus:border-blue-500 outline-none h-24 text-base" placeholder="简要描述项目目标..." defaultValue="这是一个示例敏捷开发项目..." />
            </div>

            <div>
                <label className="block text-base font-medium text-slate-700 mb-1">项目负责人</label>
                <select className="w-full border border-slate-300 rounded px-3 py-2 focus:border-blue-500 outline-none text-base">
                    {MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-4">
                 <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">保存更改</button>
                 <button className="px-6 py-2 bg-white border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors">归档项目</button>
            </div>
        </div>
    </div>
);
