
import React from 'react';
import { CreditCard, CheckCircle2, TrendingUp, Download, Calendar } from '../Icons';

export const FinanceBilling = () => {
  return (
    <div className="max-w-5xl space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
             <CreditCard size={120} />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                <CheckCircle2 size={14} className="text-green-400" /> 当前订阅计划
              </div>
              <h3 className="text-3xl font-black mb-2">专业版 - 年度订阅</h3>
              <p className="text-slate-400 text-sm">您的计划将于 2026-08-15 自动续期</p>
            </div>
            <div className="mt-12 flex items-end justify-between">
              <div>
                <div className="text-4xl font-black">¥ 9,800 <span className="text-sm font-normal text-slate-400">/ 年</span></div>
                <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">支持 100 位席位，无限项目数量</div>
              </div>
              <button className="px-6 py-2.5 bg-white text-slate-900 rounded-xl hover:bg-slate-100 text-sm font-bold transition-all shadow-lg">
                升级计划
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
           <div>
              <h4 className="font-bold text-slate-800 mb-6">席位使用情况</h4>
              <div className="flex items-baseline gap-2 mb-2">
                 <span className="text-4xl font-black text-blue-600">52</span>
                 <span className="text-slate-400 text-sm">/ 100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                 <div className="bg-blue-600 h-full rounded-full" style={{ width: '52%' }}></div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">您当前已使用 52% 的授权席位，如有需要可随时增加更多配额。</p>
           </div>
           <button className="w-full py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 text-xs font-bold transition-all">
             管理席位
           </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Calendar size={18} className="text-slate-400" /> 历史账单
          </h3>
          <button className="text-xs font-bold text-blue-600 hover:underline">查看全部</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="py-4 px-8">账单日期</th>
              <th className="py-4 px-4">项目</th>
              <th className="py-4 px-4">金额</th>
              <th className="py-4 px-4">状态</th>
              <th className="py-4 px-8 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { date: '2025-08-15', desc: '年度专业版续费', amount: '¥ 9,800.00', status: '已支付' },
              { date: '2024-08-15', desc: '年度专业版续费', amount: '¥ 9,800.00', status: '已支付' },
              { date: '2023-12-01', desc: '额外席位包 (x10)', amount: '¥ 1,200.00', status: '已支付' },
            ].map((bill, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-8 text-sm font-mono text-slate-500">{bill.date}</td>
                <td className="py-4 px-4 text-sm font-bold text-slate-700">{bill.desc}</td>
                <td className="py-4 px-4 text-sm font-black text-slate-800">{bill.amount}</td>
                <td className="py-4 px-4 text-xs">
                  <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-100">
                    {bill.status}
                  </span>
                </td>
                <td className="py-4 px-8 text-right">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100"><Download size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
