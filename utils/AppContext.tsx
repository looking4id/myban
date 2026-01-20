
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'zh' | 'en';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  zh: {
    '项目概览': '项目概览',
    '需求': '需求',
    '任务': '任务',
    '缺陷': '缺陷',
    '甘特图': '甘特图',
    '迭代': '迭代',
    '测试': '测试',
    '版本': '版本',
    '里程碑': '里程碑',
    '风险': '风险',
    '代码评审': '代码评审',
    '流水线': '流水线',
    '效能度量': '效能度量',
    '成员': '成员',
    '项目设置': '项目设置',
    '更多': '更多',
    '返回项目列表': '返回项目列表',
    '创建需求': '创建需求',
    '创建缺陷': '创建缺陷',
    '首页': '首页',
    '设置': '设置',
    '语言': '语言',
    '主题': '主题',
    '返回个人首页': '返回个人首页',
    '退出登录': '退出登录',
    '浅色模式': '浅色模式',
    '深色模式': '深色模式',
    '简体中文': '简体中文',
    'English': 'English',
    '功能开发中': '功能开发中',
    '该模块正在建设中，敬请期待...': '该模块正在建设中，敬请期待...'
  },
  en: {
    '项目概览': 'Overview',
    '需求': 'Requirements',
    '任务': 'Tasks',
    '缺陷': 'Defects',
    '甘特图': 'Gantt',
    '迭代': 'Sprints',
    '测试': 'QA',
    '版本': 'Releases',
    '里程碑': 'Milestones',
    '风险': 'Risks',
    '代码评审': 'Code Review',
    '流水线': 'Pipelines',
    '效能度量': 'Metrics',
    '成员': 'Members',
    '项目设置': 'Settings',
    '更多': 'More',
    '返回项目列表': 'Back to Projects',
    '创建需求': 'New Requirement',
    '创建缺陷': 'New Defect',
    '首页': 'Home',
    '设置': 'Settings',
    '语言': 'Language',
    '主题': 'Theme',
    '返回个人首页': 'Back to Profile',
    '退出登录': 'Log Out',
    '浅色模式': 'Light Mode',
    '深色模式': 'Dark Mode',
    '简体中文': '简体中文',
    'English': 'English',
    '功能开发中': 'Feature in Progress',
    '该模块正在建设中，敬请期待...': 'This module is under construction...'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from localStorage if available, else default
  const [language, setLanguage] = useState<Language>(() => 
    (localStorage.getItem('app_lang') as Language) || 'zh'
  );
  const [theme, setTheme] = useState<Theme>(() => 
    (localStorage.getItem('app_theme') as Theme) || 'light'
  );

  useEffect(() => {
    localStorage.setItem('app_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
