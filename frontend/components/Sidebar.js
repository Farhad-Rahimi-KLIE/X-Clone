// components/Sidebar.tsx
'use client'
import { Home, Search, Bell, Mail, User, Users, Bookmark, MoreHorizontal } from 'lucide-react';
import jan from '../public/jan.jpg';
import Image from 'next/image';
export default function Sidebar() {

  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Search, label: 'Explore' },
    { icon: Bell, label: 'Notifications' },
    { icon: Bookmark, label: 'Bookmarks' },
    { icon: Users, label: 'Communities' },
    { icon: Mail, label: 'Messages' },
    { icon: User, label: 'Profile' },
    { icon: MoreHorizontal, label: 'More' },
  ];

  // Sample user data
  const currentUser = {
    username: 'John Doe',
    handle: '@johndoe',
    profileImage: jan, // Placeholder image
  };

  return (
    <div className="flex flex-col p-4 h-full justify-between">
      {/* Top Section */}
      <div>
        {/* Twitter Logo */}
        <div className="mb-6">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-blue-400">
            <path
              fill="currentColor"
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            />
          </svg>
        </div>

        {/* Navigation */}
        {navItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-3 hover:bg-gray-500 rounded-full cursor-pointer"
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xl">{item.label}</span>
          </div>
        ))}

        {/* Tweet Button */}
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-8 text-lg font-bold w-full">
          Tweet
        </button>
      </div>

      {/* User Profile Section (Bottom) */}
      <div className="mt-4">
        <div className="flex items-center space-x-3 p-3 hover:bg-gray-500 rounded-full cursor-pointer">
          {/* User Logo/Profile Picture */}
          <Image width={200} height={200}
            src={currentUser.profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          {/* User Info */}
          <div className="flex-1">
            <p className="font-bold text-sm">{currentUser.username}</p>
            <p className="text-black text-sm">{currentUser.handle}</p>
          </div>
          {/* More Options */}
          <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}