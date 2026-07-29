import { WhatsappIcon } from '@/Components/icons/SocialIcons';

interface WhatsAppButtonProps {
    /** Phone number with country code, digits only (e.g. "919876543210"). */
    number?: string | null;
}

export default function WhatsAppButton({ number }: WhatsAppButtonProps) {
    if (!number) return null;

    return (
        <a
            href={`https://wa.me/${number}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-4 left-4 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5A] text-white shadow-lg hover:shadow-xl hover:shadow-green-500/30 flex items-center justify-center transition-all hover:scale-105"
        >
            <WhatsappIcon className="h-7 w-7" />
        </a>
    );
}
