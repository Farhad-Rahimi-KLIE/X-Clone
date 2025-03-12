// app/page.js
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Gadgets from '@/components/Gadgets';
import Feed from '@/components/Feed';
import Bookmarks from '../app/Bookmarks/page';
import Profile from './Profile/page';
import Post from '../components/Post';
import { initialUsers, initialPosts } from '../components/data/sampleData';

export default function Home() {
  const [users] = useState(initialUsers);
  const [posts] = useState(initialPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  const [currentPage, setCurrentPage] = useState('/');

  const renderFeedContent = () => {
    switch (currentPage) {
      case '/':
        return <Feed posts={posts} users={users} />;
      case '/Bookmarks':
        return <Bookmarks />;
      case '/Profile':
        return <Profile />;
      default:
        return <Feed />;
    }
  };

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

      {/* <div className="feed-wrapper">
      <h2>Global Feed</h2>
      <div className="posts-container">
        {posts.map(post => (
          <Post key={post.id} post={post} users={users} />
        ))}
      </div>
    </div> */}
    </div>
  );
}