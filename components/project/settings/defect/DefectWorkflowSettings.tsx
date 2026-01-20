
import React from 'react';
import { Plus, Edit3, Copy, Trash2, Clock, Settings, Circle, CheckCircle2 } from '../../../Icons';

export const DefectWorkflowSettings: React.FC = () => {
  const workflows = [
    { name: '系统默认工作流', isDefault: true, mode: '串行模式', desc: '-', time: '2026-01-01 14:01:44', author: 'TAPD_SYSTEM' },
  ];

  const statuses = [
      { name: '新', color: 'text-blue-500' },
      { name: '接受/处理', color: 'text-slate-400' },
      { name: '已解决', color: 'text-slate-400' },
      { name: '已验证', color: 'text-slate-400' },
      { name: '重新打开', color: 'text-slate-400' },
      { name: '已拒绝', color: 'text-slate-400' },
      { name: '已关闭', color: 'text-green-500', isEnd: true },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      
      {/* 状态定义部分 (Matching screenshots) */}
      <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">状态定义 (system workflow_default) <span className="text-xs font-normal text-slate-400 ml-2">支持添加、编辑和删除工作流状态。</span></h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
                <Plus size={14} /> 添加状态
              </button>
          </div>
          
          <div className="border border-slate-100 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase">
                <tr>
                  <th className="py-3 px-6">状态名称</th>
                  <th className="py-3 px-6">状态说明</th>
                  <th className="py-3 px-6 text-center w-32">起始状态</th>
                  <th className="py-3 px-6 text-center w-32">结束状态</th>
                  <th className="py-3 px-6 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-600 divide-y divide-slate-50">
                {statuses.map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 group transition-colors">
                    <td className="py-3 px-6 font-medium text-slate-800">{s.name}</td>
                    <td className="py-3 px-6 text-slate-400">-</td>
                    <td className="py-3 px-6 text-center">
                        <div className="flex justify-center">
                            {i === 0 ? (
                                <div className="w-4 h-4 rounded-full border-4 border-blue-500"></div>
                            ) : (
                                <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                            )}
                        </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                        <div className="flex justify-center">
                            {s.isEnd ? (
                                <CheckCircle2 size={16} className="text-blue-600" />
                            ) : (
                                <div className="w-4 h-4 rounded border border-slate-300"></div>
                            )}
                        </div>
                    </td>
                    <td className="py-3 px-6 text-right">
                       <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-slate-400 hover:text-blue-600"><Edit3 size={14} /></button>
                          <button className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded shadow-sm hover:bg-blue-700">保存&下ー步</button>
              <button className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-50">取消</button>
          </div>
      </div>

      <div className="border-t border-slate-100 pt-8">
          <div className="flex items-center gap-4 mb-6">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
                <Plus size={14} /> 新建工作流
            </button>
          </div>

          <div className="border border-slate-100 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase">
                <tr>
                  <th className="py-3 px-6">工作流名称 (1)</th>
                  <th className="py-3 px-6">工作流模式</th>
                  <th className="py-3 px-6">工作流说明</th>
                  <th className="py-3 px-6">应用的工作流</th>
                  <th className="py-3 px-6">最后修改时间</th>
                  <th className="py-3 px-6">最后修改人</th>
                  <th className="py-3 px-6 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-600 divide-y divide-slate-50">
                {workflows.map((w, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 group transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-800 flex items-center gap-2">
                        {w.isDefault && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                        {w.name}
                    </td>
                    <td className="py-4 px-6">{w.mode}</td>
                    <td className="py-4 px-6 text-slate-400">{w.desc}</td>
                    <td className="py-4 px-6">
                        <span className="text-blue-600 font-bold cursor-pointer hover:underline">编辑流程图</span>
                    </td>
                    <td className="py-4 px-6 font-mono">{w.time}</td>
                    <td className="py-4 px-6">{w.author}</td>
                    <td className="py-4 px-6 text-right">
                       <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-slate-300 hover:text-blue-600"><Settings size={16} /></button>
                          <button className="text-slate-300 hover:text-blue-600"><Copy size={16} /></button>
                          <button className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                          <button className="text-slate-300 hover:text-slate-600"><Clock size={16} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};
