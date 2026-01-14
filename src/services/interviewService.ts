import { supabase } from './supabaseClient'; // Assuming you have a centralized client

export interface InterviewSession {
    id: string;
    user_id: string;
    service_type: string;
    status: 'in_progress' | 'completed' | 'generating';
    current_step: number;
    answers: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export const interviewService = {
    /**
     * Creates a new interview session for a user.
     */
    async createSession(serviceType: string, initialData: any = {}) {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            // fallback for dev/demo if no auth, though SQL requires user_id
            // Ideally we throw error or handle anonymous state
            console.warn("No user logged in. Session creation might fail if RLS enforces auth.");
            // For prototype without Auth, we might need a mock ID or skip DB
        }

        const { data, error } = await supabase
            .from('interview_sessions')
            .insert({
                user_id: user?.id,
                service_type: serviceType,
                answers: initialData,
                status: 'in_progress',
                current_step: 0
            })
            .select()
            .single();

        if (error) throw error;
        return data as InterviewSession;
    },

    /**
     * Retrieves an existing session by ID.
     */
    async getSession(sessionId: string) {
        const { data, error } = await supabase
            .from('interview_sessions')
            .select('*')
            .eq('id', sessionId)
            .single();

        if (error) throw error;
        return data as InterviewSession;
    },

    /**
     * Updates the answers and current step of a session.
     */
    async updateProgress(sessionId: string, answers: any, currentStep: number) {
        const { data, error } = await supabase
            .from('interview_sessions')
            .update({
                answers,
                current_step: currentStep,
                updated_at: new Date().toISOString()
            })
            .eq('id', sessionId)
            .select()
            .single();

        if (error) throw error;
        return data as InterviewSession;
    },

    /**
     * Marks the session as completed.
     */
    async completeSession(sessionId: string) {
        const { data, error } = await supabase
            .from('interview_sessions')
            .update({
                status: 'completed'
            })
            .eq('id', sessionId)
            .select()
            .single();

        if (error) throw error;
        return data as InterviewSession;
    }
};
