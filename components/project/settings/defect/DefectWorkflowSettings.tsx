
import React, { useState } from 'react';
import { Plus, Edit3, Copy, Trash2, Clock, Settings, CheckCircle2 } from '../../../common/Icons';
import { WorkflowBuilder } from '../common/WorkflowBuilder';
import { Workflow } from '../../../../types';

export const DefectWorkflowSettings: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    { 
        id: 'wf_def_sys', 
        name: '系统默认工作流', 
        scope: '缺陷', 
        description: '标准缺陷管理流程', 
        states: [], 
        transitions: [], 
        updatedAt: '2026-01-01 14:01:44', 
        author: 'TAPD_SYSTEM' 
    }
  ]);
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | undefined>(undefined);

  // 模拟默认状态数据，用于展示列表（实际应从 Workflow 对象中读取）
  const defaultStatuses = [
      { name: '新', color: 'text-blue-500' },
      { name: '接受/处理', color: 'text-slate-400' },
      { name: '已解决', color: 'text-slate-400' },
      { name: '已验证', color: 'text-slate-400' },
      { name: '重新打开', color: 'text-slate-400' },
      { name: '已拒绝', color: 'text-slate-400' },
      { name: '已关闭', color: 'text-green-500', isEnd: true },
  ];

  const handleCreate = () => {
    setEditingWorkflow(undefined);
    setIsEditorOpen(true);
  };

  const handleEdit = (wf: Workflow) => {
    setEditingWorkflow(wf);
    setIsEditorOpen(true);
  };

  const handleSave = (workflow: Workflow) => {
    if (editingWorkflow) {
      setWorkflows(prev => prev.map(w => w.id === workflow.id ? workflow : w));
    } else {
      setWorkflows(prev => [...prev, workflow]);
    }
    setIsEditorOpen(false);
  };

  if (isEditorOpen) {
    return (
      <WorkflowBuilder 
        initialData={editingWorkflow} 
        scope="缺陷" 
        onSave={handleSave} 
        onCancel={() => setIsEditorOpen(false)} 
      />
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      
      {/* 状态定义预览部分 (Matching screenshots - Simplified for demo) */}
      <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">状态定义 (系统默认) <span className="text-xs font-normal text-slate-400 ml-2">此处仅展示默认流转状态。请在下方工作流配置中进行完整管理。</span></h3>
          </div>
          
          <div className="border border-slate-100 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase">
                <tr>
                  <th className="py-3 px-6">状态名称</th>
                  <th className="py-3 px-6">状态说明</th>
                  <th className="py-3 px-6 text-center w-32">起始状态</th>
                  <th className="py-3 px-6 text-center w-32">结束状态</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-600 divide-y divide-slate-50">
                {defaultStatuses.map((s, i) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>

      <div className="border-t border-slate-100 pt-8">
          <div className="flex items-center gap-4 mb-6">
            <button 
                onClick={handleCreate}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
            >
                <Plus size={14} /> 新建工作流
            </button>
          </div>

          <div className="border border-slate-100 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase">
                <tr>
                  <th className="py-3 px-6">工作流名称 ({workflows.length})</th>
                  <th className="py-3 px-6">工作流说明</th>
                  <th className="py-3 px-6">应用范围</th>
                  <th className="py-3 px-6">最后修改时间</th>
                  <th className="py-3 px-6">最后修改人</th>
                  <th className="py-3 px-6 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-600 divide-y divide-slate-50">
                {workflows.map((w, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 group transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-800 flex items-center gap-2">
                        {w.id === 'wf_def_sys' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                        {w.name}
                        <button onClick={() => handleEdit(w)} className="text-blue-600 hover:underline text-[10px] ml-2 opacity-0 group-hover:opacity-100 transition-opacity">配置</button>
                    </td>
                    <td className="py-4 px-6 text-slate-400">{w.description}</td>
                    <td className="py-4 px-6">{w.scope}</td>
                    <td className="py-4 px-6 font-mono">{w.updatedAt}</td>
                    <td className="py-4 px-6">{w.author}</td>
                    <td className="py-4 px-6 text-right">
                       <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(w)} className="text-slate-300 hover:text-blue-600"><Settings size={16} /></button>
                          <button className="text-slate-300 hover:text-blue-600"><Copy size={16} /></button>
                          <button className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
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
