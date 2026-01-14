import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Order {
    id: string;
    leadId: string;
    serviceType: string;
    status: 'waiting_period' | 'ready' | 'processing' | 'completed';
    contractSignedAt: string;
    createdAt: string;
}

interface OrderState {
    currentOrder: Order | null;
    setOrder: (order: Order) => void;
    updateOrderStatus: (status: Order['status']) => void;
    resetOrder: () => void;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            currentOrder: null,
            setOrder: (order) => set({ currentOrder: order }),
            updateOrderStatus: (status) => set((state) => ({
                currentOrder: state.currentOrder ? { ...state.currentOrder, status } : null
            })),
            resetOrder: () => set({ currentOrder: null }),
        }),
        {
            name: 'justify-order-storage',
        }
    )
);
