
import React from 'react';
import { Users, Plus, Trash2 } from './Icons';
import { MOCK_USERS } from '../constants';

export const ProjectMembers = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-6 text-lg">项目成员 (5)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {MOCK_USERS.map(user => (
                 <div key={user.id} className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg hover:border-blue-200 hover:shadow-sm transition-all group">
                     <div className={`w-12 h-12 rounded-full ${user.avatarColor} text-white flex items-center justify-center text-lg font-bold`}>
                         {user.name.substring(0, 1)}
                     </div>
                     <div className="flex-1">
                         <div className="font-bold text-slate-800">{user.name}</div>
                         <div className="text-sm text-slate-500">产品经理 / 管理员</div>
                     </div>
                     <button className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Trash2 size={16} />
                     </button>
                 </div>
             ))}
             <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors">
                 <Plus size={20} />
                 <span>邀请成员</span>
             </div>
        </div>
    </div>
);
