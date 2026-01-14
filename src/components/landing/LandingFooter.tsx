import React from 'react';
import { Gavel, Copyright } from 'lucide-react';

export const LandingFooter: React.FC = () => {
    return (
        <footer className="bg-slate-950 border-t border-white/5 py-20 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-blue-900/[0.05] blur-[100px] rounded-full -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-2 space-y-6">
                    <div className="flex items-center justify-center md:justify-start space-x-3">
                        <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                            <Gavel className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-xl font-display font-black tracking-tighter italic text-white uppercase">JUSTIFY.</span>
                    </div>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto md:mx-0 font-body leading-relaxed">
                        The elite operating system for Workers' Compensation professionals. Compliant, efficient, and relentlessly effective.
                    </p>
                    <div className="flex items-center justify-center md:justify-start space-x-4 text-slate-500 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>Systems Operational</span>
                    </div>
                </div>

                {/* Links Column */}
                <div className="space-y-4">
                    <h4 className="text-white font-display font-bold uppercase tracking-widest text-xs mb-6">Platform</h4>
                    <ul className="space-y-3 text-sm text-slate-400 font-body">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Triage Engine</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">EAMS Integration</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Document Hub</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                    </ul>
                </div>

                {/* Legal Column */}
                <div className="space-y-4">
                    <h4 className="text-white font-display font-bold uppercase tracking-widest text-xs mb-6">Legal</h4>
                    <ul className="space-y-3 text-sm text-slate-400 font-body">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">SB 37 Compliance</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">LDA Disclosure</a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-20 pt-8 border-t border-white/5 text-center text-slate-600 text-xs font-body tracking-wide uppercase px-6">
                <p className="flex items-center justify-center mb-4">
                    <Copyright className="w-3 h-3 mr-1" /> 2026 Justify Legal Systems. All Rights Reserved.
                </p>
                <p className="max-w-4xl mx-auto italic opacity-50">
                    Justify is a workflow automation platform, not a law firm. We do not provide legal advice. Usage of this software constitutes acceptance of our Master Service Agreement.
                </p>
            </div>
        </footer>
    );
};
