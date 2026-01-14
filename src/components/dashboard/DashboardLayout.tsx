import React, { useState, useEffect } from 'react';
import { Home, FileText, Briefcase, Mail, Shield, Search, Bell, User, ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface DashboardLayoutProps {
    children: React.ReactNode;
    userType: 'CONSUMER' | 'LDA';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userType }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    // Toggle Dark Mode
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-[#F3F5F7]'} flex selection:bg-blue-500/30`}>
            {/* Sidebar - Clio Inspired Dark Sidebar */}
            <aside
                className={`${isCollapsed ? 'w-24' : 'w-72'} bg-[#1D2636] border-r border-[#2C374A] flex flex-col fixed top-0 bottom-0 left-0 z-50 transition-all duration-300 ease-in-out shadow-2xl`}
            >
                {/* Logo Area */}
                <div className={`p-8 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
                    <Link to="/" className="flex items-center space-x-3 group no-underline text-white">
                        <div className="w-10 h-10 bg-[#0077D4] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                            <Shield className="text-white w-5 h-5" />
                        </div>
                        {!isCollapsed && (
                            <span className="text-2xl font-display font-black tracking-tighter italic uppercase animate-in fade-in duration-300">JUSTIFY.</span>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto overflow-x-hidden">
                    <NavItem to="/dashboard" icon={<Home />} label="Dashboard" active={location.pathname === '/dashboard'} collapsed={isCollapsed} />
                    <NavItem to="/documents" icon={<FileText />} label="Documents" active={location.pathname === '/documents'} collapsed={isCollapsed} />
                    <NavItem to="/legal" icon={<Briefcase />} label={userType === 'LDA' ? 'Matters' : 'My Cases'} active={location.pathname === '/legal'} collapsed={isCollapsed} />
                    <NavItem to="/mail" icon={<Mail />} label="Communications" active={location.pathname === '/mail'} collapsed={isCollapsed} />

                    <div className={`mt-8 pt-8 border-t border-[#2C374A] ${isCollapsed ? 'hidden' : 'block'}`}>
                        <div className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 animate-in fade-in">Protection</div>
                        <NavItem to="/compliance" icon={<Shield />} label="Compliance" collapsed={isCollapsed} />
                    </div>
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-[#2C374A] bg-[#161D2B]">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full mb-4 flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <div className="flex items-center space-x-2"><ChevronLeft className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest">Collapse Sidebar</span></div>}
                    </button>

                    <button className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} w-full p-2 rounded-xl hover:bg-white/5 transition-colors text-slate-400 hover:text-white group`}>
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 shrink-0">
                            <User className="w-5 h-5" />
                        </div>
                        {!isCollapsed && (
                            <div className="text-left overflow-hidden">
                                <div className="text-sm font-bold text-white truncate">Frank Ureno</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Master Litigator</div>
                            </div>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-24' : 'ml-72'}`}>
                {/* Header - Clio Inspired Top Bar */}
                <header className={`h-16 border-b ${isDarkMode ? 'border-white/5 bg-slate-950/80' : 'border-[#E1E5E9] bg-white'} backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-8 transition-colors duration-300`}>

                    {/* AI Search Bar */}
                    <div className="flex-1 max-w-xl relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className={`w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                        </div>
                        <input
                            type="text"
                            placeholder={userType === 'LDA' ? "Search for matters, contacts..." : "Search your case..."}
                            className={`w-full h-10 ${isDarkMode ? 'bg-slate-900 border-white/10 text-slate-200 placeholder:text-slate-500' : 'bg-[#F3F5F7] border-[#E1E5E9] text-slate-800 placeholder:text-slate-500'} border rounded-md pl-12 pr-4 focus:outline-none focus:border-[#0077D4] focus:ring-1 focus:ring-[#0077D4] transition-all font-body text-sm`}
                        />
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center space-x-4 ml-8">
                        {/* Global Create Button */}
                        <button className="bg-[#2E8540] hover:bg-[#256D34] text-white px-4 py-2 rounded-md font-bold text-sm tracking-wide flex items-center shadow-sm transition-all">
                            Create New
                        </button>

                        <div className="h-6 w-[1px] bg-slate-200 dark:bg-white/10 mx-2" />

                        <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-md transition-colors ${isDarkMode ? 'text-slate-400 hover:text-yellow-400 hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <button className={`relative p-2 rounded-md transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950" />
                        </button>

                        <div className="flex items-center bg-slate-100 dark:bg-white/5 p-1 rounded-md">
                            <button
                                onClick={() => i18n.changeLanguage('en')}
                                className={`text-[10px] font-bold px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => i18n.changeLanguage('es')}
                                className={`text-[10px] font-bold px-2 py-1 rounded ${i18n.language === 'es' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
                            >
                                ES
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </div>

                {/* LDA Compliance Footer */}
                <footer className={`py-6 px-12 border-t mt-auto ${isDarkMode ? 'border-white/5 text-slate-500' : 'border-[#E1E5E9] text-slate-500'} text-[10px] text-center font-medium`}>
                    <p className="mb-2">
                        <span className="font-bold text-[#0077D4]">DISCLAIMER:</span> {t('common.legalDisclaimer')}
                    </p>
                    <p>LDA Reg #2026-8821 • Bonded & Registered in Sacramento County • <span className="text-blue-500">Master Litigator Ecosystem</span></p>
                </footer>
            </main>
        </div>
    );
};

const NavItem = ({ to, icon, label, active = false, collapsed = false }: { to: string, icon: React.ReactNode, label: string, active?: boolean, collapsed?: boolean }) => (
    <Link
        to={to}
        className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4 space-x-3'} py-2.5 rounded-lg transition-all duration-200 group no-underline ${active ? 'bg-[#0077D4] text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
        title={collapsed ? label : undefined}
    >
        <span className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-white'} transition-colors shrink-0`}>
            {React.cloneElement(icon as React.ReactElement, { size: 18 })}
        </span>
        {!collapsed && (
            <span className="font-sans font-semibold tracking-tight text-[13px] truncate">{label}</span>
        )}
    </Link>
);
