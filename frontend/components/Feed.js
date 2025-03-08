'use client'
import Image from "next/image";
import Link from "next/link";
import jan from '../public/jan.jpg';
import { Smile, Copy, CaseUpper, CaseLower } from 'lucide-react';
import { useState } from 'react';

export default function Feed() {
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

  const [tweets, setTweets] = useState([
    {
      id: 1,
      username: 'farhad rahimi klie',
      handle: '@johndoe',
      profileImage: '/jan.jpg',
      content: 'This is a sample tweet!',
      time: '2h',
      comments: 12,
      retweets: 45,
      likes: 89,
      bookmarks: 23,
    },
    {
      id: 2,
      username: 'Rustam hayat elbigi',
      handle: '@janesmith',
      profileImage: '/jan.jpg',
      content: 'Hello world!',
      time: '1h',
      comments: 5,
      retweets: 10,
      likes: 25,
      bookmarks: 8,
    },
  ]);
  
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
          {/* Icons Section */}
          <div className="flex space-x-3">
            <button 
              onClick={handleEmoji}
              className="text-blue-400 hover:text-blue-500"
              title="Add emoji"
            >
              <Smile size={20} />
            </button>
            <button 
              onClick={handleCopy}
              className="text-blue-400 hover:text-blue-500"
              title="Copy text"
            >
              <Copy size={20} />
            </button>
            <button 
              onClick={handleUppercase}
              className="text-blue-400 hover:text-blue-500"
              title="Convert to uppercase"
            >
              <CaseUpper size={20} />
            </button>
            <button 
              onClick={handleLowercase}
              className="text-blue-400 hover:text-blue-500"
              title="Convert to lowercase"
            >
              <CaseLower size={20} />
            </button>
          </div>
          {/* Tweet Button */}
          <button 
            disabled={!tweetText.trim()}
            className={`py-2 px-6 rounded-full font-semibold text-white ${
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
      {tweets.map((tweet) => (
        <Link href={`/tweets/${tweet.id}`} key={tweet.id}>
          <div className="p-4 border-b border-gray-800 hover:bg-gray-900">
            <div className="flex space-x-3">
              <div className="flex-1">
                <div className="flex items-center space-x-1">
                  <Image 
                    width={200} 
                    height={200}
                    src={tweet.profileImage}
                    alt={`${tweet.username}'s profile`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-bold">{tweet.username}</span>
                  <span className="text-gray-500">{tweet.handle}</span>
                  <span className="text-gray-500">· {tweet.time}</span>
                </div>
                <p>{tweet.content}</p>
                <div className="flex justify-between mt-3 text-gray-500 max-w-full">
                  <button className="flex items-center space-x-2 hover:text-blue-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>12</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-green-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>45</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-red-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>89</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>23</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}