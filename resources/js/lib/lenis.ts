import type Lenis from 'lenis';

/**
 * Single global Lenis instance, set by the root app component on mount
 * and cleared on unmount. `null` whenever Lenis isn't active — either
 * before the app has mounted or when prefers-reduced-motion disabled it.
 */
let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
    lenisInstance = instance;
}

export function getLenis(): Lenis | null {
    return lenisInstance;
}

/**
 * Scroll to a target using Lenis when it's active, falling back to
 * native scrolling (e.g. prefers-reduced-motion, or before Lenis mounts)
 * so callers don't need to branch on whether Lenis is running.
 */
export function lenisScrollTo(target: number | string | HTMLElement, options?: { offset?: number }) {
    if (lenisInstance) {
        lenisInstance.scrollTo(target, options);
        return;
    }

    if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
        return;
    }

    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
