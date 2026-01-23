
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Plus, ZoomIn, ZoomOut, Grid, Trash2, Edit3, FileText } from '../../../components/common/Icons';

// 脑图节点类型定义
interface MindNode {
  id: string;
  title: string;
  type: 'module' | 'story' | 'case';
  children?: MindNode[];
  isEditing?: boolean;
  isSelected?: boolean;
}

const INITIAL_TREE: MindNode = {
  id: 'root-1',
  title: '支付模块测试集',
  type: 'module',
  children: [
    {
      id: 'story-1',
      title: '扫码支付流程',
      type: 'story',
      children: [
        { id: 'case-1', title: '微信扫码支付成功', type: 'case' },
        { id: 'case-2', title: '支付宝余额不足', type: 'case' },
        { id: 'case-3', title: '二维码过期校验', type: 'case' },
      ]
    },
    {
      id: 'story-2',
      title: '退款逻辑',
      type: 'story',
      children: [
        { id: 'case-4', title: '全额原路退款', type: 'case' },
      ]
    }
  ]
};

export const TestCaseMindmap = ({ 
  onNodeClick 
}: { 
  onNodeClick: (tc: any) => void
}) => {
  const [tree, setTree] = useState<MindNode>(INITIAL_TREE);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 150, y: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // 递归通用辅助函数
  const traverse = (node: MindNode, callback: (n: MindNode, parent: MindNode | null) => boolean, parent: MindNode | null = null): boolean => {
    if (callback(node, parent)) return true;
    if (node.children) {
      for (const child of node.children) {
        if (traverse(child, callback, node)) return true;
      }
    }
    return false;
  };

  // 深拷贝并更新树
  const updateTree = (updater: (newTree: MindNode) => void) => {
    const newTree = JSON.parse(JSON.stringify(tree));
    updater(newTree);
    setTree(newTree);
  };

  // --- 核心业务逻辑 ---

  const handleAddChild = useCallback((parentId: string) => {
    updateTree((newTree) => {
      traverse(newTree, (node) => {
        if (node.id === parentId) {
          const nextType = node.type === 'module' ? 'story' : 'case';
          const newNode: MindNode = {
            id: `node-${Date.now()}`,
            title: '',
            type: nextType,
            isEditing: true,
            children: nextType === 'story' ? [] : undefined
          };
          if (!node.children) node.children = [];
          node.children.push(newNode);
          setSelectedId(newNode.id);
          return true;
        }
        return false;
      });
    });
  }, [tree]);

  const handleAddSibling = useCallback((id: string) => {
    if (id === tree.id) return; // 根节点没有兄弟
    updateTree((newTree) => {
      traverse(newTree, (node, parent) => {
        if (node.id === id && parent) {
          const idx = parent.children!.findIndex(c => c.id === id);
          const newNode: MindNode = {
            id: `node-${Date.now()}`,
            title: '',
            type: node.type,
            isEditing: true,
            children: node.type === 'story' ? [] : undefined
          };
          parent.children!.splice(idx + 1, 0, newNode);
          setSelectedId(newNode.id);
          return true;
        }
        return false;
      });
    });
  }, [tree]);

  const handleDeleteNode = useCallback((id: string) => {
    if (id === tree.id) return; // 不允许删除根节点
    updateTree((newTree) => {
      traverse(newTree, (node, parent) => {
        if (node.id === id && parent) {
          parent.children = parent.children!.filter(c => c.id !== id);
          if (selectedId === id) setSelectedId(parent.id);
          return true;
        }
        return false;
      });
    });
  }, [tree, selectedId]);

  const handleSaveTitle = (id: string, newTitle: string) => {
    updateTree((newTree) => {
      traverse(newTree, (node) => {
        if (node.id === id) {
          node.title = newTitle || (node.type === 'case' ? '新用例' : '新故事');
          node.isEditing = false;
          return true;
        }
        return false;
      });
    });
  };

  const handleToggleEdit = (id: string) => {
    updateTree((newTree) => {
      traverse(newTree, (node) => {
        if (node.id === id) {
          node.isEditing = true;
          return true;
        }
        return false;
      });
    });
  };

  // --- 拖拽与键盘交互 ---

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest('input')) return;
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset(prev => ({ 
      x: prev.x + (e.clientX - lastMousePos.current.x), 
      y: prev.y + (e.clientY - lastMousePos.current.y) 
    }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;
      
      // 如果正在编辑，不触发快捷键
      const isInput = document.activeElement?.tagName === 'INPUT';
      
      if (isInput) {
        if (e.key === 'Enter') (document.activeElement as HTMLInputElement).blur();
        return;
      }

      switch (e.key) {
        case 'Tab':
          e.preventDefault();
          handleAddChild(selectedId);
          break;
        case 'Enter':
          e.preventDefault();
          handleAddSibling(selectedId);
          break;
        case 'Delete':
        case 'Backspace':
          handleDeleteNode(selectedId);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, handleAddChild, handleAddSibling, handleDeleteNode]);

  // --- 渲染组件 ---

  const TreeNode: React.FC<{ node: MindNode, isLast: boolean, depth?: number }> = ({ node, isLast, depth = 0 }) => {
    const isRoot = node.type === 'module';
    const isCase = node.type === 'case';
    const isSelected = selectedId === node.id;

    return (
      <div className="flex items-center relative py-2">
        <div className="flex items-center group relative z-10">
          {/* 左侧连接线 */}
          {!isRoot && (
            <div className="absolute left-[-40px] w-10 h-px bg-slate-200 group-hover:bg-pink-300 transition-colors"></div>
          )}

          <div 
            className={`
              relative flex items-center gap-2 px-4 py-2 transition-all duration-300 rounded-lg
              ${isRoot ? 'bg-pink-600 text-white shadow-lg font-black text-base' : 'bg-white border-2 hover:border-pink-200'}
              ${isSelected ? 'border-pink-500 ring-4 ring-pink-50 shadow-md' : 'border-transparent'}
              ${isCase ? 'cursor-pointer' : 'cursor-default'}
            `}
            onClick={(e) => { 
                e.stopPropagation(); 
                setSelectedId(node.id);
                if (isCase) onNodeClick(node);
            }}
            onDoubleClick={(e) => { e.stopPropagation(); handleToggleEdit(node.id); }}
          >
            {node.isEditing ? (
              <input 
                autoFocus
                defaultValue={node.title}
                className="bg-transparent outline-none text-slate-800 font-bold min-w-[100px] w-auto"
                onBlur={(e) => handleSaveTitle(node.id, e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle(node.id, e.currentTarget.value)}
                placeholder="输入名称..."
              />
            ) : (
              <div className="flex items-center gap-2">
                {isCase && <FileText size={14} className={isSelected ? 'text-pink-600' : 'text-slate-400'} />}
                <span className={`whitespace-nowrap ${isRoot ? '' : 'font-bold text-slate-700'} ${isCase && isSelected ? 'text-pink-600' : ''}`}>
                  {node.title || (isCase ? '新测试用例' : '新故事模块')}
                </span>
              </div>
            )}

            {/* 浮动操作栏 */}
            {!node.isEditing && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white border border-slate-100 rounded-full p-1 shadow-xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
                {!isCase && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleAddChild(node.id); }}
                    className="p-1.5 hover:bg-pink-50 text-slate-400 hover:text-pink-600 rounded-full"
                    title="添加子项 (Tab)"
                  >
                    <Plus size={14} strokeWidth={3} />
                  </button>
                )}
                {!isRoot && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAddSibling(node.id); }}
                      className="p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-full"
                      title="添加同级 (Enter)"
                    >
                      <Plus size={14} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteNode(node.id); }}
                      className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full"
                      title="删除 (Del)"
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                )}
                <button 
                  onClick={(e) => { e.stopPropagation(); handleToggleEdit(node.id); }}
                  className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-700 rounded-full"
                  title="编辑 (DblClick)"
                >
                  <Edit3 size={14} />
                </button>
              </div>
            )}
          </div>

          {/* 右侧连接线 */}
          {node.children && node.children.length > 0 && (
            <div className="w-10 h-px bg-slate-200"></div>
          )}
        </div>

        {/* 渲染子节点 */}
        {node.children && node.children.length > 0 && (
          <div className="flex flex-col relative pl-10 border-l border-slate-100 ml-[-1px]">
            {node.children.map((child, idx) => (
              <TreeNode 
                key={child.id} 
                node={child} 
                isLast={idx === node.children!.length - 1} 
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`flex-1 overflow-hidden bg-slate-50 relative select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onClick={() => setSelectedId(null)}
      style={{ backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}
    >
      {/* 画布主体 */}
      <div 
        className="absolute transition-transform duration-75 ease-out will-change-transform"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`, transformOrigin: '0 0' }}
      >
        <TreeNode node={tree} isLast={true} />
      </div>

      {/* 底部浮动工具栏 */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <div className="bg-white border border-slate-200 p-2 rounded-2xl shadow-2xl flex items-center gap-1">
          <button onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))} className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all"><ZoomIn size={20} /></button>
          <div className="text-[11px] font-black text-slate-500 w-12 text-center tabular-nums">{Math.round(zoom * 100)}%</div>
          <button onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))} className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all"><ZoomOut size={20} /></button>
          <div className="w-px h-6 bg-slate-100 mx-2"></div>
          <button onClick={() => { setZoom(1); setOffset({x:150,y:300}); }} className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all" title="重置视图"><Grid size={20} /></button>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md border border-white/50 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100 pr-6">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div> 选中节点操作
            </div>
            <div className="flex items-center gap-4">
                <Kbd label="Tab" desc="新建子节点" />
                <Kbd label="Enter" desc="新建同级" />
                <Kbd label="Del" desc="删除" />
            </div>
        </div>
      </div>
    </div>
  );
};

const Kbd = ({ label, desc }: { label: string, desc: string }) => (
    <div className="flex items-center gap-2">
        <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-500 shadow-sm">{label}</span>
        <span className="text-[10px] font-bold text-slate-400">{desc}</span>
    </div>
);
