import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
    id: string;
    message: string;
    type: ToastType;
}

const ICONS = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
};

const COLORS: Record<ToastType, string> = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const ICON_COLORS: Record<ToastType, string> = {
    success: 'text-emerald-500',
    error: 'text-red-500',
    info: 'text-blue-500',
};

function Toast({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
    const Icon = ICONS[toast.type];
    useEffect(() => {
        const t = setTimeout(() => onDismiss(toast.id), 3500);
        return () => clearTimeout(t);
    }, [toast.id, onDismiss]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg ${COLORS[toast.type]} min-w-[280px] max-w-xs`}
        >
            <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${ICON_COLORS[toast.type]}`} />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
                onClick={() => onDismiss(toast.id)}
                className="opacity-50 hover:opacity-100 transition-opacity flex-shrink-0"
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    );
}

export function ToastContainer({
    toasts,
    onDismiss,
}: {
    toasts: ToastItem[];
    onDismiss: (id: string) => void;
}) {
    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
                {toasts.map((t) => (
                    <Toast key={t.id} toast={t} onDismiss={onDismiss} />
                ))}
            </AnimatePresence>
        </div>
    );
}
