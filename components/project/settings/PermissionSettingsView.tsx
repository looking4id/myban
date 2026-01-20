
import React, { useState } from 'react';
import { User, Plus, Search, Copy, Check } from '../../Icons';

export const PermissionSettingsView: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState('管理员');
  const [activeTab, setActiveTab] = useState('用户组权限');

  const groups = [
    { name: '管理员', count: 1, type: 'default' },
    { name: '普通成员', count: 0, type: 'default' },
  ];

  // Full permission data structure based on the screenshots
  const permissionModules = [
    {
      title: '缺陷',
      items: [
        '创建缺陷', '删除缺陷', '编辑缺陷', '导入缺陷', '导出缺陷',
        '复制缺陷', '移动缺陷', '合并缺陷', '缺陷转需求', '批量流转',
        '附件上传/关联', '附件下载/预览', '附件删除/解除...', '归档缺陷'
      ]
    },
    {
      title: '需求',
      items: [
        '创建需求', '删除需求', '编辑需求', '导入需求', '导出需求',
        '复制需求', '移动需求', '批量流转', '设置需求保密', '需求分类管理',
        '需求排序', '归档需求', '需求转缺陷', '附件删除/解除...', '附件下载/预览'
      ]
    },
    {
      title: '迭代',
      items: [
        '创建迭代', '删除迭代', '编辑迭代', '导出迭代', '规划迭代',
        '工作分配', '编辑迭代状态', '迭代转测试', '锁定迭代'
      ]
    },
    {
      title: '文档',
      items: ['访问文档', '编辑文档', '下载文档', '删除文档', '导图生成文档']
    },
    {
      title: 'Wiki',
      items: [
        '访问wiki', '编辑wiki', '删除wiki', '下载wiki', '跨项目分享wiki',
        '附件上传', '附件下载/预览', '附件删除'
      ]
    },
    {
      title: '项目报告',
      items: ['创建项目报告', '删除项目报告', '编辑项目报告', '复制项目报告', '导出项目报告']
    },
    {
      title: '甘特图',
      items: ['设置团队甘特图', '导出甘特图', '设置项目高亮线', '快速调整依赖冲突']
    },
    {
      title: '故事墙',
      items: ['设置团队故事墙']
    },
    {
      title: '报表',
      items: ['新增自定义系统...', '删除自定义系统...', '编辑自定义系统...']
    },
    {
      title: '测试用例',
      items: ['导出测试用例', '导入测试用例']
    },
    {
      title: '测试计划',
      items: ['管理测试计划', '规划测试计划', '执行测试计划', '一键执行测试计划', '导出测试计划', '导入测试计划']
    },
    {
      title: '统计',
      items: ['创建团队图表', '编辑团队图表', '删除团队图表', '导出图表', '指标管理']
    },
    {
      title: '里程碑',
      items: ['创建支线', '编辑支线', '访问里程碑', '创建里程碑', '编辑里程碑', '导出里程碑', '删除里程碑']
    }
  ];

  // Specific Project Settings Group
  const projectSettingsPermissions = [
    {
        subTitle: '通用设置',
        items: [
            '自动化助手', '项目应用定制', '项目公共参数设置', '项目系统视图设置', '成员设置',
            '用户组设置', '通知设置', 'TAPD企微机器人', '标签管理', '回收站管理',
            '流水线设置', 'Github源码设置', 'Gitlab源码设置', '应用启用与卸载', 'P4源码设置',
            'SVN源码设置', '腾讯工蜂源码设置', '归档管理', '可选功能设置'
        ]
    },
    {
        subTitle: '需求设置',
        items: ['需求设置', '模板&布局', '工作流设置', '字段设置', '类别设置']
    },
    {
        subTitle: '缺陷设置',
        items: ['缺陷设置', '字段设置', '模板&布局', '工作流设置']
    },
    {
        subTitle: 'AI设置',
        items: ['AI 需求评审']
    },
    {
        subTitle: '其他应用',
        items: [
            '任务设置', '迭代设置', '发布评审设置', '测试用例设置', '测试计划设置',
            '发布计划设置', '定时报告设置', '自动排期设置', '甘特图设置', '项目报告设置', '检查清单设置'
        ]
    }
  ];

  return (
    <div className="flex h-full animate-in fade-in duration-300 font-sans text-slate-700 bg-white">
      {/* Left Sidebar - User Groups */}
      <div className="w-64 border-r border-slate-200 bg-white flex flex-col flex-shrink-0">
        <div className="p-5 flex items-center justify-between border-b border-slate-50">
          <span className="text-base font-bold text-slate-800">用户组 <span className="text-slate-400 font-normal text-xs">({groups.length})</span></span>
        </div>
        
        <div className="flex-1 p-4 space-y-1 overflow-y-auto">
          {groups.map(group => (
            <div 
              key={group.name}
              onClick={() => setActiveGroup(group.name)}
              className={`px-4 py-3 rounded-md transition-all cursor-pointer group flex flex-col gap-1 ${
                activeGroup === group.name ? 'bg-blue-50' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-sm font-bold ${activeGroup === group.name ? 'text-blue-600' : 'text-slate-700'}`}>{group.name}</span>
                <span className="text-xs text-slate-400 font-mono">{group.count}</span>
              </div>
              <div className="text-[10px] text-slate-400">系统分组</div>
            </div>
          ))}
          
          <button className="w-full mt-4 py-2 text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center justify-center gap-1 transition-colors border border-dashed border-slate-300 rounded hover:border-blue-400 hover:bg-blue-50">
            <Plus size={14} /> 添加用户组
          </button>
        </div>
      </div>

      {/* Main Content - Permissions Matrix */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-200 flex flex-col gap-6 flex-shrink-0">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
               <h2 className="text-xl font-bold text-slate-800">{activeGroup}</h2>
               <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-mono">{groups.find(g => g.name === activeGroup)?.count}</span>
             </div>
             <button className="text-xs font-bold text-blue-600 hover:text-blue-700 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50 transition-all flex items-center gap-1.5">
               <Copy size={12} /> 复制权限
             </button>
          </div>
          
          <div className="flex gap-8 border-b border-transparent -mb-[21px]">
            {['用户组权限', '成员管理'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold transition-all relative ${
                  activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Permissions Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="space-y-10 pb-20">
            {/* Standard Modules */}
            {permissionModules.map(module => (
              <div key={module.title} className="flex gap-12 border-b border-slate-100 pb-8 last:border-0">
                <div className="w-24 flex-shrink-0 pt-1">
                  <h4 className="text-sm font-bold text-slate-700">{module.title}</h4>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4">
                    {module.items.map((item, idx) => (
                      <PermissionCheckbox key={item} label={item} defaultChecked={activeGroup === '管理员'} />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Project Settings Module (Complex Structure) */}
            <div className="flex gap-12 border-b border-slate-100 pb-8 last:border-0">
               <div className="w-24 flex-shrink-0 pt-1">
                  <h4 className="text-sm font-bold text-slate-700">项目设置</h4>
               </div>
               <div className="flex-1 space-y-8">
                  {projectSettingsPermissions.map(subGroup => (
                      <div key={subGroup.subTitle}>
                          <h5 className="text-xs font-bold text-slate-800 mb-3">{subGroup.subTitle}</h5>
                          <div className="grid grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4">
                            {subGroup.items.map(item => (
                                <PermissionCheckbox key={item} label={item} defaultChecked={activeGroup === '管理员'} />
                            ))}
                          </div>
                      </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-8 border-t border-slate-200 bg-white flex-shrink-0 flex items-center gap-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-100 transition-all active:scale-95">
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Component for consistent checkboxes
const PermissionCheckbox: React.FC<{ label: string, defaultChecked: boolean }> = ({ label, defaultChecked }) => {
    // Generate a semi-random checked state for "Ordinary Member" based on label length to simulate data
    const isChecked = defaultChecked || (!label.includes('删除') && !label.includes('设置') && Math.random() > 0.6);
    
    return (
        <label className="flex items-center gap-2.5 cursor-pointer group select-none">
            <div className="relative flex items-center justify-center">
                <input 
                    type="checkbox" 
                    defaultChecked={isChecked}
                    className="peer appearance-none w-4 h-4 border border-slate-300 rounded bg-white checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" 
                />
                <Check size={10} strokeWidth={4} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
            </div>
            <span className="text-[13px] text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
        </label>
    );
};
