import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { MOCK_COLUMNS, MOCK_USERS, MOCK_PROJECTS } from '../constants';
import { KanbanCard } from './KanbanCard';
import { 
  Circle, CheckCircle2, MoreHorizontal, Plus, XCircle, Clock, Trash2, 
  ChevronDown, Paperclip, Download, UploadCloud, FileText, ChevronRight, 
  LayoutList, FolderTree, PlayCircle, ShieldAlert, Zap, User, Target, Calendar,
  Maximize2, Bold, Italic, Underline, Link, Box, ListChecks, History, Share2, 
  Settings, Ban, Edit3, Search, Repeat, MessageSquare, Code2, List
} from './Icons';
import { Task, TaskType, Priority, Severity, FilterState, ViewType, Column, User as UserType } from '../types';
import { StatusBadge, PriorityBadge, SeverityBadge } from './ProjectShared';

// 还原原型图的高保真编辑器工具栏
const EditorToolbar = () => (
    <div className="flex items-center gap-4 py-2 border-b border-slate-100 bg-slate-50/50 px-4 flex-wrap">
        <div className="flex items-center gap-1 pr-4 border-r border-slate-200">
            <button type="button" className="p-1.5 hover:bg-white rounded text-slate-500 transition-colors"><History size={14}/></button>
            <button type="button" className="p-1.5 hover:bg-white rounded text-slate-500 rotate-180 transition-colors"><History size={14}/></button>
            <button type="button" className="p-1.5 hover:bg-white rounded text-slate-500 transition-colors"><Box size={14}/></button>
            <button type="button" className="p-1.5 hover:bg-white rounded text-slate-500 transition-colors"><Target size={14}/></button>
            <button type="button" className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-slate-600 hover:bg-white rounded border border-transparent hover:border-slate-200 ml-2 transition-all">
                <Plus size={12}/> 插入
            </button>
        </div>
        <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 cursor-pointer hover:text-blue-600 flex items-center gap-1">正文 <ChevronDown size={10}/></span>
            <span className="text-[11px] font-bold text-slate-500 cursor-pointer hover:text-blue-600 flex items-center gap-1">微软雅黑 <ChevronDown size={10}/></span>
            <span className="text-[11px] font-bold text-slate-500 cursor-pointer hover:text-blue-600 flex items-center gap-1">14px <ChevronDown size={10}/></span>
        </div>
        <div className="flex items-center gap-1">
            <button type="button" className="p-1.5 hover:bg-white rounded text-slate-500 transition-colors"><Bold size={14}/></button>
            <button type="button" className="p-1.5 hover:bg-white rounded text-slate-500 transition-colors"><Italic size={14}/></button>
            <button type="button" className="p-1.5 hover:bg-white rounded text-slate-500 transition-colors"><Underline size={14}/></button>
            <button type="button" className="p-1.5 hover:bg-white rounded text-slate-500 transition-colors"><Ban size={14} className="rotate-45"/></button>
        </div>
        <div className="ml-auto flex items-center gap-2">
             <button type="button" className="p-1.5 hover:bg-white rounded text-slate-400 transition-colors"><Maximize2 size={14}/></button>
        </div>
    </div>
);

// 辅助属性字段组件 (还原图2右侧样式)
const SidePropertyField = ({ label, required, children }: any) => (
    <div className="space-y-1.5">
        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
    </div>
);

// 还原图1 & 图2：高保真新建工作项弹窗
export const CreateTaskModal: React.FC<{
    onClose: () => void;
    onSubmit: (task: Task) => void;
    defaultType: TaskType | null;
    defaultProjectId?: string;
}> = ({ onClose, onSubmit, defaultType, defaultProjectId }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<TaskType>(defaultType || TaskType.Task);
    const [priority, setPriority] = useState<Priority>(Priority.Normal);
    const [severity, setSeverity] = useState<Severity>(Severity.Normal);
    const [assigneeId, setAssigneeId] = useState('u1');

    const isDefect = type === TaskType.Defect;
    // Unified split layout for Requirement, Task, and Defect to match screenshot designs
    const isSplitLayout = type === TaskType.Requirement || type === TaskType.Task || type === TaskType.Defect;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 font-sans">
            <div className={`bg-white rounded shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/20 ${isSplitLayout ? 'w-[1000px] h-[600px] max-h-[85vh]' : 'w-[880px]'}`}>
                {/* 头部导航 */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white flex-shrink-0">
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">新建{type}</h3>
                    <div className="flex items-center gap-4">
                        {!isSplitLayout && <button className="text-xs text-slate-400 font-bold hover:text-slate-600 flex items-center gap-1 transition-colors">更多 <ChevronDown size={12}/></button>}
                        <button onClick={onClose} className="p-1 text-slate-300 hover:text-slate-600 transition-colors"><XCircle size={22} /></button>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden flex">
                    {isSplitLayout ? (
                        <div className="flex-1 flex p-8 gap-8 overflow-y-auto custom-scrollbar bg-white">
                            {/* Left Column */}
                            <div className="flex-1 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">标题 <span className="text-red-500">*</span></label>
                                    <input 
                                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none placeholder:text-slate-300 transition-all" 
                                        placeholder="请填写" 
                                        value={title} 
                                        onChange={e => setTitle(e.target.value)} 
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">负责人/协作者</label>
                                        <div className="relative">
                                            <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm appearance-none outline-none focus:border-blue-500 text-slate-500 bg-white">
                                                <option>指派负责人/协作者</option>
                                                {MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                            </select>
                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">类型 <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select disabled className="w-full border border-slate-300 rounded px-3 py-2 text-sm appearance-none outline-none bg-slate-50 text-slate-700">
                                                <option>{type}</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">计划时间</label>
                                        <div className="flex items-center border border-slate-300 rounded px-3 py-2 text-sm text-slate-400 bg-white hover:border-blue-400 transition-colors cursor-pointer group">
                                            <span className="flex-1 group-hover:text-slate-600">未设置</span>
                                            <span className="px-2">→</span>
                                            <span className="flex-1 group-hover:text-slate-600">未设置</span>
                                            <Calendar size={14} className="text-slate-400 group-hover:text-blue-500" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">关联项目</label>
                                        <div className="relative">
                                            <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm appearance-none outline-none focus:border-blue-500 text-slate-500 bg-white">
                                                <option>选择项目</option>
                                                {MOCK_PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                            </select>
                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 flex-1 flex flex-col">
                                    <label className="text-sm font-bold text-slate-700">描述</label>
                                    <div className="border border-slate-300 rounded flex-1 flex flex-col min-h-[300px]">
                                        {/* Editor Toolbar from screenshot */}
                                        <div className="flex items-center gap-1 p-2 border-b border-slate-200 bg-white">
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs font-medium flex items-center gap-1">正文 <ChevronDown size={10}/></button>
                                            <div className="w-px h-4 bg-slate-300 mx-1"></div>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Bold size={16}/></button>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Italic size={16}/></button>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Underline size={16}/></button>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Code2 size={16}/></button>
                                            <div className="w-px h-4 bg-slate-300 mx-1"></div>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><List size={16}/></button>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><ListChecks size={16}/></button>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Link size={16}/></button>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Box size={16}/></button>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><LayoutList size={16}/></button>
                                            <div className="ml-auto">
                                                <button className="p-1.5 hover:bg-slate-100 rounded text-slate-700"><Maximize2 size={16}/></button>
                                            </div>
                                        </div>
                                        <textarea className="flex-1 p-4 outline-none resize-none text-sm bg-white" placeholder="" />
                                    </div>
                                </div>
                            </div>

                            {/* Right Sidebar */}
                            <div className="w-72 border-l border-slate-100 pl-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">优先级</label>
                                    <div className="relative">
                                        <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm appearance-none outline-none focus:border-blue-500 text-slate-500 bg-white" value={priority} onChange={e => setPriority(e.target.value as Priority)}>
                                            <option>请选择</option>
                                            {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">标签</label>
                                    <div className="relative">
                                        <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm appearance-none outline-none focus:border-blue-500 text-slate-500 bg-white">
                                            <option>选择标签</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">实际开始时间</label>
                                    <div className="relative">
                                        <input type="text" placeholder="选择日期时间" className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white placeholder:text-slate-400" />
                                        <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">实际结束时间</label>
                                    <div className="relative">
                                        <input type="text" placeholder="选择日期时间" className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white placeholder:text-slate-400" />
                                        <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Fallback layout (Not currently used for main types)
                        <div className="flex-1 flex items-center justify-center text-slate-400">
                            未知的任务类型布局
                        </div>
                    )}
                </div>

                {/* 底部按钮组合 (还原原型图布局) */}
                <div className="px-10 py-5 border-t border-slate-100 bg-white flex items-center justify-between flex-shrink-0 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                    {!isSplitLayout && (
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                            <span className="text-xs font-black text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-widest">只展示必填字段 (Required Only)</span>
                        </label>
                    )}
                    <div className={`flex gap-4 ${isSplitLayout ? 'w-full' : ''}`}>
                        <button 
                            type="submit" 
                            onClick={() => onSubmit({} as any)} 
                            className={`px-4 py-2 text-white rounded text-sm font-bold flex items-center gap-2 transition-all active:scale-95 ${isSplitLayout ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 uppercase tracking-widest'}`}
                        >
                            新建
                        </button>
                        <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">新建并继续</button>
                        {!isDefect && !isSplitLayout && <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all uppercase tracking-widest">保存草稿</button>}
                        <button onClick={onClose} type="button" className="px-4 py-2 bg-white border border-slate-200 text-slate-400 rounded text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">取消</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TaskDetailsModal: React.FC<{
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}> = ({ task, onClose, onUpdate, onDelete }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-end">
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white w-[800px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 relative z-10">
        {/* Header */}
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-8 bg-white flex-shrink-0">
           <div className="flex items-center gap-4">
              <span className="text-sm font-mono font-bold text-slate-400">{task.displayId}</span>
              <div className={`w-px h-4 bg-slate-200`}></div>
              <StatusBadge status={task.statusColor.includes('green') ? '已完成' : '进行中'} />
           </div>
           <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Share2 size={20}/></button>
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><MoreHorizontal size={20}/></button>
              <div className="w-px h-4 bg-slate-200 mx-2"></div>
              <button onClick={() => onDelete(task.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><XCircle size={24}/></button>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex">
           {/* Left Main */}
           <div className="flex-1 p-10 border-r border-slate-100 space-y-8">
              <div className="space-y-4">
                 <input 
                    className="text-2xl font-black text-slate-800 w-full outline-none bg-transparent placeholder:text-slate-300"
                    defaultValue={task.title}
                 />
                 <div className="flex flex-wrap gap-2">
                    {task.tags?.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded">{tag}</span>
                    ))}
                    <button className="px-2 py-1 bg-slate-50 text-slate-400 text-xs font-bold rounded hover:bg-slate-100 flex items-center gap-1"><Plus size={12}/> 添加标签</button>
                 </div>
              </div>

              <div className="space-y-2">
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">描述</h4>
                 <div className="min-h-[200px] text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {task.description || '暂无描述内容...'}
                 </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-slate-50">
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">活动记录</h4>
                 <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">Lo</div>
                    <div className="flex-1">
                       <textarea className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:bg-white focus:border-blue-500 outline-none transition-all resize-none h-24" placeholder="输入评论..." />
                       <div className="flex justify-end mt-2">
                          <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700">发表评论</button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Sidebar */}
           <div className="w-72 p-6 bg-slate-50/50 space-y-6">
              <SidePropertyField label="负责人">
                 <div className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer border border-transparent hover:border-slate-200 transition-all">
                    <div className={`w-6 h-6 rounded-full ${task.assignee?.avatarColor} text-white flex items-center justify-center text-[10px] font-bold`}>
                        {task.assignee?.name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-slate-700">{task.assignee?.name}</span>
                 </div>
              </SidePropertyField>

              <SidePropertyField label="状态">
                 <StatusBadge status={task.statusColor.includes('green') ? '已完成' : '进行中'} className="w-full justify-center bg-white" />
              </SidePropertyField>

              <SidePropertyField label="优先级">
                 <PriorityBadge priority={task.priority} />
              </SidePropertyField>

              <SidePropertyField label="截止日期">
                 <div className="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded text-sm font-bold text-slate-600">
                    <Calendar size={14} className="text-slate-400" />
                    {task.dueDate}
                 </div>
              </SidePropertyField>

              <div className="pt-6 border-t border-slate-200 space-y-2">
                 <div className="flex justify-between text-xs text-slate-400">
                    <span>创建于</span>
                    <span>2025-08-01</span>
                 </div>
                 <div className="flex justify-between text-xs text-slate-400">
                    <span>更新于</span>
                    <span>10分钟前</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export const KanbanBoard: React.FC<any> = ({ 
  filters, viewType, isCreateModalOpen, setIsCreateModalOpen, createModalType, setCreateModalType
}) => {
  // We use local state for columns to handle drag and drop
  const [columns, setColumns] = useState<Column[]>(MOCK_COLUMNS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Filter columns based on filters prop
  const filteredColumns = useMemo(() => {
    return columns.map(col => ({
      ...col,
      tasks: col.tasks.filter(task => {
        if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) && !task.displayId.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.type && task.type !== filters.type) return false;
        if (filters.priority && task.priority !== filters.priority) return false;
        if (filters.assigneeId && task.assignee.id !== filters.assigneeId) return false;
        if (filters.projectId && task.projectId !== filters.projectId) return false;
        // status filter maps to column title usually, but simplified here
        if (filters.status && col.title !== filters.status) return false; 
        return true;
      })
    }));
  }, [columns, filters]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
        // Reorder in same column
        const columnIndex = columns.findIndex(c => c.id === source.droppableId);
        const column = columns[columnIndex];
        const newTasks = Array.from(column.tasks);
        const [movedTask] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, movedTask);
        
        const newColumns = [...columns];
        newColumns[columnIndex] = { ...column, tasks: newTasks };
        setColumns(newColumns);
    } else {
        // Move to different column
        const sourceColIndex = columns.findIndex(c => c.id === source.droppableId);
        const destColIndex = columns.findIndex(c => c.id === destination.droppableId);
        const sourceCol = columns[sourceColIndex];
        const destCol = columns[destColIndex];
        
        if (!sourceCol || !destCol) return;

        const sourceTasks = Array.from(sourceCol.tasks);
        const destTasks = Array.from(destCol.tasks);
        const movedTask = sourceTasks.splice(source.index, 1)[0] as Task | undefined;
        
        if (!movedTask) return;
        
        // Update task status color based on column
        let newStatusColor = movedTask.statusColor;
        if (destCol.id === 'done') newStatusColor = 'bg-green-500';
        else if (destCol.id === 'inprogress') newStatusColor = 'bg-blue-600';
        else if (destCol.id === 'todo') newStatusColor = 'bg-gray-400';
        
        destTasks.splice(destination.index, 0, { ...movedTask, statusColor: newStatusColor });
        
        const newColumns = [...columns];
        newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks, count: sourceTasks.length };
        newColumns[destColIndex] = { ...destCol, tasks: destTasks, count: destTasks.length };
        setColumns(newColumns);
    }
  };

  const handleCreateTask = (newTask: Task) => {
      // Add to Todo column
      const newColumns = [...columns];
      const todoColIndex = newColumns.findIndex(c => c.id === 'todo');
      if (todoColIndex > -1) {
          const todoCol = newColumns[todoColIndex];
          // Mock ID and other fields
          const taskToAdd = {
              ...newTask,
              id: `t${Date.now()}`,
              displayId: `#NEW-${Math.floor(Math.random()*1000)}`,
              statusColor: 'bg-gray-400',
              dueDate: newTask.dueDate || '2025-12-31',
              assignee: newTask.assignee || MOCK_USERS[0],
              projectId: 'p1', // Default
              progress: 0,
              creatorId: 'u1'
          };
          newColumns[todoColIndex] = { ...todoCol, tasks: [taskToAdd, ...todoCol.tasks], count: todoCol.count + 1 };
          setColumns(newColumns);
      }
      setIsCreateModalOpen(false);
  };

  if (viewType === 'list' || viewType === 'tree') {
      return (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/30">
              <LayoutList size={48} className="mb-4 opacity-20" />
              <p>列表视图正在开发中...</p>
          </div>
      );
  }

  return (
    <>
        <div className="flex-1 overflow-x-auto overflow-y-hidden bg-slate-50/50">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex h-full p-6 gap-6 min-w-max">
                    {filteredColumns.map(col => (
                        <div key={col.id} className="w-80 flex flex-col h-full bg-slate-100/50 rounded-xl border border-slate-200/60 backdrop-blur-sm">
                            <div className="p-4 flex items-center justify-between flex-shrink-0">
                                <div className="flex items-center gap-2">
                                    <Circle size={10} className={col.iconColor} fill="currentColor" />
                                    <span className="font-bold text-slate-700 text-sm">{col.title}</span>
                                    <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{col.tasks.length}</span>
                                </div>
                                <div className="flex gap-1">
                                    <button className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors"><Plus size={14}/></button>
                                    <button className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors"><MoreHorizontal size={14}/></button>
                                </div>
                            </div>
                            <Droppable droppableId={col.id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`flex-1 overflow-y-auto px-3 pb-3 custom-scrollbar transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50/30' : ''}`}
                                    >
                                        {col.tasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{ ...provided.draggableProps.style }}
                                                        className={`${snapshot.isDragging ? 'rotate-2 scale-105 z-50' : ''}`}
                                                    >
                                                        <KanbanCard 
                                                            task={task} 
                                                            onClick={(t) => setSelectedTask(t)} 
                                                            onUpdate={() => {}}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        <button 
                                            onClick={() => { setCreateModalType(TaskType.Task); setIsCreateModalOpen(true); }}
                                            className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-1.5 text-xs font-bold mt-2"
                                        >
                                            <Plus size={14} /> 添加工作项
                                        </button>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>

        {isCreateModalOpen && (
            <CreateTaskModal 
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateTask}
                defaultType={createModalType}
            />
        )}

        {selectedTask && (
            <TaskDetailsModal 
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
                onUpdate={() => {}}
                onDelete={(id) => {
                    const newCols = columns.map(c => ({
                        ...c,
                        tasks: c.tasks.filter(t => t.id !== id),
                        count: c.tasks.filter(t => t.id !== id).length
                    }));
                    setColumns(newCols);
                    setSelectedTask(null);
                }}
            />
        )}
    </>
  );
};