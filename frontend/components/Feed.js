'use client';
import Image from "next/image";
import Link from "next/link";
import { Smile, Copy, CaseUpper, CaseLower } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, getAllPosts } from '../lib/features/MainData/maindata.Slice';
import { getAllUsers } from '../lib/features/authentecation/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Feed() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { posts, loading: postsLoading, error: postsError } = useSelector((state) => state.post || {});
  const { users, loading: usersLoading, error: usersError } = useSelector((state) => state.auth || {});
  
  const [input, setInput] = useState({ content: "" });

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log("posts", posts);
  console.log("users", users?.users);

  // Handle loading state
  if (postsLoading || usersLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state (ensure we render a string, not an object)
  if (postsError || usersError) {
    const errorMessage = typeof postsError === 'string' ? postsError :
                        postsError?.message || typeof usersError === 'string' ? usersError :
                        usersError?.message || 'An error occurred';
    return <div>Error: {errorMessage}</div>;
  }

  // Handle no data or invalid data
  if (!posts || !Array.isArray(posts) || !users || !Array.isArray(users?.users)) {
    return <div>No valid data available</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(input.content);
    alert('Text copied to clipboard!');
  };

  const handleUppercase = () => {
    setInput({ ...input, content: input.content.toUpperCase() });
  };

  const handleLowercase = () => {
    setInput({ ...input, content: input.content.toLowerCase() });
  };

  const handleEmoji = () => {
    setInput({ ...input, content: input.content + '😊' });
  };

  const create_Post = () => {
    dispatch(createPost(input));
    setInput({ content: "" });
  };

  return (
    <div className="bg-black text-white">
      {/* Header */}
      <div className="p-2 border-b border-gray-800 sticky top-0 backdrop-blur-sm bg-black">
        <h1 className="text-xl font-bold">For you</h1>
      </div>

      {/* Tweet Input */}
      <div className="p-4 border-b border-gray-800">
        <textarea
          className="w-full bg-transparent resize-none outline-none text-xl text-white placeholder-gray-500"
          placeholder="What's happening?"
          name="content"
          value={input.content}
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          rows={3}
        />
        <div className="flex justify-between items-center mt-2">
          <div className="flex space-x-3">
            <button 
              onClick={handleEmoji}
              className="text-blue-400 cursor-pointer hover:text-blue-500"
              title="Add emoji"
            >
              <Smile size={20} />
            </button>
            <button 
              onClick={handleCopy}
              className="text-blue-400 cursor-pointer hover:text-blue-500"
              title="Copy text"
            >
              <Copy size={20} />
            </button>
            <button 
              onClick={handleUppercase}
              className="text-blue-400 cursor-pointer hover:text-blue-500"
              title="Convert to uppercase"
            >
              <CaseUpper size={20} />
            </button>
            <button 
              onClick={handleLowercase}
              className="text-blue-400 cursor-pointer hover:text-blue-500"
              title="Convert to lowercase"
            >
              <CaseLower size={20} />
            </button>
          </div>
          <button 
            disabled={!input.content.trim()}
            onClick={create_Post}
            className={`py-2 px-6 rounded-full font-semibold cursor-pointer text-white ${
              input.content.trim()
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Tweet
          </button>
        </div>
      </div>

      {/* Tweets */}
      {posts.map((post) => {
        const user = users.users.find((u) => u._id === post.author?._id);
        console.log("this is user", user);

        const handleProfileClick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (user?._id) {
            router.push(`/profiles/${user._id}`);
          }
        };

        return (
          <Link href={`/tweets/${post._id}`} key={post._id}>
            <div className="p-4 border-b border-gray-800 hover:bg-gray-900">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <Image 
                      width={32} 
                      height={32} 
                      src={`http://localhost:8000/${post.author?.profilePicture || '/default-avatar.png'}`}
                      alt={`${user?.username || 'User'}'s profile`}
                      className="w-8 h-8 rounded-full object-cover cursor-pointer"
                      onClick={handleProfileClick}
                    />
                    <span 
                      onClick={handleProfileClick}
                      className="font-bold hover:underline cursor-pointer"
                    >
                      {post.author?.fullname || 'Unknown'}
                    </span>
                    <span className="text-gray-500">
                      @{post.author?.username || 'unknown'}
                    </span>
                    <span className="text-gray-500">· {post.timestamp || 'N/A'}</span>
                  </div>
                  <p className="mt-1">{post.content || 'No content'}</p>
                  <div className="flex justify-between mt-3 text-gray-500 max-w-full">
                    <button className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{post.comments || 0}</span>
                    </button>
                    <button className="flex items-center space-x-2 cursor-pointer hover:text-green-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>{post.retweets || 0}</span>
                    </button>
                    <button className="flex items-center cursor-pointer space-x-2 hover:text-red-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{post.likes || 0}</span>
                    </button>
                    <button className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <span>{post.bookmarks || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}