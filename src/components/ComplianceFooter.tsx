import React from 'react';
import { useLegalStore } from '../store/useLegalStore';

export const ComplianceFooter: React.FC = () => {
    const { mode, config } = useLegalStore();

    return (
        <footer className="fixed bottom-0 left-0 right-0 p-6 bg-slate-950/80 backdrop-blur-xl border-t border-white/5 z-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-300">Justify</span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full" />
                    <span>{config.title}</span>
                </div>

                <div className="text-center max-w-md italic">
                    {config.disclosure}
                </div>

                <div className="flex items-center space-x-4 font-mono">
                    {mode === 'LDA' ? (
                        <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded border border-green-500/20">
                            {config.idNumber}
                        </span>
                    ) : (
                        <div className="flex flex-col items-end">
                            <span className="text-blue-400 font-bold">{config.attorneyName}</span>
                            <span className="text-[10px] uppercase tracking-widest">{config.firmAddress}</span>
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
};
