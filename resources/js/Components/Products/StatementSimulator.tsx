import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CheckCircle2, RotateCcw, Sparkles, Upload } from 'lucide-react';

type Step = 'upload' | 'processing' | 'review' | 'success';

interface BankOption {
    id: string;
    name: string;
    color: string;
}

const BANKS: BankOption[] = [
    { id: 'sbi', name: 'SBI', color: 'bg-[#2D6A4F]' },
    { id: 'hdfc', name: 'HDFC', color: 'bg-[#004C8F]' },
    { id: 'icici', name: 'ICICI', color: 'bg-[#B4530A]' },
    { id: 'axis', name: 'Axis', color: 'bg-[#97144D]' },
];

interface Transaction {
    date: string;
    description: string;
    debitCredit: 'Debit' | 'Credit';
    amount: string;
    ledger: string;
}

const BANK_SAMPLES: Record<string, Transaction[]> = {
    sbi: [
        { date: '04-Jul-26', description: 'NEFT/Sharma Traders/Invoice 4021', debitCredit: 'Credit', amount: '₹1,24,500', ledger: 'Sales Account' },
        { date: '06-Jul-26', description: 'UPI/Ravi Enterprises/Vendor Pmt', debitCredit: 'Debit', amount: '₹38,200', ledger: 'Purchase Account' },
        { date: '09-Jul-26', description: 'GST TDS DEDUCTED', debitCredit: 'Debit', amount: '₹2,340', ledger: 'TDS Receivable' },
    ],
    hdfc: [
        { date: '03-Jul-26', description: 'IMPS-Patel Exports-Settlement', debitCredit: 'Credit', amount: '₹87,650', ledger: 'Sales Account' },
        { date: '05-Jul-26', description: 'ACH DEBIT-Office Rent Jul26', debitCredit: 'Debit', amount: '₹45,000', ledger: 'Rent Expense' },
        { date: '08-Jul-26', description: 'SALARY CREDIT-Payroll Batch', debitCredit: 'Debit', amount: '₹3,12,000', ledger: 'Salary Payable' },
    ],
    icici: [
        { date: '02-Jul-26', description: 'NEFT-Mumbai Distributors-Recv', debitCredit: 'Credit', amount: '₹2,05,000', ledger: 'Sales Account' },
        { date: '07-Jul-26', description: 'RTGS-Raw Material Supplier', debitCredit: 'Debit', amount: '₹96,400', ledger: 'Purchase Account' },
        { date: '10-Jul-26', description: 'BANK CHARGES-RTGS FEE', debitCredit: 'Debit', amount: '₹590', ledger: 'Bank Charges' },
    ],
    axis: [
        { date: '01-Jul-26', description: 'UPI/Delhi Retailers/Order 9182', debitCredit: 'Credit', amount: '₹64,300', ledger: 'Sales Account' },
        { date: '06-Jul-26', description: 'NACH-Insurance Premium', debitCredit: 'Debit', amount: '₹18,750', ledger: 'Insurance Expense' },
        { date: '09-Jul-26', description: 'GST OUTPUT LIABILITY', debitCredit: 'Debit', amount: '₹11,610', ledger: 'GST Payable' },
    ],
};

const LOG_MESSAGES = [
    'Parsing PDF tabular cells…',
    'Detecting statement layout…',
    'Applying AI heuristic model…',
    'Matching Tally ledgers…',
    'Cross-checking GST tags…',
    'Finalising voucher entries…',
];

export default function StatementSimulator() {
    const prefersReduced = useReducedMotion();
    const [step, setStep] = useState<Step>('upload');
    const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);
    const [progress, setProgress] = useState(0);
    const [logIndex, setLogIndex] = useState(0);

    function startProcessing(bank: BankOption) {
        setSelectedBank(bank);
        setStep('processing');
        setProgress(0);
        setLogIndex(0);
    }

    useEffect(() => {
        if (step !== 'processing') return;
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = Math.min(prev + 4, 100);
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setStep('review'), 300);
                }
                return next;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [step]);

    useEffect(() => {
        if (step !== 'processing') return;
        const interval = setInterval(() => {
            setLogIndex((prev) => (prev + 1) % LOG_MESSAGES.length);
        }, 500);
        return () => clearInterval(interval);
    }, [step]);

    function reset() {
        setStep('upload');
        setSelectedBank(null);
        setProgress(0);
        setLogIndex(0);
    }

    const transactions = selectedBank ? BANK_SAMPLES[selectedBank.id] : [];

    const variants = {
        initial: { opacity: 0, x: prefersReduced ? 0 : 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: prefersReduced ? 0 : -24 },
    };

    return (
        <div className="relative w-full max-w-md">
            {/* Floating time-saved chip */}
            <motion.div
                animate={{ y: prefersReduced ? 0 : [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-4 z-10 bg-white text-[#0F172A] text-xs font-semibold rounded-full px-4 py-2 shadow-xl flex items-center gap-1.5"
            >
                ⏱ Time Saved · <span className="font-mono text-[#2563EB]">3 hrs/day</span>
            </motion.div>

            <div className="rounded-2xl border border-blue-500/30 overflow-hidden shadow-2xl shadow-blue-900/40 bg-[#0D1117] min-h-[380px] flex flex-col">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-white/10 flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-3 text-xs text-gray-400 font-mono">Statement2Books — Simulator</span>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    <AnimatePresence mode="wait">
                        {step === 'upload' && (
                            <motion.div key="upload" {...variants} transition={{ duration: prefersReduced ? 0 : 0.3 }} className="flex-1 flex flex-col">
                                <div className="border-2 border-dashed border-white/15 rounded-xl flex flex-col items-center justify-center py-8 mb-5 text-center">
                                    <Upload className="h-8 w-8 text-blue-400 mb-2" />
                                    <p className="text-white text-sm font-medium">Select a bank to try the demo</p>
                                    <p className="text-gray-500 text-xs mt-1">No real file needed — sample data used</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {BANKS.map((bank) => (
                                        <button
                                            key={bank.id}
                                            onClick={() => startProcessing(bank)}
                                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 rounded-xl px-3 py-2.5 transition-colors"
                                        >
                                            <span className={`w-6 h-6 rounded-md ${bank.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                                                {bank.name.charAt(0)}
                                            </span>
                                            <span className="text-white text-sm font-medium">{bank.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 'processing' && (
                            <motion.div key="processing" {...variants} transition={{ duration: prefersReduced ? 0 : 0.3 }} className="flex-1 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-6 justify-center">
                                    <Sparkles className="h-5 w-5 text-blue-400 animate-pulse" />
                                    <span className="text-white text-sm font-medium">Processing {selectedBank?.name} statement…</span>
                                </div>
                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>
                                <p className="text-right text-xs text-gray-500 font-mono mb-6">{progress}%</p>
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={logIndex}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-center text-xs text-gray-400 font-mono"
                                    >
                                        {LOG_MESSAGES[logIndex]}
                                    </motion.p>
                                </AnimatePresence>
                            </motion.div>
                        )}

                        {step === 'review' && (
                            <motion.div key="review" {...variants} transition={{ duration: prefersReduced ? 0 : 0.3 }} className="flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-white text-sm font-semibold">Review Entries</span>
                                    <span className="bg-green-500/20 text-green-400 text-[11px] font-mono font-semibold rounded-full px-2.5 py-1">
                                        98.7% Accuracy
                                    </span>
                                </div>
                                <div className="space-y-2 mb-5 flex-1">
                                    {transactions.map((tx, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08, duration: 0.3 }}
                                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2"
                                        >
                                            <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-1">
                                                <span>{tx.date}</span>
                                                <span className={tx.debitCredit === 'Credit' ? 'text-green-400' : 'text-orange-300'}>
                                                    {tx.debitCredit}
                                                </span>
                                            </div>
                                            <p className="text-white text-xs truncate">{tx.description}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-blue-300 text-[11px]">{tx.ledger}</span>
                                                <span className="text-white text-xs font-mono font-semibold">{tx.amount}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setStep('success')}
                                    className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-xl py-2.5 transition-colors"
                                >
                                    Export to Tally
                                </button>
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div key="success" {...variants} transition={{ duration: prefersReduced ? 0 : 0.3 }} className="flex-1 flex flex-col items-center justify-center text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                                    className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mb-4"
                                >
                                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                                </motion.div>
                                <h3 className="text-white font-bold text-lg mb-1">Tally Export Complete!</h3>
                                <p className="text-gray-400 text-xs mb-6">{transactions.length} entries pushed to Tally, ready for review.</p>
                                <button
                                    onClick={reset}
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-medium rounded-xl px-4 py-2.5 transition-colors"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    Process Another Statement
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
