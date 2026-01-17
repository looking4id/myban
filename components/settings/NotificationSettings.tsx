
import React from 'react';
import { Bell, Mail, Smartphone, Monitor } from '../Icons';

export const NotificationSettings = () => {
  const groups = [
    { 
      title: '工作项通知', 
      items: ['我负责的工作项有更新', '我关注的工作项被提及', '工作项状态发生变更', '工作项即将到期'] 
    },
    { 
      title: '代码与评审', 
      items: ['收到新的代码评审请求', '代码评审通过或被驳回', '代码仓库有新的提交', '流水线构建失败'] 
    },
    { 
      title: '系统通知', 
      items: ['组织成员变更', '项目状态全局变更', '安全审计报警', '账单与财务提醒'] 
    }
  ];

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-center gap-4">
         <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Bell size={24} />
         </div>
         <div>
            <h3 className="font-bold text-blue-900">通知偏好设置</h3>
            <p className="text-sm text-blue-700 opacity-80">在这里配置您接收消息的方式，确保不会错过重要工作进展。</p>
         </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/80 border-b border-slate-100">
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="py-4 px-8">通知事件</th>
              <th className="py-4 px-4 text-center w-24">
                <div className="flex flex-col items-center gap-1">
                   <Monitor size={14} /> 站内信
                </div>
              </th>
              <th className="py-4 px-4 text-center w-24">
                <div className="flex flex-col items-center gap-1">
                   <Mail size={14} /> 邮件
                </div>
              </th>
              <th className="py-4 px-4 text-center w-24">
                <div className="flex flex-col items-center gap-1">
                   <Smartphone size={14} /> 短信
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {groups.map(group => (
              <React.Fragment key={group.title}>
                <tr className="bg-slate-50/30">
                  <td colSpan={4} className="py-2 px-8 text-[11px] font-black text-slate-400 uppercase tracking-tighter">
                    {group.title}
                  </td>
                </tr>
                {group.items.map(item => (
                  <tr key={item} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-8 text-sm text-slate-700 font-medium">{item}</td>
                    <td className="py-4 px-4 text-center">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end">
         <button className="px-8 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
           保存配置
         </button>
      </div>
    </div>
  );
};
