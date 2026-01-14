import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SCREENER_PROMPT = `
You are the Justify AI Screener. Your goal is to qualify California legal leads.
Ask about fault, injury severity, and medical treatment.
Rule: If Score >= 70, route to ATTORNEY. Else, route to LDA.
`

serve(async (req) => {
    try {
        const { leadId, message, conversationHistory } = await req.json()

        // 1. Initialize Supabase Client
        // 2. Call OpenAI/Anthropic for the next response in the triage flow
        // 3. Update the lead's score in the DB

        return new Response(
            JSON.stringify({
                reply: "I've analyzed your situation. Based on the injuries, you may qualify for a referral to our partner firm.",
                nextAction: "REQUEST_FOLLOW_UP"
            }),
            { headers: { "Content-Type": "application/json" } }
        )
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
})
