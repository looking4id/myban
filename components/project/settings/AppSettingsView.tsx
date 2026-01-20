
import React, { useState } from 'react';
import { 
  Plus, LayoutGrid, FileText, Bug, Repeat, Settings, Box, 
  LayoutList, Target, Code2, Map, Users, MoreHorizontal, 
  Calendar, CheckSquare, Flag, BarChart2, BookOpen, 
  GitBranch, PlayCircle, Activity, Globe, ToggleLeft, ToggleRight
} from '../../Icons';
import { RequirementDetailSettings } from './requirement/RequirementDetailSettings';
import { DefectDetailSettings } from './defect/DefectDetailSettings';

export const AppSettingsView: React.FC = () => {
  const [drillDownApp, setDrillDownApp] = useState<string | null>(null);

  if (drillDownApp === '需求') {
    return <RequirementDetailSettings onBack={() => setDrillDownApp(null)} />;
  }

  if (drillDownApp === '缺陷') {
    return <DefectDetailSettings onBack={() => setDrillDownApp(null)} />;
  }

  const sections = [
    {
      title: '计划与跟踪',
      apps: [
        { 
          id: 'req', 
          name: '需求', 
          icon: Target, 
          color: 'bg-blue-500', 
          links: ['字段设置', '公共模板库', '状态设置', '公共工作流', '启用设置'],
          isMain: true 
        },
        { 
          id: 'defect', 
          name: '缺陷', 
          icon: Bug, 
          color: 'bg-red-500', 
          links: ['字段设置', '模板&布局', '工作流', '启用设置'] 
        },
        { 
          id: 'iteration', 
          name: '迭代', 
          icon: Repeat, 
          color: 'bg-cyan-500', 
          links: ['字段', '模板&布局', '启用设置'] 
        },
        { 
          id: 'storywall', 
          name: '故事墙', 
          icon: LayoutList, 
          color: 'bg-blue-500' 
        },
        { 
          id: 'gantt', 
          name: '甘特图', 
          icon: Box, 
          color: 'bg-purple-500', 
          links: ['配色规则', '日期显示设置'] 
        },
        { 
          id: 'review', 
          name: '发布评审', 
          icon: Users, 
          color: 'bg-slate-400', 
          links: ['字段设置', '要素设置', '活动设置', '流程设置'], 
          isToggle: true 
        },
        { 
          id: 'roadmap', 
          name: '路线图', 
          icon: FileText, 
          color: 'bg-slate-400', 
          isToggle: true 
        },
        { 
          id: 'calendar', 
          name: '团队日历', 
          icon: Calendar, 
          color: 'bg-slate-400', 
          isToggle: true 
        },
        { 
          id: 'milestone', 
          name: '里程碑', 
          icon: Flag, 
          color: 'bg-slate-400', 
          isToggle: true 
        },
        { 
          id: 'checklist', 
          name: '检查清单', 
          icon: CheckSquare, 
          color: 'bg-slate-400', 
          isToggle: true,
          extraLink: '查看介绍'
        },
        {
          id: 'task',
          name: '任务',
          icon: CheckSquare,
          color: 'bg-slate-500', // Disabled look in screenshot
          links: ['字段设置', '模板&布局', '工作流', '上下级设置'],
          isToggle: true,
          enabled: false
        },
        {
          id: 'release_plan',
          name: '发布计划',
          icon: Calendar,
          color: 'bg-slate-500',
          isToggle: true,
          enabled: false
        }
      ]
    },
    {
        title: '度量与报告',
        apps: [
            { id: 'report', name: '报表', icon: BarChart2, color: 'bg-emerald-500' },
            { id: 'stats', name: '统计', icon: Activity, color: 'bg-slate-400', isToggle: true, enabled: false },
        ]
    },
    {
        title: '测试与质量',
        apps: [
            { id: 'testcase', name: '测试用例', icon: FileText, color: 'bg-emerald-500', links: ['字段设置', '模板'] },
            { id: 'testplan', name: '测试计划', icon: FileText, color: 'bg-emerald-500', links: ['字段设置', '模板'] },
        ]
    },
    {
        title: '协作与文档',
        apps: [
            { id: 'wiki', name: 'Wiki', icon: BookOpen, color: 'bg-blue-500' },
            { id: 'doc', name: '文档', icon: FileText, color: 'bg-blue-500' },
        ]
    },
    {
        title: '其他',
        apps: [
            { id: 'gitlab', name: 'Gitlab源码', icon: Code2, color: 'bg-slate-400', isToggle: true, sub: 'Gitlab源码设置' },
            { id: 'github', name: 'Github源码', icon: Code2, color: 'bg-slate-400', isToggle: true, sub: 'Github源码设置' },
            { id: 'pipeline', name: '流水线', icon: PlayCircle, color: 'bg-slate-400', isToggle: true, sub: '流水线设置' },
            { id: 'tencent', name: '腾讯工蜂', icon: Code2, color: 'bg-slate-400', isToggle: true, sub: '腾讯工蜂设置' },
            { id: 'dashboard', name: '项目仪表盘', icon: FileText, color: 'bg-slate-400', isToggle: true },
        ]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-800">应用设置</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-100">
            <Plus size={16} /> 创建应用
          </button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <LayoutGrid size={16} /> 导航布局
          </button>
        </div>
      </div>

      <div className="space-y-10 pb-20">
        {sections.map(section => (
          <div key={section.title}>
            <div className="flex items-center gap-2 mb-6">
               <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
               <h3 className="text-sm font-bold text-slate-800">{section.title}</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {section.apps.map(app => {
                const isRequirement = app.id === 'req';
                
                return (
                  <div 
                    key={app.id} 
                    className={`bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all group ${isRequirement ? 'lg:col-span-2' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${app.color} text-white flex items-center justify-center shadow-sm`}>
                          <app.icon size={20} />
                        </div>
                        <div>
                          <h4 
                            className="font-bold text-slate-800 text-base cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => !app.isToggle && setDrillDownApp(app.name)}
                          >
                            {app.name}
                          </h4>
                          {app.sub && <p className="text-xs text-slate-400 mt-0.5">{app.sub}</p>}
                        </div>
                      </div>
                      
                      {app.isToggle ? (
                        <div className="flex items-center gap-3">
                            {app.extraLink && (
                                <span className="text-xs text-blue-600 cursor-pointer hover:underline">{app.extraLink}</span>
                            )}
                            <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${app.enabled === false ? 'bg-slate-200' : 'bg-blue-600'}`}>
                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${app.enabled === false ? 'left-0.5' : 'right-0.5'}`}></div>
                            </div>
                        </div>
                      ) : (
                        <button className="p-1 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded">
                            <MoreHorizontal size={18} />
                        </button>
                      )}
                    </div>

                    {/* Links Row */}
                    {app.links && (
                        <div className="flex flex-wrap gap-x-4 gap-y-2 items-center mt-3">
                            {app.links.map((link, idx) => (
                                <button 
                                    key={link}
                                    onClick={() => !app.isToggle && setDrillDownApp(app.name)}
                                    className="text-[11px] text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors font-medium"
                                >
                                    {link.includes('设置') && <Settings size={12} />}
                                    {link.includes('字段') && <FileText size={12} />}
                                    {link.includes('工作流') && <Repeat size={12} />}
                                    {link}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Special Requirement Inner Content */}
                    {isRequirement && (
                        <div className="mt-6 space-y-3">
                            {/* Add Category Button */}
                            <button className="w-full py-3 border border-dashed border-slate-300 rounded text-xs font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 hover:border-blue-300 transition-all flex items-center justify-center gap-1">
                                <Plus size={14} /> 需求类别
                            </button>
                            
                            {/* Epic Row */}
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100 group/item hover:border-blue-200 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded bg-purple-500 text-white flex items-center justify-center text-[10px] font-black shadow-sm">E</div>
                                    <span className="text-sm font-bold text-slate-700">Epic</span>
                                </div>
                                <div className="flex items-center gap-4 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                    <button onClick={() => setDrillDownApp('需求')} className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 font-bold">
                                        <Settings size={12} /> 设置
                                    </button>
                                    <button className="text-slate-400 hover:text-slate-600">
                                        <MoreHorizontal size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Story Row */}
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100 group/item hover:border-blue-200 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded bg-blue-500 text-white flex items-center justify-center text-[10px] font-black shadow-sm">S</div>
                                    <span className="text-sm font-bold text-slate-700">需求</span>
                                </div>
                                <div className="flex items-center gap-4 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                    <button onClick={() => setDrillDownApp('需求')} className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 font-bold">
                                        <Settings size={12} /> 设置
                                    </button>
                                    <button className="text-slate-400 hover:text-slate-600">
                                        <MoreHorizontal size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
