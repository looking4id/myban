
import React from 'react';
import { Plus, Edit3, Copy, Trash2, Box } from '../../../Icons';

export const DefectTemplateSettings: React.FC = () => {
  const templates = [
    { name: '创建缺陷模板', scope: '缺陷', isDefault: true },
    { name: '金融缺陷模板', scope: '缺陷', isDefault: false }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="flex gap-2 mb-6">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-100 text-blue-600 rounded text-xs font-bold hover:bg-blue-50 shadow-sm">
            <Box size={14} /> 创建建页模板
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
            <Settings size={14} /> 编辑与查看页设置
          </button>
      </div>

      <div className="border border-slate-100 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase">
            <tr>
              <th className="py-3 px-6 w-10"><input type="checkbox" className="rounded" /></th>
              <th className="py-3 px-6">模板名称 (2)</th>
              <th className="py-3 px-6">是否默认模板</th>
              <th className="py-3 px-6 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-600 divide-y divide-slate-50">
            {templates.map((t, i) => (
              <tr key={i} className="hover:bg-slate-50/30 group transition-colors">
                <td className="py-4 px-6"><input type="checkbox" className="rounded" /></td>
                <td className="py-4 px-6 font-medium text-slate-800">{t.name}</td>
                <td className="py-4 px-6">
                    {t.isDefault ? (
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">默认模板</span>
                    ) : (
                        <button className="text-slate-400 hover:text-blue-600 hover:underline">设为默认</button>
                    )}
                </td>
                <td className="py-4 px-6 text-right">
                   <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-slate-400 hover:text-blue-600"><Edit3 size={16} /></button>
                      <button className="text-slate-400 hover:text-blue-600"><Copy size={16} /></button>
                      {!t.isDefault && <button className="text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>}
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
import { Settings } from '../../../Icons';
