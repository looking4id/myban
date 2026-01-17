
import React from 'react';
import { Search, Plus, MoreHorizontal, UserCheck, ShieldAlert, Mail } from '../Icons';
import { MOCK_USERS } from '../../constants';

export const UserManagement = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-800">用户管理</h3>
          <p className="text-sm text-slate-500">管理组织内的所有成员及其访问权限</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium transition-all">
            <Mail size={16} /> 导出名单
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all shadow-sm shadow-blue-200">
            <Plus size={16} /> 邀请新用户
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative">
            <input type="text" placeholder="搜索姓名或邮箱..." className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 w-72 bg-white transition-all shadow-sm" />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            共 {MOCK_USERS.length} 个用户
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <th className="py-4 px-6">用户信息</th>
              <th className="py-4 px-4">系统角色</th>
              <th className="py-4 px-4">所在部门</th>
              <th className="py-4 px-4">状态</th>
              <th className="py-4 px-6 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_USERS.map((user, i) => (
              <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${user.avatarColor} text-white flex items-center justify-center font-bold shadow-sm`}>
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">{user.name}</span>
                      <span className="text-xs text-slate-400">{user.name.toLowerCase()}@gproject.com</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${
                    i === 0 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {i === 0 ? 'Super Admin' : 'Member'}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-slate-600 font-medium">研发中心 / 前端部</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-slate-600">在线</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100 transition-all"><ShieldAlert size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100 transition-all"><MoreHorizontal size={16} /></button>
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
