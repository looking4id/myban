
import React from 'react';
import { AiIcon } from '../common/Icons';
import { TaskType, User as UserType } from '../../types';
import { GlobalRightControls } from './GlobalRightControls';

interface TopHeaderProps {
  selectedType: TaskType | null;
  onTypeChange: (type: TaskType | null) => void;
  user?: UserType | null;
  onLogout?: () => void;
  onGoHome?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ selectedType, onTypeChange, user, onLogout, onGoHome }) => {
  const tabs = [
    { label: '全部', value: null },
    { label: '需求', value: TaskType.Requirement },
    { label: '任务', value: TaskType.Task },
    { label: '缺陷', value: TaskType.Defect }
  ];

  return (
    <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-30">
      <div className="flex items-center gap-10 h-full">
        <span className="text-slate-900 font-bold text-base">工作项</span>
        <div className="flex h-full gap-8">
            {tabs.map(tab => (
              <button 
                key={tab.label}
                onClick={() => onTypeChange(tab.value)}
                className={`relative px-1 h-full text-sm font-medium transition-all ${
                    selectedType === tab.value 
                    ? 'text-blue-600' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
                {selectedType === tab.value && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
            ))}
        </div>
      </div>

      <div className="flex items-center gap-5">
         <div className="flex items-center gap-4 text-slate-400">
             <AiIcon />
             <div className="w-px h-4 bg-slate-200"></div>
             <GlobalRightControls user={user} onLogout={onLogout} onGoHome={onGoHome} />
         </div>
      </div>
    </div>
  );
};
