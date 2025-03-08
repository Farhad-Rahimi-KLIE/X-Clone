// pages/bookmarks.js
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image'; // Import Image component
import jan from '../../public/jan.jpg'; // Import placeholder image (adjust path as needed)
import styles from '../Bookmarks/Bookmarks.module.css';

// Bookmark Post Component
const BookmarkPost = ({ 
  username, 
  handle, 
  content, 
  timestamp, 
  likes, 
  onRemove,
  profileImage = jan // Default to jan.jpg if no image provided
}) => (
  <div className={styles.postCard}>
    <Image
      src={profileImage}
      alt={`${username}'s profile`}
      width={40}
      height={40}
      className={styles.userAvatar} // Keep the same styling class
    />
    <div className={styles.postContent}>
      <div className={styles.postHeader}>
        <span className={styles.username}>{username}</span>
        <span className={styles.handle}>@{handle}</span>
        <span className={styles.timestamp}> · {timestamp}</span>
      </div>
      <p className={styles.content}>{content}</p>
      <div className={styles.postActions}>
        <span>❤️ {likes}</span>
        <button 
          className={styles.removeButton}
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const sampleBookmarks = [
      {
        id: 1,
        username: 'Tech Enthusiast',
        handle: 'techlover',
        content: 'Just discovered an amazing new framework for building web apps!',
        timestamp: '2h ago',
        likes: 156,
        profileImage: '/jan.jpg', // Add image path (adjust as needed)
      },
      {
        id: 2,
        username: 'Jane Doe',
        handle: 'janedoe',
        content: 'The future of AI is looking incredible. What are your thoughts?',
        timestamp: '5h ago',
        likes: 89,
        profileImage: '/jan.jpg',
      },
      {
        id: 3,
        username: 'Code Master',
        handle: 'codemaster',
        content: 'Sharing my latest project built with Next.js - feedback welcome!',
        timestamp: '1d ago',
        likes: 234,
        profileImage: '/jan.jpg',
      },
    ];
    setBookmarks(sampleBookmarks);
  }, []);

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };

  return (
    <div className={`${styles.container} bg-black text-white`}>
      <Head>
        <title>Bookmarks - X Clone</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Bookmarks</h1>
          <span className={styles.bookmarkCount}>
            {bookmarks.length} {bookmarks.length === 1 ? 'Bookmark' : 'Bookmarks'}
          </span>
        </header>

        {bookmarks.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No Bookmarks Yet</h2>
            <p>Save posts to revisit them here later</p>
          </div>
        ) : (
          <div className={styles.bookmarksList}>
            {bookmarks.map((bookmark) => (
              <BookmarkPost
                key={bookmark.id}
                {...bookmark}
                onRemove={() => removeBookmark(bookmark.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}