"use client";
import Image from "next/image";
import React, { useState } from "react";
import CommentItem from "@/components/comment-item";

import {
  getNoticeById,
  getNoticeTypeColor,
  getPriorityColor,
  mockComments,
} from "../../../lib/noticeData";
import { X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
type Props = {
  params: Promise<{ id: string }>;
};

const SingleNoticePage = ({ params }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [newComment, setNewComment] = useState("");

  const router = useRouter();

  // Get notice data based on ID from shared data
  const { id } = React.use(params);
  const notice = getNoticeById(id);
  console.log(notice);

  if (!notice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Notice Not Found
          </h1>
          <p className="text-gray-600">
            The notice you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen bg-white">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="font-semibold text-lg truncate mx-4 flex-1">
              {notice.title}
            </h1>
            <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors">
              <i className="fas fa-ellipsis-h text-gray-600"></i>
            </button>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="pb-20">
          {/* Notice Image/Visual */}
          <div className="aspect-square bg-linear-to-br from-blue-50 to-indigo-100 relative">
            {notice.image ? (
              <div className="relative w-full h-full">
                <Image
                  src={notice.image}
                  alt="Notice image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <i
                      className={`fas fa-bell text-3xl ${notice.category.toLowerCase() === "security"
                          ? "text-red-500"
                          : notice.category.toLowerCase() === "maintenance"
                            ? "text-yellow-500"
                            : notice.category.toLowerCase() === "feature"
                              ? "text-blue-500"
                              : "text-gray-500"
                        }`}
                    ></i>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getNoticeTypeColor(
                        notice.category
                      )}`}
                    >
                      {notice.category.toUpperCase()}
                    </span>
                    <div
                      className={`w-3 h-3 rounded-full ${getPriorityColor(
                        notice.priority
                      )}`}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Priority indicator */}
            {notice.priority === "High" && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                URGENT
              </div>
            )}
          </div>

          {/* Mobile Notice Details */}
          <div className="px-4 py-3">
            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`transition-colors ${isLiked
                      ? "text-red-500"
                      : "text-gray-900 hover:text-gray-600"
                    }`}
                >
                  <i
                    className={`${isLiked ? "fas" : "far"} fa-heart text-2xl`}
                  ></i>
                </button>
                <button className="text-gray-900 hover:text-gray-600">
                  <i className="far fa-comment text-2xl"></i>
                </button>
                <button className="text-gray-900 hover:text-gray-600">
                  <i className="far fa-share text-2xl"></i>
                </button>
              </div>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`transition-colors ${isSaved
                    ? "text-gray-900"
                    : "text-gray-900 hover:text-gray-600"
                  }`}
              >
                <i
                  className={`${isSaved ? "fas" : "far"} fa-bookmark text-2xl`}
                ></i>
              </button>
            </div>

            {/* Likes Count */}
            <div className="mb-2">
              <span className="font-semibold text-sm">
                {notice.interested + (isLiked ? 1 : 0)} interested
              </span>
            </div>

            {/* Notice Content */}
            <div className="mb-3">
              <div className="flex flex-col space-y-5 items-start space-x-2 mb-2">
                <div className="flex  items-center">
                  <span className="w-8 h-8 gap-4  rounded-full bg-linear-to-br from-slate-700 to-emerald-900 flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">
                    {notice.authorInitials}
                  </span>
                  <span className="font-semibold text-sm">{notice.source}</span>
                </div>

                <p className="text-sm text-gray-900 flex-1">{notice.message}</p>
              </div>

              {/* Notice metadata */}
              <div className="flex items-center space-x-2 mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getNoticeTypeColor(
                    notice.category
                  )}`}
                >
                  {notice.category}
                </span>
                <div
                  className={`w-2 h-2 rounded-full ${getPriorityColor(
                    notice.priority
                  )}`}
                ></div>
                <span className="text-xs text-gray-500">
                  {notice.priority} priority
                </span>
              </div>

              {/* Form Type Badge */}
              {notice.formType && (
                <div className="mb-2">
                  <span className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer bg-blue-50 px-2 py-1 rounded-full">
                    #{notice.formType.toLowerCase().replace(/\s+/g, "")}
                  </span>
                </div>
              )}
            </div>

            {/* Timestamp */}
            <div className="text-xs text-gray-500 mb-4">
              Published {notice.createdAt} • {notice.views} views
            </div>

            {/* Comments Count */}
            {notice.comments > 0 && (
              <button className="text-sm text-gray-500 mb-4">
                View all {notice.comments} comments
              </button>
            )}

            {/* Comments List - Show first few on mobile */}
            <div className="space-y-3 mb-4">
              {mockComments.slice(0, 2).map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Comment Input - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
          <form
            onSubmit={handleCommentSubmit}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-slate-700 to-emerald-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
              U
            </div>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 text-sm border-none outline-none bg-gray-100 rounded-full px-4 py-2"
            />
            {newComment.trim() && (
              <button
                type="submit"
                className="text-blue-500 font-semibold text-sm hover:text-blue-700"
              >
                Post
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen bg-black/20 items-center justify-center p-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-6xl w-full h-[90vh] flex relative">
          {/* Desktop Close Button */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 right-4 z-50 hover:bg-black/10 transition-all duration-150 rounded-full p-2"
          >
            <X size={24} />
          </button>

          {/* Left side - Notice Image/Visual */}
          <div className="flex-1 bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
            {notice.image ? (
              <div className="relative w-full h-full">
                <Image
                  src={notice.image}
                  alt="Notice image"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <i
                    className={`fas fa-bell text-4xl ${notice.category.toLowerCase() === "security"
                        ? "text-red-500"
                        : notice.category.toLowerCase() === "maintenance"
                          ? "text-yellow-500"
                          : notice.category.toLowerCase() === "feature"
                            ? "text-blue-500"
                            : "text-gray-500"
                      }`}
                  ></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {notice.title}
                </h2>
                <div className="flex items-center justify-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getNoticeTypeColor(
                      notice.category
                    )}`}
                  >
                    {notice.category.toUpperCase()}
                  </span>
                  <div
                    className={`w-3 h-3 rounded-full ${getPriorityColor(
                      notice.priority
                    )}`}
                  ></div>
                </div>
              </div>
            )}

            {/* Priority indicator */}
            {notice.priority === "High" && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                URGENT
              </div>
            )}
          </div>

          {/* Right side - Notice Details & Comments */}
          <div className="w-96 flex flex-col bg-white">
            {/* Notice Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-slate-700 to-emerald-900 flex items-center justify-center text-white font-bold text-sm mr-3">
                  {notice.authorInitials}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{notice.source}</div>
                  <div className="text-xs text-gray-500">
                    {notice.category} Team
                  </div>
                </div>
                <button className="text-gray-600 hover:text-gray-800">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>

              {/* Notice metadata */}
              <div className="flex items-center space-x-2 mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getNoticeTypeColor(
                    notice.category
                  )}`}
                >
                  {notice.category}
                </span>
                <div
                  className={`w-2 h-2 rounded-full ${getPriorityColor(
                    notice.priority
                  )}`}
                ></div>
                <span className="text-xs text-gray-500">
                  {notice.priority} priority
                </span>
              </div>

              <h1 className="font-bold text-lg text-gray-900 mb-1">
                {notice.title}
              </h1>
              <div className="text-xs text-gray-500">
                Published {notice.createdAt} • {notice.views} views
              </div>
            </div>

            {/* Comments Section (Scrollable) */}
            <div className="flex-1 overflow-y-auto">
              {/* Notice Content */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-slate-700 to-emerald-900 flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">
                    {notice.authorInitials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="font-semibold text-sm mr-2">
                        {notice.source}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {notice.createdAt}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {notice.message}
                    </p>

                    {/* Form Type Badge */}
                    {notice.formType && (
                      <div className="mt-3">
                        <span className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer bg-blue-50 px-2 py-1 rounded-full">
                          #{notice.formType.toLowerCase().replace(/\s+/g, "")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="px-4 py-2">
                <div className="text-sm font-semibold text-gray-700 mb-3">
                  Comments ({notice.comments})
                </div>
                {mockComments.slice(0, notice.comments).map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </div>
            </div>

            {/* Notice Actions & Stats */}
            <div className="border-t border-gray-200 p-4">
              {/* Action Buttons */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`transition-colors ${isLiked
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
                    <i className="far fa-share text-xl"></i>
                  </button>
                </div>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`transition-colors ${isSaved
                      ? "text-gray-900"
                      : "text-gray-700 hover:text-gray-500"
                    }`}
                >
                  <i
                    className={`${isSaved ? "fas" : "far"} fa-bookmark text-xl`}
                  ></i>
                </button>
              </div>

              {/* Likes and Comments Count */}
              <div className="flex items-center space-x-4 text-sm mb-3">
                <span className="font-semibold">
                  {notice.interested + (isLiked ? 1 : 0)} interested
                </span>
                <span className="text-gray-600">
                  {notice.comments} comments
                </span>
                <span className="text-gray-600">
                  {notice.responses} responses
                </span>
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
    </>
  );
};

export default SingleNoticePage;
