import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { interviewService } from '@/services/interviewService';
import { getQuestionsForService, Question } from '@/lib/QuestionRegistry';
import { documentEngine } from '@/lib/DocumentEngine';
import { FileText, CheckCircle, ArrowRight, Edit2, Loader2 } from 'lucide-react';

export const ReviewPage: React.FC = () => {
    const { serviceId } = useParams();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('sessionId');
    const navigate = useNavigate();

    const [answers, setAnswers] = useState<any>({});
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (sessionId) {
                const session = await interviewService.getSession(sessionId);
                setAnswers(session.answers || {});
                const type = session.service_type || serviceId || 'divorce';
                setQuestions(getQuestionsForService(type));
            } else if (serviceId) {
                setQuestions(getQuestionsForService(serviceId));
            }
            setLoading(false);
        };
        loadData();
    }, [sessionId, serviceId]);

    const handleGenerate = async () => {
        setGenerating(true);
        try {
            // Determine service type (fallback to 'divorce' for demo)
            const type = serviceId?.includes('Bankruptcy') ? 'bankruptcy' : 'divorce';

            const pdfUrl = await documentEngine.generateDocument(type, answers);

            // Trigger Download
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `Justify_Legal_Docs_${type}_${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (sessionId) {
                await interviewService.completeSession(sessionId);
            }

            alert('Document Package Generated Successfully!');
            navigate('/dashboard');
        } catch (e) {
            console.error(e);
            alert('Error generating documents. Please try again.');
        } finally {
            setGenerating(false);
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-blue-600" /></div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 text-blue-600 dark:text-blue-400">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Review Your Information</h1>
                    <p className="text-slate-500 dark:text-slate-400">Please verify your answers before we generate your legal documents.</p>
                </div>

                {/* Summary Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
                        <span className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest text-sm">Questionnaire Summary</span>
                        <span className="text-xs text-slate-400">{questions.length} Questions Answered</span>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-white/5">
                        {questions.map((q) => {
                            // Only show if condition met (was asked)
                            if (q.condition && !q.condition(answers)) return null;

                            return (
                                <div key={q.id} className="p-6 flex items-start justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                    <div className="pr-4">
                                        <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">{q.title}</div>
                                        <div className="text-lg font-medium text-slate-900 dark:text-white">
                                            {answers[q.id]?.toString() || <span className="text-slate-300 italic">Not Answered</span>}
                                        </div>
                                    </div>
                                    <button
                                        className="opacity-0 group-hover:opacity-100 p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                                        title="Edit Answer"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex justify-end gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-4 rounded-xl font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        Back to Edit
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={generating}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg flex items-center gap-2"
                    >
                        {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                        {generating ? 'Processing...' : 'Generate Documents'}
                    </button>
                </div>

            </div>
        </div>
    );
};
