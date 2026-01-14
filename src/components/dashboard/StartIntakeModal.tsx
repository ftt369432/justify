import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { interviewService } from '@/services/interviewService';
import { useTranslation } from 'react-i18next';

interface StartIntakeModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceType: string;
}

export const StartIntakeModal: React.FC<StartIntakeModalProps> = ({ isOpen, onClose, serviceType }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const { t } = useTranslation();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Create real session in DB
            const session = await interviewService.createSession(serviceType, {
                // We could pass the intake form data here as initial answers
                client_name_first: (e.target as any)[0].value,
                client_name_last: (e.target as any)[1].value,
                client_email: (e.target as any)[2].value,
                client_phone: (e.target as any)[3].value,
            });

            console.log('Session Created:', session);

            setLoading(false);
            setStep(2); // Move to success/redirect state

            // Auto redirect to interview with Session ID
            setTimeout(() => {
                navigate(`/interview/${encodeURIComponent(serviceType)}?sessionId=${session.id}`);
            }, 1000);

        } catch (error) {
            console.error('Failed to create session:', error);
            setLoading(false);
            // Optionally show error state
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-white/10">
                {/* Header */}
                <div className="bg-slate-50 dark:bg-white/5 p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">{t('dashboard.newMatter')}</div>
                        <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white italic">{serviceType}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8">
                    {step === 1 ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-xl flex gap-3 text-sm text-blue-800 dark:text-blue-300">
                                <ShieldCheck className="w-5 h-5 shrink-0" />
                                <p className="leading-relaxed">
                                    <strong>Compliance Notice:</strong> {t('common.legalDisclaimer')}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-slate-500">First Name</label>
                                    <input required type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Legal First Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Last Name</label>
                                    <input required type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Legal Last Name" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Email Address</label>
                                <input required type="email" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="For case notifications" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Phone Number</label>
                                <input required type="tel" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="(555) 000-0000" />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center uppercase tracking-widest text-sm"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{t('common.start')} Questionnaire <ArrowRight className="ml-2 w-5 h-5" /></>}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-8 animate-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">Matter Created!</h3>
                            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Case file #{Math.floor(Math.random() * 10000)} initialized.</p>
                            <div className="flex items-center justify-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-sm animate-pulse">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Redirecting to Interview...
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
