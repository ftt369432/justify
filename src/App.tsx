import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeroSection } from './components/landing/HeroSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { PricingSection } from './components/landing/PricingSection';
import { LandingNavbar } from './components/landing/LandingNavbar';
import { LandingFooter } from './components/landing/LandingFooter';
import { TriageEngine } from './components/TriageEngine';
import { ConsumerDashboard } from './components/dashboard/ConsumerDashboard';
import { LdaDashboard } from './components/dashboard/LdaDashboard';
import { InterviewPage } from './pages/InterviewPage';
import { ReviewPage } from './pages/ReviewPage';
import { PersonalInjuryPage } from './pages/PersonalInjury';
import { WorkersCompensationPage } from './pages/WorkersCompensation';

function LandingPage() {
    return (
        <div className="bg-slate-950 min-h-screen">
            <LandingNavbar />

            <main>
                <HeroSection />

                {/* Triage Section (The "Front Door") */}
                <section id="triage" className="py-20 scroll-mt-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <TriageEngine />
                    </div>
                </section>

                <div id="features" className="scroll-mt-24">
                    <FeaturesSection />
                </div>

                <div id="pricing" className="scroll-mt-24">
                    <PricingSection />
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}

const App: React.FC = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-slate-950 font-sans text-slate-50 antialiased selection:bg-blue-500/30">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<ConsumerDashboard />} />
                    <Route path="/lda" element={<LdaDashboard />} />
                    <Route path="/interview/:serviceId" element={<InterviewPage />} />
                    <Route path="/interview/:serviceId/review" element={<ReviewPage />} /> {/* Added new route */}
                    <Route path="/personal-injury" element={<PersonalInjuryPage />} />
                    <Route path="/workers-comp" element={<WorkersCompensationPage />} />
                    {/* Placeholder routes for Auth */}
                    <Route path="/login" element={<div className="p-20 text-center">Login Page Placeholder</div>} />
                    <Route path="/signup" element={<div className="p-20 text-center">Signup Page Placeholder</div>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
