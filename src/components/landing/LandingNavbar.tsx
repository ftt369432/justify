import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel, Menu } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                {/* Logo Area */}
                <Link to="/" className="flex items-center space-x-3 group no-underline text-white">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-500/20 relative overflow-hidden">
                        <Gavel className="text-white w-5 h-5 relative z-10" />
                        <div className="absolute inset-0 bg-white/20 -translate-x-full skew-x-[-20deg] group-hover:animate-shimmer" />
                    </div>
                    <span className="text-2xl font-display font-black tracking-tighter italic selection:bg-blue-500/50 uppercase">JUSTIFY.</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-10 text-xs font-display font-bold tracking-[0.2em] text-slate-400 uppercase">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    <a href="#triage" className="hover:text-white transition-colors">Triage</a>

                    <div className="h-4 w-px bg-white/10 mx-2" />

                    <Link to="/login" className="hover:text-blue-400 transition-colors">Log In</Link>
                    <Link to="/signup" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/10 transition-all">
                        GET STARTED
                    </Link>
                </div>

                {/* Mobile Menu */}
                <button className="md:hidden text-white p-2">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
};
