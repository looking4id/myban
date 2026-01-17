
import React from 'react';
import { Search, Filter, Plus, Trash2 } from './Icons';
import { Project, TaskType, Task } from '../types';
import { StatusBadge, PriorityBadge } from './ProjectShared';

interface WorkItemListProps {
    project: Project;
    type: TaskType;
    tasks: Task[];
    onCreate: () => void;
    onTaskClick: (t: Task) => void;
    onDelete: (taskId: string) => void;
}

export const WorkItemList: React.FC<WorkItemListProps> = ({ project, type, tasks, onCreate, onTaskClick, onDelete }) => {
    // Filter tasks from passed props
    const displayTasks = tasks.filter(t => t.projectId === project.id && t.type === type);

    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                     <h3 className="font-bold text-slate-800 text-lg">{type}列表</h3>
                     <div className="flex items-center gap-2">
                         <div className="relative">
                             <input type="text" placeholder="搜索..." className="pl-8 pr-4 py-1.5 text-sm border border-slate-300 rounded focus:border-blue-500 outline-none w-64" />
                             <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                         </div>
                         <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-100">
                             <Filter size={14} /> 筛选
                         </button>
                     </div>
                 </div>
                 <button 
                    onClick={onCreate}
                    className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm shadow-sm transition-colors"
                 >
                     <Plus size={16} /> 新建{type}
                 </button>
            </div>
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 sticky top-0 z-10">
                        <tr className="border-b border-slate-200 text-slate-600 text-sm font-semibold">
                            <th className="py-3 px-4 w-10"><input type="checkbox" /></th>
                            <th className="py-3 px-4 w-24">ID</th>
                            <th className="py-3 px-4">标题</th>
                            <th className="py-3 px-4 w-32">状态</th>
                            <th className="py-3 px-4 w-32">负责人</th>
                            <th className="py-3 px-4 w-24">优先级</th>
                            <th className="py-3 px-4 w-32">截止日期</th>
                            <th className="py-3 px-4 w-20 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayTasks.map(task => (
                            <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50 group">
                                <td className="py-3 px-4"><input type="checkbox" /></td>
                                <td className="py-3 px-4 text-xs font-mono text-slate-500">{task.displayId}</td>
                                <td className="py-3 px-4">
                                    <div 
                                        onClick={() => onTaskClick(task)}
                                        className="text-[15px] font-medium text-slate-800 hover:text-blue-600 cursor-pointer"
                                    >
                                        {task.title}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <StatusBadge status={task.statusColor === 'bg-green-500' ? '已完成' : '处理中'} />
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        {task.assignee ? (
                                            <>
                                                <div className={`w-5 h-5 rounded-full ${task.assignee.avatarColor} text-white flex items-center justify-center text-[10px]`}>
                                                    {task.assignee.name.substring(0, 1)}
                                                </div>
                                                <span className="text-sm text-slate-600">{task.assignee.name}</span>
                                            </>
                                        ) : <span className="text-slate-400 text-sm">未分配</span>}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <PriorityBadge priority={task.priority} />
                                </td>
                                <td className="py-3 px-4 text-sm text-slate-500">{task.dueDate}</td>
                                <td className="py-3 px-4 text-right">
                                    <button 
                                        onClick={() => onDelete(task.id)}
                                        className="p-1 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="删除"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {displayTasks.length === 0 && (
                             <tr>
                                 <td colSpan={8} className="py-12 text-center text-slate-400">
                                     暂无{type}，点击右上角新建
                                 </td>
                             </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="p-3 border-t border-slate-200 flex justify-between items-center bg-slate-50">
                <span className="text-sm text-slate-500">共 {displayTasks.length} 条</span>
                <div className="flex gap-1">
                    <button className="px-3 py-1.5 border border-slate-300 rounded bg-white text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-50">上一页</button>
                    <button className="px-3 py-1.5 border border-slate-300 rounded bg-white text-xs text-slate-600 hover:bg-slate-50">下一页</button>
                </div>
            </div>
        </div>
    );
};
