import { useState, useEffect, ReactNode } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    LayoutDashboard, Briefcase, Package, Users, MessageSquare,
    Settings, LogOut, Bell, Menu,
    FileText, HelpCircle, Star, UserCircle,
    FolderOpen, ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/Components/ui/badge';
import BrandName from '@/Components/BrandName';
import { type User } from '@/types';
import { ToastContainer } from '@/Components/Toast';
import { useToast } from '@/hooks/useToast';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: number;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

interface SectionColor {
    dot: string;
    active: string;
    activeBg: string;
    icon: string;
    border: string;
}

const SECTION_COLORS: Record<string, SectionColor> = {
    OVERVIEW: { dot: 'bg-blue-400', active: 'text-white', activeBg: 'bg-[#2563EB]', icon: 'text-white', border: 'border-l-[#2563EB]' },
    CONTENT: { dot: 'bg-emerald-400', active: 'text-white', activeBg: 'bg-emerald-600', icon: 'text-white', border: 'border-l-emerald-500' },
    LEADS: { dot: 'bg-amber-400', active: 'text-white', activeBg: 'bg-amber-600', icon: 'text-white', border: 'border-l-amber-500' },
    SETTINGS: { dot: 'bg-violet-400', active: 'text-white', activeBg: 'bg-violet-600', icon: 'text-white', border: 'border-l-violet-500' },
};

interface AdminPageProps {
    auth: { user: User };
    waitlist_pending?: number;
    leads_pending?: number;
    flash?: { success?: string; error?: string; info?: string };
    [key: string]: unknown;
}

function useNavSections(): NavSection[] {
    const { props } = usePage<AdminPageProps>();
    const waitlistPending = props.waitlist_pending;

    return [
        {
            title: 'OVERVIEW',
            items: [
                { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
            ],
        },
        {
            title: 'CONTENT',
            items: [
                { label: 'Services', href: '/admin/services', icon: Briefcase },
                { label: 'Products', href: '/admin/products', icon: Package },
                { label: 'Portfolio', href: '/admin/portfolio', icon: FolderOpen },
                { label: 'Blog', href: '/admin/blog', icon: FileText },
            ],
        },
        {
            title: 'LEADS',
            items: [
                { label: 'All Leads', href: '/admin/leads', icon: MessageSquare },
                {
                    label: 'Waitlist',
                    href: '/admin/waitlist',
                    icon: ClipboardList,
                    ...(waitlistPending ? { badge: waitlistPending } : {}),
                },
            ],
        },
        {
            title: 'SETTINGS',
            items: [
                { label: 'Team Members', href: '/admin/team', icon: Users },
                { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
                { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
                { label: 'Site Settings', href: '/admin/settings', icon: Settings },
            ],
        },
    ];
}

function NavLink({
    item,
    sectionTitle,
    onClick,
}: {
    item: NavItem;
    sectionTitle: string;
    onClick?: () => void;
}) {
    const { url } = usePage();
    const isActive = url === item.href || url.startsWith(item.href + '/');
    const colors = SECTION_COLORS[sectionTitle] ?? SECTION_COLORS.OVERVIEW;

    return (
        <Link
            href={item.href}
            onClick={onClick}
            className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group border-l-2',
                isActive
                    ? `${colors.activeBg} ${colors.active} shadow-sm ${colors.border}`
                    : 'text-slate-400 hover:text-white hover:bg-white/8 border-transparent',
            )}
        >
            <item.icon
                className={cn(
                    'h-4 w-4 flex-shrink-0',
                    isActive ? colors.icon : 'text-slate-500 group-hover:text-slate-300',
                )}
            />
            {item.label}
            {item.badge !== undefined && item.badge > 0 && (
                <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[1.25rem] text-center border-0">
                    {item.badge}
                </Badge>
            )}
        </Link>
    );
}

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
    const { props } = usePage<AdminPageProps>();
    const user = props.auth?.user;
    const navSections = useNavSections();

    return (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/8">
                <img src="/images/branding/Icon.png" alt="NobelIQ" className="w-10 h-10 object-contain flex-shrink-0" />
                <div>
                    <BrandName short variant="onDark" className="text-white font-bold text-sm leading-none block" />
                    <p className="text-slate-500 text-xs mt-0.5">Admin Panel</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
                {navSections.map((section) => {
                    const colors = SECTION_COLORS[section.title] ?? SECTION_COLORS.OVERVIEW;
                    return (
                        <div key={section.title}>
                            <div className="flex items-center gap-2 px-3 mb-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                                    {section.title}
                                </p>
                            </div>
                            <div className="space-y-0.5">
                                {section.items.map((item) => (
                                    <NavLink
                                        key={item.href}
                                        item={item}
                                        sectionTitle={section.title}
                                        onClick={onLinkClick}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </nav>

            {/* User + Logout */}
            <div className="border-t border-white/8 p-3 space-y-1">
                <Link
                    href="/profile"
                    onClick={onLinkClick}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/8 transition-all"
                >
                    <UserCircle className="h-4 w-4 text-slate-500" />
                    {user?.name ?? 'Admin'}
                </Link>
                <button
                    onClick={() => router.post('/logout')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default function AdminLayout({ children, title = 'Admin' }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { props } = usePage<AdminPageProps>();
    const user = props.auth?.user;
    const waitlistPending = props.waitlist_pending ?? 0;
    const leadsPending = props.leads_pending ?? 0;
    const notificationCount = waitlistPending + leadsPending;

    const { toasts, addToast, dismiss } = useToast();

    useEffect(() => {
        if (props.flash?.success) addToast(props.flash.success, 'success');
        if (props.flash?.error) addToast(props.flash.error, 'error');
        if (props.flash?.info) addToast(props.flash.info, 'info');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.flash?.success, props.flash?.error, props.flash?.info]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:flex-col w-60 bg-gradient-to-b from-[#0F172A] via-[#0F1629] to-[#0A0F1E] fixed inset-y-0 left-0 z-40">
                <SidebarContent />
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile drawer */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-50 w-60 bg-gradient-to-b from-[#0F172A] via-[#0F1629] to-[#0A0F1E] transform transition-transform duration-300 ease-in-out lg:hidden',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full',
                )}
            >
                <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col lg:pl-60">
                <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-14 flex items-center px-4 sm:px-6 gap-4">
                    <button
                        className="lg:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <h1 className="text-base font-semibold text-[#0F172A] flex-1 truncate">{title}</h1>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/leads"
                            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors relative"
                        >
                            <Bell className="h-5 w-5" />
                            {notificationCount > 0 && (
                                <>
                                    <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500/60 rounded-full animate-ping" />
                                    <span className="absolute top-0.5 right-0.5 min-w-[1rem] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                        {notificationCount > 9 ? '9+' : notificationCount}
                                    </span>
                                </>
                            )}
                        </Link>

                        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                            <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-bold">
                                {user?.name?.charAt(0) ?? 'A'}
                            </div>
                            <span className="hidden sm:block text-sm font-medium text-[#0F172A] max-w-[120px] truncate">
                                {user?.name ?? 'Admin'}
                            </span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
            </div>

            <ToastContainer toasts={toasts} onDismiss={dismiss} />
        </div>
    );
}
