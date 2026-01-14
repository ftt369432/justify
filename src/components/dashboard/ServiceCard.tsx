import React from 'react';
import { ArrowRight, Info } from 'lucide-react';

interface ServiceCardProps {
    title: string;
    icon: React.ReactNode;
    description: string;
    color: 'blue' | 'purple' | 'emerald' | 'rose' | 'amber';
    onClick: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, description, color, onClick }) => {
    const colorStyles = {
        blue: {
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            text: 'text-blue-600',
            darkText: 'dark:text-blue-400',
            hoverBorder: 'group-hover:border-blue-500/50'
        },
        purple: {
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
            text: 'text-purple-600',
            darkText: 'dark:text-purple-400',
            hoverBorder: 'group-hover:border-purple-500/50'
        },
        emerald: {
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            text: 'text-emerald-600',
            darkText: 'dark:text-emerald-400',
            hoverBorder: 'group-hover:border-emerald-500/50'
        },
        rose: {
            bg: 'bg-rose-500/10',
            border: 'border-rose-500/20',
            text: 'text-rose-600',
            darkText: 'dark:text-rose-400',
            hoverBorder: 'group-hover:border-rose-500/50'
        },
        amber: {
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            text: 'text-amber-600',
            darkText: 'dark:text-amber-400',
            hoverBorder: 'group-hover:border-amber-500/50'
        }
    };

    const style = colorStyles[color];

    return (
        <div
            onClick={onClick}
            className={`group relative p-6 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer overflow-hidden ${style.hoverBorder}`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${style.bg} ${style.border} border transition-colors duration-300`}>
                    {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 ${style.text} ${style.darkText}` })}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className={`w-5 h-5 ${style.text} ${style.darkText}`} />
                </div>
            </div>

            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2">
                {description}
            </p>

            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-white/5">
                <Info className="w-3 h-3 text-slate-400" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Self-Help / Doc Prep Only</span>
            </div>
        </div>
    );
};
