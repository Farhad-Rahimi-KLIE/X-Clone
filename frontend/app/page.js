'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Gadgets from '@/components/Gadgets';
import Feed from '@/components/Feed';
import Bookmarks from '@/app/Bookmarks/page';
import Profile from '@/app/Profile/page';

export default function Home() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('/');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Error can be string or null

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/Signup');
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        setError('Failed to verify authentication');
        router.push('/Signup');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const renderFeedContent = () => {
    try {
      switch (currentPage) {
        case '/':
          return <Feed />;
        case '/Bookmarks':
          return <Bookmarks />;
        case '/Profile':
          return <Profile />;
        default:
          return <Feed />;
      }
    } catch (err) {
      // Ensure we return valid JSX even in error case
      return <div>Error loading content: {err.message || 'Unknown error'}</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex bg-black text-white min-h-screen justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex bg-black text-white min-h-screen justify-center items-center">
        {/* Ensure error is rendered as a string */}
        {typeof error === 'string' ? error : 'An unexpected error occurred'}
      </div>
    );
  }

  return (
    <div className="flex bg-black text-white min-h-screen">
      <div className="w-1/4 sticky top-0 h-screen">
        <Sidebar setCurrentPage={setCurrentPage} />
      </div>
      <div className="w-2/4 border-x border-gray-800">
        {renderFeedContent()}
      </div>
      <div className="w-1/4 sticky top-0 h-screen">
        <Gadgets />
      </div>
    </div>
  );
}