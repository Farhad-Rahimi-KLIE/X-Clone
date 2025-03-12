// app/profile/[userId]/page.js
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { initialUsers, initialPosts } from '../../../components/data/sampleData';

export default function Profile() {
  const { userId } = useParams();
  const [users] = useState(initialUsers);
  const [posts] = useState(initialPosts);
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const currentUserId = '1'; // Static for demo

  useEffect(() => {
    if (userId) {
      const user = users.find(u => u.id === userId);
      if (user) {
        setProfile(user);
        setUserPosts(posts.filter(p => p.userId === userId));
        setIsFollowing(user.followers.includes(currentUserId));
      }
    }
  }, [userId]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src={profile.profilePicture || '/default-avatar.png'} 
          alt="Profile" 
          className="profile-pic-large"
        />
        <div className="profile-info">
          <h2 >@{profile.username}</h2>
          <p>{profile.bio || 'No bio yet'}</p>
          <div className="stats">
            <span>{profile.following.length} Following</span>
            <span>{profile.followers.length} Followers</span>
          </div>
          <button 
            className={`follow-btn ${isFollowing ? 'following' : ''}`}
            onClick={handleFollow}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
      
      <div className="user-posts">
        <h3>Posts</h3>
        {userPosts.map(post => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
            <span className="timestamp">
              {new Date(post.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}