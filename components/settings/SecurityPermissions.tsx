
import React from 'react';
import { Lock, ShieldAlert, Users, CheckCircle2, ChevronRight, Plus } from '../Icons';

export const SecurityPermissions = () => {
  const roles = [
    { name: '超级管理员', desc: '拥有组织最高权限，可管理所有项目、成员及系统配置。', count: 2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: '项目负责人', desc: '可创建项目，管理所负责项目的所有资源、成员及迭代。', count: 12, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: '标准成员', desc: '可查看及参与项目协作，管理分配给自己的工作项。', count: 45, color: 'text-green-600', bg: 'bg-green-50' },
    { name: '只读成员', desc: '仅拥有查看权限，无法进行编辑、删除等任何修改操作。', count: 5, color: 'text-slate-600', bg: 'bg-slate-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Users size={20} className="text-blue-600" /> 角色管理
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all shadow-sm">
            <Plus size={16} /> 创建自定义角色
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map(role => (
            <div key={role.name} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all group cursor-pointer border-l-4 hover:border-l-blue-600 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full ${role.bg} ${role.color} text-[10px] font-bold uppercase tracking-wider`}>
                  {role.count} 位成员
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-2">{role.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{role.desc}</p>
              <div className="flex gap-2">
                 <button className="text-[11px] font-bold text-blue-600 hover:underline">编辑权限</button>
                 <span className="text-slate-200">|</span>
                 <button className="text-[11px] font-bold text-slate-400 hover:text-slate-600">管理成员</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
          <ShieldAlert size={20} className="text-orange-500" /> 安全策略
        </h3>
        <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-sm">
          <SecurityToggle 
            title="双重身份验证 (MFA)" 
            desc="要求所有用户在登录时必须进行手机短信或动态令牌验证。" 
            enabled={true} 
          />
          <SecurityToggle 
            title="密码复杂度要求" 
            desc="强制要求密码长度不少于 12 位，且包含字母、数字及特殊符号。" 
            enabled={true} 
          />
          <SecurityToggle 
            title="登录 IP 限制" 
            desc="仅允许来自特定 IP 段的用户访问组织资源。" 
            enabled={false} 
          />
          <SecurityToggle 
            title="敏感操作审计" 
            desc="自动记录所有删除项目、修改权限等敏感操作日志。" 
            enabled={true} 
          />
        </div>
      </section>
    </div>
  );
};

const SecurityToggle = ({ title, desc, enabled }: any) => (
  <div className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
    <div className="space-y-1">
      <div className="font-bold text-slate-800 text-sm">{title}</div>
      <div className="text-xs text-slate-500">{desc}</div>
    </div>
    <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-200'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${enabled ? 'left-7 shadow-sm' : 'left-1'}`}></div>
    </div>
  </div>
);
