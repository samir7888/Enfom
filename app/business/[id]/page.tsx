'use client';

import { useParams, useRouter } from 'next/navigation';
import {
    MapPin, Globe, Star, Users, Briefcase, Mail, Phone,
    Instagram, Twitter, Linkedin, Facebook, Youtube,
    ChevronLeft, ExternalLink, Calendar, Building2, User,
    ShieldCheck, ArrowRight, Share2, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data based on the structure in explore/page.tsx and businessedit/page.tsx
const MOCK_BUSINESSES = [
    {
        id: 1,
        name: "TechFlow Solutions",
        type: "saas",
        industry: "Information Technology",
        description: "Developing modern cloud-based infrastructure for high-growth startups and enterprises worldwide. Our team of experts brings years of experience in design, development, and strategy. We help businesses scale efficiently and securely in the digital age.",
        location: "San Francisco, CA",
        website: "https://techflow.io",
        logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop",
        rating: 4.8,
        employees: "51+",
        yearJoined: 2023,
        coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        ownerName: "Sarah Jenkins",
        email: "contact@techflow.io",
        phone: "+1 (555) 123-4567",
        address: "123 Cloud Way, Suite 500, San Francisco, CA 94105",
        tags: ["SaaS", "Cloud", "Enterprise", "AI"],
        social: {
            instagram: "https://instagram.com/techflow",
            twitter: "https://twitter.com/techflow",
            linkedin: "https://linkedin.com/company/techflow",
            facebook: "https://facebook.com/techflow",
            youtube: "https://youtube.com/@techflow"
        }
    },
    {
        id: 2,
        name: "Green Leaf Bistro",
        type: "restaurant",
        industry: "Food & Beverage",
        description: "Farm-to-table organic restaurant specializing in Mediterranean inspired vegetarian cuisines. We believe in sustainable sourcing and providing the freshest ingredients to our community. Our atmosphere is designed to be a peaceful retreat in the heart of the city.",
        location: "Portland, OR",
        website: "https://greenleaf.bistro",
        logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop",
        rating: 4.9,
        employees: "11-50",
        yearJoined: 2022,
        coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        ownerName: "Marcus Thorne",
        email: "hello@greenleaf.bistro",
        phone: "+1 (555) 987-6543",
        address: "789 Organic Ave, Portland, OR 97201",
        tags: ["Organic", "Vegan Friendly", "Sustainable", "Farm-to-Table"],
        social: {
            instagram: "https://instagram.com/greenleafbistro",
            twitter: "https://twitter.com/greenleaf",
            facebook: "https://facebook.com/greenleafbistro",
            youtube: ""
        }
    },
    {
        id: 3,
        name: "Urban Style Co.",
        type: "retail",
        industry: "Fashion & Apparel",
        description: "Sustainable streetwear brand focusing on quality fabrics and timeless urban aesthetics. We merge contemporary design with ethical manufacturing to create clothing that lasts and makes a statement.",
        location: "New York, NY",
        website: "https://urbanstyle.com",
        logo: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&h=100&fit=crop",
        rating: 4.7,
        employees: "11-50",
        yearJoined: 2024,
        coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
        ownerName: "Elena Rodriguez",
        email: "info@urbanstyle.com",
        phone: "+1 (555) 456-7890",
        address: "123 Fashion St, Manhattan, NY 10001",
        tags: ["Fashion", "Sustainable", "Streetwear", "NYC"],
        social: {
            instagram: "https://instagram.com/urbanstyle",
            twitter: "https://twitter.com/urbanstyle",
            facebook: "https://facebook.com/urbanstyle",
            linkedin: "",
            youtube: ""
        }
    },
    {
        id: 4,
        name: "Apex Wealth Partners",
        type: "finance",
        industry: "Financial Services",
        description: "Boutique wealth management and investment advisory services tailored for long-term growth. Our advisors work closely with clients to build robust portfolios that weather market volatility while maximizing returns.",
        location: "London, UK",
        website: "https://apexwealth.com",
        logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop",
        rating: 4.6,
        employees: "51+",
        yearJoined: 2023,
        coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        ownerName: "Jameson Sterling",
        email: "wealth@apexwealth.com",
        phone: "+44 20 7946 0000",
        address: "45 Financial District, London, UK EC2V 6AA",
        tags: ["Finance", "Investment", "Wealth Management", "Growth"],
        social: {
            linkedin: "https://linkedin.com/company/apexwealth",
            twitter: "https://twitter.com/apexwealth",
            instagram: "",
            facebook: "",
            youtube: ""
        }
    },
    {
        id: 5,
        name: "Lumina EduTech",
        type: "education",
        industry: "Education Technology",
        description: "Personalized online learning platform helping students master STEM subjects through AI tutoring. Lumina uses advanced algorithms to adapt to each student's learning pace and style, making complex topics accessible and engaging.",
        location: "Austin, TX",
        website: "https://luminaedu.com",
        logo: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=100&h=100&fit=crop",
        rating: 4.8,
        employees: "1-10",
        yearJoined: 2024,
        coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        ownerName: "Dr. Amanda Chen",
        email: "support@luminaedu.com",
        phone: "+1 (555) 789-0123",
        address: "900 Tech Hill, Austin, TX 78701",
        tags: ["EdTech", "AI", "STEM", "Education"],
        social: {
            twitter: "https://twitter.com/luminaedu",
            linkedin: "https://linkedin.com/company/luminaedu",
            youtube: "https://youtube.com/@luminaedu",
            instagram: "",
            facebook: ""
        }
    },
    {
        id: 6,
        name: "Zenith Marketing",
        type: "consulting",
        industry: "Marketing & Strategy",
        description: "Data-driven marketing solutions helping brands reach their target audience with precision and creative flair. We combine deep analytical insights with boundary-pushing creativity to deliver campaigns that resonate and convert.",
        location: "Chicago, IL",
        website: "https://zenithmarketing.io",
        logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop",
        rating: 4.7,
        employees: "11-50",
        yearJoined: 2023,
        coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        ownerName: "Robert Vance",
        email: "strategy@zenithmarketing.io",
        phone: "+1 (555) 234-5678",
        address: "400 Creative Blvd, Chicago, IL 60601",
        tags: ["Marketing", "Strategy", "Creative", "Analytics"],
        social: {
            instagram: "https://instagram.com/zenithmarketing",
            linkedin: "https://linkedin.com/company/zenithmarketing",
            twitter: "https://twitter.com/zenithmarketing",
            facebook: "",
            youtube: ""
        }
    }
];

export default function BusinessDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = parseInt(params.id as string);

    // Find the business.
    const business = MOCK_BUSINESSES.find(b => b.id === id);

    if (!business) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
                <div className="h-24 w-24 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                    <Briefcase className="h-10 w-10 text-zinc-300" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">Business not found</h2>
                    <p className="text-zinc-500">The business profile you're looking for doesn't exist or has been removed.</p>
                </div>
                <Button onClick={() => router.push('/explore')} className="rounded-2xl">
                    Back to Explore
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950/50 pb-20 animate-in fade-in duration-700">
            {/* Header / Navigation */}
            <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="rounded-xl flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                        <ChevronLeft size={18} />
                        Back to Explore
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" className="rounded-xl">
                            <Share2 size={18} />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl">
                            <Heart size={18} />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[350px] md:h-[450px] w-full mt-4 max-w-7xl mx-auto px-4">
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <img
                        src={business.coverImage}
                        alt={business.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-10 left-10 md:left-16 flex flex-col md:flex-row md:items-end gap-6 text-white">
                    <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white/20 shadow-2xl rounded-3xl">
                        <AvatarImage src={business.logo} />
                        <AvatarFallback className="bg-indigo-500 text-white text-2xl font-black">
                            {business.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight">{business.name}</h1>
                            <Badge className="bg-indigo-500 text-white border-0 hover:bg-indigo-600">
                                {business.type.toUpperCase()}
                            </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-zinc-200">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md">
                                <MapPin size={16} className="text-indigo-400" />
                                {business.location}
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md">
                                <Building2 size={16} className="text-indigo-400" />
                                {business.industry}
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md">
                                <Star size={16} className="text-amber-400 fill-amber-400" />
                                {business.rating} Rating
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Details */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            About Business
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                            {business.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-8">
                            {business.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-0">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </section>

                    <Tabs defaultValue="services" className="w-full">
                        <TabsList className="bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-2xl w-full justify-start overflow-x-auto h-auto">
                            <TabsTrigger value="services" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900 data-[state=active]:shadow-sm">Services</TabsTrigger>
                            <TabsTrigger value="team" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900 data-[state=active]:shadow-sm">Team</TabsTrigger>
                            <TabsTrigger value="reviews" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900 data-[state=active]:shadow-sm">Reviews</TabsTrigger>
                        </TabsList>

                        <TabsContent value="services" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-600 dark:text-zinc-400">
                                {[
                                    { title: "Strategic Consulting", desc: "Expert guidance for your business growth." },
                                    { title: "Digital Solutions", desc: "Modern technology stacks for scaling." },
                                    { title: "Market Analysis", desc: "Data-driven insights for better decisions." },
                                    { title: "Customer Success", desc: "Dedicated support for long-term retention." }
                                ].map((service, i) => (
                                    <div key={i} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-indigo-500/50 transition-colors group">
                                        <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">{service.title}</h3>
                                        <p className="text-sm">{service.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="team" className="mt-6">
                            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 p-8 text-center text-zinc-500">
                                Team information will be displayed here soon.
                            </div>
                        </TabsContent>

                        <TabsContent value="reviews" className="mt-6">
                            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 p-8 text-center text-zinc-500">
                                Customer reviews will be displayed here soon.
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column - Sidebar Info */}
                <div className="space-y-8">
                    {/* Action Card */}
                    <Card className="rounded-[2.5rem] border-0 bg-zinc-900 text-white overflow-hidden shadow-2xl relative">
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-indigo-500/20 blur-[50px]" />
                        <CardContent className="p-8 space-y-6 relative z-10">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Interested in working with us?</h3>
                                <p className="text-zinc-400 text-sm">Send us an inquiry today and let's build something great together.</p>
                            </div>

                            <Button className="w-full h-14 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg group">
                                Contact Business
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <div className="pt-4 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-indigo-400">
                                        <Mail size={16} />
                                    </div>
                                    <span className="text-sm text-zinc-300 truncate">{business.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-indigo-400">
                                        <Phone size={16} />
                                    </div>
                                    <span className="text-sm text-zinc-300">{business.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-indigo-400">
                                        <Globe size={16} />
                                    </div>
                                    <a href={business.website} target="_blank" className="text-sm text-zinc-300 hover:text-indigo-400 transition-colors flex items-center gap-1">
                                        Visit Website <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Business Details List */}
                    <section className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm space-y-6">
                        <h3 className="text-lg font-bold border-b border-zinc-100 dark:border-zinc-800 pb-4">Business Information</h3>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-slate-400">
                                    <User size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Owner / CEO</p>
                                    <p className="text-zinc-900 dark:text-zinc-100 font-medium">{business.ownerName}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-slate-400">
                                    <Users size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Company Size</p>
                                    <p className="text-zinc-900 dark:text-zinc-100 font-medium">{business.employees} Employees</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-slate-400">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Established</p>
                                    <p className="text-zinc-900 dark:text-zinc-100 font-medium">Joined in {business.yearJoined}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-slate-400">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Office Location</p>
                                    <p className="text-zinc-900 dark:text-zinc-100 font-medium text-sm leading-relaxed">{business.address}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                            <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-4">Connect with us</p>
                            <div className="flex gap-3">
                                {business.social.instagram && (
                                    <a href={business.social.instagram} className="h-10 w-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all">
                                        <Instagram size={18} />
                                    </a>
                                )}
                                {business.social.linkedin && (
                                    <a href={business.social.linkedin} className="h-10 w-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                        <Linkedin size={18} />
                                    </a>
                                )}
                                {business.social.twitter && (
                                    <a href={business.social.twitter} className="h-10 w-10 rounded-xl bg-zinc-900/10 dark:bg-white/10 text-zinc-900 dark:text-white flex items-center justify-center hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-900 transition-all">
                                        <Twitter size={18} />
                                    </a>
                                )}
                                {business.social.facebook && (
                                    <a href={business.social.facebook} className="h-10 w-10 rounded-xl bg-blue-700/10 text-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all">
                                        <Facebook size={18} />
                                    </a>
                                )}
                                {business.social.youtube && (
                                    <a href={business.social.youtube} className="h-10 w-10 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                        <Youtube size={18} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
