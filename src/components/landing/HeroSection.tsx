import React from 'react';
import { ArrowRight, Shield, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
    return (
        <section className="relative pt-48 pb-32 text-center overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-blue-600/[0.03] blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute -left-20 top-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-float -z-10" />
            <div className="absolute -right-20 top-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float -z-10" style={{ animationDelay: '2s' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Trust Badge */}
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 backdrop-blur-md mb-12 animate-in fade-in slide-in-from-bottom duration-700">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">Trusted by 500+ Law Firms</span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black mb-8 tracking-tighter leading-[0.9] text-white uppercase italic selection:bg-blue-500/50 animate-in fade-in slide-in-from-bottom duration-1000 delay-100">
                    Justice <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 block mt-2">Triaged.</span>
                </h1>

                {/* Value Subheadline */}
                <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 font-body leading-relaxed tracking-tight animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                    The <span className="text-white font-bold">Elite Workers' Comp Engine</span> that automatically qualifies leads and routes them to your management dashboard.
                </p>

                {/* Call to Actions */}
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 animate-in fade-in zoom-in duration-1000 delay-300">
                    <Link
                        to="/#triage"
                        className="btn-primary group flex items-center shadow-2xl shadow-blue-500/20"
                    >
                        <span className="relative z-10">START FREE TRIAL</span>
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
                        <div className="shimmer" />
                    </Link>

                    <button className="px-8 py-4 rounded-2xl font-display font-bold text-slate-300 border border-white/5 hover:bg-white/5 hover:text-white transition-all duration-300 flex items-center uppercase italic tracking-widest text-sm">
                        <PlayCircle className="mr-3 w-5 h-5" />
                        Watch Demo
                    </button>
                </div>
            </div>
        </section>
    );
};
