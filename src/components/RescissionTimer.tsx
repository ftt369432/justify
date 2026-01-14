import React, { useState, useEffect } from 'react';
import { useOrderStore } from '../store/useOrderStore';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export const RescissionTimer: React.FC = () => {
    const { currentOrder } = useOrderStore();
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if (!currentOrder) return;

        const calculateTime = () => {
            const created = new Date(currentOrder.createdAt).getTime();
            const expires = created + (24 * 60 * 60 * 1000); // 24 Hours
            const now = new Date().getTime();
            const diff = expires - now;

            if (diff <= 0) {
                setIsExpired(true);
                setTimeLeft('Complete');
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);
        return () => clearInterval(interval);
    }, [currentOrder]);

    if (!currentOrder) return null;

    return (
        <div className="glass-card p-6 border-blue-500/20 bg-blue-500/5 max-w-md mx-auto my-8">
            <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-xl ${isExpired ? 'bg-green-500/10' : 'bg-orange-500/10'}`}>
                    {isExpired ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                        <Clock className="w-6 h-6 text-orange-500 animate-pulse" />
                    )}
                </div>
                <div>
                    <h4 className="font-bold text-lg">
                        {isExpired ? 'Rescission Period Complete' : '24-Hour Cool-Down'}
                    </h4>
                    <p className="text-sm text-slate-400">
                        California B&P 6410 Compliance
                    </p>
                </div>
            </div>

            <div className="bg-black/40 rounded-xl p-4 text-center mb-6">
                <span className="text-3xl font-mono font-black tracking-widest text-white">
                    {timeLeft}
                </span>
            </div>

            {!isExpired ? (
                <div className="flex items-start space-x-3 p-3 bg-orange-500/5 rounded-lg border border-orange-500/10">
                    <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <p className="text-xs text-slate-400">
                        Per CA law, you have 24 hours to rescind this contract and receive a full refund. Document generation will begin once this period expires.
                    </p>
                </div>
            ) : (
                <button className="btn-primary w-full pulse-blue">
                    Generate Documents Now
                </button>
            )}
        </div>
    );
};
