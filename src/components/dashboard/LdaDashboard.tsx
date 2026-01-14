import React from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Users, FileOutput, Clock, MessageSquare, ArrowRight, UserPlus, Filter, Briefcase } from 'lucide-react';

export const LdaDashboard: React.FC = () => {
    return (
        <DashboardLayout userType="LDA">
            {/* Header / Stats Row */}
            <div className="flex items-end justify-between mb-8 border-b border-slate-200 dark:border-white/5 pb-8">
                <div>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                        <Briefcase className="w-3 h-3" />
                        <span>Professional Version</span>
                    </div>
                    <h1 className="text-3xl font-sans font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                        Firm Dashboard
                    </h1>
                    <p className="text-slate-500 text-base font-medium">Monitoring matter lifecycle and document production.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-5 py-2.5 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-white/10 flex items-center transition-all font-bold tracking-tight text-xs shadow-sm">
                        <Filter className="mr-2 w-4 h-4" /> Filter Views
                    </button>
                    <button className="px-5 py-2.5 bg-[#2E8540] hover:bg-[#256D34] text-white rounded-md flex items-center shadow-md transition-all font-bold tracking-tight text-xs">
                        <UserPlus className="mr-2 w-4 h-4" /> Add New Client
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid - High Density Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <StatCard label="Inbound Leads" value="12" color="blue" icon={<Users className="w-5 h-5" />} />
                <StatCard label="In Production" value="8" color="yellow" icon={<Clock className="w-5 h-5" />} />
                <StatCard label="Ready to Seal" value="5" color="green" icon={<FileOutput className="w-5 h-5" />} />
                <StatCard label="Unread Messages" value="4" color="purple" icon={<MessageSquare className="w-5 h-5" />} />
            </div>

            {/* Main Content Area: Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Service Queue (Incoming Leads) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Active Matters</h2>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">Live Timeline</span>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-[#F8FAFC] dark:bg-white/5 border-b border-slate-100 dark:border-white/5 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Client / Matter</th>
                                    <th className="px-6 py-4">Practice Area</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-white/5 text-slate-600 dark:text-slate-300 text-[13px]">
                                <QueueRow name="Maria Gonzalez" type="Social Security (SSDI)" status="New Lead" />
                                <QueueRow name="Robert Chen" type="Workers' Comp" status="Intake Ready" />
                                <QueueRow name="Sarah Miller" type="Divorce / Family" status="Doc Prep" />
                                <QueueRow name="James Wilson" type="Bankruptcy (Ch 7)" status="Reviewing" />
                                <QueueRow name="Elena Rodriguez" type="Immigration (Visa)" status="Drafting" />
                                <QueueRow name="David Kim" type="Living Trust / Will" status="Signing" />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Drafting Suite / Quick Actions */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Quick Actions</h2>

                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/5 p-6 shadow-sm space-y-3">
                        <ActionButton title="New SSDI Application" desc="Form SSA-16" />
                        <ActionButton title="Divorce Petition" desc="Form FL-100" />
                        <ActionButton title="Bankruptcy Petition" desc="Voluntary Petition" />
                        <ActionButton title="DWC-1 Claim Form" desc="Workers' Comp" />
                        <div className="h-px bg-slate-100 dark:bg-white/10 my-4" />
                        <button className="w-full py-2.5 text-center text-[#0077D4] font-bold tracking-tight text-xs hover:bg-[#0077D4]/5 rounded-md transition-colors">
                            Access Document Vault
                        </button>
                    </div>

                    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-white shadow-xl">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Compliance Guard</h3>
                        <ul className="space-y-3 text-xs mb-6">
                            <li className="flex items-center text-slate-300"><span className="w-2 h-2 rounded-full bg-green-500 mr-3 animate-pulse"></span> LDA Bond #2026 Active</li>
                            <li className="flex items-center text-slate-300"><span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span> Verified Disclosure Flow</li>
                            <li className="flex items-center text-slate-300"><span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span> Standard LDA Contract</li>
                        </ul>
                        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold tracking-tight text-xs transition-colors shadow-lg shadow-blue-500/20">
                            Run Liability Audit
                        </button>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

const StatCard = ({ label, value, color, icon }: any) => {
    const colorClasses: any = {
        blue: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10',
        yellow: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10',
        green: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10',
        purple: 'text-purple-600 bg-purple-50 dark:bg-purple-500/10'
    };
    return (
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
            <div>
                <div className="text-slate-500 dark:text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-1">{label}</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</div>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                {icon}
            </div>
        </div>
    );
};

const QueueRow = ({ name, type, status }: any) => {
    const statusColors: any = {
        'New Lead': 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-400/10',
        'Intake Ready': 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-400/10',
        'Doc Prep': 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-400/10',
        'Reviewing': 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-400/10',
        'Drafting': 'text-cyan-600 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-400/10',
        'Signing': 'text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-400/10'
    };
    return (
        <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer">
            <td className="px-6 py-4">
                <div className="font-bold text-slate-900 dark:text-white">#{Math.floor(Math.random() * 9000) + 1000} - {name}</div>
                <div className="text-[11px] text-slate-400 font-medium">Updated 2h ago</div>
            </td>
            <td className="px-6 py-4 font-medium text-slate-500">{type}</td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${statusColors[status] || 'text-slate-400'}`}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-[#0077D4] transition-colors p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-md">
                    <ArrowRight className="w-4 h-4" />
                </button>
            </td>
        </tr>
    );
};

const ActionButton = ({ title, desc }: any) => (
    <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all group">
        <div className="flex items-center justify-between mb-0.5">
            <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-[#0077D4] transition-colors text-sm">{title}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-500 group-hover:translate-x-1 transition-transform" />
        </div>
        <div className="text-[11px] text-slate-400 font-medium">{desc}</div>
    </button>
);
