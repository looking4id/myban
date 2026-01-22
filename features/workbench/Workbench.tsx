
import React, { useEffect, useState, useMemo } from 'react';
import { 
  LayoutGrid, Plus, RefreshCw, Maximize2, MoreHorizontal, 
  Code2, Star, CheckCircle2, Clock, Activity, Target, Layers, 
  Briefcase, Calendar, ChevronRight, BarChart2, XCircle,
  TrendingUp, Zap, ShieldCheck, FileText, Search,
  Link, Monitor, Smartphone, LayoutDashboard, Flag, Settings
} from '../../components/common/Icons';
import { WorkbenchService } from '../../services/api';
import { WorkbenchData, Project, Task, TaskType, User as UserType } from '../../types';
import { StatusBadge, DonutChart } from '../../components/common/ProjectShared';
import { CreateProjectModal } from '../project/list/CreateProjectModal';
import { CreateTaskModal } from '../project/kanban/KanbanBoard';
import { GlobalRightControls } from '../../components/layout/GlobalRightControls';

interface WorkbenchProps {
  onProjectSelect?: (project: Project) => void;
  onTaskSelect?: (task: Task) => void;
  user?: UserType | null;
  onLogout?: () => void;
  onGoHome?: () => void;
}

const WorkbenchHeader = ({ user, onRefresh, isRefreshing }: { user: string; onRefresh: () => void; isRefreshing: boolean }) => {
  return (
    <div className="flex items-center justify-between mb-8 flex-shrink-0">
      <div className="flex flex-col gap-1">
        {/* 20px 标题 */}
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">下午好，{user} 👋</h2>
        {/* 14px 正文 */}
        <p className="text-sm text-slate-500 font-medium">当前你有 <span className="text-blue-600 font-semibold">12</span> 个任务正在进行中，本周已交付 <span className="text-emerald-500 font-semibold">8</span> 个需求。</p>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={onRefresh}
          className={`p-2 bg-white border border-slate-200 rounded text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
          title="刷新数据"
        >
          <RefreshCw size={18} />
        </button>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded text-sm font-medium text-slate-600">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            系统正常
        </div>
      </div>
    </div>
  );
};

const WidgetWrapper: React.FC<{ 
  title: string; 
  icon?: React.ReactNode; 
  children: React.ReactNode; 
  count?: number;
  className?: string;
  headerAction?: React.ReactNode;
}> = ({ title, icon, children, count, className, headerAction }) => {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 group/widget ${className}`}>
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white flex-shrink-0">
        {/* 小标题标准化 14px 加粗 */}
        <div className="flex items-center gap-3 font-bold text-slate-800 text-sm">
          <span className="text-blue-600">{icon}</span>
          <span className="tracking-tight">{title}</span>
          {count !== undefined && <span className="text-slate-500 font-bold text-xs ml-1 bg-slate-100 px-2 py-0.5 rounded-full">{count}</span>}
        </div>
        <div className="flex items-center gap-3">
           {headerAction}
           <MoreHorizontal size={16} className="text-slate-300 cursor-pointer hover:text-slate-600 transition-colors" />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6 custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, icon: Icon, trend, onClick }: any) => (
  <div 
    onClick={onClick}
    className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden relative active:scale-95"
  >
    <div className={`absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}>
        <Icon size={80} />
    </div>
    <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={`w-10 h-10 rounded-lg ${color} text-white flex items-center justify-center shadow-md transition-transform group-hover:rotate-6`}>
            <Icon size={20} />
        </div>
        {trend && (
            <div className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {trend > 0 ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                {Math.abs(trend)}%
            </div>
        )}
    </div>
    <div className="relative z-10">
      <div className="text-3xl font-bold text-slate-800 leading-none mb-2 group-hover:text-blue-600 transition-colors">{value}</div>
      {/* 14px 正文标签 */}
      <div className="text-sm font-medium text-slate-500">{label}</div>
    </div>
  </div>
);

const QuickEntry = ({ icon: Icon, label, color, onClick }: any) => (
    <div className="flex flex-col items-center gap-3 group cursor-pointer" onClick={onClick}>
        <div className={`w-14 h-14 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center text-${color.split('-')[1]}-600 group-hover:scale-110 group-active:scale-95 transition-all shadow-sm border border-transparent`}>
            <Icon size={24} />
        </div>
        {/* 辅助入口字号 12px */}
        <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{label}</span>
    </div>
);

export const Workbench: React.FC<WorkbenchProps> = ({ onProjectSelect, onTaskSelect, user, onLogout, onGoHome }) => {
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<WorkbenchData | null>(null);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  
  const [taskFilter, setTaskFilter] = useState<'todo' | 'done'>('todo');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(15);

  const fetchData = async (showRefreshAnim = false) => {
    try {
      if (showRefreshAnim) setIsRefreshing(true);
      else setLoading(true);
      
      const response = await WorkbenchService.getData('u1');
      if (response.code === 0) setData(response.data);
    } catch (error) {
      console.error("Failed to fetch workbench data", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatClick = (type: string) => {
      if (type === '待我处理') setTaskFilter('todo');
      if (type === '本周完成') setTaskFilter('done');
  };

  const filteredTasks = useMemo(() => {
      if (!data) return [];
      return data.myTasks;
  }, [data, taskFilter]);

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
            <RefreshCw size={40} className="animate-spin text-blue-500" />
            <span className="text-sm font-medium text-slate-400 animate-pulse">正在同步你的工作数据...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc]">
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-[50] shadow-sm">
        {/* 标题标准化 20px */}
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">个人工作台</h1>
        <GlobalRightControls user={user} onLogout={onLogout} onGoHome={onGoHome} />
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <WorkbenchHeader 
            user={user?.name || 'lo'} 
            onRefresh={() => fetchData(true)}
            isRefreshing={isRefreshing}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="待我处理" value={data.stats.todo} color="bg-gradient-to-br from-blue-500 to-indigo-600" icon={Layers} trend={12} onClick={() => handleStatClick('待我处理')} />
            <StatCard label="本周完成" value={data.stats.done} color="bg-gradient-to-br from-emerald-400 to-teal-600" icon={CheckCircle2} trend={5} onClick={() => handleStatClick('本周完成')} />
            <StatCard label="逾期提醒" value={data.stats.overdue} color="bg-gradient-to-br from-rose-400 to-red-600" icon={Clock} trend={-2} />
            <StatCard label="交付速率" value={data.stats.efficiency} color="bg-gradient-to-br from-amber-400 to-orange-500" icon={Zap} trend={8} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col gap-8">
                <WidgetWrapper 
                    title="重点关注项目" 
                    icon={<Star size={18} />} 
                    count={data.projects.length}
                    headerAction={
                    <div className="flex items-center gap-4">
                        <button 
                        onClick={() => setIsCreateProjectModalOpen(true)}
                        className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-all shadow-sm group/addbtn"
                        title="新建项目"
                        >
                        <Plus size={14} strokeWidth={3} className="group-hover/addbtn:scale-110" />
                        </button>
                        <button className="text-xs font-bold text-blue-600 hover:underline">查看全部项目</button>
                    </div>
                    }
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {data.projects.map(p => (
                            <div 
                                key={p.id} 
                                onClick={() => onProjectSelect && onProjectSelect(p)}
                                className="p-5 bg-white border border-slate-100 rounded-lg hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
                            >
                                <div className={`absolute top-0 left-0 bottom-0 w-1 ${p.iconColor.replace('text', 'bg')}`}></div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors ${p.iconColor}`}>
                                            <Code2 size={24} />
                                        </div>
                                        <div>
                                            {/* 项目标题 14px */}
                                            <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors block">{p.name}</span>
                                            <span className="text-xs font-bold text-slate-400 mt-0.5 block">{p.code}</span>
                                        </div>
                                    </div>
                                    {p.isStar && <Star size={16} className="text-amber-400 fill-amber-400 group-hover:scale-125 transition-transform" />}
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-xs font-bold text-slate-500">{p.statusLabel}</span>
                                    </div>
                                    <div className="flex -space-x-2">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm">M{i}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </WidgetWrapper>

                <WidgetWrapper 
                    title="待办事项列表" 
                    icon={<Target size={18} />} 
                    count={filteredTasks.length}
                    headerAction={
                        <div className="flex items-center bg-slate-100 p-1 rounded mr-2">
                            <button 
                                onClick={() => setTaskFilter('todo')}
                                className={`px-3 py-1 text-xs font-bold rounded transition-all ${taskFilter === 'todo' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                            >
                                我负责的
                            </button>
                            <button 
                                onClick={() => setTaskFilter('done')}
                                className={`px-3 py-1 text-xs font-bold rounded transition-all ${taskFilter === 'done' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                            >
                                我参与的
                            </button>
                        </div>
                    }
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <th className="pb-4 px-2">事项详情</th>
                                    <th className="pb-4 w-32">进度</th>
                                    <th className="pb-4 w-28 text-center">状态</th>
                                    <th className="pb-4 w-32 text-right">截止日期</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredTasks.map(task => (
                                <tr 
                                key={task.id} 
                                onClick={() => onTaskSelect && onTaskSelect(task)}
                                className="hover:bg-slate-50/80 group cursor-pointer transition-all"
                                >
                                    <td className="py-4 px-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-1 h-8 rounded-full ${task.statusColor}`}></div>
                                            <div className="flex flex-col gap-0.5">
                                                {/* 列表文字标准化 14px */}
                                                <div className="text-sm text-slate-800 font-bold group-hover:text-blue-600 transition-colors line-clamp-1">{task.title}</div>
                                                <div className="text-xs text-slate-400 font-mono font-bold">{task.displayId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${task.progress || 0}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-500">{task.progress || 0}%</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-center">
                                        <StatusBadge status="进行中" className="scale-90" />
                                    </td>
                                    <td className="py-4 text-xs font-mono font-bold text-slate-400 text-right">
                                        {task.dueDate}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button 
                    onClick={() => onTaskSelect && onTaskSelect(filteredTasks[0])}
                    className="w-full mt-4 py-2.5 bg-slate-50 hover:bg-slate-100 rounded text-xs font-bold text-slate-500 transition-all border border-transparent hover:border-slate-200"
                    >
                        查看全部工作项
                    </button>
                </WidgetWrapper>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-8">
                <WidgetWrapper title="快捷入口" icon={<Zap size={18} />}>
                    <div className="grid grid-cols-4 gap-y-6">
                        <QuickEntry icon={Plus} label="建需求" color="bg-blue-500" onClick={() => setIsCreateTaskModalOpen(true)} />
                        <QuickEntry icon={Flag} label="里程碑" color="bg-orange-500" />
                        <QuickEntry icon={BarChart2} label="效能报表" color="bg-purple-500" />
                        <QuickEntry icon={Activity} label="迭代概览" color="bg-emerald-500" />
                        <QuickEntry icon={Search} label="全文搜" color="bg-slate-500" />
                        <QuickEntry icon={Code2} label="代码库" color="bg-indigo-500" />
                        <QuickEntry icon={Briefcase} label="资源池" color="bg-pink-500" />
                        <QuickEntry icon={Settings} label="偏好设置" color="bg-cyan-500" />
                    </div>
                </WidgetWrapper>

                <WidgetWrapper title="团队效能雷达" icon={<Activity size={18} />}>
                    <div className="flex flex-col items-center py-4">
                        <DonutChart percentage={92} color="#3b82f6" label="当前效能指数" />
                        <div className="mt-8 space-y-4 w-full px-2">
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-slate-500 uppercase">需求按时交付率</span>
                                <span className="text-emerald-500">95.4%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: '95%' }}></div>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-slate-500 uppercase">代码评审覆盖率</span>
                                <span className="text-blue-500">88.2%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: '88%' }}></div>
                            </div>
                        </div>
                    </div>
                </WidgetWrapper>

                {/* 实时动态动态 */}
                <WidgetWrapper title="实时动态" icon={<Activity size={18} />}>
                    <div className="space-y-6">
                        {data.activities.map(act => (
                            <div 
                              key={act.id} 
                              className="flex gap-4 relative group cursor-pointer"
                              onClick={() => onProjectSelect && onProjectSelect(data.projects[0])}
                            >
                                <div className="absolute left-[18px] top-10 bottom-[-24px] w-0.5 bg-slate-100 group-last:hidden"></div>
                                <div className={`w-9 h-9 rounded-lg flex-shrink-0 ${act.user?.avatarColor || 'bg-slate-400'} text-white flex items-center justify-center text-sm font-bold shadow-md group-hover:scale-110 transition-transform z-10`}>
                                    {act.user?.name?.slice(0, 1) || '?'}
                                </div>
                                <div className="flex flex-col gap-1 pb-4">
                                    <div className="text-sm text-slate-600 leading-relaxed">
                                        <span className="font-bold text-slate-800">{act.user?.name || '未知用户'}</span>
                                        <span className="mx-1 text-slate-400 font-medium">{act.action}</span>
                                        <span className="font-bold text-blue-600 hover:underline">{act.target}</span>
                                    </div>
                                    <div className="text-xs font-medium text-slate-300">{act.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-xs font-bold text-blue-600 hover:underline">查看全站动态日志</button>
                </WidgetWrapper>
            </div>
        </div>

        {isCreateProjectModalOpen && (
            <CreateProjectModal 
            onClose={() => setIsCreateProjectModalOpen(false)} 
            onSuccess={fetchData}
            />
        )}

        {isCreateTaskModalOpen && (
            <CreateTaskModal 
                onClose={() => setIsCreateTaskModalOpen(false)}
                onSubmit={(task) => {
                    setIsCreateTaskModalOpen(false);
                    fetchData(true);
                }}
                defaultType={TaskType.Requirement}
            />
        )}
      </div>
    </div>
  );
};
