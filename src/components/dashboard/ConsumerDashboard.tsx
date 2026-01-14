import React from 'react';
import { DashboardLayout } from './DashboardLayout';
import { ServiceCard } from './ServiceCard';
import { StartIntakeModal } from './StartIntakeModal';
import { CheckCircle2, AlertCircle, ArrowRight, TrendingUp, Scale, ShieldCheck, Users, Gavel, FileText } from 'lucide-react';

export const ConsumerDashboard: React.FC = () => {
    const [intakeOpen, setIntakeOpen] = React.useState(false);
    const [selectedService, setSelectedService] = React.useState('');

    const handleServiceStart = (service: string) => {
        setSelectedService(service);
        setIntakeOpen(true);
    };

    return (
        <DashboardLayout userType="CONSUMER">
            <StartIntakeModal
                isOpen={intakeOpen}
                onClose={() => setIntakeOpen(false)}
                serviceType={selectedService}
            />
            {/* Greeting Block */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-display font-black text-slate-900 dark:text-white italic uppercase tracking-tighter mb-2">
                        Welcome back, Frank.
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-body">Case ID: #WC-2026-8821 • Status: <span className="text-green-500 dark:text-green-400 font-bold">Active</span></p>
                </div>
                <div className="hidden md:block">
                    <button className="btn-primary flex items-center text-sm py-3 px-6">
                        Upload Document <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* ZenBusiness "Next Up" Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ActionCard
                    title="Compliance Score"
                    icon={<TrendingUp className="w-8 h-8 text-green-500 dark:text-green-400" />}
                    desc="Your case file is 85% compliant. Review pending items."
                    action="View Report"
                    color="green"
                />
                <ActionCard
                    title="Medical Review"
                    icon={<AlertCircle className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />}
                    desc="QME Panel request pending. Action required by 01/20/2026."
                    action="Sign Request"
                    color="yellow"
                />
                {/* Attorney Referral Bridge */}
                <div className="p-8 rounded-[2rem] border border-blue-200 dark:border-white/5 bg-gradient-to-br from-blue-500/[0.05] to-transparent relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Scale className="w-32 h-32 text-blue-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                            <ShieldCheck className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-3 italic uppercase tracking-tight">Need Legal Advice?</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 h-12">
                            Our LDAs cannot provide legal advice. For strategy or counsel, consult an attorney.
                        </p>
                        <button className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs flex items-center group-hover:translate-x-2 transition-transform">
                            Find an Attorney <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Service Springboard */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-display font-black text-slate-900 dark:text-white italic uppercase tracking-tight">Start a New Matter</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Select a service to begin document preparation. We are LDAs, not attorneys.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ServiceCard
                        title="Divorce & Family"
                        description="Start your dissolution, custody, or support modification documents."
                        icon={<Users className="w-6 h-6" />}
                        color="rose"
                        onClick={() => handleServiceStart('Divorce & Family Law')}
                    />
                    <ServiceCard
                        title="Bankruptcy"
                        description="Prepare Chapter 7 or Chapter 13 petitions for filing."
                        icon={<Scale className="w-6 h-6" />}
                        color="emerald"
                        onClick={() => handleServiceStart('Bankruptcy Petition')}
                    />
                    <ServiceCard
                        title="Living Trust"
                        description="Protect your assets with a complete estate planning package."
                        icon={<FileText className="w-6 h-6" />}
                        color="blue"
                        onClick={() => handleServiceStart('Living Trust & Estate')}
                    />
                    <ServiceCard
                        title="Small Claims"
                        description="Draft your Plaintiff's Claim and Order to Go to Small Claims Court."
                        icon={<Gavel className="w-6 h-6" />}
                        color="amber"
                        onClick={() => handleServiceStart('Small Claims')}
                    />
                </div>
            </div>

            {/* Document List Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-display font-black text-slate-900 dark:text-white italic uppercase tracking-tight">Recent Filings</h2>
                    <a href="#" className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-bold uppercase tracking-widest">View All</a>
                </div>

                <div className="glass-card p-0 overflow-hidden bg-white dark:bg-white/[0.03] border-slate-200 dark:border-white/10 shadow-sm dark:shadow-elite">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400 font-display font-bold uppercase tracking-widest">
                            <tr>
                                <th className="px-8 py-6">Document Name</th>
                                <th className="px-8 py-6">Date Filed</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300 text-sm font-body">
                            <DocRow name="DWC-1 Claim Form" date="Jan 10, 2026" status="Filed" />
                            <DocRow name="Application for Adjudication" date="Jan 12, 2026" status="Pending" />
                            <DocRow name="QME Panel Request (Form 106)" date="-" status="Draft" />
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

const ActionCard = ({ title, icon, desc, action, color }: { title: string, icon: React.ReactNode, desc: string, action: string, color: 'green' | 'yellow' }) => {
    const colorVariants = {
        green: {
            wrapper: 'dark:from-green-500/[0.05] hover:border-green-500/30',
            iconBg: 'bg-green-500/10 border-green-500/20',
            button: 'text-green-600 dark:text-green-400'
        },
        yellow: {
            wrapper: 'dark:from-yellow-500/[0.05] hover:border-yellow-500/30',
            iconBg: 'bg-yellow-500/10 border-yellow-500/20',
            button: 'text-yellow-600 dark:text-yellow-400'
        }
    };

    const variant = colorVariants[color];

    return (
        <div className={`p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-transparent ${variant.wrapper} transition-all duration-500 group relative overflow-hidden shadow-sm dark:shadow-none`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border group-hover:scale-110 transition-transform duration-500 ${variant.iconBg}`}>
                {icon}
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-3 italic uppercase tracking-tight">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 h-12">{desc}</p>
            <button className={`${variant.button} font-bold uppercase tracking-widest text-xs flex items-center group-hover:translate-x-2 transition-transform`}>
                {action} <ArrowRight className="ml-2 w-4 h-4" />
            </button>
        </div>
    );
};

const DocRow = ({ name, date, status }: any) => {
    const statusColors: any = { 'Filed': 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-400/10', 'Pending': 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-400/10', 'Draft': 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-400/10' };
    return (
        <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
            <td className="px-8 py-6 font-bold text-slate-900 dark:text-white">{name}</td>
            <td className="px-8 py-6 text-slate-500">{date}</td>
            <td className="px-8 py-6">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${statusColors[status]}`}>
                    {status}
                </span>
            </td>
            <td className="px-8 py-6 text-right">
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-bold text-xs uppercase tracking-widest">View</button>
            </td>
        </tr>
    );
};
