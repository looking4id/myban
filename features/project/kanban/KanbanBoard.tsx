
import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { MOCK_COLUMNS, MOCK_USERS, MOCK_PROJECTS } from '../../../utils/constants';
import { KanbanCard } from './KanbanCard';
import { 
  Circle, MoreHorizontal, Plus, XCircle, ChevronDown, 
  Maximize2, Bold, Italic, Underline, Link, Box, ListChecks, History, Share2, 
  Ban, Trash2, Calendar, Target, Code2, List, LayoutList, Image as ImageIcon, 
  Strikethrough, Quote, Minus, Smile, Paperclip, RefreshCw, Star, 
  MessageSquare, User, CheckCircle2, ChevronRight, Edit3, Globe, Copy,
  LayoutGrid, FileText, Bug, Layers, Smartphone, Download, Clock, GitPullRequest, FlaskConical,
  CheckSquare, Search, BookOpen, Send
} from '../../../components/common/Icons';
import { Task, TaskType, Priority, Severity, Column, User as UserType } from '../../../types';
import { StatusBadge, PriorityBadge } from '../../../components/common/ProjectShared';

// ------------------- Mock Data for Associations -------------------
const SYSTEM_TASKS = MOCK_COLUMNS.flatMap(c => c.tasks);
const SYSTEM_DOCS = [
    { id: 'doc-1', title: '《自助开票业务规则 V1.2》', author: '王亮', date: '2025-08-10' },
    { id: 'doc-2', title: '支付网关接口文档', author: 'Dev 1', date: '2025-08-12' },
    { id: 'doc-3', title: '前端架构重构指南', author: 'lo', date: '2025-07-20' }
];
const SYSTEM_TEST_CASES = [
    { id: 'TC-101', title: '微信支付核心链路测试', status: '已评审', priority: 'P0' },
    { id: 'TC-102', title: '支付宝退款逻辑校验', status: '待评审', priority: 'P1' },
    { id: 'TC-103', title: '并发下单库存扣减测试', status: '已评审', priority: 'P0' }
];

// ------------------- Enhanced Sub-components -------------------

const SidePropertyField = ({ label, children }: any) => (
    <div className="flex items-start py-1.5 group">
        <label className="w-28 text-[13px] text-slate-400 font-medium pt-1.5 flex-shrink-0">
            {label}
        </label>
        <div className="flex-1 min-w-0">
            {children}
        </div>
    </div>
);

const AssociationItemRow = ({ icon: Icon, color, id, title, extra, status, onRemove, onClick }: any) => (
    <div 
        onClick={onClick}
        className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all group mb-3 last:mb-0 cursor-pointer"
    >
        <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className={`p-2.5 rounded-lg ${color} text-white shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon size={18} />
            </div>
            <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-300">#{id}</span>
                    <span className="text-sm font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">{title}</span>
                </div>
                {extra && <div className="text-[11px] text-slate-400 mt-0.5 font-medium">{extra}</div>}
            </div>
        </div>
        <div className="flex items-center gap-4">
            {status && <StatusBadge status={status} className="scale-90" />}
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all">
                <button 
                    onClick={(e) => { e.stopPropagation(); onRemove(); }} 
                    className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded"
                    title="解除关联"
                >
                    <Ban size={14} />
                </button>
            </div>
        </div>
    </div>
);

const SelectionPicker = ({ title, items, onSelect, onClose, searchPlaceholder }: any) => {
    const [q, setQ] = useState('');
    const filtered = items.filter((i: any) => i.title.toLowerCase().includes(q.toLowerCase()) || i.id?.toLowerCase().includes(q.toLowerCase()));
    
    return (
        <div className="absolute inset-0 z-50 bg-slate-900/10 backdrop-blur-[2px] flex items-center justify-center p-12">
            <div className="bg-white w-[500px] max-h-[400px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h4 className="font-bold text-slate-800">{title}</h4>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600"><XCircle size={20}/></button>
                </div>
                <div className="p-4 border-b border-slate-50">
                    <div className="relative">
                        <input 
                            autoFocus
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:bg-white focus:border-blue-500 transition-all"
                            placeholder={searchPlaceholder}
                            value={q}
                            onChange={e => setQ(e.target.value)}
                        />
                        <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                    {filtered.map((item: any) => (
                        <div 
                            key={item.id} 
                            onClick={() => onSelect(item)}
                            className="p-3 hover:bg-blue-50 rounded-lg cursor-pointer flex flex-col gap-1 transition-colors group"
                        >
                            <div className="text-sm font-bold text-slate-700 group-hover:text-blue-600">[{item.id}] {item.title}</div>
                            {item.status && <div className="text-[10px] text-slate-400">{item.status} • {item.priority || '普通'}</div>}
                        </div>
                    ))}
                    {filtered.length === 0 && <div className="py-12 text-center text-slate-300 text-sm font-bold uppercase tracking-widest">No Results</div>}
                </div>
            </div>
        </div>
    );
};

// ------------------- Main Modal -------------------

export const TaskDetailsModal: React.FC<{
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}> = ({ task, onClose, onUpdate, onDelete }) => {
  const [localTask, setLocalTask] = useState<Task>({
    ...task,
    startDate: task.startDate || '2025-08-16',
    iteration: task.iteration || 'Sprint2: 自助开票功能开发',
    version: task.version || '1.2 - 【示例数据】自助开票功能'
  });

  // Enriched State
  const [subTasks, setSubTasks] = useState<any[]>([]);
  const [linkedItems, setLinkedItems] = useState<any[]>([]);
  const [testCases, setTestCases] = useState<any[]>([]);
  const [linkedDocs, setLinkedDocs] = useState<any[]>([SYSTEM_DOCS[0]]);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [requirementVersions, setRequirementVersions] = useState<any[]>([
    { id: 'v1.2', version: 'V1.2', desc: '支持移动端扫码支付功能', user: '王亮', date: '2025-08-02', current: true },
    { id: 'v1.1', version: 'V1.1', desc: '更新了发票抬头必填规则', user: '王亮', date: '2025-08-12' },
    { id: 'v1.0', version: 'V1.0', desc: '初始化需求', user: '王亮', date: '2025-08-02' }
  ]);
  const [comments, setComments] = useState<any[]>([]);
  const [commentInput, setCommentInput] = useState('');
  
  const [activeMainTab, setActiveMainTab] = useState('详情');
  const [activeBottomTab, setActiveBottomTab] = useState('评论');
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [pickerType, setPickerType] = useState<'task' | 'test' | 'doc' | null>(null);

  const handleFieldChange = (field: keyof Task, value: any) => {
    const updated = { ...localTask, [field]: value };
    setLocalTask(updated);
    onUpdate(updated);
  };

  const handleAddComment = () => {
      if (!commentInput.trim()) return;
      const newComment = {
          id: Date.now(),
          user: MOCK_USERS[0],
          text: commentInput,
          time: '刚刚'
      };
      setComments([newComment, ...comments]);
      setCommentInput('');
  };

  const handleAttachmentUpload = () => {
      const newFile = {
          id: Date.now(),
          name: '业务规则文档_Final.pdf',
          size: '1.2 MB',
          user: '王亮',
          time: '2025-08-15'
      };
      setAttachments([newFile, ...attachments]);
  };

  const mainTabs = [
    { name: '详情', count: null },
    { name: '子工作项', count: subTasks.length || null },
    { name: '关联工作项', count: linkedItems.length || null },
    { name: '关联测试用例', count: testCases.length || null },
    { name: '关联文档', count: linkedDocs.length || null },
    { name: '附件', count: attachments.length || null },
    { name: '需求版本', count: requirementVersions.length || null },
  ];

  const renderTabContent = () => {
    switch (activeMainTab) {
      case '详情':
        return (
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
              <div className="p-8 pb-32">
                  <div className="grid grid-cols-2 gap-x-12 gap-y-1 mb-10">
                      <SidePropertyField label="负责人 / 协作">
                         <div className="relative group/select">
                             <select value={localTask.assignee?.id} onChange={(e) => {
                                    const user = MOCK_USERS.find(u => u.id === e.target.value);
                                    if (user) handleFieldChange('assignee', user);
                                }} className="absolute inset-0 opacity-0 cursor-pointer z-10">
                                 {MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                             </select>
                             <div className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded transition-all border border-transparent hover:border-slate-200">
                                 <div className={`w-6 h-6 rounded-full ${localTask.assignee?.avatarColor || 'bg-orange-500'} text-white flex items-center justify-center text-[10px] font-bold`}>{localTask.assignee?.name?.substring(0, 2) || 'Lo'}</div>
                                 <span className="text-[13px] font-bold text-slate-700">{localTask.assignee?.name}</span>
                                 <ChevronDown size={12} className="text-slate-300 ml-auto opacity-0 group-hover/select:opacity-100" />
                             </div>
                         </div>
                      </SidePropertyField>
                      <SidePropertyField label="类型"><div className="py-1.5 px-1 text-[13px] font-bold text-slate-700 flex items-center gap-2"><FileText size={14} className="text-blue-500" />{localTask.type}</div></SidePropertyField>
                      <SidePropertyField label="计划时间">
                         <div className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer transition-all border border-transparent hover:border-slate-200 text-[13px] font-bold text-slate-600">
                             <input type="date" value={localTask.startDate} onChange={(e) => handleFieldChange('startDate', e.target.value)} className="bg-transparent outline-none cursor-pointer border-none p-0 w-24 text-[13px] font-bold text-slate-700" />
                             <span className="text-slate-300">→</span>
                             <input type="date" value={localTask.dueDate} onChange={(e) => handleFieldChange('dueDate', e.target.value)} className="bg-transparent outline-none cursor-pointer border-none p-0 w-24 text-[13px] font-bold text-slate-700" />
                             <Calendar size={14} className="text-slate-300 ml-1" />
                         </div>
                      </SidePropertyField>
                      <SidePropertyField label="项目"><div className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer transition-all border border-transparent hover:border-slate-200"><Code2 size={14} className="text-slate-300" /><span className="text-[13px] font-bold text-slate-700 truncate">敏捷研发项目01</span><Copy size={14} className="text-slate-300 ml-auto" /></div></SidePropertyField>
                      <SidePropertyField label="迭代"><div className="relative group/select"><input className="w-full text-[13px] font-bold text-slate-700 bg-transparent border border-transparent hover:border-slate-200 hover:bg-slate-50 p-1.5 rounded outline-none focus:bg-white focus:border-blue-500 transition-all" value={localTask.iteration} onChange={(e) => handleFieldChange('iteration', e.target.value)} /></div></SidePropertyField>
                      <SidePropertyField label="版本"><div className="relative group/select"><input className="w-full text-[13px] font-bold text-slate-700 bg-transparent border border-transparent hover:border-slate-200 hover:bg-slate-50 p-1.5 rounded outline-none focus:bg-white focus:border-blue-500 transition-all" value={localTask.version} onChange={(e) => handleFieldChange('version', e.target.value)} /></div></SidePropertyField>
                  </div>
                  <div className="space-y-4 pt-4">
                     <div className="flex items-center justify-between group/desc"><div className="flex items-center gap-2 text-[13px] font-bold text-slate-400 uppercase tracking-widest"><span>描述</span><Edit3 size={14} className="cursor-pointer hover:text-blue-500 opacity-0 group-hover/desc:opacity-100 transition-opacity" onClick={() => setIsEditingDesc(true)} /></div><div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 cursor-pointer"><Maximize2 size={16} /><span className="text-xs font-bold">全屏</span></div></div>
                     {isEditingDesc ? (
                         <div className="border border-blue-500 rounded-2xl overflow-hidden shadow-lg animate-in fade-in duration-200">
                             <textarea autoFocus className="w-full text-[14px] text-slate-700 leading-relaxed font-medium p-4 min-h-[120px] outline-none bg-white" value={localTask.description} onBlur={() => setIsEditingDesc(false)} onChange={(e) => handleFieldChange('description', e.target.value)} />
                             <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex justify-end gap-2"><button onClick={() => setIsEditingDesc(false)} className="px-3 py-1 text-xs font-bold text-blue-600 hover:bg-blue-100 rounded transition-colors">完成</button></div>
                         </div>
                     ) : (
                         <div className="text-[14px] text-slate-700 leading-relaxed font-medium bg-slate-50/30 p-5 rounded-2xl min-h-[120px] border border-transparent hover:border-slate-100 transition-all cursor-text" onClick={() => setIsEditingDesc(true)}>
                            {localTask.description || '支持在正式开票前更改发票信息，注：一旦进入开具中则不可更改'}
                         </div>
                     )}
                  </div>
              </div>
          </div>
        );
      case '子工作项':
        return (
          <div className="p-8 h-full bg-slate-50/20 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-700">子工作项 ({subTasks.length})</h3>
                <button onClick={() => setSubTasks([{id: 'TS-'+Math.floor(Math.random()*1000), title: '新子任务', handler: '王亮', status: '未开始', priority: '中', type: 'task'}, ...subTasks])} className="flex items-center gap-2 text-blue-600 text-[11px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all active:scale-95"><Plus size={14} strokeWidth={3}/> 创建子工作项</button>
            </div>
            {subTasks.length > 0 ? (
                <div className="space-y-1">
                    {subTasks.map(item => (
                        <AssociationItemRow key={item.id} icon={CheckSquare} color="bg-green-500" id={item.id} title={item.title} extra={`${item.handler} • ${item.priority}`} status={item.status} onRemove={() => setSubTasks(subTasks.filter(i => i.id !== item.id))} />
                    ))}
                </div>
            ) : <div className="py-20 flex flex-col items-center justify-center text-slate-300 gap-4"><div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center opacity-40"><List size={32} /></div><p className="text-sm font-bold">暂无子任务，分解需求以更好跟踪进度</p></div>}
          </div>
        );
      case '关联工作项':
        return (
          <div className="p-8 h-full bg-slate-50/20 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-700">关联工作项 ({linkedItems.length})</h3>
                <button onClick={() => setPickerType('task')} className="flex items-center gap-2 text-blue-600 text-[11px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all active:scale-95"><Plus size={14} strokeWidth={3}/> 关联已有工作项</button>
            </div>
            {linkedItems.length > 0 ? (
                <div className="space-y-1">
                    {linkedItems.map(item => (
                        <AssociationItemRow key={item.id} icon={item.type === TaskType.Requirement ? FileText : Bug} color={item.type === TaskType.Requirement ? "bg-blue-500" : "bg-red-500"} id={item.displayId} title={item.title} extra={`${item.assignee?.name} • 关联至本项目`} status="开启" onRemove={() => setLinkedItems(linkedItems.filter(i => i.id !== item.id))} />
                    ))}
                </div>
            ) : <div className="py-20 flex flex-col items-center justify-center text-slate-300 gap-4"><div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center opacity-40"><Link size={32} /></div><p className="text-sm font-bold">暂无关联，添加关联项以建立业务联系</p></div>}
          </div>
        );
      case '关联测试用例':
        return (
          <div className="p-8 h-full bg-slate-50/20 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-700">测试用例 ({testCases.length})</h3>
                <button onClick={() => setPickerType('test')} className="flex items-center gap-2 text-pink-600 text-[11px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all active:scale-95"><Plus size={14} strokeWidth={3}/> 关联已有用例</button>
            </div>
            {testCases.length > 0 ? (
                <div className="space-y-1">
                    {testCases.map(item => (
                        <AssociationItemRow key={item.id} icon={FlaskConical} color="bg-pink-500" id={item.id} title={item.title} extra={`${item.priority} • 功能测试`} status={item.status} onRemove={() => setTestCases(testCases.filter(i => i.id !== item.id))} />
                    ))}
                </div>
            ) : <div className="py-20 flex flex-col items-center justify-center text-slate-300 gap-4"><div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center opacity-40"><FlaskConical size={32} /></div><p className="text-sm font-bold">暂无关联用例，确保需求可被验证</p></div>}
          </div>
        );
      case '关联文档':
        return (
          <div className="p-8 h-full bg-slate-50/20 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-700">关联文档 ({linkedDocs.length})</h3>
                <button onClick={() => setPickerType('doc')} className="flex items-center gap-2 text-emerald-600 text-[11px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all active:scale-95"><Plus size={14} strokeWidth={3}/> 关联已有文档</button>
            </div>
            {linkedDocs.length > 0 ? (
                <div className="space-y-1">
                    {linkedDocs.map(item => (
                        <AssociationItemRow key={item.id} icon={BookOpen} color="bg-emerald-500" id="DOC" title={item.title} extra={`${item.author} • ${item.date}`} onRemove={() => setLinkedDocs(linkedDocs.filter(i => i.id !== item.id))} />
                    ))}
                </div>
            ) : <div className="py-20 flex flex-col items-center justify-center text-slate-300 gap-4"><div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center opacity-40"><FileText size={32} /></div><p className="text-sm font-bold">暂无关联文档，沉淀业务知识</p></div>}
          </div>
        );
      case '附件':
        return (
          <div className="p-8 h-full bg-slate-50/20 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-700">附件资源 ({attachments.length})</h3>
                <button onClick={handleAttachmentUpload} className="flex items-center gap-2 text-blue-600 text-[11px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all active:scale-95"><Plus size={14} strokeWidth={3}/> 上传附件</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {attachments.map(file => (
                    <div key={file.id} className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                <FileText size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-700">{file.name}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{file.size} • {file.user}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-slate-400 hover:text-blue-600"><Download size={16}/></button>
                            <button onClick={() => setAttachments(attachments.filter(a => a.id !== file.id))} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                        </div>
                    </div>
                ))}
                <div 
                    onClick={handleAttachmentUpload}
                    className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-2 text-slate-300 hover:border-blue-300 hover:bg-white hover:text-blue-500 cursor-pointer transition-all"
                >
                    <Paperclip size={24} />
                    <span className="text-xs font-bold">点击或拖拽上传</span>
                </div>
            </div>
          </div>
        );
      case '需求版本':
        return (
          <div className="p-8 bg-slate-50/20 h-full overflow-y-auto custom-scrollbar no-scrollbar">
             <div className="space-y-6">
                {requirementVersions.map((v, i) => (
                  <div key={v.id} className="flex gap-4 border-l-2 border-slate-100 pl-8 pb-8 relative last:pb-0 group">
                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-125 ${v.current ? 'bg-blue-500 scale-125' : 'bg-slate-300'}`}></div>
                    <div className="bg-white border border-slate-100 p-5 rounded-xl shadow-sm hover:border-blue-200 hover:shadow-md transition-all flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-base font-black text-slate-800">{v.version}</span>
                            {v.current && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">当前版本</span>}
                        </div>
                        <span className="text-xs font-medium text-slate-400 font-mono">{v.date}</span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium">{v.desc}</p>
                      <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                          <div className="flex items-center gap-2">
                             <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-400">{v.user.charAt(0)}</div>
                             <span>修改人: {v.user}</span>
                          </div>
                          <button className="text-blue-600 hover:underline">查看变更差异</button>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );
      default:
        return <div className="p-8 h-full bg-slate-50/20 flex flex-col items-center justify-center gap-4 text-slate-300 font-bold uppercase tracking-widest text-sm"><Layers size={48} className="opacity-10" /> 模块维护中...</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 font-sans overflow-hidden">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white w-[1100px] h-[90vh] rounded-xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 relative z-10 border border-slate-200 overflow-hidden">
        
        {/* 1. 操作栏 */}
        <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6 bg-white flex-shrink-0">
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-100 rounded text-xs font-bold text-slate-500 cursor-pointer hover:bg-slate-100 transition-colors">
                  <Box size={14} className="text-purple-500" />
                  <span>#{localTask.displayId.replace('#', '') || 'RQ-101'}</span>
              </div>
              <div className="w-px h-4 bg-slate-200"></div>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 rounded-full px-3 py-1 cursor-pointer hover:bg-slate-100">
                  <div className={`w-2.5 h-2.5 rounded-full border-2 ${localTask.statusColor.replace('bg-', 'border-')}`}></div>
                  <span>意向</span>
                  <ChevronDown size={14} className="text-slate-400" />
              </div>
           </div>
           <div className="flex items-center gap-1">
              <div className="flex items-center gap-3 mr-4 text-slate-400">
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-1"><Smartphone size={14} className="text-emerald-500" /><span>听说工作项是个机器人！</span></div>
                  <div className="p-2 hover:bg-slate-100 rounded cursor-pointer transition-colors"><RefreshCw size={18} /></div>
                  <Star size={18} className="cursor-pointer hover:text-amber-400 transition-colors" />
                  <History size={18} className="cursor-pointer hover:text-blue-500 transition-colors" />
                  <LayoutList size={18} className="cursor-pointer hover:text-blue-500 transition-colors" />
                  <Copy size={18} className="cursor-pointer hover:text-blue-500 transition-colors" />
                  <Paperclip size={18} className="cursor-pointer hover:text-blue-500 transition-colors" />
              </div>
              <div className="w-px h-4 bg-slate-200 mx-2"></div>
              <button className="p-2 text-slate-400 hover:text-slate-600" onClick={() => onDelete(localTask.id)}><Trash2 size={20}/></button>
              <button onClick={onClose} className="p-2 text-slate-300 hover:text-slate-600 transition-colors ml-1"><XCircle size={24} /></button>
           </div>
        </div>

        {/* 2. 标题区 */}
        <div className="px-8 pt-6 pb-2 bg-white flex-shrink-0">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[13px] text-slate-400 font-medium"><LayoutGrid size={14} /><span>【示例需求】支持用户在小程序自助开票</span></div>
                <div className="flex items-center gap-3"><div className="flex-1 flex items-center gap-3 group"><input className="text-2xl font-bold text-slate-800 tracking-tight leading-snug w-full outline-none bg-transparent border-b border-transparent focus:border-blue-200 transition-all" value={localTask.title} onChange={(e) => handleFieldChange('title', e.target.value)} /><Edit3 size={18} className="text-slate-300 opacity-0 group-hover:opacity-100 cursor-pointer transition-all hover:text-blue-500" /></div></div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1"><span className="font-bold text-slate-500">looking4id</span><span>创建于 2025年08月02日，最近更新于 2025年08月02日</span></div>
            </div>
        </div>

        {/* 3. 导航页签 */}
        <div className="px-8 mt-4 border-b border-slate-100 flex items-center gap-8 bg-white flex-shrink-0 overflow-x-auto no-scrollbar">
            {mainTabs.map(tab => (
                <button key={tab.name} onClick={() => setActiveMainTab(tab.name)} className={`pb-3 text-[13px] font-medium transition-all relative flex-shrink-0 flex items-center gap-1.5 ${activeMainTab === tab.name ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'}`}>
                    {tab.name}{tab.count && <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full text-[9px] font-black">{tab.count}</span>}
                    {activeMainTab === tab.name && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-in slide-in-from-left duration-300"></div>}
                </button>
            ))}
        </div>

        {/* 4. 内容主体 */}
        <div className="flex-1 overflow-hidden flex relative">
           <div className="flex-1 overflow-hidden flex flex-col bg-white">{renderTabContent()}</div>
           
           {/* Picker Popups */}
           {pickerType === 'task' && <SelectionPicker title="关联已有工作项" items={SYSTEM_TASKS} onSelect={(t: any) => { setLinkedItems([t, ...linkedItems]); setPickerType(null); }} onClose={() => setPickerType(null)} searchPlaceholder="输入 ID 或标题搜索..." />}
           {pickerType === 'test' && <SelectionPicker title="关联测试用例" items={SYSTEM_TEST_CASES} onSelect={(t: any) => { setTestCases([t, ...testCases]); setPickerType(null); }} onClose={() => setPickerType(null)} searchPlaceholder="搜索用例名称..." />}
           {pickerType === 'doc' && <SelectionPicker title="关联知识库文档" items={SYSTEM_DOCS} onSelect={(t: any) => { setLinkedDocs([t, ...linkedDocs]); setPickerType(null); }} onClose={() => setPickerType(null)} searchPlaceholder="搜索文档标题..." />}

           <div className="absolute right-0 top-0 bottom-0 w-8 border-l border-slate-200 bg-white flex flex-col items-center py-6 flex-shrink-0 z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">
               <div className="[writing-mode:vertical-lr] flex items-center gap-1.5 text-[11px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-blue-600 transition-colors">工作项字段</div>
           </div>
        </div>

        {/* 5. 底部动态区 */}
        <div className="bg-white border-t border-slate-100 flex flex-col flex-shrink-0">
           {/* 活动记录概览 */}
           {comments.length > 0 && (
               <div className="px-8 py-3 bg-slate-50/50 flex items-center gap-4 text-[10px] font-bold text-slate-400 overflow-x-auto no-scrollbar">
                   {comments.slice(0, 3).map(c => (
                       <div key={c.id} className="flex items-center gap-2 whitespace-nowrap bg-white px-2 py-1 rounded border border-slate-100 shadow-sm">
                           <div className={`w-4 h-4 rounded-full ${c.user.avatarColor} text-white flex items-center justify-center text-[8px]`}>{c.user.name.charAt(0)}</div>
                           <span className="text-slate-600">{c.text}</span>
                       </div>
                   ))}
                   {comments.length > 3 && <span>+ {comments.length - 3} 更多评论</span>}
               </div>
           )}

           {/* 评论输入 */}
           <div className="px-8 py-4 bg-white flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full ${localTask.assignee?.avatarColor || 'bg-orange-500'} text-white flex items-center justify-center text-[10px] font-bold shadow-sm`}>{localTask.assignee?.name?.substring(0, 2) || 'Lo'}</div>
              <div className="flex-1 relative flex items-center gap-2">
                 <input 
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium" 
                    placeholder="发表您的看法 (Ctrl/Command+Enter发送)" 
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.ctrlKey || e.metaKey) && handleAddComment()}
                 />
                 <button 
                    onClick={handleAddComment}
                    className={`p-2 rounded-xl transition-all ${commentInput.trim() ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300'}`}
                 >
                    <Send size={18} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export const CreateTaskModal: React.FC<{
    onClose: () => void;
    onSubmit: (task: Task) => void;
    defaultType: TaskType | null;
    defaultProjectId?: string;
}> = ({ onClose, onSubmit, defaultType, defaultProjectId }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<TaskType>(defaultType || TaskType.Requirement);
    const [priority, setPriority] = useState<Priority>(Priority.Normal);
    useEffect(() => { if (defaultType) setType(defaultType); }, [defaultType]);
    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6 font-sans">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/20 w-[1100px] h-[85vh]">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white flex-shrink-0"><h3 className="text-xl font-black text-slate-800 tracking-tight">新建{type}</h3><button onClick={onClose} className="p-1 text-slate-300 hover:text-slate-600 transition-colors"><XCircle size={24} /></button></div>
                <div className="flex-1 overflow-hidden flex"><div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6"><div className="space-y-2"><label className="text-sm font-bold text-slate-700">标题 <span className="text-red-500">*</span></label><input className="w-full border border-slate-200 rounded px-4 py-2.5 text-sm focus:border-blue-500 outline-none placeholder:text-slate-300 transition-all bg-white font-medium" placeholder="请填写" value={title} onChange={e => setTitle(e.target.value)} /></div><div className="grid grid-cols-2 gap-8"><div className="space-y-2"><label className="text-sm font-bold text-slate-700">负责人/协作者</label><div className="relative"><select className="w-full border border-slate-200 rounded px-4 py-2.5 text-sm appearance-none outline-none focus:border-blue-500 text-slate-400 bg-white font-medium"><option>指派负责人/协作者</option>{MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}</select><ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" /></div></div><div className="space-y-2"><label className="text-sm font-bold text-slate-700">类型 <span className="text-red-500">*</span></label><div className="relative"><select disabled className="w-full border border-slate-200 rounded px-4 py-2.5 text-sm appearance-none outline-none bg-slate-50 text-slate-700 font-bold cursor-not-allowed"><option>{type}</option></select><ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" /></div></div></div><div className="grid grid-cols-2 gap-8"><div className="space-y-2"><label className="text-sm font-bold text-slate-700">计划时间</label><div className="flex items-center border border-slate-200 rounded px-4 py-2.5 text-sm text-slate-400 bg-white hover:border-blue-400 transition-colors cursor-pointer group"><span className="flex-1 group-hover:text-slate-600">未设置</span><span className="px-4 text-slate-300">→</span><span className="flex-1 group-hover:text-slate-600">未设置</span><Calendar size={14} className="text-slate-400 group-hover:text-blue-500" /></div></div><div className="space-y-2"><label className="text-sm font-bold text-slate-700">关联项目</label><div className="relative"><select className="w-full border border-slate-200 rounded px-4 py-2.5 text-sm appearance-none outline-none focus:border-blue-500 text-slate-700 bg-white font-bold"><option>敏捷研发项目01</option>{MOCK_PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select><ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" /></div></div></div><div className="space-y-2"><label className="text-sm font-bold text-slate-700">描述</label><div className="border border-slate-200 rounded overflow-hidden flex flex-col min-h-[300px] shadow-sm"><div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-white flex-wrap"><button type="button" className="px-2 py-1 hover:bg-slate-100 rounded text-slate-700 text-xs font-bold flex items-center gap-1">正文 <ChevronDown size={10}/></button><div className="w-px h-4 bg-slate-200 mx-1"></div><button type="button" className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Bold size={14}/></button><button type="button" className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Italic size={14}/></button><button type="button" className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Code2 size={14}/></button><div className="w-px h-4 bg-slate-200 mx-1"></div><button type="button" className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><LayoutList size={14}/></button><div className="w-px h-4 bg-slate-200 mx-1"></div><button type="button" className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Link size={14}/></button><button type="button" className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><ImageIcon size={14}/></button></div><textarea className="flex-1 p-6 outline-none resize-none text-sm text-slate-600 leading-relaxed bg-white" placeholder="" /></div></div></div><div className="w-80 border-l border-slate-100 bg-slate-50/20 p-8 space-y-6 flex-shrink-0"><div className="space-y-2"><label className="text-xs font-bold text-slate-700">优先级</label><div className="relative"><select className="w-full border border-slate-200 rounded px-3 py-2 text-sm appearance-none outline-none focus:border-blue-500 text-slate-400 bg-white font-medium" value={priority} onChange={e => setPriority(e.target.value as Priority)}><option>请选择</option>{Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}</select><ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" /></div></div><div className="space-y-2"><label className="text-xs font-bold text-slate-700">实际开始时间</label><div className="relative"><input type="text" placeholder="选择日期时间" className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white placeholder:text-slate-300 font-medium" /><Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" /></div></div></div></div><div className="px-8 py-5 border-t border-slate-100 bg-white flex items-center justify-start gap-3 flex-shrink-0 z-30"><button type="submit" onClick={() => onSubmit({ title, type, priority } as any)} className="px-6 py-2 bg-blue-500 text-white rounded text-sm font-bold hover:bg-blue-600 shadow-lg shadow-blue-100 transition-all active:scale-95">新建</button><button onClick={onClose} className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded text-sm font-bold hover:bg-slate-50 transition-all">取消</button></div></div></div>
    );
};

interface KanbanBoardProps {
    columns: Column[];
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
    onTaskClick: (task: Task) => void;
    onAddClick: (type: TaskType) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  columns, setColumns, onTaskClick, onAddClick
}) => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
        const columnIndex = columns.findIndex(c => c.id === source.droppableId);
        const column = columns[columnIndex];
        const newTasks = Array.from(column.tasks);
        const [movedTask] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, movedTask);
        const newColumns = [...columns];
        newColumns[columnIndex] = { ...column, tasks: newTasks };
        setColumns(newColumns);
    } else {
        const sourceColIndex = columns.findIndex(c => c.id === source.droppableId);
        const destColIndex = columns.findIndex(c => c.id === destination.droppableId);
        const sourceCol = columns[sourceColIndex];
        const destCol = columns[destColIndex];
        if (!sourceCol || !destCol) return;
        const sourceTasks = Array.from(sourceCol.tasks);
        const destTasks = Array.from(destCol.tasks);
        const movedTask = sourceTasks.splice(source.index, 1)[0] as Task | undefined;
        if (!movedTask) return;
        let newStatusColor = movedTask.statusColor;
        if (destCol.id === 'done') newStatusColor = 'bg-green-500';
        else if (destCol.id === 'inprogress') newStatusColor = 'bg-blue-600';
        else if (destCol.id === 'todo') newStatusColor = 'bg-gray-400';
        destTasks.splice(destination.index, 0, { ...movedTask, statusColor: newStatusColor });
        const newColumns = [...columns];
        newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks, count: sourceTasks.length };
        newColumns[destColIndex] = { ...destCol, tasks: destTasks, count: destTasks.length };
        setColumns(newColumns);
    }
  };
  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden bg-slate-50/50">
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-full p-6 gap-6 min-w-max">
                {columns.map(col => (
                    <div key={col.id} className="w-80 flex flex-col h-full bg-slate-100/50 rounded-xl border border-slate-200/60 backdrop-blur-sm">
                        <div className="p-4 flex items-center justify-between flex-shrink-0"><div className="flex items-center gap-2"><Circle size={10} className={col.iconColor} fill="currentColor" /><span className="font-bold text-slate-700 text-sm">{col.title}</span><span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{col.tasks.length}</span></div><div className="flex gap-1"><button onClick={() => onAddClick(TaskType.Task)} className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors"><Plus size={14}/></button><button className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors"><MoreHorizontal size={14}/></button></div></div>
                        <Droppable droppableId={col.id}>{(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className={`flex-1 overflow-y-auto px-3 pb-3 custom-scrollbar transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50/30' : ''}`}>
                                    {col.tasks.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>{(provided, snapshot) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ ...provided.draggableProps.style }} className={`${snapshot.isDragging ? 'rotate-2 scale-105 z-50' : ''}`}><KanbanCard task={task} onClick={(t) => onTaskClick(t)} onUpdate={() => {}} /></div>
                                            )}</Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <button onClick={() => onAddClick(TaskType.Task)} className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-blue-500 hover:border-blue-200 hover:bg-white transition-all flex items-center justify-center gap-1.5 text-xs font-bold mt-2"><Plus size={14} /> 添加工作项</button>
                                </div>
                            )}</Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    </div>
  );
};
