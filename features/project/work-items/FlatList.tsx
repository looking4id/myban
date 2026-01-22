
import React from 'react';
import { Column, Task } from '../../../types';
import { StatusBadge, PriorityBadge, SeverityBadge } from '../../../components/common/ProjectShared';
import { Clock, User } from '../../../components/common/Icons';

interface FlatListProps {
  columns: Column[];
  onTaskClick: (task: Task) => void;
}

export const FlatList: React.FC<FlatListProps> = ({ columns, onTaskClick }) => {
  const allTasks = columns.flatMap(col => col.tasks);

  return (
    <div className="flex-1 overflow-auto bg-white custom-scrollbar p-6">
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/80 border-b border-slate-200 sticky top-0 z-10 backdrop-blur-sm">
            <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              <th className="py-4 px-6 w-32">ID</th>
              <th className="py-4 px-4">标题</th>
              <th className="py-4 px-4 w-32">状态</th>
              <th className="py-4 px-4 w-32">类型</th>
              <th className="py-4 px-4 w-28">优先级</th>
              <th className="py-4 px-4 w-40">负责人</th>
              <th className="py-4 px-4 w-36 text-right">截止日期</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-white divide-y divide-slate-50">
            {allTasks.map(task => (
              <tr 
                key={task.id} 
                onClick={() => onTaskClick(task)}
                className="hover:bg-blue-50/20 transition-colors group cursor-pointer"
              >
                <td className="py-4 px-6 font-mono font-bold text-slate-400 text-xs">
                  {task.displayId}
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{task.title}</span>
                    <div className="flex gap-2">
                        {task.tags?.map(tag => (
                            <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{tag}</span>
                        ))}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                    <StatusBadge status={task.statusColor?.includes('green') ? '已完成' : task.statusColor?.includes('blue') ? '进行中' : '未开始'} />
                </td>
                <td className="py-4 px-4">
                    <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">{task.type}</span>
                </td>
                <td className="py-4 px-4">
                    <PriorityBadge priority={task.priority} />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${task.assignee?.avatarColor} text-white flex items-center justify-center text-[10px] font-bold shadow-sm`}>
                      {task.assignee?.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-600">{task.assignee?.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                   <div className="flex items-center justify-end gap-1.5 text-xs text-slate-400 font-mono">
                      <Clock size={12} />
                      {task.dueDate}
                   </div>
                </td>
              </tr>
            ))}
            {allTasks.length === 0 && (
                <tr>
                    <td colSpan={7} className="py-20 text-center text-slate-400 text-sm">暂无工作项数据</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
