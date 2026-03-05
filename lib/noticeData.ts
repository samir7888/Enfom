// Shared notice data used across the application

export interface Notice {
  id: string;
  title: string;
  message: string;
  source: string;
  category: string;
  status: "active" | "inactive";
  priority: "High" | "Medium" | "Low";
  views: string;
  comments: number;
  interested: number;
  responses: number;
  createdAt: string;
  image?: string;
  authorInitials: string;
  formType?: string;
}

export const MOCK_NOTICES: Notice[] = [
  {
    id: "1",
    title: "Q1 Marketing Campaign Proposal Request",
    message:
      "Seeking creative agencies to submit comprehensive digital marketing strategies for our product launch targeting B2B SaaS companies.",
    source: "TechVentures Inc.",
    category: "Marketing",
    status: "active",
    priority: "High",
    views: "55.6k",
    comments: 2,
    interested: 49,
    responses: 8,
    authorInitials: "TI",
    createdAt: "Dec 28",
    formType: "Business Form / Proposal",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Vendor Partnership Evaluation Form",
    message:
      "Complete the vendor assessment questionnaire for potential logistics and distribution partnerships in emerging markets.",
    source: "Global Logistics",
    category: "Operations",
    status: "inactive",
    priority: "Medium",
    views: "12.4k",
    comments: 5,
    interested: 22,
    responses: 3,
    authorInitials: "GL",
    createdAt: "Jan 02",
    formType: "Partnership Form",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "System Maintenance Scheduled",
    message:
      "We will be performing scheduled maintenance on our servers this weekend from 2:00 AM to 6:00 AM EST. During this time, some services may be temporarily unavailable.",
    source: "System Admin",
    category: "Maintenance",
    status: "active",
    priority: "High",
    views: "89.2k",
    comments: 12,
    interested: 156,
    responses: 0,
    authorInitials: "SA",
    createdAt: "2 hours ago",
    formType: "System Notice",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    title: "New Feature Release: Dark Mode",
    message:
      "We're excited to announce the release of Dark Mode! You can now switch between light and dark themes in your settings. This feature has been highly requested by our community.",
    source: "Product Team",
    category: "Feature",
    status: "active",
    priority: "Medium",
    views: "124.5k",
    comments: 67,
    interested: 234,
    responses: 0,
    authorInitials: "PT",
    createdAt: "1 day ago",
    formType: "Product Update",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
  },
];


export const mockComments = [
  {
    id: "1",
    author: "Sarah Johnson",
    authorInitials: "SJ",
    comment: "This is a great initiative! Looking forward to the results.",
    createdAt: "2 hours ago",
    likes: 12,
    replies: 3,
  },
  {
    id: "2",
    author: "Mike Davis",
    authorInitials: "MD",
    comment: "I have a few questions about the proposal requirements. Can we schedule a call?",
    createdAt: "3 hours ago",
    likes: 5,
    replies: 2,
  },
  {
    id: "3",
    author: "Emily Chen",
    authorInitials: "EC",
    comment: "Excellent! This will help streamline our workflow.",
    createdAt: "4 hours ago",
    likes: 8,
    replies: 1,
  },
];

export const getNoticeById = (id: string): Notice | undefined => {
  return MOCK_NOTICES.find((notice) => notice.id === id);
};

export const getNoticeTypeColor = (type: string) => {
  const colors = {
    marketing: "bg-blue-100 text-blue-800",
    operations: "bg-green-100 text-green-800",
    maintenance: "bg-yellow-100 text-yellow-800",
    feature: "bg-purple-100 text-purple-800",
    security: "bg-red-100 text-red-800",
    policy: "bg-gray-100 text-gray-800",
  };
  return colors[type.toLowerCase() as keyof typeof colors] || colors.policy;
};

export const getPriorityColor = (priority: string) => {
  const colors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };
  return colors[priority.toLowerCase() as keyof typeof colors] || colors.low;
};
