
import React, { useState, useEffect } from 'react';
import { XCircle, Box, Calendar, User, Flag } from '../Icons';
import { Version, PHASE_COLORS } from './types';
import { MOCK_USERS } from '../../constants';

// Standardized styles matching TestCreateModal
const commonInputClass = "w-full text-sm font-bold text-slate-700 bg-slate-50/50 border border-slate-100 rounded-none px-4 py-2.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all";
const commonLabelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5";

interface VersionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (v: Version) => void;
  initialData: Version | null;
  defaultDate?: string;
}

export const VersionModal: React.FC<VersionModalProps> = ({ 
  isOpen, onClose, onSave, initialData, defaultDate 
}) => {
  const [formData, setFormData] = useState<Version>({
    id: `v${Date.now()}`,
    version: '',
    name: '',
    phase: '开发环境',
    owner: 'lo',
    date: defaultDate || new Date().toISOString().split('T')[0],
    progress: 0,
    description: '',
    color: 'bg-blue-500'
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || {
        id: `v${Date.now()}`,
        version: '',
        name: '',
        phase: '开发环境',
        owner: 'lo',
        date: defaultDate || new Date().toISOString().split('T')[0],
        progress: 0,
        description: '',
        color: 'bg-blue-500'
      });
    }
  }, [isOpen, initialData, defaultDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, color: PHASE_COLORS[formData.phase] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[200] flex items-center justify-center p-4 font-sans text-slate-700">
      <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-2xl w-[720px] max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300 relative z-10 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-sm shadow-sm">
               <Box size={14} strokeWidth={3} />
            </div>
            <h3 className="font-black text-slate-800 tracking-tight text-sm">{initialData ? '编辑版本' : '新建版本'}</h3>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-600 transition-colors">
            <XCircle size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar no-scrollbar bg-white">
             {/* Title Input (Version Number) */}
             <div className="space-y-2">
                <label className={commonLabelClass}>版本号 <span className="text-red-500">*</span></label>
                <input 
                    required 
                    autoFocus
                    placeholder="例如: 1.2.0" 
                    className="text-xl font-black text-slate-800 w-full outline-none border-b-2 border-slate-100 focus:border-blue-500 pb-2 transition-all placeholder:text-slate-200" 
                    value={formData.version} 
                    onChange={e => setFormData({ ...formData, version: e.target.value })} 
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className={commonLabelClass}><Flag size={12}/> 发布阶段</label>
                    <select className={commonInputClass} value={formData.phase} onChange={e => setFormData({ ...formData, phase: e.target.value as any })}>
                        {Object.keys(PHASE_COLORS).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
                <div className="space-y-1">
                    <label className={commonLabelClass}><Calendar size={12}/> 计划发布日期</label>
                    <input type="date" className={commonInputClass} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                </div>
            </div>

            <div className="space-y-2">
                <label className={commonLabelClass}>发布名称</label>
                <input 
                    placeholder="描述本次版本发布的业务重点" 
                    className={commonInputClass} 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                />
            </div>

            <div className="space-y-1">
                <label className={commonLabelClass}><User size={12}/> 负责人</label>
                <select className={commonInputClass} value={formData.owner} onChange={e => setFormData({ ...formData, owner: e.target.value })}>
                    {MOCK_USERS.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                </select>
            </div>

            <div className="space-y-2">
                <label className={commonLabelClass}>版本摘要</label>
                <textarea 
                    className={`${commonInputClass} h-32 resize-none leading-relaxed font-medium`} 
                    placeholder="录入版本变更日志、Feature、修复项等内容..." 
                    value={formData.description || ''} 
                    onChange={e => setFormData({ ...formData, description: e.target.value })} 
                />
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-bold text-slate-500 hover:bg-white rounded-none transition-all">取消</button>
            <button onClick={handleSubmit} className="px-8 py-2 bg-blue-600 text-white rounded-none font-black text-sm hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 uppercase tracking-widest">确认提交</button>
        </div>
      </div>
    </div>
  );
};
