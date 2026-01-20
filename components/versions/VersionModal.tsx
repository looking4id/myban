
import React, { useState, useEffect } from 'react';
import { XCircle, Box, LayoutList, Zap, ChevronDown } from '../Icons';
import { Version, PHASE_COLORS } from './types';
import { MOCK_USERS } from '../../constants';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl animate-in zoom-in-95 duration-300 overflow-hidden border border-white/20">
        <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between bg-white flex-shrink-0">
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">{initialData ? '修改版本计划' : '定义新版本发布'}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Version Release Lifecycle</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><XCircle size={28} /></button>
        </div>
        
        <form className="p-10 space-y-10" onSubmit={(e) => { e.preventDefault(); onSave({ ...formData, color: PHASE_COLORS[formData.phase] }); }}>
          {/* 元数据面包屑 (还原图1风格) */}
          <div className="flex items-center gap-6 py-2.5 px-5 bg-slate-50/80 rounded-none border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"><LayoutList size={14} className="text-slate-300"/> 事项类别: <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-none flex items-center gap-1 leading-none font-black uppercase">版本发布 <ChevronDown size={10}/></span></div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"><Zap size={14} className="text-slate-300"/> 模板: <span className="text-slate-700 flex items-center gap-1 leading-none font-black">通用版本模板 <ChevronDown size={10}/></span></div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">正式版本号 <span className="text-red-500">*</span></label>
                    <input required placeholder="例如: 1.2.0" className="w-full bg-slate-50 border border-slate-200 rounded-none px-5 py-3 text-sm font-black text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-200" value={formData.version} onChange={e => setFormData({ ...formData, version: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">当前发布阶段</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-none px-4 py-3 text-sm font-black text-slate-700 focus:bg-white focus:border-blue-500 outline-none cursor-pointer transition-all" value={formData.phase} onChange={e => setFormData({ ...formData, phase: e.target.value as any })}>
                        {Object.keys(PHASE_COLORS).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">版本发布名称</label>
                <input required placeholder="描述本次版本发布的业务重点" className="w-full bg-slate-50 border border-slate-100 rounded-none px-5 py-3 text-sm font-bold text-slate-700 focus:bg-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-200" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">负责PM</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-none px-4 py-3 text-sm font-bold text-slate-700 focus:bg-white focus:border-blue-500 outline-none cursor-pointer transition-all" value={formData.owner} onChange={e => setFormData({ ...formData, owner: e.target.value })}>
                        {MOCK_USERS.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">计划发布日期</label>
                    <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-none px-5 py-3 text-sm font-black text-slate-700 focus:bg-white focus:border-blue-500 outline-none transition-all" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">版本更新摘要 (Markdown)</label>
                <textarea className="w-full h-32 bg-slate-50 border border-slate-100 rounded-none px-5 py-4 text-sm font-medium text-slate-600 focus:bg-white focus:border-blue-500 outline-none resize-none leading-relaxed transition-all placeholder:text-slate-200" placeholder="录入版本变更日志、Feature、修复项等内容..." value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
            </div>
          </div>

          <div className="pt-10 border-t border-slate-100 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 border-2 border-slate-200 text-slate-400 rounded-none font-black text-sm hover:bg-slate-50 hover:text-slate-600 transition-all uppercase tracking-widest">取消</button>
            <button type="submit" className="flex-[2] py-4 bg-blue-600 text-white rounded-none font-black text-sm hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all active:scale-[0.98] uppercase tracking-[0.2em]">提交并发布</button>
          </div>
        </form>
      </div>
    </div>
  );
};
