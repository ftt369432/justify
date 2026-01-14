import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { InterviewLayout } from '@/components/interview/InterviewLayout';
import { getQuestionsForService, Question } from '@/lib/QuestionRegistry';
import { ArrowRight, Check } from 'lucide-react';
import { interviewService } from '@/services/interviewService';

export const InterviewPage: React.FC = () => {
    const { serviceId } = useParams();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('sessionId');
    const navigate = useNavigate();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [loading, setLoading] = useState(true);

    // Load Session & Questions
    useEffect(() => {
        const loadSession = async () => {
            const stateParam = searchParams.get('state');

            if (stateParam) {
                try {
                    const decodedState = JSON.parse(atob(stateParam));
                    console.log('📥 Received state from MedCare:', decodedState);
                    setAnswers(decodedState.answers || {});
                    if (decodedState.service_type) {
                        setQuestions(getQuestionsForService(decodedState.service_type));
                    }
                } catch (error) {
                    console.error('Failed to parse state from URL:', error);
                }
            } else if (sessionId) {
                try {
                    const session = await interviewService.getSession(sessionId);
                    setAnswers(session.answers || {});
                    setCurrentStepIndex(session.current_step || 0);
                    // Use the service type from the session if available, or URL
                    const type = session.service_type || serviceId;
                    if (type) {
                        setQuestions(getQuestionsForService(type));
                    }
                } catch (error) {
                    console.error('Failed to load session:', error);
                }
            } else if (serviceId) {
                // Fallback for demo without session ID
                setQuestions(getQuestionsForService(serviceId));
            }
            setLoading(false);
        };
        loadSession();
    }, [sessionId, serviceId, searchParams]);

    const currentQuestion = questions[currentStepIndex];

    // Compute progress
    const progress = Math.round(((currentStepIndex + 1) / questions.length) * 100);

    const handleAnswer = (value: any) => {
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);
    };

    const handleNext = async () => {
        // Logic to skip questions based on conditions
        let nextIndex = currentStepIndex + 1;
        while (nextIndex < questions.length) {
            const nextQ = questions[nextIndex];
            if (!nextQ.condition || nextQ.condition(answers)) {
                break;
            }
            nextIndex++;
        }

        if (nextIndex < questions.length) {
            setCurrentStepIndex(nextIndex);

            // Auto-Save to DB
            if (sessionId) {
                try {
                    await interviewService.updateProgress(sessionId, answers, nextIndex);
                } catch (error) {
                    console.error('Failed to save progress:', error);
                }
            }

        } else {
            // End of interview
            console.log('Interview Complete:', answers);
            if (sessionId) {
                await interviewService.completeSession(sessionId);
            }
            navigate(`/interview/${encodeURIComponent(serviceId || 'default')}/review${sessionId ? `?sessionId=${sessionId}` : ''}`);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            let prevIndex = currentStepIndex - 1;
            // Logic to find previous valid question
            while (prevIndex >= 0) {
                const prevQ = questions[prevIndex];
                if (!prevQ.condition || prevQ.condition(answers)) {
                    break;
                }
                prevIndex--;
            }
            setCurrentStepIndex(prevIndex);
        } else {
            navigate('/dashboard');
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <InterviewLayout
            title={serviceId || 'New Matter'}
            progress={progress}
            currentStep={currentStepIndex + 1}
            totalSteps={questions.length}
            onBack={handleBack}
        >
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-500">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                        {currentQuestion.title}
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-body max-w-2xl mx-auto leading-relaxed">
                        {currentQuestion.description}
                    </p>
                </div>

                <div className="max-w-xl mx-auto py-8">
                    {/* Input Rendering based on Type */}
                    {currentQuestion.type === 'TEXT' && (
                        <input
                            autoFocus
                            type="text"
                            className="w-full text-2xl p-4 border-b-2 border-slate-200 dark:border-white/10 bg-transparent outline-none focus:border-blue-500 transition-colors text-center text-slate-900 dark:text-white placeholder:text-slate-300"
                            placeholder="Type your answer..."
                            value={answers[currentQuestion.id] || ''}
                            onChange={(e) => handleAnswer(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                        />
                    )}

                    {currentQuestion.type === 'DATE' && (
                        <input
                            autoFocus
                            type="date"
                            className="w-full text-2xl p-4 border-b-2 border-slate-200 dark:border-white/10 bg-transparent outline-none focus:border-blue-500 transition-colors text-center text-slate-900 dark:text-white"
                            value={answers[currentQuestion.id] || ''}
                            onChange={(e) => handleAnswer(e.target.value)}
                        />
                    )}

                    {currentQuestion.type === 'YESNO' && (
                        <div className="grid grid-cols-2 gap-6">
                            <button
                                onClick={() => { handleAnswer(true); setTimeout(handleNext, 200); }}
                                className={`h-32 rounded-2xl border-2 flex items-center justify-center text-xl font-bold transition-all ${answers[currentQuestion.id] === true ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-slate-200 dark:border-white/10 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'}`}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => { handleAnswer(false); setTimeout(handleNext, 200); }}
                                className={`h-32 rounded-2xl border-2 flex items-center justify-center text-xl font-bold transition-all ${answers[currentQuestion.id] === false ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-slate-200 dark:border-white/10 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'}`}
                            >
                                No
                            </button>
                        </div>
                    )}

                    {currentQuestion.type === 'CHOICE' && currentQuestion.options && (
                        <div className="grid grid-cols-1 gap-4">
                            {currentQuestion.options.map((opt: { label: string; value: string; icon?: string }) => (
                                <button
                                    key={opt.value}
                                    onClick={() => { handleAnswer(opt.value); setTimeout(handleNext, 200); }}
                                    className={`p-6 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${answers[currentQuestion.id] === opt.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-slate-200 dark:border-white/10 hover:border-blue-300 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                >
                                    <span className={`font-bold text-lg ${answers[currentQuestion.id] === opt.value ? 'text-blue-700 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>{opt.label}</span>
                                    {answers[currentQuestion.id] === opt.value && <Check className="w-5 h-5 text-blue-500" />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {currentQuestion.type !== 'YESNO' && currentQuestion.type !== 'CHOICE' && (
                    <div className="text-center">
                        <button
                            onClick={handleNext}
                            disabled={!answers[currentQuestion.id]}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
                        >
                            Continue <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </InterviewLayout>
    );
};
