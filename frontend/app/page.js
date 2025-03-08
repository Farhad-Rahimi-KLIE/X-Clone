// app/page.js
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Gadgets from '@/components/Gadgets';
import Feed from '@/components/Feed';
import Bookmarks from '../app/Bookmarks/page'
// Placeholder components for other "pages"
import Profile from './Profile/page'

export default function Home() {
  const [currentPage, setCurrentPage] = useState('/');

  const renderFeedContent = () => {
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
  };

  return (
    <div className='flex'>
      <div className="w-1/4 sticky top-0 h-screen">
        <Sidebar setCurrentPage={setCurrentPage} />
      </div>
      <div className="w-2/4 border-x border-gray-200 dark:border-gray-800">
        {renderFeedContent()}
      </div>
      <div className="w-1/4 sticky top-0 h-screen">
        <Gadgets />
      </div>
    </div>
  );
}