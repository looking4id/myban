
import React, { useState } from 'react';
import { Project } from '../../../types';
import { Search, Calendar, ChevronDown } from '../../Icons';

interface ChangeDetail {
  item: string;
  before: string | string[];
  after: string | string[];
  isPermission?: boolean;
}

interface HistoryRecord {
  id: number;
  time: string;
  user: string;
  category: string;
  details: ChangeDetail[];
}

export const ProjectHistoryView: React.FC<{ project: Project }> = ({ project }) => {
  const [startDate, setStartDate] = useState('2025-10-19');
  const [endDate, setEndDate] = useState('2026-01-19');
  const [changer, setChanger] = useState('');
  const [category, setCategory] = useState('全部');

  const historyData: HistoryRecord[] = [
    {
      id: 1,
      time: '2026-01-19 10:56:30',
      user: '王亮',
      category: '应用管理',
      details: [
        { item: '启用应用【统计】', before: '已关闭', after: '已启用' }
      ]
    },
    {
      id: 2,
      time: '2026-01-19 10:56:27',
      user: '王亮',
      category: '应用管理',
      details: [
        { item: '启用应用【检查项】', before: '已关闭', after: '已启用' }
      ]
    },
    {
      id: 3,
      time: '2026-01-19 10:56:27',
      user: '王亮',
      category: '成员和组织',
      details: [
        {
          item: '用户组【管理员】权限新增',
          before: '--',
          after: [
            '【需求】',
            '创建需求', '编辑需求', '删除需求', '需求排序',
            '附件上传/关联', '附件删除/解除关联', '附件下载/预览'
          ],
          isPermission: true
        },
        {
          item: '用户组【成员】权限新增',
          before: '--',
          after: [
            '【需求】',
            '创建需求', '编辑需求', '删除需求', '需求排序',
            '附件上传/关联', '附件删除/解除关联', '附件下载/预览'
          ],
          isPermission: true
        }
      ]
    },
    {
      id: 4,
      time: '2026-01-19 10:56:27',
      user: 'TAPD system',
      category: '检查清单设置',
      details: [
        { item: '创建检查项类别【检查项】', before: '--', after: '检查项' }
      ]
    },
    {
      id: 5,
      time: '2026-01-19 10:56:25',
      user: '王亮',
      category: '应用管理',
      details: [
        { item: '启用应用【发布计划】', before: '已关闭', after: '已启用' }
      ]
    },
    {
      id: 6,
      time: '2026-01-19 10:56:24',
      user: '王亮',
      category: '应用管理',
      details: [
        { item: '启用应用【任务】', before: '已关闭', after: '已启用' }
      ]
    }
  ];

  const renderContent = (content: string | string[], isPermission?: boolean) => {
    if (Array.isArray(content)) {
      return (
        <div className="space-y-1">
          {content.map((line, idx) => (
            <div key={idx} className={isPermission && line.startsWith('【') ? 'font-bold text-slate-800 mt-2 first:mt-0' : 'text-slate-600'}>
              {line}
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-slate-600">{content}</span>;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400 h-full flex flex-col">
      <h2 className="text-2xl font-black text-slate-800 mb-6">变更历史</h2>
      
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-slate-600 font-medium">时间范围</span>
          <div className="flex items-center">
            <div className="relative">
                <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-600 outline-none focus:border-blue-500 w-36"
                />
            </div>
            <span className="mx-2 text-slate-400">-</span>
            <div className="relative">
                <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-600 outline-none focus:border-blue-500 w-36"
                />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <span className="text-slate-600 font-medium">变更人</span>
          <input 
            type="text" 
            placeholder="请输入" 
            value={changer}
            onChange={(e) => setChanger(e.target.value)}
            className="border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-600 outline-none focus:border-blue-500 w-36 placeholder:text-slate-300"
          />
        </div>

        <div className="flex items-center gap-2 ml-4">
          <span className="text-slate-600 font-medium">变更分类</span>
          <div className="relative">
            <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-600 outline-none focus:border-blue-500 w-36 appearance-none bg-white cursor-pointer"
            >
                <option value="全部">全部</option>
                <option value="应用管理">应用管理</option>
                <option value="成员和组织">成员和组织</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white border-t border-slate-100 flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white text-slate-400 text-xs font-bold border-b border-slate-100 sticky top-0 z-10">
            <tr>
              <th className="py-4 px-4 w-16 font-normal"></th>
              <th className="py-4 px-4 w-48 font-normal">变更时间</th>
              <th className="py-4 px-4 w-32 font-normal">变更人</th>
              <th className="py-4 px-4 w-32 font-normal">变更分类</th>
              <th className="py-4 px-4 w-64 font-normal">变更事项</th>
              <th className="py-4 px-4 w-48 font-normal">变更前</th>
              <th className="py-4 px-4 font-normal">变更后</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {historyData.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50/50 group transition-colors align-top">
                <td className="py-6 px-4 text-slate-400 font-mono text-xs">{record.id}</td>
                <td className="py-6 px-4 text-slate-600 font-mono text-xs">{record.time}</td>
                <td className="py-6 px-4 text-slate-800">{record.user}</td>
                <td className="py-6 px-4 text-slate-600">{record.category}</td>
                
                {/* Details Columns */}
                <td className="py-6 px-4 space-y-12">
                  {record.details.map((detail, idx) => (
                    <div key={idx} className="min-h-[20px] text-slate-700">{detail.item}</div>
                  ))}
                </td>
                <td className="py-6 px-4 space-y-12">
                  {record.details.map((detail, idx) => (
                    <div key={idx} className="min-h-[20px] text-slate-400">{renderContent(detail.before)}</div>
                  ))}
                </td>
                <td className="py-6 px-4 space-y-12">
                  {record.details.map((detail, idx) => (
                    <div key={idx} className="min-h-[20px] text-xs leading-relaxed">
                      {renderContent(detail.after, detail.isPermission)}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
