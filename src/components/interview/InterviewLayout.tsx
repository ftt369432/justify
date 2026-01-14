import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface InterviewLayoutProps {
    children: React.ReactNode;
    title: string;
    progress: number;
    currentStep: number;
    totalSteps: number;
    onBack?: () => void;
}

export const InterviewLayout: React.FC<InterviewLayoutProps> = ({
    children,
    title,
    progress,
    currentStep,
    totalSteps,
    onBack
}) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col">
            {/* Minimal Header */}
            <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-500 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    )}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Shield className="text-white w-4 h-4" />
                        </div>
                        <span className="font-display font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm hidden md:block">Justify Interview</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{title}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Step {currentStep} of {totalSteps}</div>
                    </div>
                    <Link to="/dashboard" className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 uppercase tracking-widest">
                        Save & Exit
                    </Link>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1">
                <div
                    className="bg-blue-600 h-1 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Main Stage */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-full max-w-3xl">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-600">
                <p>Secure SSL Encryption • Autosaved</p>
            </footer>
        </div>
    );
};
