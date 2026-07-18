import { cn } from '@/lib/utils';

interface BrandNameProps {
    /** Applied to the outer span — control size/weight/base color here. */
    className?: string;
    /** Color used for "Technologies" when the accent is shown. Match to the surrounding background. */
    variant?: 'onLight' | 'onDark';
    /** Render "NobelIQ" only, without "Technologies" (e.g. compact sidebar lockups). */
    short?: boolean;
    /** Whether "Technologies" gets the blue accent color, like the logo lockup. Off for body-copy mentions. */
    accent?: boolean;
}

/**
 * Renders the "NobelIQ Technologies" brand name in Plus Jakarta Sans.
 *
 * Inter (the site's body font) renders capital "I" and lowercase "l" as
 * near-identical vertical strokes, which makes "NobelIQ" hard to read at a
 * glance. Plus Jakarta Sans disambiguates them clearly, so every visible
 * rendering of the brand name should go through this component rather than
 * hardcoded text, to keep the fix centralized.
 */
export default function BrandName({ className, variant = 'onLight', short = false, accent = true }: BrandNameProps) {
    return (
        <span className={cn('font-heading', className)}>
            NobelIQ
            {!short && (
                accent ? (
                    <span className={variant === 'onDark' ? 'text-blue-400' : 'text-[#2563EB]'}> Technologies</span>
                ) : (
                    ' Technologies'
                )
            )}
        </span>
    );
}
