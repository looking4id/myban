
import React, { useState } from 'react';
import { Plus, Edit3, Copy, Trash2, Clock, Settings, ArrowRight } from '../../../common/Icons';
import { WorkflowBuilder } from '../common/WorkflowBuilder';
import { Workflow } from '../../../../types';

export const WorkflowSettings: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    { 
      id: 'wf_sys_1', 
      name: '系统默认模板', 
      scope: '需求', 
      description: '标准的需求流转流程', 
      states: [], 
      transitions: [], 
      updatedAt: '2026-01-01 14:01:43', 
      author: 'TAPD_SYSTEM' 
    }
  ]);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | undefined>(undefined);

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
        scope="需求" 
        onSave={handleSave} 
        onCancel={() => setIsEditorOpen(false)} 
      />
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <button 
        onClick={handleCreate}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 mb-6 shadow-sm transition-all"
      >
        <Plus size={14} /> 新建工作流
      </button>

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
                  {w.name}
                  <button onClick={() => handleEdit(w)} className="text-blue-600 hover:underline text-[10px] ml-2 opacity-0 group-hover:opacity-100 transition-opacity">编辑流程图</button>
                </td>
                <td className="py-4 px-6 text-slate-400">{w.description || '-'}</td>
                <td className="py-4 px-6">{w.scope}</td>
                <td className="py-4 px-6 font-mono">{w.updatedAt}</td>
                <td className="py-4 px-6">{w.author}</td>
                <td className="py-4 px-6 text-right">
                   <div className="flex justify-end gap-3">
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
  );
};
