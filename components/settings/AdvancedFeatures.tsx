
import React from 'react';
import { Box, Code2, Share2, RefreshCw, Trash2, AlertTriangle, ChevronRight, Lock } from '../Icons';

export const AdvancedFeatures = () => {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Code2 size={20} className="text-purple-600" /> 开发者 API
          </h3>
          <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 text-xs font-bold transition-all shadow-lg">
            生成新 Token
          </button>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 flex items-center justify-between border-b border-slate-100 group hover:bg-slate-50/50 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                  <Lock size={20} />
               </div>
               <div>
                  <div className="font-bold text-slate-800 text-sm">G-Project-API-Key-2025</div>
                  <div className="text-xs text-slate-400 font-mono">sk_live_************************4f21</div>
               </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200"><RefreshCw size={14} /></button>
               <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200"><Trash2 size={14} /></button>
            </div>
          </div>
          <div className="p-4 bg-slate-50/80 flex items-center justify-center">
             <button className="text-xs text-slate-400 hover:text-slate-600 font-bold flex items-center gap-1">
               查看 API 文档 <ChevronRight size={12} />
             </button>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
          <Share2 size={20} className="text-blue-600" /> Webhooks 外部钩子
        </h3>
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center border-dashed">
           <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
              <Share2 size={32} />
           </div>
           <h4 className="font-bold text-slate-800 mb-2">暂无 Webhook</h4>
           <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6 leading-relaxed">
             配置 Webhook 后，每当组织内发生特定事件（如工作项完成、代码合并）时，系统会自动向您的外部服务发送 POST 请求。
           </p>
           <button className="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-xs font-bold transition-all">
             添加第一个 Webhook
           </button>
        </div>
      </section>

      <section className="pt-8 border-t border-slate-200">
        <div className="flex items-center gap-2 mb-6 text-red-600">
          <AlertTriangle size={20} />
          <h3 className="text-lg font-bold">危险区域</h3>
        </div>
        <div className="bg-red-50/50 border border-red-100 rounded-2xl divide-y divide-red-100 overflow-hidden">
          <div className="p-6 flex items-center justify-between">
             <div>
                <div className="font-bold text-red-900 text-sm">归档整个组织</div>
                <div className="text-xs text-red-700/60">归档后所有成员将无法访问，数据将转为只读状态。</div>
             </div>
             <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-white text-xs font-bold transition-all">
               归档组织
             </button>
          </div>
          <div className="p-6 flex items-center justify-between">
             <div>
                <div className="font-bold text-red-900 text-sm">彻底注销组织</div>
                <div className="text-xs text-red-700/60">此操作不可撤销！所有数据（项目、工作项、代码、文档）将被永久删除。</div>
             </div>
             <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs font-bold transition-all shadow-lg shadow-red-100">
               注销并删除
             </button>
          </div>
        </div>
      </section>
    </div>
  );
};
