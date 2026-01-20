
import React, { useState } from 'react';
import { XCircle, Code2, Plus } from '../../../components/common/Icons';
import { ProjectService } from '../../../services/api';
import { MOCK_USERS } from '../../../utils/constants';

interface CreateProjectModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState('敏捷项目');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return;

    setLoading(true);
    try {
      const res = await ProjectService.create({
        name,
        code,
        type,
        manager: MOCK_USERS[0],
        iconColor: type === '敏捷项目' ? 'text-orange-500' : 'text-blue-500'
      });
      if (res.code === 0) {
        onSuccess();
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-800">新建项目</h3>
            <p className="text-xs text-slate-400 mt-1">创建一个新的协作空间来管理您的团队任务</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-600 transition-colors">
            <XCircle size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">项目名称</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!code) setCode(e.target.value.toUpperCase().slice(0, 3) + Math.floor(Math.random() * 100));
              }}
              placeholder="例如：敏捷研发项目02"
              className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">项目标识 (Code)</label>
              <input 
                type="text" 
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="PROJ-01"
                className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm font-mono focus:bg-white focus:border-blue-500 outline-none transition-all uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">项目类型</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm focus:bg-white focus:border-blue-500 outline-none transition-all appearance-none"
              >
                <option value="敏捷项目">敏捷项目</option>
                <option value="标准项目">标准项目</option>
                <option value="瀑布模型">瀑布模型</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded border border-blue-100 flex gap-4">
             <div className="w-10 h-10 rounded bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                <Code2 size={20} />
             </div>
             <p className="text-xs text-blue-800 leading-relaxed font-medium">
               项目标识一经创建通常不可修改，它将作为该项目下所有工作项（需求、任务、缺陷）的前缀。
             </p>
          </div>

          <div className="pt-6 flex gap-3">
             <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
             >
               取消
             </button>
             <button 
              type="submit" 
              disabled={loading}
              className="flex-[2] px-4 py-2 bg-blue-600 text-white rounded text-sm font-black hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
             >
               {loading ? '正在创建...' : (
                 <>
                   <Plus size={18} strokeWidth={3} />
                   确认创建
                 </>
               )}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};
