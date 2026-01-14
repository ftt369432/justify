import { create } from 'zustand';

export type TriageMode = 'LDA' | 'ATTORNEY' | 'UNDETERMINED';

interface TriageState {
    currentStep: string;
    answers: Record<string, any>;
    score: number;
    mode: TriageMode;
    isComplete: boolean;

    setAnswer: (stepId: string, answer: any, scoreModifier: number) => void;
    reset: () => void;
}

export const useTriageStore = create<TriageState>((set) => ({
    currentStep: 'intro',
    answers: {},
    score: 0,
    mode: 'UNDETERMINED',
    isComplete: false,

    setAnswer: (stepId, answer, scoreModifier) => set((state) => {
        const newAnswers = { ...state.answers, [stepId]: answer };
        const newScore = state.score + scoreModifier;

        return {
            answers: newAnswers,
            score: newScore,
        };
    }),

    reset: () => set({
        currentStep: 'intro',
        answers: {},
        score: 0,
        mode: 'UNDETERMINED',
        isComplete: false,
    }),
}));
