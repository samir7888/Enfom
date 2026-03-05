"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";

interface CommentProps {
    comment: {
        id: string;
        author: string;
        authorInitials: string;
        comment: string;
        createdAt: string;
        likes: number;
        replies?: number;
    };
}

const CommentItem = ({ comment }: CommentProps) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="flex space-x-3 group animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-slate-700 to-emerald-900 flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5">
                {comment.authorInitials}
            </div>

            <div className="flex-1">
                {/* Author and Comment */}
                <div className="flex items-start flex-wrap gap-x-2">
                    <span className="font-semibold text-sm text-gray-900 leading-tight">
                        {comment.author}
                    </span>
                    <span className="text-sm text-gray-800 leading-tight">
                        {comment.comment}
                    </span>
                </div>

                {/* Metadata and Actions */}
                <div className="flex items-center space-x-4 mt-1.5">
                    <span className="text-xs text-gray-500 font-medium">
                        {comment.createdAt}
                    </span>
                    {comment.likes > 0 && (
                        <span className="text-xs text-gray-500 font-semibold cursor-pointer hover:underline">
                            {isLiked ? comment.likes + 1 : comment.likes} likes
                        </span>
                    )}
                    <button className="text-xs text-gray-500 font-semibold hover:text-gray-800 transition-colors">
                        Reply
                    </button>
                </div>

                {/* View Replies Button */}
                {comment.replies && comment.replies > 0 && (
                    <div className="mt-2 flex items-center space-x-2 group/replies cursor-pointer">
                        <div className="w-6 border-t border-gray-300"></div>
                        <span className="text-xs text-gray-500 font-semibold group-hover/replies:text-gray-800">
                            View {comment.replies} more {comment.replies === 1 ? 'reply' : 'replies'}
                        </span>
                    </div>
                )}
            </div>

            {/* Like Action */}
            <button
                onClick={() => setIsLiked(!isLiked)}
                className={`pt-1.5 transition-all duration-200 active:scale-125 ${isLiked ? "text-red-500" : "text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100"
                    }`}
            >
                <Heart size={12} fill={isLiked ? "currentColor" : "none"} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default CommentItem;
