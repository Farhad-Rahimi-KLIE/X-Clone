'use client';
import Image from "next/image";
import Link from "next/link";
import { Smile, Copy, CaseUpper, CaseLower } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Feed({ posts, users }) {
  const router = useRouter();

  // Ensure we have posts and users before rendering
  if (!posts || !users) {
    return <div>Loading...</div>;
  }

  const [tweetText, setTweetText] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(tweetText);
    alert('Text copied to clipboard!');
  };

  const handleUppercase = () => {
    setTweetText(tweetText.toUpperCase());
  };

  const handleLowercase = () => {
    setTweetText(tweetText.toLowerCase());
  };

  const handleEmoji = () => {
    setTweetText(tweetText + '😊');
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
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
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
            disabled={!tweetText.trim()}
            className={`py-2 px-6 rounded-full font-semibold cursor-pointer text-white ${
              tweetText.trim()
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
        const user = users.find((u) => u.id === post.userId);

        const handleProfileClick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (user?.id) {
            router.push(`/profiles/${user.id}`);
          }
        };

        return (
          <Link href={`/tweets/${post.id}`} key={post.id}>
            <div className="p-4 border-b border-gray-800 hover:bg-gray-900">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <Image 
                      width={32}
                      height={32}
                      src={user?.profileImage || '/default-profile.jpg'}
                      alt={`${user?.username || 'User'}'s profile`}
                      className="w-8 h-8 rounded-full object-cover cursor-pointer"
                      onClick={handleProfileClick}
                    />
                    <span 
                      onClick={handleProfileClick}
                      className="font-bold hover:underline cursor-pointer"
                    >
                      {user?.username || 'Unknown'}
                    </span>
                    <span className="text-gray-500">
                      @{user?.handle || 'unknown'}
                    </span>
                    <span className="text-gray-500">· {post.time || 'N/A'}</span>
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