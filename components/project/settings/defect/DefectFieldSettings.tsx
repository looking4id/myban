
import React from 'react';
import { Plus, Edit3, Settings, Copy, Box, Trash2 } from '../../../Icons';

export const DefectFieldSettings: React.FC = () => {
  const fields = [
    { name: '优先级', type: '单选下拉列表', system: '是' },
    { name: '标题', type: '单行文本框', system: '是' },
    { name: '详细描述', type: '单行文本框', system: '是' },
    { name: '预计开始', type: '日期', system: '是' },
    { name: '预计结束', type: '日期', system: '是' },
    { name: '预估工时', type: '浮点数类型', system: '是' },
    { name: '严重程度', type: '单选下拉列表', system: '是' },
    { name: '处理人', type: '人名输入框', system: '是' },
    { name: '开发人员', type: '人名输入框', system: '是' },
    { name: '软件平台', type: '单选下拉列表', system: '是' },
    { name: '操作系统', type: '单选下拉列表', system: '是' },
    { name: '测试方式', type: '单选下拉列表', system: '是' },
    { name: '测试类型', type: '单选下拉列表', system: '是' },
    { name: '测试阶段', type: '单选下拉列表', system: '是' },
    { name: '重现规律', type: '单选下拉列表', system: '是' },
    { name: '缺陷根源', type: '单选下拉列表', system: '是' },
    { name: '发现阶段', type: '单选下拉列表', system: '是' },
    { name: '引入阶段', type: '单选下拉列表', system: '是' },
    { name: '缺陷类型', type: '单选下拉列表', system: '是' },
    { name: '发现版本', type: '单选下拉列表', system: '是' },
    { name: '验证版本', type: '单选下拉列表', system: '是' },
    { name: '合入版本', type: '单选下拉列表', system: '是' },
    { name: '关闭版本', type: '单选下拉列表', system: '是' },
    { name: '缺陷所属模块', type: '单选下拉列表', system: '否' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
            <Plus size={14} /> 新建字段
          </button>
          <span className="text-[11px] text-slate-400 font-medium">最多可以配置50个自定义字段</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-[11px] font-bold text-slate-500 hover:text-blue-600">用量说明</button>
          <button className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-blue-600">
            <Copy size={14} /> 复制字段配置至
          </button>
        </div>
      </div>

      <div className="border border-slate-100 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase">
            <tr>
              <th className="py-3 px-6">字段名 ({fields.length})</th>
              <th className="py-3 px-6">字段类型</th>
              <th className="py-3 px-6">系统字段</th>
              <th className="py-3 px-6">操作</th>
              <th className="py-3 px-6 text-right">权限与规则</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-600 divide-y divide-slate-50">
            {fields.map((f, i) => (
              <tr key={i} className="hover:bg-slate-50/30 group transition-colors">
                <td className="py-3 px-6 font-medium text-slate-800">{f.name}</td>
                <td className="py-3 px-6">{f.type}</td>
                <td className="py-3 px-6">{f.system}</td>
                <td className="py-3 px-6">
                   <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-slate-400 hover:text-blue-600 flex items-center gap-1"><Edit3 size={14}/> 编辑</button>
                      <button className="text-slate-400 hover:text-blue-600 flex items-center gap-1"><Box size={14}/> 应用到</button>
                      {f.system === '否' ? (
                          <button className="text-slate-400 hover:text-red-500 flex items-center gap-1"><Trash2 size={14} /></button>
                      ) : (
                          <button className="text-slate-400 hover:text-blue-600 flex items-center gap-1"><Copy size={14} /></button>
                      )}
                   </div>
                </td>
                <td className="py-3 px-6 text-right">
                   <button className="p-1.5 text-slate-300 hover:text-slate-600 border border-transparent hover:border-slate-200 rounded">
                      <Settings size={14} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
