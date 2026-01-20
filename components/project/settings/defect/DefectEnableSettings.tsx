
import React from 'react';

export const DefectEnableSettings: React.FC = () => {
  const settings = [
    { title: '缺陷转需求后关闭缺陷', sub: '关闭缺陷时手动更新新字段', enabled: true },
    { title: '启用移动端状态快速流转', enabled: false },
    { title: '同步复制/关联默认字段配置', enabled: false },
    { title: '复制到本项目时必须为初始状态', enabled: false },
    { title: '导入缺陷校验必填字段', enabled: false },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
        {settings.map((item, idx) => (
          <div key={idx} className="p-8 border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[14px] font-black text-slate-800">{item.title}</span>
              {item.sub && <p className="text-xs text-slate-400">{item.sub}</p>}
            </div>
            <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${item.enabled ? 'bg-blue-500' : 'bg-slate-200'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${item.enabled ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
