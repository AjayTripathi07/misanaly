import { Link } from '@inertiajs/react';
import { Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/Components/ui/dialog';

interface FavoriteProduct {
    slug: string;
    name: string;
    tagline: string;
}

interface FavoriteProductPopupProps {
    product: FavoriteProduct;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function FavoriteProductPopup({ product, open, onOpenChange }: FavoriteProductPopupProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="text-white text-center">
                {/* Background glow blobs — matches Products/Show.tsx hero, visible through the blurred backdrop */}
                <div className="fixed top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

                {/* Glass card */}
                <div className="relative w-full max-w-lg mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl px-8 py-10 sm:px-12 sm:py-12">
                    <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                        Featured Product
                    </span>

                    <DialogTitle className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                        Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{product.name}</span>
                    </DialogTitle>

                    <DialogDescription className="text-gray-200 text-lg leading-relaxed mb-8">
                        {product.tagline}
                    </DialogDescription>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`/products/${product.slug}`}>
                            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 rounded-full px-8 shadow-xl shadow-orange-900/40 font-semibold text-white">
                                Explore {product.name}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href={`/products/${product.slug}#waitlist`}>
                            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 bg-transparent font-semibold">
                                <Rocket className="mr-2 h-4 w-4" />
                                Join Waitlist
                            </Button>
                        </Link>
                    </div>

                    <DialogClose asChild>
                        <button className="mt-8 text-sm text-gray-300 hover:text-white transition-colors">
                            Maybe later
                        </button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
