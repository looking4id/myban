
import React, { useState } from 'react';
import { ChevronLeft, Plus, Trash2, ArrowRight, Check, XCircle, Settings, Circle, CheckCircle2 } from '../../../common/Icons';
import { Workflow, WorkflowState, TaskType } from '../../../../types';

interface WorkflowBuilderProps {
  initialData?: Workflow;
  scope: string;
  onSave: (workflow: Workflow) => void;
  onCancel: () => void;
}

const DEFAULT_STATES: WorkflowState[] = [
  { id: 's1', name: '未开始', type: 'start', color: 'bg-slate-400' },
  { id: 's2', name: '进行中', type: 'progress', color: 'bg-blue-500' },
  { id: 's3', name: '已完成', type: 'end', color: 'bg-green-500' },
];

export const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ initialData, scope, onSave, onCancel }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [states, setStates] = useState<WorkflowState[]>(initialData?.states || DEFAULT_STATES);
  const [transitions, setTransitions] = useState<{ fromId: string; toIds: string[] }[]>(
    initialData?.transitions || [
      { fromId: 's1', toIds: ['s2'] },
      { fromId: 's2', toIds: ['s1', 's3'] },
      { fromId: 's3', toIds: ['s2'] }, // Allow reopen
    ]
  );

  const [editingState, setEditingState] = useState<WorkflowState | null>(null);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);

  // Helper to get allowed transitions for a state
  const getAllowedTransitions = (stateId: string) => {
    return transitions.find(t => t.fromId === stateId)?.toIds || [];
  };

  // Toggle a transition
  const toggleTransition = (fromId: string, toId: string) => {
    if (fromId === toId) return; // Prevent self-loop for simplicity in this UI
    
    setTransitions(prev => {
      const existing = prev.find(t => t.fromId === fromId);
      if (existing) {
        // Toggle
        const newToIds = existing.toIds.includes(toId)
          ? existing.toIds.filter(id => id !== toId)
          : [...existing.toIds, toId];
        
        return prev.map(t => t.fromId === fromId ? { ...t, toIds: newToIds } : t);
      } else {
        // Add new
        return [...prev, { fromId, toIds: [toId] }];
      }
    });
  };

  const handleSaveState = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingState) return;

    if (states.find(s => s.id === editingState.id)) {
      // Update
      setStates(prev => prev.map(s => s.id === editingState.id ? editingState : s));
    } else {
      // Create
      setStates(prev => [...prev, editingState]);
    }
    setIsStateModalOpen(false);
    setEditingState(null);
  };

  const handleDeleteState = (id: string) => {
    if (confirm('删除状态将同时删除相关流转配置，确定删除？')) {
      setStates(prev => prev.filter(s => s.id !== id));
      setTransitions(prev => prev.filter(t => t.fromId !== id).map(t => ({
        ...t,
        toIds: t.toIds.filter(toId => toId !== id)
      })));
    }
  };

  const openNewStateModal = () => {
    setEditingState({
      id: `s_${Date.now()}`,
      name: '',
      type: 'progress',
      color: 'bg-blue-500'
    });
    setIsStateModalOpen(true);
  };

  const handleSaveWorkflow = () => {
    if (!name.trim()) {
      alert('请输入工作流名称');
      return;
    }
    onSave({
      id: initialData?.id || `wf_${Date.now()}`,
      name,
      scope,
      description,
      states,
      transitions,
      updatedAt: new Date().toLocaleString(),
      author: 'Current User'
    });
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="px-8 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onCancel} className="p-1.5 hover:bg-slate-100 rounded text-slate-500">
            <ChevronLeft size={16} />
          </button>
          <h3 className="font-bold text-slate-800 text-lg">
            {initialData ? '编辑工作流' : '新建工作流'}
          </h3>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="px-4 py-2 border border-slate-200 text-slate-600 rounded text-sm font-bold hover:bg-slate-50">取消</button>
          <button onClick={handleSaveWorkflow} className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-sm">保存配置</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8 custom-scrollbar">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Basic Info */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 grid grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">工作流名称 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none"
                  placeholder="例如：标准敏捷开发流程"
                />
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">适用范围</label>
                <div className="px-4 py-2 bg-slate-200/50 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium">
                  {scope}
                </div>
             </div>
             <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">描述</label>
                <input 
                  type="text" 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none"
                  placeholder="简要描述该工作流的用途..."
                />
             </div>
          </div>

          {/* States & Transitions Matrix */}
          <div>
             <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-800 text-base">状态流转配置</h4>
                <button 
                  onClick={openNewStateModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
                >
                  <Plus size={14} /> 添加状态
                </button>
             </div>

             <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase border-b border-slate-200">
                     <tr>
                       <th className="py-3 px-6 w-48 border-r border-slate-100">当前状态</th>
                       <th className="py-3 px-6">允许流转至 (勾选开启流转)</th>
                       <th className="py-3 px-6 w-24 text-center">操作</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 text-sm">
                     {states.map(state => (
                       <tr key={state.id} className="hover:bg-slate-50/50 transition-colors">
                         <td className="py-4 px-6 border-r border-slate-100 bg-slate-50/30">
                           <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${state.color}`}></div>
                              <span className="font-bold text-slate-700">{state.name}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                state.type === 'start' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                state.type === 'end' ? 'bg-green-50 text-green-600 border-green-100' :
                                'bg-slate-100 text-slate-500 border-slate-200'
                              }`}>
                                {state.type === 'start' ? '初始' : state.type === 'end' ? '结束' : '进行中'}
                              </span>
                           </div>
                         </td>
                         <td className="py-4 px-6">
                           <div className="flex flex-wrap gap-3">
                             {states.filter(s => s.id !== state.id).map(targetState => {
                               const isActive = getAllowedTransitions(state.id).includes(targetState.id);
                               return (
                                 <div 
                                   key={targetState.id}
                                   onClick={() => toggleTransition(state.id, targetState.id)}
                                   className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all select-none ${
                                     isActive 
                                       ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' 
                                       : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                                   }`}
                                 >
                                   <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                                     isActive ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'
                                   }`}>
                                     {isActive && <Check size={10} className="text-white" strokeWidth={4} />}
                                   </div>
                                   <span className="font-medium text-xs">{targetState.name}</span>
                                 </div>
                               );
                             })}
                           </div>
                         </td>
                         <td className="py-4 px-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={() => { setEditingState(state); setIsStateModalOpen(true); }}
                                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-colors"
                                >
                                  <Settings size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteState(state.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                            </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
          </div>

        </div>
      </div>

      {/* Add/Edit State Modal */}
      {isStateModalOpen && editingState && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h3 className="font-bold text-slate-800">配置状态</h3>
                 <button onClick={() => setIsStateModalOpen(false)} className="text-slate-400 hover:text-slate-600"><XCircle size={20}/></button>
              </div>
              <form onSubmit={handleSaveState} className="p-6 space-y-5">
                 <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">状态名称</label>
                    <input 
                      required
                      value={editingState.name}
                      onChange={e => setEditingState({ ...editingState, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none"
                      placeholder="例如：待审核"
                    />
                 </div>
                 
                 <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">状态类型</label>
                    <div className="grid grid-cols-3 gap-3">
                       {[
                         { id: 'start', label: '初始状态' },
                         { id: 'progress', label: '进行中' },
                         { id: 'end', label: '结束状态' }
                       ].map(type => (
                         <div 
                           key={type.id}
                           onClick={() => setEditingState({ ...editingState, type: type.id as any })}
                           className={`text-center py-2 rounded-lg border text-xs font-bold cursor-pointer transition-all ${
                             editingState.type === type.id 
                               ? 'bg-blue-50 border-blue-500 text-blue-700' 
                               : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                           }`}
                         >
                           {type.label}
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">标识颜色</label>
                    <div className="flex flex-wrap gap-3">
                       {['bg-slate-400', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-indigo-500', 'bg-pink-500'].map(color => (
                          <div 
                            key={color}
                            onClick={() => setEditingState({ ...editingState, color })}
                            className={`w-8 h-8 rounded-full cursor-pointer transition-all ${color} ${editingState.color === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'hover:scale-110'}`}
                          ></div>
                       ))}
                    </div>
                 </div>

                 <div className="pt-2 flex gap-3">
                    <button type="button" onClick={() => setIsStateModalOpen(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">取消</button>
                    <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm">确定</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};
