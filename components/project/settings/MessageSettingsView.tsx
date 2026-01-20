
import React, { useState } from 'react';
import { HelpCircle, Trash2, Plus, Clock, ToggleLeft, ToggleRight, CheckSquare, Square } from '../../Icons';

export const MessageSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('消息通知');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full flex flex-col">
      <h2 className="text-xl font-bold text-slate-800 mb-6">消息设置</h2>
      
      <div className="flex items-center gap-8 border-b border-slate-200 mb-6 flex-shrink-0">
        {['消息通知', '每日工作提醒', '弹窗公告'].map(tab => (
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

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
        {activeTab === '消息通知' && <MessageNotificationsTab />}
        {activeTab === '每日工作提醒' && <DailyWorkReminderTab />}
        {activeTab === '弹窗公告' && <PopupAnnouncementTab />}
      </div>
    </div>
  );
};

const MessageNotificationsTab = () => {
  const sections = [
    { 
      title: '需求通知', 
      canAdd: true,
      items: [
        { event: '创建|更新|状态变更|删除', recipient: '处理人', method: '站内信' }
      ]
    },
    { 
      title: '缺陷通知', 
      canAdd: false, // Screenshot doesn't explicitly show add button for defect but usually it exists. Screenshot shows it for Requirement. Let's follow screenshot 1 strictly? Screenshot 1 shows "创建新通知" for Requirement. Defect section is just below.
      items: [
        { event: '创建|更新|状态变更|删除', recipient: '处理人', method: '站内信' }
      ]
    },
    { 
      title: '依赖关系通知', 
      hasHelp: true,
      items: [] 
    }
  ];

  return (
    <div className="space-y-8">
      <p className="text-xs text-slate-400 mb-6">保密需求的消息通知不会发送给不在需求访问范围内的成员。</p>

      {sections.map((section, idx) => (
        <div key={section.title} className="pb-6">
          <div className="flex items-center gap-4 mb-4">
             <div className="flex items-center gap-1.5 border-l-4 border-blue-600 pl-2 h-4">
                <h3 className="text-sm font-bold text-slate-800">{section.title}</h3>
                {section.hasHelp && <HelpCircle size={14} className="text-slate-400 cursor-pointer" />}
             </div>
             {section.canAdd && (
                 <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors">
                     <Plus size={14} /> 创建新通知
                 </button>
             )}
          </div>
          
          <div className="border-t border-slate-100">
            <table className="w-full text-left">
              <thead className="text-[11px] text-slate-400 font-medium">
                <tr>
                  <th className="py-3 font-normal w-1/3">事件</th>
                  <th className="py-3 font-normal w-1/3">接收人</th>
                  <th className="py-3 font-normal w-1/6">接收方式</th>
                  <th className="py-3 font-normal w-1/6 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                {section.items.length > 0 ? (
                  section.items.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors border-t border-slate-50">
                      <td className="py-4">{item.event}</td>
                      <td className="py-4">
                          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{item.recipient}</span>
                      </td>
                      <td className="py-4">{item.method}</td>
                      <td className="py-4 text-right">
                        <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-xs text-slate-300">
                        暂无配置规则
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

const DailyWorkReminderTab = () => {
    const [smartSkip, setSmartSkip] = useState(true);
    const [checkedItems, setCheckedItems] = useState({
        dueThisWeekMyTodos: true,
        dueThisWeekCreatedByMe: false,
        dueThisWeekCC: false,
        overdueMyUnfinished: true,
        overdueCreatedByMe: false,
        myPendingDefects: true,
        predecessorOverdue: false
    });

    const toggleCheck = (key: keyof typeof checkedItems) => {
        setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-800">每日工作提醒</h3>
                <p className="text-xs text-slate-400">相关人于每日早晨收到提醒</p>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-white">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-bold text-slate-800">邮件接收</span>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSmartSkip(!smartSkip)}>
                        <span className="text-xs text-slate-500">智能跳过节假日</span>
                        {smartSkip ? (
                            <div className="relative w-9 h-5 bg-blue-500 rounded-full transition-colors">
                                <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        ) : (
                            <div className="relative w-9 h-5 bg-slate-200 rounded-full transition-colors">
                                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <Checkbox label="本周到期，我待办的工作" checked={checkedItems.dueThisWeekMyTodos} onChange={() => toggleCheck('dueThisWeekMyTodos')} />
                    <Checkbox label="已过期，我创建的工作" checked={checkedItems.overdueCreatedByMe} onChange={() => toggleCheck('overdueCreatedByMe')} />
                    
                    <Checkbox label="本周到期，我创建的工作" checked={checkedItems.dueThisWeekCreatedByMe} onChange={() => toggleCheck('dueThisWeekCreatedByMe')} />
                    <Checkbox label="我待处理的缺陷" checked={checkedItems.myPendingDefects} onChange={() => toggleCheck('myPendingDefects')} />
                    
                    <Checkbox label="本周到期，抄送我的工作" checked={checkedItems.dueThisWeekCC} onChange={() => toggleCheck('dueThisWeekCC')} />
                    <Checkbox label="前置对象逾期" checked={checkedItems.predecessorOverdue} onChange={() => toggleCheck('predecessorOverdue')} />
                    
                    <Checkbox label="已过期，我未完成的工作" checked={checkedItems.overdueMyUnfinished} onChange={() => toggleCheck('overdueMyUnfinished')} />
                </div>
            </div>
        </div>
    );
};

const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <div className="flex items-center gap-2 cursor-pointer group" onClick={onChange}>
        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-blue-500 border-blue-500' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
            {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </div>
        <span className={`text-sm ${checked ? 'text-slate-800' : 'text-slate-600'}`}>{label}</span>
    </div>
);

const PopupAnnouncementTab = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 rounded text-sm text-slate-700 shadow-sm transition-all active:scale-95">
                    <Plus size={16} /> 新建公告
                </button>
                <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800">
                    <Clock size={14} /> 历史
                </button>
            </div>

            <div className="border-t border-slate-100">
                <table className="w-full text-left">
                    <thead className="text-[11px] text-slate-400 font-medium">
                        <tr>
                            <th className="py-3 font-normal">公告标题</th>
                            <th className="py-3 font-normal">公告内容</th>
                            <th className="py-3 font-normal w-32">创建者</th>
                            <th className="py-3 font-normal w-40">展示时间</th>
                            <th className="py-3 font-normal w-20 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-slate-600">
                        <tr>
                            <td colSpan={5} className="py-32 text-center text-slate-300 text-xs">
                                暂无公告数据
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
