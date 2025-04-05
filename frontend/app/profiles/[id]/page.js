'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../lib/features/authentecation/authSlice';
import { getAllPosts } from '../../../lib/features/MainData/maindata.Slice';

export default function Profile() {
  const { id } = useParams() || {}; // Fallback to empty object if useParams fails
  console.log("Profile ID:", id);
  const dispatch = useDispatch();
  const { users, loading: usersLoading, error: usersError, user } = useSelector((state) => state.auth || {});
  const { posts, loading: postsLoading, error: postsError } = useSelector((state) => state.post || {});
  const [isFollowing, setIsFollowing] = useState(false);

  console.log("Users from Redux:", users);
  console.log("Current user", user);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllPosts());
  }, [dispatch]);

  // Safely calculate profile and userPosts
  const profile = users?.users && Array.isArray(users.users) ? users.users.find((u) => u._id === id) : null;
  const userPosts = posts && Array.isArray(posts) ? posts.filter((p) => p.author?._id === id) : [];
  const currentUserId = user; // Replace with actual logged-in user ID

  useEffect(() => {
    if (profile) {
      setIsFollowing(profile.followers?.includes(currentUserId) || false);
    }
  }, [profile, currentUserId]);

  // Handle missing ID
  if (!id) {
    return <div className="text-white bg-black min-h-screen flex justify-center items-center">No profile ID provided</div>;
  }

  // Handle loading state
  if (usersLoading || postsLoading) {
    return <div className="text-white bg-black min-h-screen flex justify-center items-center">Loading...</div>;
  }

  // Handle error state
  if (usersError || postsError) {
    const errorMessage = typeof usersError === 'string' ? usersError :
                         usersError?.message || typeof postsError === 'string' ? postsError :
                         postsError?.message || 'An error occurred';
    return <div className="text-white bg-black min-h-screen flex justify-center items-center">Error: {errorMessage}</div>;
  }

  // Handle invalid data
  if (!users || !Array.isArray(users?.users) || !Array.isArray(posts)) {
    return <div className="text-white bg-black min-h-screen flex justify-center items-center">No valid data available</div>;
  }

  if (!profile) {
    return <div className="text-white bg-black min-h-screen flex justify-center items-center">User not found</div>;
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // Add API call to update follow status in backend here
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="p-4 border-b border-gray-800">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <Image
            src={profile.profilePicture ? `http://localhost:8000/${profile.profilePicture}` : '/default-avatar.png'}
            alt={`${profile.username}'s profile`}
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{profile.fullname || 'Unknown'}</h2>
            <p className="text-gray-500">@{profile.username || 'unknown'}</p>
            <p className="mt-2">{profile.bio || 'No bio yet'}</p>
            <div className="flex space-x-4 mt-2 text-gray-500">
              <span><strong>{profile.following?.length || 0}</strong> Following</span>
              <span><strong>{profile.followers?.length || 0}</strong> Followers</span>
            </div>
            <button
              className={`mt-4 py-2 px-6 rounded-full font-semibold text-white ${isFollowing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              onClick={handleFollow}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-4">Posts</h3>
        {userPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet</p>
        ) : (
          userPosts.map((post) => (
            <div key={post._id} className="p-4 border-b border-gray-800 hover:bg-gray-900">
              <div className="flex space-x-3">
                <Image
                  src={profile.profilePicture ? `http://localhost:8000/${profile.profilePicture}` : '/default-avatar.png'}
                  alt={profile.username || 'User'}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <span className="font-bold">{profile.fullname || 'Unknown'}</span>
                    <span className="text-gray-500">@{profile.username || 'unknown'}</span>
                    <span className="text-gray-500">· {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <p className="mt-1">{post.content || 'No content'}</p>
                  <div className="flex justify-between mt-3 text-gray-500 max-w-md">
                    <span>{post.comments?.length || 0} Comments</span>
                    <span>{post.retweets?.length || 0} Retweets</span>
                    <span>{post.likes?.length || 0} Likes</span>
                    <span>{post.bookmarks?.length || 0} Bookmarks</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}