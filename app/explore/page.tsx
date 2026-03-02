'use client';

import { useState } from 'react';
import { Search, MapPin, ExternalLink, Globe, Star, Users, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

const BUSINESS_TYPES = [
    { value: 'all', label: 'All Businesses' },
    { value: 'retail', label: 'Retail' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'saas', label: 'SaaS / Software' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Financial Services' },
];

const MOCK_BUSINESSES = [
    {
        id: 1,
        name: "TechFlow Solutions",
        type: "saas",
        industry: "Information Technology",
        description: "Developing modern cloud-based infrastructure for high-growth startups and enterprises worldwide.",
        location: "San Francisco, CA",
        website: "https://techflow.io",
        logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop",
        rating: 4.8,
        employees: "51+",
        yearJoined: 2023,
        coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
    },
    {
        id: 2,
        name: "Green Leaf Bistro",
        type: "restaurant",
        industry: "Food & Beverage",
        description: "Farm-to-table organic restaurant specializing in Mediterranean inspired vegetarian cuisines.",
        location: "Portland, OR",
        website: "https://greenleaf.bistro",
        logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop",
        rating: 4.9,
        employees: "11-50",
        yearJoined: 2022,
        coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
    },
    {
        id: 3,
        name: "Urban Style Co.",
        type: "retail",
        industry: "Fashion & Apparel",
        description: "Sustainable streetwear brand focusing on quality fabrics and timeless urban aesthetics.",
        location: "New York, NY",
        website: "https://urbanstyle.com",
        logo: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&h=100&fit=crop",
        rating: 4.7,
        employees: "11-50",
        yearJoined: 2024,
        coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
    },
    {
        id: 4,
        name: "Apex Wealth Partners",
        type: "finance",
        industry: "Financial Services",
        description: "Boutique wealth management and investment advisory services tailored for long-term growth.",
        location: "London, UK",
        website: "https://apexwealth.com",
        logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop",
        rating: 4.6,
        employees: "51+",
        yearJoined: 2023,
        coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
    },
    {
        id: 5,
        name: "Lumina EduTech",
        type: "education",
        industry: "Education Technology",
        description: "Personalized online learning platform helping students master STEM subjects through AI tutoring.",
        location: "Austin, TX",
        website: "https://luminaedu.com",
        logo: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=100&h=100&fit=crop",
        rating: 4.8,
        employees: "1-10",
        yearJoined: 2024,
        coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
    },
    {
        id: 6,
        name: "Zenith Marketing",
        type: "consulting",
        industry: "Marketing & Strategy",
        description: "Data-driven marketing solutions helping brands reach their target audience with precision and creative flair.",
        location: "Chicago, IL",
        website: "https://zenithmarketing.io",
        logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop",
        rating: 4.7,
        employees: "11-50",
        yearJoined: 2023,
        coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
    }
];

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');

    const filteredBusinesses = MOCK_BUSINESSES.filter(business => {
        const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            business.industry.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = selectedType === 'all' || business.type === selectedType;

        return matchesSearch && matchesType;
    });

    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-zinc-950/50 p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
            {/* Hero section with glass effect */}
            <section className="relative overflow-hidden rounded-3xl bg-zinc-900 px-6 py-16 md:px-12 md:py-20 text-white shadow-2xl shadow-indigo-500/10">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[100px]" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />

                <div className="relative z-10 max-w-3xl space-y-6">
                    <Badge className="bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                        Explore Businesses
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                        Discover Global <br />
                        Business <span className="text-indigo-400">Opportunities</span>
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
                        Connect with top-rated industries, innovative startups, and established enterprises from around the globe.
                    </p>
                </div>
            </section>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between z-10">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                        placeholder="Search businesses, industries, or keywords..."
                        className="pl-10 h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex-1 md:w-64">
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-indigo-500" />
                                    <SelectValue placeholder="Category" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-zinc-200 dark:border-zinc-800 shadow-xl">
                                {BUSINESS_TYPES.map(type => (
                                    <SelectItem key={type.value} value={type.value} className="rounded-xl mt-1">
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant="outline" className="h-12 w-12 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-0 group">
                        <Globe className="h-5 w-5 text-indigo-500 group-hover:rotate-12 transition-transform" />
                    </Button>
                </div>
            </div>

            {/* Business Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBusinesses.map((business, index) => (
                    <Card
                        key={business.id}
                        className="group overflow-hidden border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Card Header with Cover Image */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <img
                                src={business.coverImage}
                                alt={business.name}
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute top-4 right-4">
                                <Badge className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-0 border-white/20">
                                    {business.type.charAt(0).toUpperCase() + business.type.slice(1)}
                                </Badge>
                            </div>
                            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                <Avatar className="h-12 w-12 border-2 border-white/20 shadow-xl">
                                    <AvatarImage src={business.logo} />
                                    <AvatarFallback className="bg-indigo-500 text-white font-bold">
                                        {business.name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-white font-bold flex items-center gap-1.5 truncate max-w-[180px]">
                                        {business.name}
                                    </h3>
                                    <div className="flex items-center gap-1 text-zinc-300 text-xs">
                                        <MapPin className="h-3 w-3" />
                                        {business.location}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card Content */}
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 text-xs font-bold">
                                    <Star className="h-3.5 w-3.5 fill-current" />
                                    {business.rating}
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                    <Users className="h-3.5 w-3.5" />
                                    {business.employees}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight opacity-60">
                                    {business.industry}
                                </p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                                    {business.description}
                                </p>
                            </div>
                        </CardContent>

                        {/* Card Footer */}
                        <CardFooter className="px-6 pb-6 pt-0 flex gap-3">
                            <Link href={`/business/${business.id}`} className="flex-1">
                                <Button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold rounded-2xl h-11 transition-all group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 border-0">
                                    View Profile
                                </Button>
                            </Link>
                            <Button variant="ghost" className="h-11 w-11 rounded-2xl border border-zinc-200 dark:border-zinc-800 group/link" asChild>
                                <a href={business.website} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-5 w-5 text-zinc-500 group-hover/link:text-indigo-500 transition-colors" />
                                </a>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredBusinesses.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="h-24 w-24 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                        <Search className="h-10 w-10 text-zinc-300" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold">No businesses found</h3>
                        <p className="text-zinc-500 max-w-sm mx-auto">
                            We couldn't find any businesses matching your current search or filters. Try adjusting your query.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => { setSearchQuery(''); setSelectedType('all'); }}
                        className="rounded-2xl h-12 px-8"
                    >
                        Clear All Filters
                    </Button>
                </div>
            )}
        </div>
    );
}