
import React, { useState, useRef, useMemo } from 'react';
import { 
  Search, Filter, Plus, ChevronDown, ListFilter, 
  MoreHorizontal, Maximize2, ChevronRight, AlertTriangle,
  FolderTree, LayoutGrid
} from '../Icons';
import { Task, TaskType, Priority } from '../../types';

interface Requirement {
  id: string;
  title: string;
  type: 'EPIC' | 'STORY';
  priority: Priority;
  iteration: string;
  status: string;
  hasWarning?: boolean;
  children?: Requirement[];
  level: number;
  isExpanded?: boolean;
}

interface RequirementListProps {
  onRequirementClick?: (task: Partial<Task>) => void;
  onCreate?: () => void;
  requirements?: Task[]; // 新增：外部传入的需求数据
}

const INITIAL_MOCK_REQUIREMENTS: Requirement[] = [
  { id: '1000039', title: '核心业务中台构建', type: 'EPIC', priority: Priority.High, iteration: '-', status: '规划中', level: 0, isExpanded: true, children: [
    { id: '1000040', title: '用户中心模块开发', type: 'STORY', priority: Priority.Normal, iteration: 'Sprint 1', status: '开发中', level: 1 },
    { id: '1000041', title: '权限校验子系统', type: 'STORY', priority: Priority.High, iteration: 'Sprint 1', status: '开发中', level: 1 },
  ]},
  { id: '1000002', title: '数据统计分析系统', type: 'EPIC', priority: Priority.High, iteration: '【存款产品】...', status: '规划中', level: 0 },
  { id: '1000001', title: '移动端体验优化', type: 'EPIC', priority: Priority.High, iteration: '-', status: '规划中', hasWarning: true, level: 0 },
  { 
    id: '1000004', 
    title: '金融应用（社交、保险、分期）', 
    type: 'EPIC', 
    priority: Priority.High, 
    iteration: '-', 
    status: '规划中', 
    hasWarning: true, 
    level: 0,
    isExpanded: true,
    children: [
      { id: '1000010', title: '保险业务在线投保流程', type: 'STORY', priority: Priority.High, iteration: '【金融与应用...', status: '规划中', hasWarning: true, level: 1 },
    ]
  },
  { 
    id: '1000003', 
    title: '支付安全升级', 
    type: 'EPIC', 
    priority: Priority.High, 
    iteration: '-', 
    status: '规划中', 
    hasWarning: true, 
    level: 0,
    isExpanded: true,
    children: [
      { id: '1000009', title: '系统底层安全加固', type: 'STORY', priority: Priority.Normal, iteration: '【支付安全】...', status: '规划中', hasWarning: true, level: 1 },
      { id: '1000008', title: '实时反欺诈风控模型', type: 'STORY', priority: Priority.High, iteration: '【支付安全】...', status: '规划中', level: 1 },
      { id: '1000018', title: '全链路安全合规自查', type: 'STORY', priority: Priority.Normal, iteration: '【支付安全】...', status: '规划中', level: 1 },
    ]
  },
];

export const RequirementList: React.FC<RequirementListProps> = ({ onRequirementClick, onCreate, requirements = [] }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('所有的');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [colWidths, setColWidths] = useState([48, 120, 500, 100, 150, 100]);
  const resizingRef = useRef<{ index: number; startX: number; startWidth: number } | null>(null);

  // 将外部 Task 转换为内部 Requirement 结构并合并
  const allRequirements = useMemo(() => {
    // 过滤出外部传入的需求，且不在初始 mock 数据中的（简单通过 ID 判断）
    const externalReqs: Requirement[] = requirements
      .filter(t => t.type === TaskType.Requirement && !INITIAL_MOCK_REQUIREMENTS.some(m => m.id === t.displayId))
      .map(t => ({
        id: t.displayId.replace('#', ''),
        title: t.title,
        type: 'STORY', // 新创建的默认为 STORY
        priority: t.priority || Priority.Normal,
        iteration: '未规划',
        status: '新需求',
        level: 0
      }));

    const baseList = [...externalReqs, ...INITIAL_MOCK_REQUIREMENTS];
    
    if (!searchQuery) return baseList;

    const filterNested = (list: Requirement[]): Requirement[] => {
      return list.reduce((acc: Requirement[], item) => {
        const matches = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.id.toLowerCase().includes(searchQuery.toLowerCase());
        
        let filteredChildren: Requirement[] | undefined;
        if (item.children) {
          filteredChildren = filterNested(item.children);
        }

        if (matches || (filteredChildren && filteredChildren.length > 0)) {
          acc.push({ ...item, children: filteredChildren });
        }
        return acc;
      }, []);
    };

    return filterNested(baseList);
  }, [requirements, searchQuery]);

  const onMouseDown = (index: number, e: React.MouseEvent) => {
    resizingRef.current = { index, startX: e.pageX, startWidth: colWidths[index] };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'col-resize';
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!resizingRef.current) return;
    const { index, startX, startWidth } = resizingRef.current;
    const deltaX = e.pageX - startX;
    const newWidths = [...colWidths];
    newWidths[index] = Math.max(40, startWidth + deltaX);
    setColWidths(newWidths);
  };

  const onMouseUp = () => {
    resizingRef.current = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'default';
  };

  const renderRequirementRows = (reqs: Requirement[]): React.ReactNode => {
    return reqs.map(req => (
      <React.Fragment key={req.id}>
        <tr 
          className={`hover:bg-slate-50/80 transition-colors group cursor-pointer border-b border-slate-50 ${req.level > 0 ? 'bg-slate-50/20' : ''}`} 
          onClick={() => onRequirementClick?.({ title: req.title, displayId: `#${req.id}` })}
        >
          <td className="py-3 px-4 text-center"><input type="checkbox" className="rounded border-slate-300" onClick={(e) => e.stopPropagation()} /></td>
          <td className="py-3 px-4 font-mono text-slate-400 font-bold truncate text-xs">{req.id}</td>
          <td className="py-3 px-4 truncate relative">
            <div className="flex items-center gap-1.5" style={{ paddingLeft: `${req.level * 28}px` }}>
              {req.children && req.children.length > 0 && (
                <div className="p-0.5 rounded hover:bg-slate-100 transition-colors">
                  <ChevronRight size={14} className={`text-slate-500 transition-transform ${req.isExpanded ? 'rotate-90' : ''}`} />
                </div>
              )}
              {!req.children && req.level > 0 && <div className="w-5" />}
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-black text-white leading-none ${req.type === 'EPIC' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                {req.type}
              </span>
              <span className={`text-slate-700 font-bold truncate group-hover:text-blue-600 transition-colors text-sm`}>
                {req.title}
              </span>
            </div>
          </td>
          <td className="py-3 px-4">
            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${req.priority === Priority.High ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>{req.priority}</span>
          </td>
          <td className="py-3 px-4 text-slate-400 truncate text-xs font-bold uppercase">{req.iteration}</td>
          <td className="py-3 px-4">
            <span className="px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold">{req.status}</span>
          </td>
        </tr>
        {req.children && req.isExpanded && renderRequirementRows(req.children)}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex h-full bg-white -m-6 overflow-hidden">
      <div className={`transition-all duration-300 border-r border-slate-200 bg-white flex flex-col flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
        <div className="p-4 flex items-center justify-between border-b border-slate-100 flex-shrink-0 h-12">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <LayoutGrid size={14} className="text-slate-400" />
            <span className="tracking-tight uppercase">Categories</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-2 px-1">
          {['所有的', '产品需求', '技术需求'].map((name, idx) => (
            <div key={idx} onClick={() => setActiveCategory(name)} className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-sm mb-0.5 transition-all group ${activeCategory === name ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}>
              <span className="truncate">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/10">
        <div className="px-4 py-3 bg-white flex items-center justify-between border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={onCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"><Plus size={16} strokeWidth={2.5} /> 创建需求</button>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索标题或ID..." 
                className="pl-8 pr-4 py-1.5 text-xs border border-slate-200 rounded-lg focus:border-blue-500 outline-none w-48 bg-slate-50 focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <div className="flex items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800"><Filter size={14} /> <span>过滤</span></div>
              <div>Total: {allRequirements.length}</div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-white custom-scrollbar">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="bg-white border-b border-slate-200 sticky top-0 z-10 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <tr>
                <th className="py-3 px-4 w-12"></th>
                <th className="py-3 px-4 w-32">ID</th>
                <th className="py-3 px-4 flex-1">需求标题</th>
                <th className="py-3 px-4 w-24">优先级</th>
                <th className="py-3 px-4 w-40">迭代</th>
                <th className="py-3 px-4 w-28">状态</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {renderRequirementRows(allRequirements)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
