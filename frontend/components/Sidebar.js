// components/Sidebar.tsx
'use client'
import { Home, User, Bookmark } from 'lucide-react';
import jan from '../public/jan.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import {createPost} from '../lib/features/MainData/maindata.Slice'
import { useDispatch } from 'react-redux'

export default function Sidebar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [isTweetModalOpen, setIsTweetModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [input, setInput] = useState({
    content : ""
    })


 const create_Post = () => {
      dispatch(createPost(input));
      setInput({ content: "" }); // Optional: Clear input after posting
      setIsTweetModalOpen(false);  // Close modal after posting
    };

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Bookmark, label: 'Bookmarks', href: '/Bookmarks' },
    { icon: User, label: 'Profile', href: '/Profile' },
  ];

  const currentUser = {
    username: 'John Doe',
    handle: '@johndoe',
    profileImage: jan,
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-black border-r border-gray-800 p-4 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="mb-6">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-blue-400">
            <path
              fill="currentColor"
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            />
          </svg>
        </div>

        {navItems.map((item, index) => (
          <div key={index}>
            <Link 
              href={item.href}
              className="flex items-center space-x-4 p-3 hover:bg-gray-900 rounded-full cursor-pointer"
              onClick={() => setCurrentPage && setCurrentPage(item.href)}
            >
              <item.icon className="h-6 w-6 text-white" />
              <span className="text-xl text-white">{item.label}</span>
            </Link>
          </div>
        ))}

        <button 
          onClick={() => setIsTweetModalOpen(true)} 
          className="mt-6 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-full py-3 px-8 text-lg font-bold w-full"
        >
          Tweet
        </button>
      </div>

      {/* User Profile Section (Bottom) */}
      <div className="relative">
        <div 
          onClick={() => setIsModalOpen(!isModalOpen)} 
          className="flex items-center space-x-3 p-3 hover:bg-gray-900 rounded-full cursor-pointer"
        >
          <Image 
            width={40} 
            height={40}
            src={currentUser.profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-white truncate">{currentUser.username}</p>
            <p className="text-gray-400 text-sm truncate">{currentUser.handle}</p>
          </div>
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>

        {/* Logout Modal */}
        {isModalOpen && (
         <div className="absolute cursor-pointer bottom-full left-0 mb-2 w-48 bg-black rounded-lg shadow-lg border border-gray-700 z-10">
         <button 
           className="w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded-lg flex items-center space-x-2"
           onClick={() => {
             console.log('Logout clicked');
             setIsModalOpen(false);
             // Add your logout logic here
           }}
         >
           {/* Logout Icon */}
           <svg 
             className="h-5 w-5 text-gray-200" 
             fill="none" 
             stroke="currentColor" 
             viewBox="0 0 24 24"
           >
             <path 
               strokeLinecap="round" 
               strokeLinejoin="round" 
               strokeWidth={2} 
               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
             />
           </svg>
           <span>Log out</span>
         </button>
       </div>
        )}
      </div>

      {/* Tweet Modal */}
      {isTweetModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsTweetModalOpen(false)}
          ></div>
          <div className="relative bg-gray-800 rounded-xl w-full max-w-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold text-lg">Let's Tweet</h3>
              <button
                onClick={() => setIsTweetModalOpen(false)}
                className="text-gray-400 cursor-pointer hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <textarea
             value={input.content}
             onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
              className="w-full h-40 p-3 bg-gray-700 text-white rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What's happening?"
              name='content'
            />
            <div className="flex items-center space-x-3 mt-4 text-gray-400">
              <button
               onClick={() => setInput({ ...input, content: input.content + "😊👍" })}
                className="hover:text-blue-400 cursor-pointer"
                title="Add Emoji"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(input.content)}
                className="hover:text-blue-400 cursor-pointer"
                title="Copy Text"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                 onClick={() => setInput({ ...input, content: input.content.toUpperCase() })}
                className="hover:text-blue-400 cursor-pointer"
                title="Uppercase"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3-7 3 7h4m-11 4h10" />
                </svg>
              </button>
              <button
               onClick={() => setInput({ ...input, content: input.content.toLowerCase() })}
                className="hover:text-blue-400 cursor-pointer"
                title="Lowercase"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 14h4l3-7 3 7h4m-11 0v4h10v-4" />
                </svg>
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={create_Post}
                disabled={!input.content.trim()}
                className={`py-2 px-6 rounded-full cursor-pointer font-semibold text-white ${
                  input.content.trim()
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}