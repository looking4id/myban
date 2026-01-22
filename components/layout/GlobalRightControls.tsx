
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

  const closeMenu = () => {
      setIsUserMenuOpen(false);
      setTimeout(() => setUserMenuLevel('main'), 200);
  };

  const renderUserMenuContent = () => {
      if (userMenuLevel === 'language') {
          return (
              <>
                <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 mb-1">
                    <button onClick={(e) => { e.stopPropagation(); setUserMenuLevel('main'); }} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500"><ArrowLeft size={14}/></button>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{t('语言')}</span>
                </div>
                <div className="py-1">
                    <button onClick={() => { setLanguage('zh'); closeMenu(); }} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
                        <span className="text-sm font-medium">{t('简体中文')}</span>
                        {language === 'zh' && <Check size={14} className="text-blue-600" />}
                    </button>
                    <button onClick={() => { setLanguage('en'); closeMenu(); }} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
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
                <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 mb-1">
                    <button onClick={(e) => { e.stopPropagation(); setUserMenuLevel('main'); }} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500"><ArrowLeft size={14}/></button>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{t('主题')}</span>
                </div>
                <div className="py-1">
                    <button onClick={() => { setTheme('light'); closeMenu(); }} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
                        <span className="text-sm font-medium">{t('浅色模式')}</span>
                        {theme === 'light' && <Check size={14} className="text-blue-600" />}
                    </button>
                    <button onClick={() => { setTheme('dark'); closeMenu(); }} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
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
                    onClick={() => { onGoHome?.(); closeMenu(); }}
                    className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors text-left group"
                >
                    <Home size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                    <span className="text-sm font-medium">{t('首页')}</span>
                </button>
                <button className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors text-left group">
                    <Edit3 size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                    <span className="text-sm font-medium">{t('设置')}</span>
                </button>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
            <div className="py-1">
                <button onClick={(e) => { e.stopPropagation(); setUserMenuLevel('language'); }} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
                    <div className="flex items-center gap-3">
                        <Globe size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                        <span className="text-sm font-medium">{t('语言')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{language === 'zh' ? '中文' : 'En'}</span>
                        <ChevronRight size={14} className="text-slate-300" />
                    </div>
                </button>
                <button onClick={(e) => { e.stopPropagation(); setUserMenuLevel('theme'); }} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
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
                    onClick={() => { onGoHome?.(); closeMenu(); }}
                    className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors text-left group"
                >
                    <User size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                    <span className="text-sm font-medium">{t('返回个人首页')}</span>
                </button>
                <button 
                    onClick={() => { onLogout?.(); closeMenu(); }}
                    className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors text-left group"
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
     <div className="flex items-center gap-4 flex-shrink-0 pl-4 bg-white dark:bg-slate-800 transition-colors relative">
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
         
         <div className="relative flex items-center">
             <div 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`w-8 h-8 rounded-full ${user?.avatarColor || 'bg-orange-500'} text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-95 relative z-[60]`}
             >
                {user?.name?.substring(0, 2) || 'Lo'}
             </div>
             
             {isUserMenuOpen && (
                <>
                    {/* 背景遮罩层 - z-index 提升至 100 */}
                    <div 
                        className="fixed inset-0 z-[100] bg-transparent cursor-default" 
                        onClick={closeMenu}
                    ></div>
                    
                    {/* 弹出框主体 - 关键修复：强制纯白背景和 100% 不透明度 */}
                    <div 
                        className="absolute top-full right-0 mt-2 w-64 !bg-white dark:!bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-xl py-1 z-[110] animate-in slide-in-from-top-2 duration-200 origin-top-right overflow-hidden !opacity-100"
                        style={{ backdropFilter: 'none', WebkitBackdropFilter: 'none' }}
                    >
                        {renderUserMenuContent()}
                    </div>
                </>
             )}
         </div>
     </div>
  );
};
