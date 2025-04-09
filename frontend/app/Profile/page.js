// components/Profile.js
"use client"
import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import jan from '../../public/jan.jpg';
import Image from 'next/image';
import '../../app/globals.css';
import banner from '../../public/bg.png'
import {useDispatch, useSelector} from 'react-redux'
import {getUserProfile} from '../../lib/features/MainData/maindata.Slice'

const page = () => {
  const dispatch = useDispatch();
  const [userjan, setUserjan] = useState(null); // State to hold user data
 
  const { profile, loading, error } = useSelector((state) => state.maindata || { profile: null, loading: false, error: null });
  const { user, posts } = profile || {};

  console.log(posts)

  useEffect(() => {
  if (typeof window !== "undefined") { // Check if running in the browser
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserjan(JSON.parse(storedUser)); // Set user data from localStorage
    }
  }
}, []); // Runs only once on mount

// Fetch user profile when userjan is available
useEffect(() => {
  if (userjan?._id) {
    dispatch(getUserProfile(userjan._id));
  }
}, [dispatch, userjan]); // Dependency on userjan

// Loading and error states
if (!userjan) {
  return <div>Loading user data...</div>;
}
if (loading) {
  return <div>Loading profile...</div>;
}
if (error) {
  return <div>Error: {error}</div>;
}
if (!profile) {
  return <div>No profile data available</div>;
}

  return (
    <div className={styles.profileContainer}>
      <div className={styles.bannerContainer}>
        {/* <Image
          src={users.bannerPic}
          alt="Profile banner"
          width={1500}
          height={330}
          className={styles.bannerImage}
        /> */}
      </div>

      <div className={styles.header}>
        <div className={styles.profilePicContainer}>
          <Image src={`http://localhost:8000/${userjan.profilePicture}`}
            width={134}
            height={134}
            className={styles.profilePic}
            alt="Profile"
          />
        </div>
        
        <div className={styles.headerContent}>
          <div className={styles.nameSection}>
            <h1>{userjan.fullname}</h1>
            <span className={styles.username}>{userjan.username}</span>
          </div>

          <p className={styles.bio}>{userjan.bio}</p>

          <div className={styles.details}>
          </div>

          <div className={styles.stats}>
            <span className={styles.statItem}>
              <span className={styles.number}>{user?.followingCount}</span> Following
            </span>
            <span className={styles.statItem}>
              <span className={styles.number}>{user?.followersCount}</span> Followers
            </span>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <div className={styles.tabActive}>Posts</div>
      </div>

      <div className={styles.postsContainer}>
        {posts?.map(post => (
          <div key={post._id} className={styles.post}>
            <div className={styles.postAvatar}>
              <Image
               src={`http://localhost:8000/${post.author.profilePicture}`}
                width={48}
                height={48}
                alt="Avatar"
                className={styles.postAvatarImg}
              />
            </div>
            <div className={styles.postBody}>
              <div className={styles.postHeader}>
                <span className={styles.postName}>{post.author.fullname}</span>
                <span className={styles.postUsername}>@{post.author.username}</span>
                <span className={styles.postDate}>· {post.timestamp}</span>
              </div>
              <p className={styles.postContent}>{post.content}</p>
              <div className={styles.postActions}>
                {/* <span className={styles.actionItem}>{post.comments}</span>
                <span className={styles.actionItem}>{post.retweets}</span>
                <span className={styles.actionItem}>{post.likes}</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;