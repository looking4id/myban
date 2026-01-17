
import React from 'react';

export const OrganizationInfo = () => {
  return (
    <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-100">组织基本信息</h3>
      
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">组织名称</label>
            <input type="text" defaultValue="敏捷研发中心" className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:border-blue-500 outline-none text-sm bg-slate-50 focus:bg-white transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">组织标识符</label>
            <input type="text" defaultValue="AGILE_CENTER" disabled className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm bg-slate-100 text-slate-400 font-mono" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">组织描述</label>
          <textarea className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:border-blue-500 outline-none text-sm bg-slate-50 focus:bg-white transition-all h-24" defaultValue="专注于高效交付与团队协作的研发中心。" />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700">组织Logo</label>
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl font-black shadow-lg">G</div>
             <div className="flex gap-3">
                <button type="button" className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 text-xs font-bold transition-all">更换图标</button>
                <button type="button" className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg text-xs font-bold transition-all">删除</button>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex justify-end gap-3">
          <button type="button" className="px-6 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">重置</button>
          <button type="button" className="px-6 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95">保存更改</button>
        </div>
      </form>
    </div>
  );
};
