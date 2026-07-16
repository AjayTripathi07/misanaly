import '../css/app.css';
import './bootstrap';

import { useEffect, useRef, useState, type ElementType } from 'react';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { setLenisInstance } from './lib/lenis';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// `App`/`props` come straight from Inertia's `setup()` callback — typed loosely
// here since this is framework-boundary glue code, not app logic.
interface AppRootProps {
    App: ElementType;
    props: { initialPage: { url: string } };
}

function AppRoot({ App, props }: AppRootProps) {
    const [url, setUrl] = useState(props.initialPage.url);
    const lenisRef = useRef<Lenis | null>(null);

    // Keep the AnimatePresence key in sync with every Inertia navigation
    // (not just the first load), and reset scroll to top on each new page.
    useEffect(() => {
        return router.on('navigate', (event) => {
            setUrl(event.detail.page.url);
            lenisRef.current?.scrollTo(0, { immediate: true });
        });
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            // Leave native scrolling in place; no Lenis instance is created.
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            smoothWheel: true,
            syncTouch: true,
            touchMultiplier: 2,
            anchors: true,
        });
        lenisRef.current = lenis;
        setLenisInstance(lenis);

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
            setLenisInstance(null);
        };
    }, []);

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={url}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                style={{ minHeight: '100vh' }}
            >
                <App {...props} />
            </motion.div>
        </AnimatePresence>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<AppRoot App={App} props={props} />);
    },
    progress: {
        color: '#2563EB',
    },
});
