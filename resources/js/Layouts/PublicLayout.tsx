import { useState, useEffect, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/Components/ui/button';
import { Sheet, SheetContent, SheetClose } from '@/Components/ui/sheet';
import { Separator } from '@/Components/ui/separator';
import { cn } from '@/lib/utils';
import BackToTop from '@/Components/BackToTop';

interface PublicLayoutProps {
    children: ReactNode;
    title?: string;
}

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
];

const serviceLinks = [
    { label: 'Website Development', href: '/services/website-development' },
    { label: 'Mobile App Development', href: '/services/mobile-app-development' },
    { label: 'Custom Software', href: '/services/custom-software-development' },
    { label: 'AI/ML Solutions', href: '/services/ai-ml-solutions' },
    { label: 'API Development', href: '/services/api-development-integration' },
    { label: 'UI/UX Design', href: '/services/ui-ux-design' },
];

export default function PublicLayout({ children }: PublicLayoutProps) {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showStickyCta, setShowStickyCta] = useState(false);
    const [barDismissed, setBarDismissed] = useState(() => {
        if (typeof window === 'undefined') return false;
        return sessionStorage.getItem('bar_dismissed') === '1';
    });

    function dismissBar() {
        sessionStorage.setItem('bar_dismissed', '1');
        setBarDismissed(true);
    }

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
            const doc = document.documentElement;
            const scrollTop = window.scrollY;
            const docHeight = doc.scrollHeight - doc.clientHeight;
            setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
            setShowStickyCta(window.scrollY > 400);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onBank2BooksPage = url.startsWith('/products/bank2books');

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* ── ANNOUNCEMENT BAR ── */}
            {!barDismissed && !onBank2BooksPage && (
                <div className="relative bg-gradient-to-r from-[#2563EB] via-[#6D28D9] to-[#8B5CF6] text-white text-sm py-2 px-4 flex items-center justify-center gap-3 z-50">
                    <span className="hidden sm:inline">🚀</span>
                    <Link href="/products/bank2books" className="hover:underline underline-offset-2 font-medium text-center">
                        <strong>Bank2Books is here!</strong> Automate your Tally entries — Join waitlist for <strong>3 months free</strong> →
                    </Link>
                    <button onClick={dismissBar} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1" aria-label="Dismiss">
                        <X className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}
            {/* ── NAVBAR ── */}
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    scrolled
                        ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100'
                        : 'bg-white/90 backdrop-blur-sm',
                )}
            >
                {/* Scroll progress bar */}
                <div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#2563EB] via-[#10B981] to-[#F59E0B] transition-all duration-75 z-50"
                    style={{ width: `${scrollProgress * 100}%` }}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
                                <span className="text-white font-bold text-sm">M</span>
                            </div>
                            <span className="text-[#0F172A] font-bold text-lg leading-none">
                                MIS<span className="text-[#2563EB]">Analytics</span>
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2 text-sm font-medium text-[#0F172A]/70 hover:text-[#2563EB] transition-colors rounded-md hover:bg-blue-50"
                                >
                                    {link.label === 'Products' ? (
                                        <span className="relative inline-flex items-center gap-1">
                                            Products
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                                            </span>
                                        </span>
                                    ) : (
                                        link.label
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA + Mobile trigger */}
                        <div className="flex items-center gap-3">
                            <Link href="/get-quote" className="hidden sm:block">
                                <Button
                                    size="sm"
                                    className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full px-5 shadow-md shadow-blue-200"
                                >
                                    Get a Quote
                                </Button>
                            </Link>

                            {/* Mobile hamburger */}
                            <button
                                className="lg:hidden p-2 rounded-md text-[#0F172A]/70 hover:bg-gray-100 transition-colors"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── MOBILE MENU (Sheet) ── */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
                    <div className="flex flex-col h-full">
                        {/* Sheet header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <Link
                                href="/"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2"
                            >
                                <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">M</span>
                                </div>
                                <span className="text-[#0F172A] font-bold text-base">
                                    MIS<span className="text-[#2563EB]">Analytics</span>
                                </span>
                            </Link>
                            <SheetClose className="rounded-sm opacity-70 hover:opacity-100 transition-opacity">
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close</span>
                            </SheetClose>
                        </div>

                        {/* Nav links */}
                        <nav className="flex-1 overflow-y-auto py-4 px-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-between px-3 py-3 text-sm font-medium text-[#0F172A] hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    {link.label}
                                    <ChevronRight className="h-4 w-4 opacity-40" />
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile CTA */}
                        <div className="px-4 pb-6 pt-4 border-t">
                            <Link href="/get-quote" onClick={() => setMobileOpen(false)}>
                                <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full">
                                    Get a Quote
                                </Button>
                            </Link>
                            <p className="mt-3 text-center text-xs text-gray-400">
                                info@misanaly.in
                            </p>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 pt-16">{children}</main>

            {/* ── FOOTER ── */}
            <footer className="bg-[#0F172A] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        {/* Company */}
                        <div className="lg:col-span-1">
                            <Link href="/" className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">M</span>
                                </div>
                                <span className="text-white font-bold text-lg">
                                    MIS<span className="text-[#60A5FA]">Analytics</span>
                                </span>
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed mb-5">
                                Innovative IT solutions and software products designed to transform businesses through technology.
                            </p>
                            {/* Social links */}
                            <div className="flex gap-3">
                                {(['LinkedIn', 'Twitter', 'Facebook', 'Instagram'] as const).map((s) => (
                                    <a
                                        key={s}
                                        href="#"
                                        aria-label={s}
                                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#2563EB] flex items-center justify-center transition-colors text-xs text-gray-400 hover:text-white"
                                    >
                                        {s[0]}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-[#60A5FA] text-sm transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link href="/contact" className="text-gray-400 hover:text-[#60A5FA] text-sm transition-colors">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                                Services
                            </h3>
                            <ul className="space-y-2">
                                {serviceLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-[#60A5FA] text-sm transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                                Contact
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <Mail className="h-4 w-4 text-[#2563EB] mt-0.5 flex-shrink-0" />
                                    <a href="mailto:info@misanaly.in" className="text-gray-400 hover:text-[#60A5FA] text-sm transition-colors">
                                        info@misanaly.in
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Phone className="h-4 w-4 text-[#2563EB] mt-0.5 flex-shrink-0" />
                                    <a href="tel:+91XXXXXXXXXX" className="text-gray-400 hover:text-[#60A5FA] text-sm transition-colors">
                                        +91-XXXXXXXXXX
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin className="h-4 w-4 text-[#2563EB] mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-400 text-sm">Delhi, India</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Separator className="bg-white/10 mb-6" />

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
                        <p>© {new Date().getFullYear()} MIS Analytics. All rights reserved.</p>
                        <div className="flex gap-4">
                            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
            <BackToTop />

            {/* ── STICKY BOTTOM CTA ── */}
            <AnimatePresence>
                {showStickyCta && !onBank2BooksPage && (
                    <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#0F172A] border border-white/10 text-white px-5 py-3 rounded-2xl shadow-2xl shadow-black/40 backdrop-blur-sm"
                    >
                        <span className="text-orange-400">🚀</span>
                        <span className="text-sm font-medium">Bank2Books Early Access — 3 months free</span>
                        <Link href="/products/bank2books#waitlist">
                            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4 text-xs font-bold ml-1">
                                Join Waitlist →
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
