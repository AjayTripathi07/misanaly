import { Head, Link } from '@inertiajs/react';
import { Construction, ArrowLeft } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';

interface Props {
    page: string;
}

export default function Placeholder({ page }: Props) {
    return (
        <PublicLayout>
            <Head title={page} />
            <section className="min-h-[70vh] flex items-center justify-center bg-[#F8FAFC]">
                <div className="text-center px-4">
                    <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                        <Construction className="h-10 w-10 text-[#2563EB]" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#0F172A] mb-3">{page}</h1>
                    <p className="text-[#0F172A]/55 mb-8 max-w-md mx-auto">
                        This page is currently under construction. Check back soon!
                    </p>
                    <Link href="/">
                        <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full px-8">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
