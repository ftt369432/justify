import { create } from 'zustand';

interface LegalContext {
    mode: 'LDA' | 'ATTORNEY';
    config: {
        title: string;
        disclosure: string;
        idNumber?: string;
        attorneyName?: string;
        firmAddress?: string;
    };
}

interface LegalState extends LegalContext {
    setMode: (mode: 'LDA' | 'ATTORNEY') => void;
}

export const useLegalStore = create<LegalState>((set) => ({
    mode: 'LDA',
    config: {
        title: "Justify | Document Preparation",
        disclosure: "Justify is a Legal Document Assistant service. We are not a law firm and do not provide legal advice.",
        idNumber: "LDA #PENDING",
    },
    setMode: (mode) => set((state) => ({
        mode,
        config: mode === 'LDA'
            ? {
                title: "Justify | Document Preparation",
                disclosure: "Justify is a Legal Document Assistant service. We are not a law firm and do not provide legal advice.",
                idNumber: "LDA #PENDING",
            }
            : {
                title: "Justify | Legal Referral",
                disclosure: "Legal services provided by Partner Law Firm, PC. This is an advertisement.",
                attorneyName: "Partner Attorney, Esq.",
                firmAddress: "123 Legal Way, CA",
            }
    })),
}));
