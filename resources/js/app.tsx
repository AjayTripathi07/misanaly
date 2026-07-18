import '../css/app.css';
import './bootstrap';

import { useEffect, useRef, type ElementType } from 'react';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
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
    const lenisRef = useRef<Lenis | null>(null);

    // Reset scroll to top on each new page. NOTE: `<App>` must never be
    // unmounted/remounted here (e.g. by wrapping it in a keyed element for
    // page-transition animations) — Inertia's `App` component re-runs
    // `router.init()` on mount using the `initialPage` captured once in this
    // closure, which resets routing state back to whatever page the tab
    // first loaded and causes a visible flash of that page on every nav.
    useEffect(() => {
        return router.on('navigate', () => {
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

    return <App {...props} />;
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
