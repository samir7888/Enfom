"use client";

import { JSX, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Category {
  id: string;
  label: string;
  icon: JSX.Element;
}

interface HeadlineItem {
  id: number;
  title: string;
  tag: string;
  tagColor: string;
  views: string;
  likes: string;
  image: string;
}

interface LatestItem {
  id: number;
  title: string;
  author: string;
  role: string;
  date: string;
  image: string;
  gradient: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────
const categories: Category[] = [
  {
    id: "all",
    label: "All",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: "finance",
    label: "Finance",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    id: "strategy",
    label: "Strategy",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: "hr",
    label: "HR",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "operations",
    label: "Operations",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "startup",
    label: "Startup",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "leadership",
    label: "Leadership",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    id: "innovation",
    label: "Innovation",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

const headlines: HeadlineItem[] = [
  {
    id: 1,
    title: "Global markets rally as Fed signals rate pause",
    tag: "Finance",
    tagColor: "bg-blue-100 text-blue-700",
    views: "4.6k",
    likes: "5k",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&h=80&fit=crop",
  },
  {
    id: 2,
    title: "Top 10 marketing trends reshaping B2B in 2025",
    tag: "Marketing",
    tagColor: "bg-green-100 text-green-700",
    views: "124k",
    likes: "657k",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=120&h=80&fit=crop",
  },
  {
    id: 3,
    title: "How startups are disrupting traditional supply chains",
    tag: "Startup",
    tagColor: "bg-orange-100 text-orange-700",
    views: "654k",
    likes: "87k",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=120&h=80&fit=crop",
  },
  {
    id: 4,
    title: "Leadership lessons from Fortune 500 CEOs this quarter",
    tag: "Leadership",
    tagColor: "bg-purple-100 text-purple-700",
    views: "74k",
    likes: "89k",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=80&fit=crop",
  },
  {
    id: 5,
    title: "Remote workforce strategies that actually retain talent",
    tag: "HR",
    tagColor: "bg-pink-100 text-pink-700",
    views: "2.5k",
    likes: "124",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=120&h=80&fit=crop",
  },
  {
    id: 6,
    title: "Operational efficiency through AI automation in 2025",
    tag: "Operations",
    tagColor: "bg-teal-100 text-teal-700",
    views: "8.7k",
    likes: "36k",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=80&fit=crop",
  },
  {
    id: 7,
    title: "Venture capital outlook: where smart money is flowing",
    tag: "Finance",
    tagColor: "bg-blue-100 text-blue-700",
    views: "23.5k",
    likes: "6k",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&h=80&fit=crop",
  },
  {
    id: 8,
    title: "Innovation labs: How corporates are betting on R&D",
    tag: "Innovation",
    tagColor: "bg-indigo-100 text-indigo-700",
    views: "87k",
    likes: "678",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&h=80&fit=crop",
  },
];

const latestItems: LatestItem[] = [
  {
    id: 1,
    title: "How Indonesia's economy is accelerating through digital transformation",
    author: "Wildan I.",
    role: "Analyst",
    date: "31 Jan 2025",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
    gradient: "from-blue-900/60",
  },
  {
    id: 2,
    title: "London remains Europe's top financial hub with over 7M professionals",
    author: "Reza A.",
    role: "Economist",
    date: "2 Feb 2025",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop&crop=right",
    gradient: "from-slate-900/60",
  },
  {
    id: 3,
    title: "Diverse workforce drives innovation in London's tech corridor",
    author: "Nabhan I.D.",
    role: "Researcher",
    date: "27 Jan 2025",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop&crop=top",
    gradient: "from-indigo-900/60",
  },
  {
    id: 4,
    title: "Commercial real estate redefines the modern corporate campus",
    author: "Zahran R.",
    role: "Consultant",
    date: "April 2025",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop&crop=bottom",
    gradient: "from-gray-900/60",
  },
];

// ── Avatar placeholder ─────────────────────────────────────────────────────────
const avatarColors: Record<string, string> = {
  "Wildan I.": "bg-blue-500",
  "Reza A.": "bg-emerald-500",
  "Nabhan I.D.": "bg-violet-500",
  "Zahran R.": "bg-amber-500",
};

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ExplorePage(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredHeadlines =
    activeCategory === "all"
      ? headlines
      : headlines.filter(
          (h) => h.tag.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-[#f5f6fa] font-sans">
      {/* ── Top Nav ── */}
   

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-10">

        {/* ── Topic Categories ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">Topic categories</h2>
            <button className="text-sm text-blue-600 font-medium hover:underline">View all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl border transition-all whitespace-nowrap flex-shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                <span className={activeCategory === cat.id ? "text-white" : "text-gray-400"}>
                  {cat.icon}
                </span>
                <span className="text-xs font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Today's Headlines ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">Todays highlights</h2>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filters
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredHeadlines.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3 flex gap-3 items-start hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 mb-1.5">
                    {item.title}
                  </p>
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.tagColor} mb-1.5`}>
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span className="flex items-center gap-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {item.views}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {item.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredHeadlines.length === 0 && (
            <p className="text-center text-gray-400 py-10 text-sm">No articles found for this category.</p>
          )}
        </section>

        {/* ── Latest Insights ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">Latest insights</h2>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filters
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {latestItems.map((item, idx) => (
              <div
                key={item.id}
                className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      ["1486325212027-8081e485255e",
                       "1486325212027-8081e485255e",
                       "1486325212027-8081e485255e",
                       "1486325212027-8081e485255e"][idx]
                    }?w=400&h=220&fit=crop&q=${60 + idx * 10}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=220&fit=crop`;
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} to-transparent`} />
                  <button className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-white transition">
                    Read more
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 mb-3">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full ${avatarColors[item.author] ?? "bg-gray-400"} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{item.author}</p>
                      <p className="text-[10px] text-gray-400">{item.role} · {item.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trending Topics ── */}
        <section className="pb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">Trending topics</h2>
            <button className="text-sm text-blue-600 font-medium hover:underline">View all</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {["AI in Business", "Remote Work", "VC Funding", "ESG Strategy", "Digital Marketing", "Supply Chain", "Fintech", "Leadership", "M&A Trends", "Product-Led Growth", "B2B SaaS", "Corporate Culture"].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200"
              >
                #{tag}
              </button>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}