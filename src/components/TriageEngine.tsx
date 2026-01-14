import React, { useState } from 'react';
import { useTriageStore } from '../store/useTriageStore';
import { useLegalStore } from '../store/useLegalStore';
import { useOrderStore } from '../store/useOrderStore';
import { RescissionTimer } from './RescissionTimer';
import { ChevronRight, ShieldCheck, Briefcase, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Type definitions for Triage Logic
interface TriageOption {
    label: string;
    next: string;
    score: number;
}

interface TriageStep {
    question: string;
    icon?: React.ReactNode;
    options: TriageOption[];
}

interface TriageLogicMap {
    [key: string]: TriageStep;
}

// Logic definitions
const CATEGORIES: Record<string, { name: string; icon: React.ReactNode }> = {
    PI: { name: 'Personal Injury', icon: <ShieldCheck /> },
    WC: { name: 'Workers\' Comp', icon: <Briefcase /> }
};

const PI_LOGIC: TriageLogicMap = {
    fault: {
        question: "Was the accident someone else's fault?",
        options: [
            { label: "Yes", next: "hospital", score: 40 },
            { label: "No", next: "hospital", score: 0 }
        ]
    },
    hospital: {
        question: "Did you go to the Hospital or ER?",
        options: [
            { label: "Yes", next: "surgery", score: 30 },
            { label: "No", next: "surgery", score: 10 }
        ]
    },
    surgery: {
        question: "Is surgery recommended or performed?",
        options: [
            { label: "Yes", next: "complete", score: 30 },
            { label: "No", next: "complete", score: 0 }
        ]
    }
};

const WC_LOGIC: TriageLogicMap = {
    employee: {
        question: "Were you an employee at the time of injury?",
        options: [
            { label: "Yes", next: "reported", score: 30 },
            { label: "No", next: "reported", score: 0 }
        ]
    },
    reported: {
        question: "Did you report the injury to your employer?",
        options: [
            { label: "Yes", next: "treatment", score: 20 },
            { label: "No", next: "treatment", score: 0 }
        ]
    },
    treatment: {
        question: "Have you seen a doctor for this injury?",
        options: [
            { label: "Yes", next: "complete", score: 30 },
            { label: "No", next: "complete", score: 0 }
        ]
    }
};

export const TriageEngine: React.FC = () => {
    const [category, setCategory] = useState<'PI' | 'WC' | null>(null);
    const { currentStep, setAnswer, score, reset, isComplete } = useTriageStore();
    const { setMode } = useLegalStore();
    const { setOrder } = useOrderStore();
    const navigate = useNavigate();

    const handleCategorySelect = (cat: 'PI' | 'WC') => {
        console.log(`🚀 Starting ${cat} Triage...`);
        setCategory(cat);
        // Hard reset for new flow
        useTriageStore.setState({ currentStep: cat === 'PI' ? 'fault' : 'employee', isComplete: false, score: 0 });
    };

    const currentLogic = category === 'PI' ? PI_LOGIC : WC_LOGIC;
    const step = currentLogic[currentStep];

    const handleAnswer = (next: string, stepScore: number) => {
        console.log(`✅ [Triage] Step ${currentStep} completed with score +${stepScore}`);
        setAnswer(currentStep, true, stepScore);

        if (next === 'complete') {
            const finalScore = score + stepScore;
            const mode = finalScore >= 70 ? 'ATTORNEY' : 'LDA';
            console.log(`🎯 Triage Result: Final Score ${finalScore} | Mode: ${mode}`);
            setMode(mode);

            if (mode === 'LDA') {
                const newOrder = {
                    id: Math.random().toString(36).substr(2, 9),
                    leadId: 'TEMP_LEAD',
                    serviceType: category || 'General',
                    status: 'waiting_period' as const,
                    contractSignedAt: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                };
                setOrder(newOrder);
            }

            useTriageStore.setState({ isComplete: true });
        } else {
            useTriageStore.setState({ currentStep: next });
        }
    };

    if (!category) {
        return (
            <div className="max-w-6xl mx-auto p-8 text-center animate-in fade-in slide-in-from-bottom duration-700">
                <div className="premium-label mb-8">CASE CLASSIFICATION</div>
                <h2 className="text-5xl md:text-7xl font-display font-black mb-16 italic uppercase tracking-tighter">Select Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {Object.entries(CATEGORIES).map(([id, cat]) => (
                        <button
                            key={id}
                            onClick={() => handleCategorySelect(id as 'PI' | 'WC')}
                            className="glass-card p-16 group hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="w-24 h-24 bg-blue-600/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-500">
                                {React.cloneElement(cat.icon as React.DetailedReactHTMLElement<any, HTMLElement>, { className: "w-12 h-12 text-blue-400" })}
                            </div>
                            <h3 className="text-3xl font-display font-bold mb-4 uppercase italic tracking-tight">{cat.name}</h3>
                            <p className="text-slate-400 text-lg font-body">Initialize the 2026 hybrid processing protocol.</p>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (isComplete) {
        const mode = useLegalStore.getState().mode;
        return (
            <div className="glass-card p-20 max-w-4xl mx-auto text-center animate-in zoom-in duration-700 shadow-elite border-white/10">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-green-500/20">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <div className="premium-label text-green-400 border-green-500/20 mb-6">INTAKE PROTOCOL COMPLETE</div>
                <h2 className="text-5xl md:text-7xl font-display font-black mb-8 tracking-tighter uppercase italic">Optimal Path</h2>
                <p className="text-slate-400 mb-12 text-xl font-body max-w-2xl mx-auto">
                    Our specialized logic has classified your case based on California legal thresholds:
                </p>

                <div className={`p-12 rounded-[2.5rem] mb-12 border ${mode === 'ATTORNEY' ? 'bg-blue-600/10 border-blue-600/20' : 'bg-green-600/10 border-green-600/20'
                    } relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className={`text-5xl md:text-6xl font-display font-black mb-4 uppercase italic tracking-tighter ${mode === 'ATTORNEY' ? 'text-blue-400' : 'text-green-400'}`}>
                        {mode === 'ATTORNEY' ? 'Attorney Referral' : 'LDA Document Factory'}
                    </div>
                    <div className="w-20 h-1 bg-current mx-auto opacity-20 mb-6" />
                    <p className="text-slate-300 text-xl font-body tracking-tight leading-relaxed">
                        {mode === 'ATTORNEY' ? 'Professional representation recommended for maximum recovery.' : 'Clerical assistance eligible for standard document preparation.'}
                    </p>
                </div>

                {mode === 'LDA' && <RescissionTimer />}

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center mt-12">
                    <button onClick={() => { setCategory(null); reset(); }} className="btn-secondary">RESTART PROTOCOL</button>
                    <button onClick={() => navigate('/dashboard')} className="btn-primary flex items-center group">
                        PROCEED TO DASHBOARD
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        <div className="shimmer" />
                    </button>
                </div>
            </div>
        );
    }

    if (!step) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-20 px-4 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="text-center">
                <div className="premium-label">TRIAGE STEP: {currentStep}</div>
                <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-4 leading-none uppercase italic">
                    {step.question}
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {step.options.map((opt) => (
                    <button
                        key={opt.label}
                        onClick={() => handleAnswer(opt.next, opt.score)}
                        className="group flex items-center justify-between p-12 glass-card hover:border-blue-500/50 transition-all duration-500"
                    >
                        <span className="text-4xl font-display font-black uppercase italic tracking-tighter group-hover:text-blue-400 transition-colors">
                            {opt.label}
                        </span>
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:translate-x-2 transition-all duration-500">
                            <ChevronRight className="w-10 h-10 text-blue-500" />
                        </div>
                    </button>
                ))}
            </div>

            <div className="flex items-start p-6 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl space-x-4 backdrop-blur-md">
                <AlertCircle className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
                <p className="text-sm text-slate-400 leading-relaxed font-body italic">
                    <span className="text-yellow-500 font-bold uppercase not-italic block mb-1">Legal Notice</span>
                    This automated intake system provides legal information and triage protocols for 2026 standards. It does not constitute an attorney-client relationship.
                </p>
            </div>
        </div>
    );
};
