
import React, { useState } from 'react';
import { Settings, ShieldAlert, Bell, Box, Lock, CreditCard, ChevronRight, User, Code2 } from './Icons';
import { OrganizationInfo } from './settings/OrganizationInfo';
import { UserManagement } from './settings/UserManagement';
import { SecurityPermissions } from './settings/SecurityPermissions';
import { NotificationSettings } from './settings/NotificationSettings';
import { FinanceBilling } from './settings/FinanceBilling';
import { AdvancedFeatures } from './settings/AdvancedFeatures';

export const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('组织信息');

  const menuItems = [
    { id: '组织信息', icon: Box, label: '组织信息' },
    { id: '用户管理', icon: User, label: '用户管理' },
    { id: '安全与权限', icon: Lock, label: '安全与权限' },
    { id: '通知设置', icon: Bell, label: '通知设置' },
    { id: '财务与账单', icon: CreditCard, label: '财务与账单' },
    { id: '高级功能', icon: ShieldAlert, label: '高级功能' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case '组织信息': return <OrganizationInfo />;
      case '用户管理': return <UserManagement />;
      case '安全与权限': return <SecurityPermissions />;
      case '通知设置': return <NotificationSettings />;
      case '财务与账单': return <FinanceBilling />;
      case '高级功能': return <AdvancedFeatures />;
      default: return <OrganizationInfo />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      {/* Top Header */}
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <Settings size={24} className="text-slate-600" />
          <h2 className="text-xl font-bold text-slate-800">系统设置</h2>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sub Sidebar Navigation */}
        <div className="w-64 border-r border-slate-200 bg-white flex flex-col p-4 space-y-1 flex-shrink-0 shadow-sm">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-600 font-bold shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3 text-sm">
                <item.icon size={18} className={activeTab === item.id ? 'text-blue-600' : 'text-slate-400'} />
                <span>{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight size={14} />}
            </div>
          ))}
          <div className="h-px bg-slate-100 my-4 mx-2"></div>
          <div className="px-4 py-2">
             <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">系统版本</div>
             <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                v2.4.0-Enterprise
             </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-8 custom-scrollbar bg-slate-50/50">
          <div className="max-w-6xl mx-auto">
             {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
