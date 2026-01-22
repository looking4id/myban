
import React, { useState } from 'react';
import { Column, Task } from '../../../types';
import { StatusBadge, PriorityBadge } from '../../../components/common/ProjectShared';
import { Clock, ChevronDown, ChevronRight, Circle, Plus } from '../../../components/common/Icons';

interface TreeListProps {
  columns: Column[];
  onTaskClick: (task: Task) => void;
  onAddClick: (statusId: string) => void;
}

export const TreeList: React.FC<TreeListProps> = ({ columns, onTaskClick, onAddClick }) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    columns.reduce((acc, col) => ({ ...acc, [col.id]: true }), {})
  );

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex-1 overflow-auto bg-slate-50/30 p-6 custom-scrollbar">
      <div className="space-y-4">
        {columns.map(col => {
            const isExpanded = expandedGroups[col.id];
            return (
                <div key={col.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    {/* Group Header */}
                    <div 
                        className="flex items-center justify-between px-4 py-3 bg-slate-50/50 cursor-pointer hover:bg-slate-100/50 transition-colors border-b border-slate-100"
                        onClick={() => toggleGroup(col.id)}
                    >
                        <div className="flex items-center gap-3">
                            <button className="p-1 rounded hover:bg-slate-200 text-slate-400 transition-colors">
                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>
                            <div className="flex items-center gap-2">
                                <Circle size={10} className={col.iconColor} fill="currentColor" />
                                <span className="font-bold text-slate-700 text-sm">{col.title}</span>
                                <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{col.tasks.length}</span>
                            </div>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onAddClick(col.id); }}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all opacity-0 group-hover:opacity-100"
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    {/* Tasks List */}
                    {isExpanded && (
                        <div>
                            {col.tasks.length > 0 ? (
                                <table className="w-full text-left">
                                    <tbody className="divide-y divide-slate-50 text-sm">
                                        {col.tasks.map(task => (
                                            <tr 
                                                key={task.id} 
                                                onClick={() => onTaskClick(task)}
                                                className="hover:bg-blue-50/20 transition-colors cursor-pointer group"
                                            >
                                                <td className="py-3 px-10 w-32 font-mono font-bold text-slate-400 text-xs border-l-4 border-transparent hover:border-blue-500">
                                                    {task.displayId}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{task.title}</span>
                                                </td>
                                                <td className="py-3 px-4 w-32">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-5 h-5 rounded-full ${task.assignee?.avatarColor} text-white flex items-center justify-center text-[9px] font-bold shadow-sm`}>
                                                            {task.assignee?.name.charAt(0)}
                                                        </div>
                                                        <span className="text-xs text-slate-600">{task.assignee?.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 w-28">
                                                    <PriorityBadge priority={task.priority} />
                                                </td>
                                                <td className="py-3 px-4 w-32 text-right">
                                                    <div className="flex items-center justify-end gap-1.5 text-xs text-slate-400 font-mono">
                                                        <Clock size={12} />
                                                        {task.dueDate}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="py-4 text-center text-xs text-slate-300 font-medium">
                                    此状态下暂无工作项
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        })}
      </div>
    </div>
  );
};
