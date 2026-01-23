
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  ChevronDown, Plus, Edit3, Filter, HelpCircle, 
  MoreHorizontal, ChevronRight, Calendar,
  Flag, ListFilter, Search, Maximize2, ZoomIn, ZoomOut,
  LayoutGrid, ChevronLeft, XCircle, Target, User
} from '../../../components/common/Icons';
import { Priority, TaskType as GlobalTaskType } from '../../../types';

interface GanttTask {
  id: string;
  title: string;
  type: 'EPIC' | 'STORY' | 'TASK' | 'MILESTONE';
  handler: string;
  priority: Priority | null;
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
  progress: number;
  level: number;
  isExpanded?: boolean;
  parentId?: string;
}

const MOCK_GANTT_DATA: GanttTask[] = [
  { id: 'm1', title: 'Q3 核心功能上线里程碑', type: 'MILESTONE', handler: '王亮', priority: Priority.High, start: '2025-08-28', end: '2025-08-28', progress: 0, level: 0 },
  { id: 's1', title: '【核心】校园小拍买家应用 V1.0', type: 'EPIC', handler: '产品经理', priority: Priority.High, start: '2025-08-20', end: '2025-09-05', progress: 45, level: 0, isExpanded: true },
  { id: 's2', title: '商品订单交易管理模块', type: 'STORY', handler: 'Dev 1', priority: Priority.High, start: '2025-08-20', end: '2025-08-27', progress: 80, level: 1, parentId: 's1', isExpanded: true },
  { id: 's3', title: '订单撤销逻辑处理', type: 'TASK', handler: 'Dev 1', priority: Priority.Normal, start: '2025-08-20', end: '2025-08-23', progress: 100, level: 2, parentId: 's2' },
  { id: 's4', title: '我的订单列表/详情页', type: 'TASK', handler: 'UI设计师', priority: Priority.High, start: '2025-08-24', end: '2025-08-27', progress: 40, level: 2, parentId: 's2' },
  { id: 's5', title: '商品竞价与实时购买', type: 'STORY', handler: 'lo', priority: Priority.Normal, start: '2025-08-28', end: '2025-09-02', progress: 10, level: 1, parentId: 's1' },
  { id: 's6', title: '数据看板与报表分析', type: 'EPIC', handler: '王亮', priority: Priority.Normal, start: '2025-09-01', end: '2025-09-15', progress: 0, level: 0, isExpanded: false },
  { id: 's7', title: '财务结算对账逻辑', type: 'STORY', handler: 'Dev 1', priority: Priority.High, start: '2025-09-03', end: '2025-09-10', progress: 0, level: 1, parentId: 's6' },
];

const GanttTaskModal = ({ 
    isOpen, onClose, onSave, initialData 
}: { 
    isOpen: boolean, onClose: () => void, onSave: (task: GanttTask) => void, initialData?: GanttTask | null 
}) => {
    const [formData, setFormData] = useState<Partial<GanttTask>>({
        title: '',
        type: 'TASK',
        start: new Date().toISOString().split('T')[0],
        end: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        handler: '王亮',
        priority: Priority.Normal,
        progress: 0
    });

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || {
                title: '',
                type: 'TASK',
                start: new Date().toISOString().split('T')[0],
                end: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
                handler: '王亮',
                priority: Priority.Normal,
                progress: 0
            });
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[200] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl animate-in zoom-in-95 duration-300 overflow-hidden border border-white/20">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shadow-inner"><LayoutGrid size={20} /></div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 tracking-tight">{initialData ? '编辑甘特图任务' : '新建甘特图任务'}</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Timeline Entry Maintenance</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"><XCircle size={24} /></button>
                </div>
                
                <form className="p-8 space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    onSave({
                        ...formData,
                        id: formData.id || `s${Math.floor(Math.random() * 10000)}`,
                        level: formData.level ?? 0,
                    } as GanttTask);
                }}>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">任务名称</label>
                        <input 
                            required 
                            autoFocus
                            className="w-full border border-slate-200 rounded px-4 py-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-slate-50 focus:bg-white font-bold"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                            placeholder="输入任务或需求标题..."
                        />
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 rounded text-slate-500 font-bold text-sm hover:bg-slate-50 transition-colors">取消</button>
                        <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded font-bold text-sm hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">保存排期</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const ProjectGantt: React.FC = () => {
  const [tasks, setTasks] = useState<GanttTask[]>(MOCK_GANTT_DATA);
  const [viewScale, setViewScale] = useState<'day' | 'week' | 'month'>('day');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<GanttTask | null>(null);
  const [baseDate, setBaseDate] = useState(new Date(2025, 7, 1)); 
  
  const totalDays = 45;
  const dayWidth = viewScale === 'day' ? 64 : viewScale === 'week' ? 24 : 12; // 增加宽度以适应大字号
  
  const timelineDates = useMemo(() => {
    return Array.from({ length: totalDays }).map((_, i) => {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      return {
        date: d,
        dateStr: d.toISOString().split('T')[0],
        day: d.getDate().toString(),
        week: ['日', '一', '二', '三', '四', '五', '六'][d.getDay()],
        isWeekend: d.getDay() === 0 || d.getDay() === 6
      };
    });
  }, [baseDate, totalDays]);

  const listRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const headerTimelineRef = useRef<HTMLDivElement>(null);

  const handleTimelineScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (headerTimelineRef.current) headerTimelineRef.current.scrollLeft = e.currentTarget.scrollLeft;
    if (listRef.current) listRef.current.scrollTop = e.currentTarget.scrollTop;
  };

  const handleListScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (timelineRef.current) timelineRef.current.scrollTop = e.currentTarget.scrollTop;
  };

  const toggleExpand = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, isExpanded: !t.isExpanded } : t));
  };

  const visibleTasks = useMemo(() => {
    const result: GanttTask[] = [];
    const searchLower = searchQuery.toLowerCase();
    const addWithChildren = (parentId: string | null) => {
      tasks.filter(t => t.parentId === parentId || (!parentId && !t.parentId)).forEach(t => {
        if (t.title.toLowerCase().includes(searchLower) || !searchQuery) result.push(t);
        if (t.isExpanded) addWithChildren(t.id);
      });
    };
    addWithChildren(null);
    return result;
  }, [tasks, searchQuery]);

  const getTaskBarStyle = (task: GanttTask) => {
    if (task.type === 'MILESTONE') return null;
    const start = new Date(task.start);
    const end = new Date(task.end);
    const offsetDays = (start.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24);
    const durationDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
    return { left: offsetDays * dayWidth, width: durationDays * dayWidth };
  };

  const handleSaveTask = (taskData: GanttTask) => {
    if (editingTask) {
      setTasks(prev => prev.map(t => t.id === taskData.id ? taskData : t));
    } else {
      setTasks(prev => [taskData, ...prev]);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="flex flex-col h-full bg-white -m-6 overflow-hidden select-none">
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white flex-shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded"><LayoutGrid size={18} /></div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">项目甘特图</h2>
          </div>
          <div className="flex items-center bg-slate-100 p-1 rounded gap-2">
            <div className="flex items-center gap-1">
              <button onClick={() => setBaseDate(new Date(baseDate.setMonth(baseDate.getMonth() - 1)))} className="p-1 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all"><ChevronLeft size={16} /></button>
              <div className="px-2 text-xs font-bold text-slate-700 min-w-[100px] text-center">{baseDate.getFullYear()}年 {String(baseDate.getMonth() + 1).padStart(2, '0')}月</div>
              <button onClick={() => setBaseDate(new Date(baseDate.setMonth(baseDate.getMonth() + 1)))} className="p-1 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="flex bg-slate-100 p-1 rounded gap-1">
            {(['day', 'week', 'month'] as const).map(s => (
              <button key={s} onClick={() => setViewScale(s)} className={`px-4 py-2 text-xs font-bold rounded transition-all ${viewScale === s ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                {s === 'day' ? '天' : s === 'week' ? '周' : '月'}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"><Plus size={14} strokeWidth={3} /> 新建任务</button>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        <div className="w-[420px] border-r border-slate-200 flex flex-col flex-shrink-0 bg-white z-20 shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)]">
          <div className="flex bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-widest flex-shrink-0 h-[64px] items-center">
             <div className="w-12 text-center border-r border-slate-100 h-full flex items-center justify-center">#</div>
             <div className="flex-1 px-4 border-r border-slate-100 h-full flex items-center">任务标题</div>
             <div className="w-24 text-center h-full flex items-center justify-center">责任人</div>
          </div>
          <div ref={listRef} onScroll={handleListScroll} className="flex-1 overflow-y-auto no-scrollbar bg-white">
            {visibleTasks.map((task) => (
              <div key={task.id} onClick={() => { setEditingTask(task); setIsModalOpen(true); }} className={`flex border-b border-slate-50 hover:bg-blue-50/30 h-[44px] items-center text-sm group cursor-pointer transition-colors ${editingTask?.id === task.id ? 'bg-blue-50' : ''}`}>
                <div className="w-12 text-center text-slate-300 font-mono font-bold flex-shrink-0">{task.id}</div>
                <div className="flex-1 px-4 truncate flex items-center gap-2 overflow-hidden">
                  <div style={{ marginLeft: `${task.level * 20}px` }} className="flex items-center gap-2 truncate">
                    {task.type === 'MILESTONE' ? <Flag size={14} className="text-orange-500 fill-orange-50" /> : (
                      <div onClick={(e) => { e.stopPropagation(); toggleExpand(task.id); }} className="p-1 rounded hover:bg-slate-100 transition-colors">
                        {(task.type === 'EPIC' || task.type === 'STORY') ? <ChevronRight size={14} className={`text-slate-500 transition-transform ${task.isExpanded ? 'rotate-90' : ''}`} /> : <div className="w-3.5 h-3.5" />}
                      </div>
                    )}
                    <span className={`truncate font-bold ${task.level === 0 ? 'text-slate-800' : 'text-slate-600'}`}>{task.title}</span>
                  </div>
                </div>
                <div className="w-24 text-center text-slate-500 font-bold truncate flex-shrink-0 flex items-center justify-center gap-1.5 px-2">
                   <div className="w-5 h-5 rounded bg-slate-100 text-slate-400 flex items-center justify-center text-[8px] font-black">{task.handler.charAt(0)}</div>
                   <span className="truncate text-xs">{task.handler}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/20">
           <div ref={headerTimelineRef} className="h-[64px] border-b border-slate-200 bg-white overflow-hidden flex-shrink-0 whitespace-nowrap">
             <div className="inline-flex h-full">
               {timelineDates.map((date, i) => (
                 <div key={i} style={{ width: dayWidth }} className={`border-r border-slate-100 flex flex-col items-center justify-center flex-shrink-0 transition-colors ${date.isWeekend ? 'bg-slate-50/50' : ''}`}>
                    <span className="text-[10px] text-slate-300 font-black uppercase tracking-tighter mb-1">{date.week}</span>
                    <span className={`text-xs font-bold ${date.dateStr === new Date().toISOString().split('T')[0] ? 'w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md' : 'text-slate-500'}`}>{date.day}</span>
                 </div>
               ))}
             </div>
           </div>

           <div ref={timelineRef} onScroll={handleTimelineScroll} className="flex-1 overflow-auto custom-scrollbar relative">
             <div className="absolute inset-0 flex pointer-events-none">
                {timelineDates.map((date, i) => (
                  <div key={i} style={{ width: dayWidth }} className={`h-full border-r border-slate-100 flex-shrink-0 ${date.isWeekend ? 'bg-slate-100/20' : ''}`} />
                ))}
             </div>
             <div className="relative z-10">
                {visibleTasks.map((task) => {
                  const barStyle = getTaskBarStyle(task);
                  return (
                    <div key={task.id} onClick={() => { setEditingTask(task); setIsModalOpen(true); }} className={`h-[44px] border-b border-slate-50 flex items-center relative group cursor-pointer ${editingTask?.id === task.id ? 'bg-blue-500/5' : ''}`}>
                      {task.type === 'MILESTONE' ? (
                        <div className="absolute flex items-center justify-center" style={{ left: ((new Date(task.start).getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)) * dayWidth + (dayWidth / 2) - 10 }}>
                           <div className="w-5 h-5 bg-orange-500 rotate-45 border-4 border-white shadow-lg relative z-20 transition-transform group-hover:scale-125"></div>
                           <div className="absolute top-[-300px] bottom-[-300px] w-px bg-orange-400/20 z-10 pointer-events-none"></div>
                        </div>
                      ) : barStyle && (
                        <div className={`absolute h-6 rounded shadow-sm flex items-center px-1 overflow-hidden group/bar transition-all hover:h-8 hover:z-20 ${task.priority === Priority.High ? 'bg-rose-500' : 'bg-blue-500'}`} style={barStyle}>
                          <div className="absolute left-0 top-0 bottom-0 bg-white/20 transition-all duration-1000" style={{ width: `${task.progress}%` }} />
                          <div className="relative z-10 px-2 flex items-center justify-between w-full">
                             <span className="text-[9px] font-black text-white truncate drop-shadow-sm">{task.progress}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
             </div>
             <div className="absolute top-0 bottom-0 w-0.5 bg-blue-500 z-30 pointer-events-none shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ left: ((new Date().getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)) * dayWidth + (dayWidth / 2) }}>
               <div className="absolute top-0 -left-1.5 w-3.5 h-3.5 bg-blue-500 rounded border-2 border-white"></div>
             </div>
           </div>
        </div>
      </div>
      <div className="h-10 bg-slate-50 border-t border-slate-200 px-6 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
         <div className="flex gap-8">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"></div> 高优先级</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 中优先级</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 已完成</span>
         </div>
         <div>甘特图就绪 • SF 字体渲染</div>
      </div>
      <GanttTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveTask} initialData={editingTask} />
    </div>
  );
};
