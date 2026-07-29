import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Splits an admin-editable stat string like "10+", "98.7%", "3 hrs" into a
 * numeric value (for count-up animation) and the trailing suffix text.
 */
export function parseStatValue(raw: string): { value: number; suffix: string } {
    const match = raw.match(/^([\d.]+)\s*(.*)$/);
    if (!match) return { value: 0, suffix: raw };
    return { value: parseFloat(match[1]) || 0, suffix: match[2] };
}

/** Extra spacing/size class for word-like suffixes (e.g. "hrs") vs symbols (e.g. "+", "%"). */
export function statSuffixClass(suffix: string): string {
    return /^[a-zA-Z]/.test(suffix) ? 'font-sans align-middle ml-1 text-lg sm:text-xl' : '';
}
