import { cn } from '@/lib/utils';

interface BrandNameProps {
    /** Applied to the outer span — controls size/weight/base color for "Nobel". */
    className?: string;
    /** Background context — picks the correct "IQ" accent color and muted "Technologies" tone. */
    variant?: 'onLight' | 'onDark';
    /** Render "Nobel"+"IQ" only, without "Technologies". */
    short?: boolean;
    /** Give "Technologies" its own muted tone (logo/heading contexts). Off = inherits the surrounding text color, for inline body-copy mentions. */
    accent?: boolean;
}

/**
 * Renders "NobelIQ Technologies" with "Nobel" and "IQ" in two different
 * colors. Font choice alone (e.g. switching to Plus Jakarta Sans) doesn't
 * fix the capital-I/lowercase-l ambiguity — in most sans-serif fonts,
 * including Jakarta Sans at bold weight, both are just straight vertical
 * strokes. Splitting "Nobel" and "IQ" into distinct colors (matching the
 * uploaded logo files) makes the word boundary obvious regardless of the
 * letterforms, which is what actually resolves the legibility issue.
 */
export default function BrandName({ className, variant = 'onLight', short = false, accent = true }: BrandNameProps) {
    const iqColor = variant === 'onDark' ? 'text-[#38BDF8]' : 'text-[#2563EB]';
    const mutedColor = variant === 'onDark' ? 'text-white/60' : 'text-[#0F172A]/50';

    return (
        <span className={cn(className)}>
            Nobel<span className={iqColor}>IQ</span>
            {!short && (
                accent ? (
                    <span className={cn('font-normal', mutedColor)}> Technologies</span>
                ) : (
                    ' Technologies'
                )
            )}
        </span>
    );
}
