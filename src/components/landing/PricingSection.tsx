import React, { useState } from 'react';
import { Check, ShieldCheck } from 'lucide-react';

const TIERS = [
    {
        name: "Starter",
        price: "$199",
        desc: "For solo practitioners starting out.",
        features: ["5 Active Cases", "Basic EAMS Import", "Document Generation", "Email Support"]
    },
    {
        name: "Professional",
        price: "$499",
        desc: "For growing firms needing efficiency.",
        features: ["50 Active Cases", "AI Analysis Engine", "Full EAMS Sync", "Priority Support", "Client Portal"],
        featured: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        desc: "For large firms with complex needs.",
        features: ["Unlimited Cases", "Custom Integrations", "Dedicated Account Mgr", "SLA Guarantee", "On-Prem Options"]
    }
];

export const PricingSection: React.FC = () => {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <div className="premium-label mb-6">SCALABLE POWER</div>
                    <h2 className="text-5xl md:text-7xl font-display font-black mb-8 italic uppercase tracking-tighter">
                        Choose Your <span className="text-blue-500">Tier</span>
                    </h2>

                    {/* Toggle */}
                    <div className="flex items-center justify-center space-x-6 mt-12">
                        <span className={`text-sm font-bold tracking-widest uppercase ${!isAnnual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="w-16 h-8 bg-slate-800 rounded-full relative p-1 transition-colors duration-300 border border-white/10"
                        >
                            <div className={`w-6 h-6 bg-blue-500 rounded-full shadow-lg transform transition-transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`} />
                        </button>
                        <span className={`text-sm font-bold tracking-widest uppercase ${isAnnual ? 'text-white' : 'text-slate-500'}`}>
                            Annual <span className="text-blue-400 text-xs ml-2">(SAVE 20%)</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {TIERS.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`glass-card p-10 relative ${tier.featured ? 'border-blue-500/50 bg-blue-500/[0.05] scale-105 z-10' : 'opacity-80 hover:opacity-100 scale-95 hover:scale-100'} transition-all duration-500`}
                        >
                            {tier.featured && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-blue-500 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/50">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter mb-2">{tier.name}</h3>
                            <div className="flex items-baseline mb-6">
                                <span className="text-5xl font-display font-bold">{tier.price}</span>
                                <span className="text-slate-500 ml-2 text-sm font-body">/ month</span>
                            </div>
                            <p className="text-slate-400 mb-8 border-b border-white/10 pb-8 text-sm">{tier.desc}</p>

                            <ul className="space-y-4 mb-10">
                                {tier.features.map((feat, fIdx) => (
                                    <li key={fIdx} className="flex items-start text-sm text-slate-300">
                                        <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl font-display font-bold uppercase italic tracking-widest transition-all duration-300 ${tier.featured ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <p className="text-slate-500 text-sm flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        30-Day Money-Back Guarantee • No Credit Card Required for Trial
                    </p>
                </div>
            </div>
        </section>
    );
};
