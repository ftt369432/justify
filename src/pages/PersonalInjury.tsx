import React from 'react';
import { DirectAnswer } from '../components/AI-Answers/DirectAnswer';
import { ArrowLeft } from 'lucide-react';

export const PersonalInjuryPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <button className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Triage
            </button>

            <div className="mb-16">
                <h1 className="text-4xl font-black mb-4">Personal Injury Services</h1>
                <p className="text-xl text-slate-400">
                    Professional triage and document preparation for California injury claims.
                </p>
            </div>

            <div className="space-y-6">
                <DirectAnswer
                    question="How long do I have to file a personal injury claim in California?"
                    answer="Under California Code of Civil Procedure section 335.1, the general statute of limitations for personal injury cases is two years from the date of the injury. If you fail to file a lawsuit within this period, you will likely lose your right to recover damages."
                />

                <DirectAnswer
                    question="What is the difference between an LDA and an Attorney in a PI case?"
                    answer="A Legal Document Assistant (LDA) can prepare legal documents at your direction for a flat fee but cannot represent you in court or give legal advice. An attorney provides full representation, legal strategy, and trial advocacy, usually on a contingency fee basis."
                />

                <DirectAnswer
                    question="Can I still recover if I was partially at fault for the accident?"
                    answer="Yes. California follows a 'pure comparative negligence' rule. This means you can still recover damages even if you were 99% at fault, though your total recovery will be reduced by your percentage of responsibility for the accident."
                />
            </div>

            <div className="mt-20 glass-card p-12 text-center bg-blue-600/5 border-blue-600/20">
                <h3 className="text-2xl font-bold mb-4">Unsure if you need an attorney?</h3>
                <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                    Our automated triage engine can score your case in minutes to determine if an LDA or an Attorney is the right choice for you.
                </p>
                <button className="btn-primary">Start Free Triage</button>
            </div>
        </div>
    );
};
