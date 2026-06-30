export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export interface Service {
    id: number;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    icon: string;
    status: 'active' | 'inactive';
    starting_price: string | null;
    sort_order: number;
}

export interface ServiceFeature {
    id: number;
    service_id: number;
    title: string;
    description: string;
    icon: string | null;
    sort_order: number;
}

export interface ServiceProcessStep {
    id: number;
    service_id: number;
    step_number: number;
    title: string;
    description: string;
}

export interface ServiceWithDetails extends Service {
    features: ServiceFeature[];
    process_steps: ServiceProcessStep[];
}

export interface ProductFeature {
    id: number;
    product_id: number;
    title: string;
    description: string;
    icon: string | null;
    sort_order: number;
}

export interface ProductPricingTier {
    id: number;
    product_id: number;
    name: string;
    price: string | null;
    features_json: string[];
    is_popular: boolean;
}

export interface ProductScreenshot {
    id: number;
    product_id: number;
    image_path: string;
    caption: string | null;
    sort_order: number;
}

export interface Product {
    id: number;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    status: 'active' | 'inactive';
    pricing_model: string;
    demo_url: string | null;
    sort_order: number;
    features?: ProductFeature[];
    pricing_tiers?: ProductPricingTier[];
    screenshots?: ProductScreenshot[];
}

export interface Testimonial {
    id: number;
    name: string;
    company: string;
    role: string;
    quote: string;
    photo: string | null;
    rating: number;
    service_id: number | null;
    product_id: number | null;
}

export interface BlogCategory {
    id: number;
    name: string;
    slug: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    cover_image: string | null;
    status: 'draft' | 'published';
    published_at: string | null;
    category_id: number | null;
    author_id: number;
    category?: BlogCategory | null;
    author?: { id: number; name: string; email: string } | null;
}

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    photo: string | null;
    linkedin_url: string | null;
    sort_order: number;
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
    category: 'general' | 'service' | 'product';
    related_id: number | null;
    sort_order: number;
}
