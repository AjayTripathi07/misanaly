import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Upload, Sparkles } from 'lucide-react';

type Step = 'upload' | 'processing' | 'review' | 'success';

const STEPS: Step[] = ['upload', 'processing', 'review', 'success'];

const SAMPLE_ROWS = [
    { description: 'NEFT/Sharma Traders/Invoice 4021', ledger: 'Sales Account', amount: '₹1,24,500' },
    { description: 'UPI/Ravi Enterprises/Vendor Pmt', ledger: 'Purchase Account', amount: '₹38,200' },
];

/**
 * Non-interactive, auto-cycling preview of the full simulator on the
 * Statement2Books product page — used as a homepage teaser illustration.
 */
export default function StatementSimulatorPreview() {
    const prefersReduced = useReducedMotion();
    const [step, setStep] = useState<Step>('upload');

    useEffect(() => {
        if (prefersReduced) return; // static frame for reduced-motion users
        const interval = setInterval(() => {
            setStep((prev) => STEPS[(STEPS.indexOf(prev) + 1) % STEPS.length]);
        }, 2200);
        return () => clearInterval(interval);
    }, [prefersReduced]);

    const variants = {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
    };

    return (
        <motion.div
            animate={{ y: prefersReduced ? 0 : [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full max-w-md"
        >
            {/* Floating time-saved chip */}
            <motion.div
                animate={{ y: prefersReduced ? 0 : [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="absolute -top-4 -right-4 z-10 bg-white text-[#0F172A] text-xs font-semibold rounded-full px-4 py-2 shadow-xl flex items-center gap-1.5"
            >
                ⏱ Time Saved · <span className="font-mono text-[#2563EB]">3 hrs/day</span>
            </motion.div>

            <div className="rounded-2xl border border-blue-500/40 shadow-2xl shadow-blue-900/50 overflow-hidden bg-[#0D1117] min-h-[300px] flex flex-col">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-white/10 flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-3 text-xs text-gray-400 font-mono">Statement2Books v1.3</span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {step === 'upload' && (
                            <motion.div key="upload" {...variants} transition={{ duration: 0.35 }} className="text-center">
                                <Upload className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                                <p className="text-white text-sm font-medium">Uploading bank statement…</p>
                                <p className="text-gray-500 text-xs mt-1 font-mono">HDFC_Statement_Jul26.pdf</p>
                            </motion.div>
                        )}

                        {step === 'processing' && (
                            <motion.div key="processing" {...variants} transition={{ duration: 0.35 }}>
                                <div className="flex items-center gap-2 mb-4 justify-center">
                                    <Sparkles className="h-5 w-5 text-blue-400 animate-pulse" />
                                    <span className="text-white text-sm font-medium">AI processing transactions…</span>
                                </div>
                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                        initial={{ width: '10%' }}
                                        animate={{ width: '90%' }}
                                        transition={{ duration: 1.8, ease: 'easeInOut' }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 'review' && (
                            <motion.div key="review" {...variants} transition={{ duration: 0.35 }}>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-white text-sm font-semibold">Review Entries</span>
                                    <span className="bg-green-500/20 text-green-400 text-[11px] font-mono font-semibold rounded-full px-2.5 py-1">
                                        98.7% Accuracy
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {SAMPLE_ROWS.map((row, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                                            <p className="text-white text-xs truncate">{row.description}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-blue-300 text-[11px]">{row.ledger}</span>
                                                <span className="text-white text-xs font-mono font-semibold">{row.amount}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div key="success" {...variants} transition={{ duration: 0.35 }} className="flex flex-col items-center text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                    className="w-14 h-14 bg-green-400/20 rounded-full flex items-center justify-center mb-3"
                                >
                                    <CheckCircle2 className="h-7 w-7 text-green-400" />
                                </motion.div>
                                <p className="text-white font-bold text-base">Tally Export Complete!</p>
                                <p className="text-gray-500 text-xs mt-1">Entries synced — zero manual typing.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
