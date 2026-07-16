import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { lenisScrollTo } from '@/lib/lenis';

interface BackToTopProps {
    /** Shift the button up so it doesn't overlap a sticky bottom bar. */
    raised?: boolean;
}

export default function BackToTop({ raised = false }: BackToTopProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, bottom: raised ? 96 : 32 }}
                    animate={{ opacity: 1, scale: 1, bottom: raised ? 96 : 32 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => lenisScrollTo(0)}
                    className="fixed right-4 sm:right-8 z-40 w-12 h-12 rounded-full bg-[#2563EB] text-white shadow-lg hover:bg-[#1D4ED8] flex items-center justify-center transition-colors hover:shadow-xl hover:shadow-blue-500/30"
                    aria-label="Back to top"
                >
                    <ChevronUp className="h-5 w-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
