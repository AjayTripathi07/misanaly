import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import {
    Users,
    Lightbulb,
    Clock,
    LifeBuoy,
    Target,
    Heart,
    Award,
    Handshake,
    ExternalLink,
    Shield,
    ChevronRight,
} from 'lucide-react';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    photo: string | null;
    linkedin_url: string | null;
}

interface Props {
    teamMembers: TeamMember[];
}

const whyUsItems = [
    {
        icon: Users,
        title: 'Expert Team',
        desc: 'Skilled professionals across web, mobile, AI, and cloud.',
    },
    {
        icon: Award,
        title: 'Proven Track Record',
        desc: '50+ projects delivered successfully across industries.',
    },
    {
        icon: Lightbulb,
        title: 'Innovation First',
        desc: "We stay ahead of technology trends so you don't have to.",
    },
    {
        icon: Clock,
        title: 'On-Time Delivery',
        desc: 'We respect your deadlines with agile, milestone-driven delivery.',
    },
    {
        icon: LifeBuoy,
        title: '24/7 Support',
        desc: 'Round-the-clock support for critical systems.',
    },
    {
        icon: Target,
        title: 'Goal-Oriented',
        desc: 'Every decision we make is aligned with your business objectives.',
    },
    {
        icon: Heart,
        title: 'Client-Centric',
        desc: 'Your success is our success. We go the extra mile, every time.',
    },
    {
        icon: Handshake,
        title: 'Long-term Partnership',
        desc: 'We build relationships, not just software.',
    },
];

const values = [
    {
        icon: Shield,
        title: 'Integrity',
        desc: 'We operate with complete transparency and honesty in everything we do.',
    },
    {
        icon: Award,
        title: 'Excellence',
        desc: 'We hold ourselves to the highest standards in code quality, design, and service.',
    },
    {
        icon: Lightbulb,
        title: 'Innovation',
        desc: 'We constantly explore new technologies to bring fresh perspectives to old problems.',
    },
    {
        icon: Target,
        title: 'Impact',
        desc: 'We measure our success by the tangible business outcomes we create for clients.',
    },
];

export default function About({ teamMembers }: Props) {
    return (
        <PublicLayout>
            <SeoHead
                title="About Us"
                description="Learn about MSI Analytics — our mission, team, and commitment to delivering quality IT solutions and software products for Indian businesses."
            />

            {/* Hero */}
            <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-24 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <Badge className="mb-6 bg-white/15 border-0 text-white">Our Story</Badge>
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                        Building the Future of Business Technology
                    </h1>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                        We are a team of passionate technologists dedicated to empowering Indian businesses
                        with world-class digital solutions that drive real growth.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-white py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto px-4">
                    {/* Mission */}
                    <div className="rounded-2xl bg-[#F8FAFC] p-8 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center mb-4">
                            <Target className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="font-bold text-xl text-[#0F172A]">Our Mission</h2>
                        <p className="text-[#0F172A]/60 leading-relaxed mt-3">
                            To empower businesses of all sizes with cutting-edge technology solutions that are
                            accessible, affordable, and built for the Indian market.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="rounded-2xl bg-[#F8FAFC] p-8 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center mb-4">
                            <Lightbulb className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="font-bold text-xl text-[#0F172A]">Our Vision</h2>
                        <p className="text-[#0F172A]/60 leading-relaxed mt-3">
                            To be India's most trusted IT partner, known for delivering innovative solutions
                            that create measurable impact for every client we serve.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team section */}
            <section className="bg-[#F8FAFC] py-20">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-4">
                        <Badge className="mb-4">The People</Badge>
                        <h2 className="text-3xl font-bold text-[#0F172A]">Meet Our Team</h2>
                        <p className="text-[#0F172A]/60 mt-3 max-w-xl mx-auto">
                            The talented individuals behind MSI Analytics who make it all happen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {teamMembers.map(member => (
                            <Card
                                key={member.id}
                                className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
                            >
                                {/* Photo */}
                                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden">
                                    {member.photo ? (
                                        <img
                                            src={member.photo}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src="/images/team/placeholder-avatar.png"
                                            alt={member.name}
                                            className="w-24 h-24 object-cover rounded-full"
                                        />
                                    )}
                                </div>

                                <CardContent className="p-6">
                                    <h3 className="font-bold text-[#0F172A] text-lg">{member.name}</h3>
                                    <p className="text-[#2563EB] text-sm font-medium">{member.role}</p>
                                    <p className="text-[#0F172A]/60 text-sm mt-3 leading-relaxed line-clamp-4">
                                        {member.bio}
                                    </p>
                                    {member.linkedin_url && (
                                        <a
                                            href={member.linkedin_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-[#2563EB] text-sm mt-4 hover:underline"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            LinkedIn
                                        </a>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-4">
                        <Badge className="mb-4">Why Us</Badge>
                        <h2 className="text-3xl font-bold text-[#0F172A]">8 Reasons to Choose MSI Analytics</h2>
                        <p className="text-[#0F172A]/60 mt-3 max-w-xl mx-auto">
                            We bring together expertise, commitment, and results to every engagement.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {whyUsItems.map(item => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#F8FAFC] hover:bg-blue-50 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 group-hover:bg-[#2563EB] flex items-center justify-center mb-4 transition-colors">
                                        <Icon className="h-6 w-6 text-[#2563EB] group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="font-semibold text-[#0F172A] text-sm mb-2">{item.title}</h3>
                                    <p className="text-[#0F172A]/60 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Values section */}
            <section className="bg-[#F8FAFC] py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-4">
                        <Badge className="mb-4">Our Values</Badge>
                        <h2 className="text-3xl font-bold text-[#0F172A]">What We Stand For</h2>
                        <p className="text-[#0F172A]/60 mt-3 max-w-xl mx-auto">
                            Our values guide every decision, every line of code, and every client interaction.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {values.map(value => {
                            const Icon = value.icon;
                            return (
                                <Card
                                    key={value.title}
                                    className="bg-white border border-gray-100 p-8 rounded-2xl text-center"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mx-auto mb-4">
                                        <Icon className="h-6 w-6 text-[#2563EB]" />
                                    </div>
                                    <h3 className="font-bold text-[#0F172A] mb-2">{value.title}</h3>
                                    <p className="text-[#0F172A]/60 text-sm leading-relaxed">{value.desc}</p>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#2563EB] py-16 text-white text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Work With Us</h2>
                    <p className="text-white/80 mb-8 text-lg">
                        Join 50+ businesses that trust MSI Analytics to power their technology.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/get-quote">
                            <Button className="bg-white text-[#2563EB] hover:bg-gray-100 font-semibold px-8">
                                Start a Project
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                variant="outline"
                                className="border-white/40 text-white hover:bg-white/10 font-semibold px-8"
                            >
                                Say Hello
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
