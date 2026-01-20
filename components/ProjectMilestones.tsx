
import React, { useState, useMemo } from 'react';
import { 
  Flag, Plus, Calendar, CheckCircle2, Search, Filter, 
  MoreHorizontal, Circle, XCircle, Trash2, Edit3, User
} from './Icons';
import { StatusBadge } from './ProjectShared';
import { MOCK_USERS } from '../constants';

// 里程碑实体接口
interface Milestone {
  id: number | string;
  title: string;
  subtitle: string;
  date: string;
  status: string;
  owner: string;
  ownerColor: string;
}

// 里程碑维护弹窗
const MilestoneModal = ({ 
    isOpen, onClose, onSave, initialData 
}: { 
    isOpen: boolean, onClose: () => void, onSave: (m: Milestone) => void, initialData?: Milestone | null 
}) => {
    const [formData, setFormData] = useState<Partial<Milestone>>(
        initialData || {
            title: '',
            subtitle: '',
            date: new Date().toISOString().split('T')[0],
            status: '未开始',
            owner: 'lo',
            ownerColor: 'bg-blue-500'
        }
    );

    React.useEffect(() => {
        if (isOpen) {
            setFormData(initialData || {
                title: '',
                subtitle: '',
                date: new Date().toISOString().split('T')[0],
                status: '未开始',
                owner: 'lo',
                ownerColor: 'bg-blue-500'
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 font-sans text-slate-700">
            <div className="bg-white rounded-none shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200 overflow-hidden border border-white/20">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-none shadow-inner"><Flag size={20} /></div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800">{initialData ? '编辑里程碑' : '新建里程碑'}</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Project Milestone Entry</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"><XCircle size={24} /></button>
                </div>
                
                <form className="p-8 space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    onSave({
                        ...formData,
                        id: formData.id || Date.now(),
                    } as Milestone);
                }}>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">里程碑名称</label>
                        <input 
                            required 
                            autoFocus
                            className="w-full border border-slate-200 rounded-none px-4 py-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-slate-50 focus:bg-white font-bold"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                            placeholder="例如：核心版本发布"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">目标描述</label>
                        <textarea 
                            className="w-full h-20 border border-slate-200 rounded-none px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                            value={formData.subtitle}
                            onChange={e => setFormData({...formData, subtitle: e.target.value})}
                            placeholder="简述该阶段的具体交付内容..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">计划完成日期</label>
                            <input 
                                type="date"
                                required
                                className="w-full border border-slate-200 rounded-none px-4 py-3 text-sm outline-none focus:border-blue-500 bg-slate-50 font-bold"
                                value={formData.date}
                                onChange={e => setFormData({...formData, date: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">状态</label>
                            <select 
                                className="w-full border border-slate-200 rounded-none px-4 py-3 text-sm outline-none focus:border-blue-500 bg-slate-50 font-bold cursor-pointer"
                                value={formData.status}
                                onChange={e => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="未开始">未开始</option>
                                <option value="进行中">进行中</option>
                                <option value="已完成">已完成</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">负责人</label>
                        <select 
                            className="w-full border border-slate-200 rounded-none px-4 py-3 text-sm outline-none focus:border-blue-500 bg-slate-50 font-bold cursor-pointer"
                            value={formData.owner}
                            onChange={e => {
                                const user = MOCK_USERS.find(u => u.name === e.target.value);
                                setFormData({...formData, owner: e.target.value, ownerColor: user?.avatarColor.replace('bg-', '') || 'indigo-500'});
                            }}
                        >
                            {MOCK_USERS.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-none text-slate-500 font-bold text-sm hover:bg-slate-50 transition-colors">取消</button>
                        <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-none font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">提交保存</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const ProjectMilestones = () => {
  // 核心数据状态
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 1, title: '创建新项目', subtitle: '完成项目立项与团队组建', date: '2025-12-11', status: '已完成', owner: 'lo', ownerColor: 'bg-purple-500' },
    { id: 2, title: '邀请同事加入项目', subtitle: '完成核心开发人员入驻', date: '2025-12-18', status: '已完成', owner: 'lo', ownerColor: 'bg-purple-500' },
    { id: 3, title: '在项目中管理需求池', subtitle: '完成首批需求梳理与评审', date: '2025-12-25', status: '进行中', owner: '产品经理', ownerColor: 'bg-indigo-500' },
    { id: 4, title: '通过数据报表进行项目复盘', subtitle: 'Sprint 1 结束后的数据分析', date: '2026-01-01', status: '未开始', owner: 'lo', ownerColor: 'bg-purple-500' },
    { id: 5, title: '完成一次迭代交付', subtitle: 'V1.0 版本正式上线', date: '2026-01-10', status: '未开始', owner: 'Dev 1', ownerColor: 'bg-blue-500' },
  ]);

  // UI 交互状态
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);

  // 过滤后的数据
  const filteredMilestones = useMemo(() => {
    return milestones.filter(m => {
        const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === '全部' || m.status === statusFilter;
        return matchesSearch && matchesStatus;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [milestones, searchQuery, statusFilter]);

  // 业务逻辑处理
  const handleSave = (m: Milestone) => {
    if (editingMilestone) {
        setMilestones(prev => prev.map(item => item.id === m.id ? m : item));
    } else {
        setMilestones(prev => [...prev, m]);
    }
    setIsModalOpen(false);
    setEditingMilestone(null);
  };

  const handleDelete = (id: number | string) => {
    if (window.confirm("确定要永久删除该里程碑吗？此操作不可逆。")) {
        setMilestones(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleEdit = (m: Milestone) => {
    setEditingMilestone(m);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-none border border-slate-200 shadow-sm overflow-hidden font-sans text-slate-700">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/20">
        <div>
          <h2 className="text-2xl font-black text-slate-800 mb-1 tracking-tight">里程碑规划</h2>
          <p className="text-sm text-slate-400 font-medium tracking-tight">跟踪项目关键阶段与核心交付节点</p>
        </div>
        <button 
            onClick={() => { setEditingMilestone(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-none hover:bg-blue-700 text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          <span>新建里程碑</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* 时间轴可视化预览 (按日期排序) */}
        <div className="px-10 py-12 bg-slate-50/30 border-b border-slate-100 overflow-x-auto no-scrollbar">
          <div className="min-w-[900px] relative pb-8">
            {/* 时间轴基线 */}
            <div className="absolute top-[11px] left-[5%] right-[5%] h-1 bg-slate-200 rounded-full"></div>
            
            <div className="flex justify-between items-start relative z-10">
              {filteredMilestones.map((m) => (
                <div key={m.id} className="flex flex-col items-center group w-1/5">
                  {/* 点位 */}
                  <div className={`w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-all cursor-pointer group-hover:scale-125 mb-3 ${
                    m.status === '已完成' ? 'bg-emerald-500' : m.status === '进行中' ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'
                  }`}>
                    {m.status === '已完成' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                  
                  {/* 悬浮标签 */}
                  <div className="text-center space-y-1 px-2">
                    <div className={`text-[10px] font-mono font-black tracking-wider ${m.status === '已完成' ? 'text-emerald-500' : m.status === '进行中' ? 'text-blue-500' : 'text-slate-400'}`}>
                      {m.date}
                    </div>
                    <div className="text-xs font-black text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{m.title}</div>
                    <div className="text-[9px] text-slate-400 font-medium leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
                      {m.status}
                    </div>
                  </div>
                </div>
              ))}
              {filteredMilestones.length === 0 && (
                <div className="w-full text-center py-4 text-slate-300 text-xs italic tracking-widest font-black uppercase">
                    Timeline Visual Suspended
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 综合管理工具栏 */}
        <div className="px-6 py-4 flex items-center justify-between bg-white border-b border-slate-50 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-xs w-full">
                <input 
                    type="text" 
                    placeholder="输入关键词搜索..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-none focus:outline-none focus:border-blue-500 bg-slate-50 transition-all focus:bg-white shadow-sm"
                />
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-none gap-1">
                {['全部', '未开始', '进行中', '已完成'].map(st => (
                    <button 
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1 text-xs font-bold rounded-none transition-all ${statusFilter === st ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {st}
                    </button>
                ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest border border-slate-100 px-2 py-1 rounded-none">
                Showing: {filteredMilestones.length}
             </div>
             <button className="p-2 hover:bg-slate-50 rounded-none text-slate-400 transition-all"><MoreHorizontal size={18}/></button>
          </div>
        </div>

        {/* 里程碑明细列表 */}
        <div className="px-6 py-6">
          <div className="border border-slate-100 rounded-none overflow-hidden shadow-sm bg-white">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="py-4 px-8 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
                  <th className="py-4 px-4">里程碑目标</th>
                  <th className="py-4 px-4 w-32">当前状态</th>
                  <th className="py-4 px-4 w-40">负责人</th>
                  <th className="py-4 px-4 w-40">计划交付</th>
                  <th className="py-4 px-8 text-right">管理操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredMilestones.map((m) => (
                  <tr key={m.id} className="hover:bg-blue-50/10 group transition-all cursor-pointer" onClick={() => handleEdit(m)}>
                    <td className="py-5 px-8" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-slate-300" /></td>
                    <td className="py-5 px-4">
                        <div className="flex flex-col gap-0.5">
                            <span className="font-black text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{m.title}</span>
                            <span className="text-xs text-slate-400 line-clamp-1">{m.subtitle}</span>
                        </div>
                    </td>
                    <td className="py-5 px-4"><StatusBadge status={m.status} /></td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${m.ownerColor.includes('bg-') ? m.ownerColor : 'bg-' + m.ownerColor} text-white flex items-center justify-center text-[10px] font-black shadow-sm`}>
                          {m.owner.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-slate-600">{m.owner}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400">
                            <Calendar size={12} />
                            {m.date}
                        </div>
                    </td>
                    <td className="py-5 px-8 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                            onClick={() => handleEdit(m)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-none border border-transparent hover:border-slate-100 shadow-sm"
                        >
                            <Edit3 size={16} />
                        </button>
                        <button 
                            onClick={() => handleDelete(m.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-none border border-transparent hover:border-slate-100 shadow-sm"
                        >
                            <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredMilestones.length === 0 && (
                <div className="py-32 flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 border border-slate-100">
                        <Flag size={48} strokeWidth={1} />
                    </div>
                    <div className="text-center">
                        <p className="font-black text-slate-400 uppercase tracking-widest text-sm mb-1">No Milestones Identified</p>
                        <p className="text-xs text-slate-300 font-medium">暂时没有符合搜索或过滤条件的里程碑</p>
                        <button 
                            onClick={() => { setEditingMilestone(null); setIsModalOpen(true); }}
                            className="mt-6 text-blue-500 text-xs font-black hover:underline underline-offset-4"
                        >
                            立即创建第一个项目里程碑
                        </button>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* 模态框 */}
      <MilestoneModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingMilestone(null); }} 
        onSave={handleSave} 
        initialData={editingMilestone}
      />
    </div>
  );
};
