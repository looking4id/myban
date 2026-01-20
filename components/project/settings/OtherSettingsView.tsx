
import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Copy, Search, Calendar, ChevronRight, Settings } from '../../Icons';

export const OtherSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('可启用的功能模块');

  const renderContent = () => {
    switch (activeTab) {
      case '可启用的功能模块': return <EnabledModulesTab />;
      case '项目公共参数设置': return <PublicParamsTab />;
      case '项目系统视图设置': return <SystemViewsTab />;
      case '工作日设置': return <WorkdaySettingsTab />;
      default: return <EnabledModulesTab />;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full flex flex-col">
      <h2 className="text-xl font-bold text-slate-800 mb-6">其他设置</h2>
      
      <div className="flex items-center gap-8 border-b border-slate-200 mb-8 flex-shrink-0">
        {['可启用的功能模块', '项目公共参数设置', '项目系统视图设置', '工作日设置'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
        {renderContent()}
      </div>
    </div>
  );
};

/* --- Tab 1: 可启用的功能模块 --- */
const EnabledModulesTab = () => {
  const settings = [
    { title: '启用工时花费', enabled: false },
    { 
      title: '启用快速创建需求、缺陷', 
      enabled: true, 
      type: 'radio', 
      options: ['行内创建', '弹窗创建'], 
      selectedOption: '行内创建' 
    },
    { 
      title: '启用水印功能', 
      enabled: false, 
      desc: '开启后将在需求、缺陷、任务、wiki、文档页面添加带有用户名字样的水印' 
    },
    { 
      title: '父子工作项排期时间联动设置', 
      enabled: false, 
      desc: '限制子需求排期范围不可超过父需求或根据子需求排期自动计算父需求排期' 
    },
    { title: '启用延期提醒标识', enabled: true },
    { 
      title: '允许删除自己创建的业务单', 
      enabled: true, 
      subText: '需求、缺陷、发布评审、wiki' 
    },
    { 
      title: '允许将当前项目设置为上级项目', 
      enabled: true, 
      desc: '关闭后，新创建的项目将无法将当前项目设置为父项目。' 
    },
  ];

  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm max-w-4xl">
      {settings.map((s, idx) => (
        <div key={idx} className="p-8 border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[15px] font-black text-slate-800">{s.title}</span>
            <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${s.enabled ? 'bg-blue-500' : 'bg-slate-200'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${s.enabled ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>
          
          {s.desc && <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-2xl">{s.desc}</p>}
          
          {s.subText && <p className="text-xs text-slate-400 mt-1">{s.subText}</p>}

          {s.type === 'radio' && s.enabled && (
            <div className="flex items-center gap-6 mt-3">
              {s.options?.map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${s.selectedOption === opt ? 'border-blue-500' : 'border-slate-300'}`}>
                    {s.selectedOption === opt && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                  </div>
                  <span className="text-sm text-slate-600 group-hover:text-slate-900">{opt}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* --- Tab 2: 项目公共参数设置 --- */
const PublicParamsTab = () => {
  const [subTab, setSubTab] = useState('模块设置');
  
  return (
    <div>
      <div className="flex gap-2 mb-6 bg-slate-100/50 p-1 rounded-lg w-fit">
        {['模块设置', '版本管理', '基础设置', '标签管理'].map(t => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
              subTab === t ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {subTab === '模块设置' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 bg-white rounded text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
              <Plus size={14} /> 新建模块
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 bg-white rounded text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
              <Copy size={14} /> 复制模块配置至
            </button>
            <button className="px-3 py-1.5 bg-slate-100 text-slate-400 rounded text-xs font-bold cursor-not-allowed">
              删除选中模块
            </button>
          </div>

          <div className="border border-slate-100 rounded-lg overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase">
                <tr>
                  <th className="py-3 px-6 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
                  <th className="py-3 px-4">模块名称 (1)</th>
                  <th className="py-3 px-4">模块描述</th>
                  <th className="py-3 px-4">模块负责人</th>
                  <th className="py-3 px-4 w-48">创建时间</th>
                  <th className="py-3 px-4 w-20 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-600 divide-y divide-slate-50">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6"><input type="checkbox" className="rounded border-slate-300" /></td>
                  <td className="py-4 px-4 font-medium text-slate-800">模块1</td>
                  <td className="py-4 px-4 text-slate-400">-</td>
                  <td className="py-4 px-4 text-slate-400">-</td>
                  <td className="py-4 px-4 font-mono text-slate-500">2026-01-01 13:55:39</td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all">
                      <Edit3 size={14} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- Tab 3: 项目系统视图设置 --- */
const SystemViewsTab = () => {
  const [subTab, setSubTab] = useState('需求系统视图');
  
  const viewsMap: Record<string, any[]> = {
    '需求系统视图': [
      { id: 1, title: '所有的', type: '系统视图', creator: 'system', isDefault: true, enabled: true },
      { id: 2, title: '我负责的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 3, title: '可访问的工作项', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 4, title: '我关注的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 5, title: '我负责的未完成的', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 6, title: '我创建的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 7, title: '所有子需求', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 8, title: '所有父需求', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 9, title: '当前迭代下的', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 10, title: '规划到迭代中的子需求', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 11, title: '未规划到迭代中的子需求', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 12, title: '待规划工作项Backlog', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 13, title: '我创建的未完成的', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
    ],
    '缺陷系统视图': [
      { id: 1, title: '所有的', type: '系统视图', creator: 'system', isDefault: true, enabled: true },
      { id: 2, title: '我负责的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 3, title: '未关闭的', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 4, title: '我关注的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 5, title: '待修改的', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 6, title: '待验证的', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 7, title: '所有已拒绝', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 8, title: '我创建的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 9, title: '所有需我修改的高优先级', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 10, title: '需要我修改', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 11, title: '需要我验证的', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 12, title: '需要我关闭', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 13, title: '我创建且延期', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 14, title: '我创建的未完成', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 15, title: '我负责的未完成的', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 16, title: '我的草稿', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
    ],
    '迭代系统视图': [
      { id: 1, title: '未关闭的', type: '系统视图', creator: 'system', isDefault: true, enabled: true },
      { id: 2, title: '当前迭代', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 3, title: '一个月内创建的', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 4, title: '三个月内创建的', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 5, title: '已关闭的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 6, title: '所有的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
    ]
  };

  const tabs = [
    '需求系统视图', '缺陷系统视图', '迭代系统视图', 
    '发布计划系统视图', '发布评审系统视图', '测试计划系统视图', '任务系统视图'
  ];

  const currentViews = viewsMap[subTab] || viewsMap['需求系统视图']; // Default fallback

  return (
    <div>
      <div className="flex gap-2 mb-6 bg-slate-100/50 p-1 rounded-lg w-fit flex-wrap">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
              subTab === t ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 bg-white rounded text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
          <Plus size={14} /> 新建{subTab.replace('系统视图', '')}视图
        </button>

        <div className="border border-slate-100 rounded-lg overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase">
              <tr>
                <th className="py-3 px-6 w-20 text-center">默认视图</th>
                <th className="py-3 px-6 w-20 text-center">启用视图</th>
                <th className="py-3 px-4">视图标题 ({currentViews.length})</th>
                <th className="py-3 px-4">视图类型</th>
                <th className="py-3 px-4">创建人</th>
                <th className="py-3 px-4">授权范围</th>
                <th className="py-3 px-6 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-600 divide-y divide-slate-50">
              {currentViews.map((view) => (
                <tr key={view.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${view.isDefault ? 'border-blue-500' : 'border-slate-300'}`}>
                        {view.isDefault && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${view.enabled ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                        {view.enabled && <CheckIcon />}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-800">{view.title}</td>
                  <td className="py-4 px-4 text-slate-500">{view.type}</td>
                  <td className="py-4 px-4 text-slate-500">{view.creator}</td>
                  <td className="py-4 px-4 text-slate-400">-</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-slate-400 hover:text-blue-600"><Edit3 size={14} /></button>
                      <button className="text-slate-400 hover:text-blue-600"><Copy size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* --- Tab 4: 工作日设置 --- */
const WorkdaySettingsTab = () => {
  return (
    <div className="space-y-4 max-w-4xl">
      <div className="border border-blue-200 bg-blue-50/30 rounded-xl p-6 flex items-start justify-between shadow-sm">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <span className="font-black text-xl">C</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold text-slate-800">中国大陆法定工作日</h3>
            </div>
            <p className="text-xs text-slate-500">数据源：中国国务院办公厅法定工作日</p>
          </div>
        </div>
        <div className="w-5 h-5 bg-blue-500 rounded border border-blue-500 flex items-center justify-center">
           <CheckIcon />
        </div>
      </div>

      <div className="border border-slate-200 bg-white rounded-xl p-6 flex items-center justify-between shadow-sm hover:border-blue-300 transition-colors group cursor-pointer">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-md">
            <Edit3 size={20} />
          </div>
          <h3 className="text-sm font-bold text-slate-800">自定义工作日</h3>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:underline">
          去设置 <ChevronRight size={12} />
        </div>
      </div>
    </div>
  );
};

// Simple check icon for checkboxes
const CheckIcon = () => (
  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);
