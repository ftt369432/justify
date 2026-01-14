import React from 'react';
import { DirectAnswer } from '../components/AI-Answers/DirectAnswer';
import { ArrowLeft } from 'lucide-react';

export const WorkersCompensationPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <button className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Triage
            </button>

            <div className="mb-16">
                <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">Workers' Compensation</h1>
                <p className="text-xl text-slate-400">
                    California's legal pipeline for injured workers. Accurate triage and document services.
                </p>
            </div>

            <div className="space-y-6">
                <DirectAnswer
                    question="How long do I have to report a work injury in California?"
                    answer="In California, you should report your work-related injury to your employer in writing within 30 days. Failure to do so may jeopardize your right to receive workers' compensation benefits, including medical care and disability payments."
                />

                <DirectAnswer
                    question="What is the 90-day delay rule in CA Workers' Comp?"
                    answer="If your claims administrator does not deny your claim within 90 days of you filing the claim form (DWC-1), the injury is presumed to be compensable under Labor Code section 5402. This means they generally cannot deny the claim later unless they found evidence that could not have been discovered earlier."
                />

                <DirectAnswer
                    question="Can I sue my employer in court for a work injury?"
                    answer="Generally, no. Workers' compensation is the 'exclusive remedy' for work injuries in California (Labor Code section 3600). However, there are exceptions, such as if the employer was uninsured, if there was a power press removal, or if a third party (not your employer) caused the injury."
                />
            </div>

            <div className="mt-20 glass-card p-12 text-center bg-orange-600/5 border-orange-600/20">
                <h3 className="text-2xl font-bold mb-4">Navigating DWC Forms?</h3>
                <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                    From Application for Adjudication to Lien filings, we automate the clerical heavy lifting.
                </p>
                <button className="btn-primary bg-orange-600 hover:bg-orange-700">Start Work Comp Triage</button>
            </div>
        </div>
    );
};
