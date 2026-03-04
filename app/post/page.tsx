"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Mock posts data
const mockPosts = [
  {
    id: "1",
    user: {
      name: "John Doe",
      username: "johndoe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    caption:
      "Beautiful sunset at the beach today! Nothing beats the golden hour vibes. 🌅",
    likes: 1247,
    comments: 89,
    time: "2 hours ago",
  },
  {
    id: "2",
    user: {
      name: "Sarah Johnson",
      username: "sarahj",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
    caption:
      "Mountain hiking adventure! The view from the top was absolutely breathtaking 🏔️",
    likes: 892,
    comments: 45,
    time: "4 hours ago",
  },
  {
    id: "3",
    user: {
      name: "Mike Chen",
      username: "mikechen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop",
    caption:
      "Coffee and code - perfect combination for a productive morning ☕️💻",
    likes: 654,
    comments: 32,
    time: "6 hours ago",
  },
  {
    id: "4",
    user: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&h=400&fit=crop",
    caption:
      "Fresh ingredients for tonight's dinner. Cooking is my therapy 🥗👩‍🍳",
    likes: 423,
    comments: 28,
    time: "8 hours ago",
  },
  {
    id: "5",
    user: {
      name: "Alex Rodriguez",
      username: "alexr",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop",
    caption:
      "Late night city vibes. There's something magical about urban landscapes ✨🌃",
    likes: 1156,
    comments: 67,
    time: "12 hours ago",
  },
  {
    id: "6",
    user: {
      name: "Lisa Thompson",
      username: "lisat",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    caption:
      "Forest therapy session. Nature always knows how to heal the soul 🌲🍃",
    likes: 789,
    comments: 41,
    time: "1 day ago",
  },
];

const PostCard = ({ post }: { post: (typeof mockPosts)[0] }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Post Header */}
      <div className="p-4 flex items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden mr-3 relative">
          <Image
            src={post.user.avatar}
            alt={post.user.name}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{post.user.username}</div>
          <div className="text-xs text-gray-500">{post.time}</div>
        </div>
        <button className="text-gray-600 hover:text-gray-800">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>

      {/* Post Image - Clickable */}
      <Link href={`/post/${post.id}`} className="block">
        <div className="relative aspect-square cursor-pointer hover:opacity-95 transition-opacity">
          <Image
            src={post.image}
            alt="Post image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`transition-colors ${
                isLiked ? "text-red-500" : "text-gray-700 hover:text-gray-500"
              }`}
            >
              <i className={`${isLiked ? "fas" : "far"} fa-heart text-xl`}></i>
            </button>
            <Link
              href={`/post/${post.id}`}
              className="text-gray-700 hover:text-gray-500"
            >
              <i className="far fa-comment text-xl"></i>
            </Link>
            <button className="text-gray-700 hover:text-gray-500">
              <i className="far fa-paper-plane text-xl"></i>
            </button>
          </div>
          <button className="text-gray-700 hover:text-gray-500">
            <i className="far fa-bookmark text-xl"></i>
          </button>
        </div>

        {/* Likes and Comments Count */}
        <div className="font-semibold text-sm mb-2">
          {post.likes + (isLiked ? 1 : 0)} likes
        </div>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-semibold mr-2">{post.user.username}</span>
          <span className="text-gray-800">{post.caption}</span>
        </div>

        {/* View Comments Link */}
        <Link
          href={`/post/${post.id}`}
          className="text-gray-500 text-sm mt-2 block hover:text-gray-700"
        >
          View all {post.comments} comments
        </Link>
      </div>
    </div>
  );
};

const PostsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Posts</h1>
          <p className="text-gray-600">
            Discover amazing content from our community
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
