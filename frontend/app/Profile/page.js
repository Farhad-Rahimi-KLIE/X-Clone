// components/Profile.js
import React from 'react';
import styles from './Profile.module.css';
import jan from '../../public/jan.jpg';
import Image from 'next/image';
const page = () => {

  const user = {
    name: "John Doe",
    username: "farhad rahi",
    profilePic: jan,
    bio: "Web developer | Tech enthusiast | Coffee lover",
    location: "San Francisco, CA",
    website: "johndoe.com",
    joinDate: "March 2025",
    following: 250,
    followers: 1800
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <div className={styles.coverPhoto}></div>
        <Image
        width={200}
        height={200}
          className={styles.profilePic} 
          src={user.profilePic} 
          alt="Profile"
        />
      </div>
      
      <div className={styles.userInfo}>
        <div className={styles.nameSection}>
          <h1>{user.name}</h1>
          <span className={styles.username}>@{user.username}</span>
        </div>
        
        <div className={styles.stats}>
          <div>
            <span className={styles.number}>{user.following}</span> Following
          </div>
          <div>
            <span className={styles.number}>{user.followers}</span> Followers
          </div>
        </div>
        
        <p className={styles.bio}>{user.bio}</p>
        
        <div className={styles.details}>
          {user.location && (
            <span className={styles.location}>📍 {user.location}</span>
          )}
          {user.website && (
            <span className={styles.website}>🌐 {user.website}</span>
          )}
          <span className={styles.joined}>Joined {user.joinDate}</span>
        </div>
      </div>
    </div>
  );
};

export default page;