// components/CommentItem.tsx
"use client";
import Image from 'next/image';
import { useState } from 'react';


interface CommentItemProps {
  comment: {
    id: number;
    name: string;
    username: string;
    avatar: string;
    time: string;
    text: string;
    likes: number;
    replies?: CommentItemProps['comment'][];
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex mb-5 animate-fadeIn">
      <div className="w-8 h-8 rounded-full overflow-hidden mr-3 relative flex-shrink-0">
        <Image
          src={comment?.avatar}
          alt={comment?.name}
          fill
          className="object-cover"
          sizes="32px"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-semibold text-sm mr-2 text-gray-900">{comment?.name}</span>
          <span className="text-gray-500 text-xs">{comment?.time}</span>
        </div>
        <p className="text-sm mb-2 text-gray-800">{comment?.text}</p>
        <div className="flex items-center">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`bg-none border-0 text-xs mr-4 flex items-center transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            <i className={`${isLiked ? 'fas' : 'far'} fa-heart mr-1 text-sm`}></i>
            <span>{comment?.likes + (isLiked ? 1 : 0)}</span>
          </button>
          <button className="bg-none border-0 text-gray-500 text-xs hover:text-blue-500 transition-colors">
            Reply
          </button>
        </div>

        {/* Replies */}
        {comment?.replies && comment?.replies.length > 0 && (
          <div className="ml-11 pl-4 border-l-2 border-gray-200 mt-3">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;