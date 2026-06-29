import {
    Globe, Smartphone, Code2, Brain, Network, Palette,
    Cloud, Wrench, HeadphonesIcon, Building2, Layers,
    type LucideProps,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType<LucideProps>> = {
    Globe,
    Smartphone,
    Code2,
    Brain,
    Network,
    Palette,
    Cloud,
    Wrench,
    HeadphonesIcon,
    Building2,
    Layers,
};

interface ServiceIconProps extends LucideProps {
    name: string;
}

export function ServiceIcon({ name, ...props }: ServiceIconProps) {
    const Icon = ICON_MAP[name] ?? Globe;
    return <Icon {...props} />;
}
