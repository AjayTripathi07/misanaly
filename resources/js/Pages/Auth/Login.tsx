import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
                {/* LEFT SIDE */}
                <div className="hidden lg:flex lg:col-span-3 relative bg-[#0F172A] flex-col items-center justify-center p-12 overflow-hidden min-h-screen">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

                    <div className="relative z-10 max-w-md w-full">
                        <div className="flex items-center gap-3 mb-12">
                            <img src="/images/branding/Icon.png" alt="NobelIQ Technologies" className="w-10 h-10 object-contain" />
                            <span className="text-white font-bold text-xl">NobelIQ<span className="text-blue-400"> Technologies</span></span>
                        </div>

                        <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Welcome<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Back</span>
                        </h1>
                        <p className="text-gray-400 text-lg mb-16 leading-relaxed">
                            Manage your business,<br />one dashboard at a time.
                        </p>

                        <div className="space-y-3 mb-16">
                            {[
                                { icon: '📊', label: 'Real-time Analytics', color: 'from-blue-500/20 to-blue-600/10' },
                                { icon: '🚀', label: 'Statement2Books — Early Access', color: 'from-violet-500/20 to-violet-600/10' },
                                { icon: '🔒', label: 'Secure & Private', color: 'from-emerald-500/20 to-emerald-600/10' },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                                    className={`flex items-center gap-3 bg-gradient-to-r ${item.color} border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-white/80 text-sm font-medium">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex items-center gap-6 text-gray-500 text-xs">
                            <span>10+ Services</span>
                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                            <span>5+ Products</span>
                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                            <span>Trusted Platform</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="lg:col-span-2 flex items-center justify-center bg-white min-h-screen p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="w-full max-w-sm"
                    >
                        <div className="flex items-center gap-2 mb-8 lg:hidden">
                            <img src="/images/branding/Icon.png" alt="NobelIQ Technologies" className="w-8 h-8 object-contain" />
                            <span className="font-bold text-[#0F172A] text-lg">NobelIQ<span className="text-[#2563EB]"> Technologies</span></span>
                        </div>

                        <h2 className="text-2xl font-extrabold text-[#0F172A] mb-1">Sign In</h2>
                        <p className="text-[#0F172A]/50 text-sm mb-8">Enter your credentials to access the admin panel.</p>

                        {status && (
                            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-[#0F172A]/60 uppercase tracking-wider mb-1.5">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0F172A]/30 pointer-events-none" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        autoComplete="username"
                                        required
                                        placeholder="admin@misanaly.in"
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0F172A] placeholder-[#0F172A]/30 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />{errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-xs font-semibold text-[#0F172A]/60 uppercase tracking-wider">Password</label>
                                    {canResetPassword && (
                                        <Link href={route('password.request')} className="text-xs text-[#2563EB] hover:underline">Forgot password?</Link>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0F172A]/30 pointer-events-none" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="current-password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm text-[#0F172A] placeholder-[#0F172A]/30 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F172A]/30 hover:text-[#0F172A]/60 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />{errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                                />
                                <label htmlFor="remember" className="text-sm text-[#0F172A]/60">Remember me</label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2.5 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white font-semibold rounded-xl hover:from-[#1D4ED8] hover:to-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 transition-all shadow-lg shadow-blue-200 disabled:opacity-60 relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                            Signing in…
                                        </>
                                    ) : (
                                        'Sign In'
                                    )}
                                </span>
                                <span className="absolute inset-0 bg-white/10 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
