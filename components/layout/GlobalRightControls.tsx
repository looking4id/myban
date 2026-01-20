
import React, { useState } from 'react';
import { 
  HelpCircle, Bell, Settings, Home, Edit3, Globe, Palette, User, 
  LogOut, Send, ChevronRight, Check, ArrowLeft 
} from '../common/Icons';
import { useApp } from '../../utils/AppContext';
import { User as UserType } from '../../types';

interface GlobalRightControlsProps {
  user?: UserType | null;
  onLogout?: () => void;
  onGoHome?: () => void;
  onSettingsClick?: () => void;
}

export const GlobalRightControls: React.FC<GlobalRightControlsProps> = ({ 
  user, onLogout, onGoHome, onSettingsClick 
}) => {
  const { language, setLanguage, theme, setTheme, t } = useApp();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userMenuLevel, setUserMenuLevel] = useState<'main' | 'language' | 'theme'>('main');

  const handleUserMenuLeave = () => {
      setIsUserMenuOpen(false);
      setTimeout(() => setUserMenuLevel('main'), 200);
  };

  const renderUserMenuContent = () => {
      if (userMenuLevel === 'language') {
          return (
              <>
                <div className="px-2 py-2 flex items-center gap-2 border-b border-slate-100 mb-1">
                    <button onClick={() => setUserMenuLevel('main')} className="p-1 hover:bg-slate-100 rounded text-slate-500"><ArrowLeft size={14}/></button>
                    <span className="text-xs font-bold text-slate-600">{t('语言')}</span>
                </div>
                <div className="py-1">
                    <button onClick={() => setLanguage('zh')} className="w-full px-5 py-2.5 hover:bg-slate-50 flex items-center justify-between text-slate-600 transition-colors text-left group">
                        <span className="text-sm font-medium">{t('简体中文')}</span>
                        {language === 'zh' && <Check size={14} className="text-blue-600" />}
                    </button>
                    <button onClick={() => setLanguage('en')} className="w-full px-5 py-2.5 hover:bg-slate-50 flex items-center justify-between text-slate-600 transition-colors text-left group">
                        <span className="text-sm font-medium">{t('English')}</span>
                        {language === 'en' && <Check size={14} className="text-blue-600" />}
                    </button>
                </div>
              </>
          );
      }
      if (userMenuLevel === 'theme') {
          return (
              <>
                <div className="px-2 py-2 flex items-center gap-2 border-b border-slate-100 mb-1">
                    <button onClick={() => setUserMenuLevel('main')} className="p-1 hover:bg-slate-100 rounded text-slate-500"><ArrowLeft size={14}/></button>
                    <span className="text-xs font-bold text-slate-600">{t('主题')}</span>
                </div>
                <div className="py-1">
                    <button onClick={() => setTheme('light')} className="w-full px-5 py-2.5 hover:bg-slate-50 flex items-center justify-between text-slate-600 transition-colors text-left group">
                        <span className="text-sm font-medium">{t('浅色模式')}</span>
                        {theme === 'light' && <Check size={14} className="text-blue-600" />}
                    </button>
                    <button onClick={() => setTheme('dark')} className="w-full px-5 py-2.5 hover:bg-slate-50 flex items-center justify-between text-slate-600 transition-colors text-left group">
                        <span className="text-sm font-medium">{t('深色模式')}</span>
                        {theme === 'dark' && <Check size={14} className="text-blue-600" />}
                    </button>
                </div>
              </>
          );
      }
      return (
          <>
            <div className="py-1">
                <button 
                    onClick={onGoHome}
                    className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors text-left group"
                >
                    <Home size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                    <span className="text-sm font-medium">{t('首页')}</span>
                </button>
                <button className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors text-left group">
                    <Edit3 size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                    <span className="text-sm font-medium">{t('设置')}</span>
                </button>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
            <div className="py-1">
                <button onClick={() => setUserMenuLevel('language')} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
                    <div className="flex items-center gap-3">
                        <Globe size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                        <span className="text-sm font-medium">{t('语言')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{language === 'zh' ? '中文' : 'En'}</span>
                        <ChevronRight size={14} className="text-slate-300" />
                    </div>
                </button>
                <button onClick={() => setUserMenuLevel('theme')} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
                    <div className="flex items-center gap-3">
                        <Palette size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                        <span className="text-sm font-medium">{t('主题')}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-300" />
                </button>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
            <div className="py-1">
                <button 
                    onClick={onGoHome}
                    className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors text-left group"
                >
                    <User size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                    <span className="text-sm font-medium">{t('返回个人首页')}</span>
                </button>
                <button 
                    onClick={onLogout}
                    className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors text-left group"
                >
                    <LogOut size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                    <span className="text-sm font-medium">{t('退出登录')}</span>
                </button>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
            <div className="px-5 py-3 flex items-center gap-3 text-slate-500 dark:text-slate-400 cursor-default">
                <Send size={16} className="text-slate-400 dark:text-slate-500" /> 
                <span className="text-sm font-medium">version <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs text-slate-600 dark:text-slate-300 ml-1">v1.91.0</span></span>
            </div>
          </>
      );
  };

  return (
     <div className="flex items-center gap-4 flex-shrink-0 pl-4 bg-white dark:bg-slate-800 transition-colors">
         <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"><HelpCircle size={20} /></button>
         <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"><Bell size={20} /></button>
         {onSettingsClick && (
             <button 
                onClick={onSettingsClick}
                className={`transition-colors text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200`}
                title={t('设置')}
             >
                <Settings size={20} />
             </button>
         )}
         
         <div 
            className="relative flex items-center"
            onMouseEnter={() => setIsUserMenuOpen(true)}
            onMouseLeave={handleUserMenuLeave}
         >
             <div className={`w-8 h-8 rounded-full ${user?.avatarColor || 'bg-orange-500'} text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer hover:shadow-md transition-all`}>
                {user?.name?.substring(0, 2) || 'Lo'}
             </div>
             
             {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-lg py-1 z-[60] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    {renderUserMenuContent()}
                </div>
             )}
         </div>
     </div>
  );
};
