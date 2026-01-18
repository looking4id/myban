
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { MOCK_COLUMNS, MOCK_USERS, MOCK_PROJECTS } from '../constants';
import { KanbanCard } from './KanbanCard';
import { Circle, CheckCircle2, MoreHorizontal, Plus, XCircle, Clock, Trash2, ChevronDown, Paperclip, Download, UploadCloud, FileText, ChevronRight, LayoutList, FolderTree, PlayCircle } from './Icons';
import { Task, TaskType, Priority, FilterState, Attachment, ViewType, Column } from '../types';
import { StatusBadge } from './ProjectShared';

interface CreateTaskModalProps {
  columnTitle?: string;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  defaultType?: TaskType | null;
  defaultProjectId?: string;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ columnTitle, onClose, onSubmit, defaultType, defaultProjectId }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TaskType>(defaultType || TaskType.Task);
  const [priority, setPriority] = useState<Priority>(Priority.Normal);
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(defaultProjectId || MOCK_PROJECTS[0].id);
  
  useEffect(() => {
    if (defaultType) setType(defaultType);
  }, [defaultType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: `new-${Date.now()}`,
      displayId: `#NEW${Math.floor(Math.random() * 1000)}`,
      title,
      type,
      priority,
      tags: ['新任务'],
      dueDate: new Date().toISOString().split('T')[0],
      assignee: MOCK_USERS[0],
      statusColor: 'bg-blue-500',
      description: description,
      progress: 0,
      projectId: projectId,
      creatorId: 'u1',
      attachments: []
    };

    onSubmit(newTask);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-[500px] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-sm">新建{type} {columnTitle ? `(${columnTitle})` : ''}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XCircle size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">标题</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="输入任务标题..."
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">类型</label>
               <select 
                 value={type}
                 onChange={(e) => setType(e.target.value as TaskType)}
                 className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
               >
                 {Object.values(TaskType).map(t => (
                   <option key={t} value={t}>{t}</option>
                 ))}
               </select>
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">优先级</label>
               <select 
                 value={priority}
                 onChange={(e) => setPriority(e.target.value as Priority)}
                 className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
               >
                 {Object.values(Priority).map(p => (
                   <option key={p} value={p}>{p}</option>
                 ))}
               </select>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded mr-2 transition-colors">取消</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors shadow-sm">创建</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, onClose, onUpdate, onDelete }) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const newAttachment: Attachment = {
              id: `att-${Date.now()}`,
              name: file.name,
              url: '#',
              type: file.type,
              size: file.size,
              uploadedAt: new Date().toISOString()
          };
          const updated = { ...editedTask, attachments: [...(editedTask.attachments || []), newAttachment] };
          setEditedTask(updated);
          onUpdate(updated);
      }
  };

  const handleChange = (field: keyof Task, value: any) => {
      const updated = { ...editedTask, [field]: value };
      setEditedTask(updated);
      onUpdate(updated);
  };

  const getStatusName = (color: string) => {
      if (color.includes('green')) return '已完成';
      if (color.includes('red')) return '已逾期';
      if (color.includes('gray')) return '未开始';
      return '处理中';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-[800px] h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
             <div className="text-xs text-slate-500 font-mono font-bold bg-slate-100 px-2 py-1 rounded">
                {task.displayId}
             </div>
             {showSaveIndicator && (
                 <span className="text-xs text-green-600 font-bold flex items-center gap-1 animate-in fade-in">
                     <CheckCircle2 size={12} /> 已保存
                 </span>
             )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { if(confirm('删除事项？')) onDelete(task.id); }} className="p-2 text-slate-400 hover:text-red-600 rounded transition-colors"><Trash2 size={18} /></button>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded transition-colors"><XCircle size={24} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
             <input 
               type="text"
               value={editedTask.title}
               onChange={(e) => handleChange('title', e.target.value)}
               className="text-xl font-bold text-slate-800 w-full mb-6 border-b border-transparent hover:border-slate-200 focus:border-blue-500 outline-none bg-transparent transition-colors pb-1"
             />

             <div className="mb-8">
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <FileText size={14} className="text-slate-400" /> 描述
                 </h4>
                 <textarea 
                    value={editedTask.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full min-h-[120px] p-4 text-sm text-slate-700 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y transition-all"
                    placeholder="添加描述..."
                 />
             </div>

             <div className="mb-8">
                 <div className="flex items-center justify-between mb-3">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                         <Paperclip size={14} className="text-slate-400" /> 附件 ({editedTask.attachments?.length || 0})
                     </h4>
                     <label className="cursor-pointer text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                         <UploadCloud size={14} /> 上传文件
                         <input type="file" className="hidden" onChange={handleFileUpload} />
                     </label>
                 </div>
                 {(!editedTask.attachments || editedTask.attachments.length === 0) && (
                     <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center text-xs text-slate-400 font-medium">
                         暂无附件
                     </div>
                 )}
             </div>
          </div>

          <div className="w-72 bg-slate-50 border-l border-slate-200 p-6 overflow-y-auto">
              <div className="space-y-6">
                  <SidebarSection label="当前状态">
                    <div className="relative group cursor-pointer shadow-sm rounded-xl overflow-hidden border border-slate-200 hover:border-blue-400 transition-all bg-white">
                        <StatusBadge status={getStatusName(editedTask.statusColor)} className="px-4 py-2 text-xs border-none w-full justify-between" />
                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                    </div>
                  </SidebarSection>

                  <SidebarSection label="负责人">
                    <select value={editedTask.assignee?.id || ''} onChange={(e) => handleChange('assignee', MOCK_USERS.find(u => u.id === e.target.value))} className="w-full appearance-none bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-4 py-2 focus:border-blue-500 outline-none cursor-pointer hover:border-slate-300 shadow-sm transition-all">
                        {MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </SidebarSection>

                  <SidebarSection label="优先级">
                    <select value={editedTask.priority} onChange={(e) => handleChange('priority', e.target.value)} className="w-full appearance-none bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-4 py-2 focus:border-blue-500 outline-none cursor-pointer hover:border-slate-300 shadow-sm transition-all">
                        {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </SidebarSection>

                  <SidebarSection label="截止日期">
                    <input type="date" value={editedTask.dueDate} onChange={(e) => handleChange('dueDate', e.target.value)} className="w-full bg-white border border-slate-200 text-xs font-mono font-bold text-slate-700 rounded-xl px-4 py-2 focus:border-blue-500 outline-none hover:border-slate-300 shadow-sm transition-all" />
                  </SidebarSection>

                  <SidebarSection label="完成进度">
                      <div className="flex items-center gap-3">
                        <input type="range" min="0" max="100" value={editedTask.progress || 0} onChange={(e) => handleChange('progress', parseInt(e.target.value))} className="flex-1 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
                        <span className="text-xs font-bold text-blue-600 w-8">{editedTask.progress}%</span>
                      </div>
                  </SidebarSection>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarSection = ({ label, children }: any) => (
    <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">{label}</label>
        {children}
    </div>
);

const TaskListView: React.FC<{ tasks: Task[], onTaskClick: (t: Task) => void }> = ({ tasks, onTaskClick }) => {
    return (
        <div className="flex-1 overflow-auto bg-white p-4">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-200 text-slate-400 text-xs font-bold uppercase">
                        <th className="py-3 px-4 w-24">ID</th>
                        <th className="py-3 px-4">标题</th>
                        <th className="py-3 px-4 w-32">状态</th>
                        <th className="py-3 px-4 w-24 text-center">优先级</th>
                        <th className="py-3 px-4 w-32">负责人</th>
                        <th className="py-3 px-4 w-32 text-right">截止日期</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {tasks.map(task => (
                        <tr key={task.id} onClick={() => onTaskClick(task)} className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors group">
                            <td className="py-4 px-4 text-xs font-mono font-bold text-slate-400">{task.displayId}</td>
                            <td className="py-4 px-4 font-semibold text-slate-700 group-hover:text-blue-600">{task.title}</td>
                            <td className="py-4 px-4"><StatusBadge status={task.statusColor.includes('green') ? '已完成' : '进行中'} /></td>
                            <td className="py-4 px-4 text-center">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${task.priority === Priority.High ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-500'}`}>{task.priority || '低'}</span>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                     <div className={`w-5 h-5 rounded-full ${task.assignee?.avatarColor} text-white flex items-center justify-center text-[10px] font-bold shadow-sm`}>{task.assignee?.name.slice(0, 1)}</div>
                                     <span className="text-xs font-medium">{task.assignee?.name}</span>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-xs font-mono text-slate-400 text-right">{task.dueDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TaskTreeView: React.FC<{ tasks: Task[], onTaskClick: (t: Task) => void }> = ({ tasks, onTaskClick }) => {
    const groupedTasks = useMemo(() => {
        const groups: Record<string, Task[]> = {};
        tasks.forEach(task => {
            const key = task.type;
            if (!groups[key]) groups[key] = [];
            groups[key].push(task);
        });
        return groups;
    }, [tasks]);

    const [expanded, setExpanded] = useState<Record<string, boolean>>(Object.keys(groupedTasks).reduce((acc, key) => ({...acc, [key]: true}), {}));

    return (
        <div className="flex-1 overflow-auto bg-white p-6">
             {Object.entries(groupedTasks).map(([type, groupTasks]) => (
                 <div key={type} className="mb-6">
                     <div onClick={() => setExpanded(prev => ({...prev, [type]: !prev[type]}))} className="flex items-center gap-2 py-2 cursor-pointer group">
                         <ChevronRight size={14} className={`text-slate-300 transition-transform ${expanded[type] ? 'rotate-90' : ''}`} />
                         <span className="font-bold text-slate-800 text-sm uppercase tracking-wider">{type}</span>
                         <span className="text-xs font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{(groupTasks as Task[]).length}</span>
                     </div>
                     {expanded[type] && (
                         <div className="ml-5 border-l border-slate-100 pl-4 mt-2 space-y-1">
                             {(groupTasks as Task[]).map(task => (
                                 <div key={task.id} onClick={() => onTaskClick(task)} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer group transition-all">
                                     <div className="flex items-center gap-3">
                                         <div className={`w-1.5 h-1.5 rounded-full ${task.statusColor}`}></div>
                                         <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">{task.title}</span>
                                     </div>
                                     <span className="text-xs font-mono font-bold text-slate-300">{task.displayId}</span>
                                 </div>
                             ))}
                         </div>
                     )}
                 </div>
             ))}
        </div>
    );
};

interface KanbanBoardProps {
  filters: FilterState;
  viewType: ViewType;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (isOpen: boolean) => void;
  createModalType: TaskType | null;
  setCreateModalType: (type: TaskType | null) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
    filters, viewType, isCreateModalOpen, setIsCreateModalOpen, createModalType, setCreateModalType
}) => {
  const [columns, setColumns] = useState<Column[]>(MOCK_COLUMNS);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const isTaskVisible = (task: Task) => {
    if (filters.search) {
      const s = filters.search.toLowerCase();
      if (!task.title.toLowerCase().includes(s) && !task.displayId.toLowerCase().includes(s)) return false;
    }
    if (filters.assigneeId && task.assignee?.id !== filters.assigneeId) return false;
    if (filters.type && task.type !== filters.type) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  };

  const filteredColumns = useMemo(() => {
    return columns.map(col => ({ ...col, tasks: col.tasks.filter(isTaskVisible) }));
  }, [columns, filters]);

  const allFilteredTasks = useMemo(() => filteredColumns.flatMap(col => col.tasks), [filteredColumns]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) {
      const col = columns.find(c => c.id === source.droppableId);
      if (!col) return;
      const tasks = Array.from(col.tasks);
      const [removed] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, removed);
      setColumns(columns.map(c => c.id === source.droppableId ? { ...c, tasks } : c));
    } else {
      const sCol = columns.find(c => c.id === source.droppableId);
      const dCol = columns.find(c => c.id === destination.droppableId);
      if (!sCol || !dCol) return;
      const sTasks = Array.from(sCol.tasks);
      const dTasks = Array.from(dCol.tasks);
      const [removed] = sTasks.splice(source.index, 1);
      dTasks.splice(destination.index, 0, removed);
      setColumns(columns.map(c => {
        if (c.id === source.droppableId) return { ...c, tasks: sTasks };
        if (c.id === destination.droppableId) return { ...c, tasks: dTasks };
        return c;
      }));
    }
  };

  if (viewType === 'list') return <TaskListView tasks={allFilteredTasks} onTaskClick={setSelectedTask} />;
  if (viewType === 'tree') return <TaskTreeView tasks={allFilteredTasks} onTaskClick={setSelectedTask} />;

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden bg-slate-50 p-6 kanban-scroll relative">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex items-start h-full gap-4 min-w-max">
          {filteredColumns.map(column => (
            <div key={column.id} className="w-80 flex-shrink-0 flex flex-col h-full bg-slate-100/50 rounded-xl border border-slate-200">
              <div className="p-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Circle size={10} className={column.iconColor} fill="currentColor" />
                  <span className="font-bold text-slate-800 text-sm uppercase tracking-wider">{column.title}</span>
                  <span className="bg-white border border-slate-200 text-slate-400 text-xs font-bold px-1.5 py-0.5 rounded-full">{column.tasks.length}</span>
                </div>
                <button onClick={() => { setActiveColumnId(column.id); setIsCreateModalOpen(true); }} className="p-1 text-slate-400 hover:text-blue-500 rounded transition-all"><Plus size={16} /></button>
              </div>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar">
                    {column.tasks.map((task, idx) => (
                      <Draggable key={task.id} draggableId={task.id} index={idx}>
                        {(p) => (
                          <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps} style={p.draggableProps.style}>
                             <KanbanCard task={task} onClick={setSelectedTask} onUpdate={setSelectedTask} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
      {selectedTask && <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} onUpdate={setSelectedTask} onDelete={() => setSelectedTask(null)} />}
    </div>
  );
};