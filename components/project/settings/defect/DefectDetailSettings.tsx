
import React, { useState } from 'react';
import { ChevronRight, Copy } from '../../../Icons';
import { DefectFieldSettings } from './DefectFieldSettings';
import { DefectTemplateSettings } from './DefectTemplateSettings';
import { DefectWorkflowSettings } from './DefectWorkflowSettings';
import { DefectEnableSettings } from './DefectEnableSettings';

interface DefectDetailSettingsProps {
  onBack: () => void;
}

export const DefectDetailSettings: React.FC<DefectDetailSettingsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('字段设置');

  const tabs = ['字段设置', '模板&布局', '工作流', '启用设置'];

  const renderTabContent = () => {
    switch (activeTab) {
      case '字段设置': return <DefectFieldSettings />;
      case '模板&布局': return <DefectTemplateSettings />;
      case '工作流': return <DefectWorkflowSettings />;
      case '启用设置': return <DefectEnableSettings />;
      default: return null;
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[12px] text-slate-400 mb-6 font-medium">
        <button onClick={onBack} className="hover:text-blue-600">应用设置</button>
        <ChevronRight size={12} />
        <span className="text-slate-800 font-bold">缺陷</span>
      </div>

      <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-slate-800">缺陷</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">
             <Copy size={14} /> 复制配置
          </button>
      </div>

      <div className="flex items-center gap-8 border-b border-slate-100 mb-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
          </button>
        ))}
      </div>

      <div className="pb-10">
        {renderTabContent()}
      </div>
    </div>
  );
};
