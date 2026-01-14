import React from 'react';
import { Database, FileText, Network, Cpu, Calendar, Cloud } from 'lucide-react';

const FEATURES = [
    {
        icon: <Database className="w-8 h-8 text-blue-400" />,
        title: "EAMS Integration",
        desc: "Auto-import case data directly from California DIR. Eliminate manual entry errors."
    },
    {
        icon: <FileText className="w-8 h-8 text-blue-400" />,
        title: "Smart Documents",
        desc: "Auto-fill complex DWC forms with validated case data in seconds."
    },
    {
        icon: <Network className="w-8 h-8 text-blue-400" />,
        title: "Entity Network",
        desc: "Track employers, insurers, and attorneys in a unified relationship graph."
    },
    {
        icon: <Cpu className="w-8 h-8 text-blue-400" />,
        title: "AI Analysis",
        desc: "Intelligent case insights and automated strategy recommendations."
    },
    {
        icon: <Calendar className="w-8 h-8 text-blue-400" />,
        title: "Critical Deadlines",
        desc: "Never miss a hearing or statute with automated docketing."
    },
    {
        icon: <Cloud className="w-8 h-8 text-blue-400" />,
        title: "Cloud Hub",
        desc: "Secure, encrypted document storage organized by case hierarchy."
    }
];

export const FeaturesSection: React.FC = () => {
    return (
        <section className="py-32 relative bg-blue-950/[0.2]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <div className="premium-label mb-6">SYSTEM CAPABILITIES</div>
                    <h2 className="text-5xl md:text-7xl font-display font-black mb-8 italic uppercase tracking-tighter">
                        The <span className="text-blue-500">Elite</span> Standard
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURES.map((feat, idx) => (
                        <div key={idx} className="glass-card p-10 group hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-500/20 transition-colors">
                                {feat.icon}
                            </div>
                            <h3 className="text-2xl font-display font-bold mb-4 uppercase italic tracking-tight text-slate-200">
                                {feat.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed font-body">
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
