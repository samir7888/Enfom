"use client";
import Image from "next/image";
import { useState } from "react";
import CommentItem from "../commentItem";
import { mockComments } from "../mockComments";

interface SinglePostPageProps {
  params: {
    id: string;
  };
}

const SinglePostPage = ({ params }: SinglePostPageProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Mock post data - in real app, fetch based on params.id
  const post = {
    id: params.id,
    user: {
      name: "John Doe",
      username: "johndoe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    caption:
      "Beautiful sunset at the beach today! Nothing beats the golden hour vibes. 🌅 #sunset #beach #goldenhour #photography",
    likes: 1247,
    time: "2 hours ago",
    location: "Malibu Beach, CA",
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Handle comment submission
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-6xl w-full h-[90vh] flex">
        {/* Left side - Post Image (Fixed) */}
        <div className="flex-1 bg-black flex items-center justify-center relative">
          <div className="relative w-full h-full">
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right side - Post Details & Comments (Scrollable) */}
        <div className="w-96 flex flex-col bg-white">
          {/* Post Header */}
          <div className="p-4 border-b border-gray-200 flex items-center">
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
              {post.location && (
                <div className="text-xs text-gray-500">{post.location}</div>
              )}
            </div>
            <button className="text-gray-600 hover:text-gray-800">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>

          {/* Comments Section (Scrollable) */}
          <div className="flex-1 overflow-y-auto">
            {/* Original Post Caption */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3 relative shrink-0">
                  <Image
                    src={post.user.avatar}
                    alt={post.user.name}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold text-sm mr-2">
                      {post.user.username}
                    </span>
                    <span className="text-gray-500 text-xs">{post.time}</span>
                  </div>
                  <p className="text-sm text-gray-800">{post.caption}</p>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="px-4 py-2">
              {mockComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          </div>

          {/* Post Actions & Stats */}
          <div className="border-t border-gray-200 p-4">
            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`transition-colors ${
                    isLiked
                      ? "text-red-500"
                      : "text-gray-700 hover:text-gray-500"
                  }`}
                >
                  <i
                    className={`${isLiked ? "fas" : "far"} fa-heart text-xl`}
                  ></i>
                </button>
                <button className="text-gray-700 hover:text-gray-500">
                  <i className="far fa-comment text-xl"></i>
                </button>
                <button className="text-gray-700 hover:text-gray-500">
                  <i className="far fa-paper-plane text-xl"></i>
                </button>
              </div>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`transition-colors ${
                  isSaved
                    ? "text-gray-900"
                    : "text-gray-700 hover:text-gray-500"
                }`}
              >
                <i
                  className={`${isSaved ? "fas" : "far"} fa-bookmark text-xl`}
                ></i>
              </button>
            </div>

            {/* Likes Count */}
            <div className="font-semibold text-sm mb-2">
              {post.likes + (isLiked ? 1 : 0)} likes
            </div>

            {/* Add Comment */}
            <form
              onSubmit={handleCommentSubmit}
              className="flex items-center border-t border-gray-200 pt-3"
            >
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 text-sm border-none outline-none resize-none"
              />
              {newComment.trim() && (
                <button
                  type="submit"
                  className="text-blue-500 font-semibold text-sm hover:text-blue-700 ml-2"
                >
                  Post
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
