// components/Profile.js
import React from 'react';
import styles from './Profile.module.css';
import jan from '../../public/jan.jpg';
import Image from 'next/image';
import '../../app/globals.css';
import banner from '../../public/bg.png'

const page = () => {
  const user = {
    name: "John Doe",
    username: "farhadrahi",
    profilePic: jan,
    bannerPic: banner,
    bio: "Web developer | Tech enthusiast | Coffee lover",
    location: "San Francisco, CA",
    website: "johndoe.com",
    joinDate: "March 2025",
    following: 250,
    followers: 1800,
    posts: [
      {
        id: 1,
        content: "Just launched my new website! Check it out at johndoe.com",
        date: "Mar 10, 2025 · 2:30 PM",
        likes: 45,
        retweets: 12,
        comments: 8
      },
      {
        id: 2,
        content: "Coffee is life. Current brew: Ethiopian Yirgacheffe ☕",
        date: "Mar 9, 2025 · 9:15 AM",
        likes: 32,
        retweets: 5,
        comments: 3
      },
      {
        id: 3,
        content: "Working on a new React project. Hooks are awesome!",
        date: "Mar 8, 2025 · 6:45 PM",
        likes: 67,
        retweets: 23,
        comments: 15
      },
      {
        id: 4,
        content: "San Francisco sunset views never get old 🌅",
        date: "Mar 7, 2025 · 7:00 PM",
        likes: 89,
        retweets: 34,
        comments: 20
      },
      {
        id: 5,
        content: "Tech tip: Always backup your code before major changes!",
        date: "Mar 6, 2025 · 11:20 AM",
        likes: 53,
        retweets: 18,
        comments: 9
      }
    ]
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.bannerContainer}>
        <Image
          src={user.bannerPic}
          alt="Profile banner"
          width={1500}
          height={330}
          className={styles.bannerImage}
        />
      </div>

      <div className={styles.header}>
        <div className={styles.profilePicContainer}>
          <Image
            width={134}
            height={134}
            className={styles.profilePic}
            src={user.profilePic}
            alt="Profile"
          />
        </div>
        
        <div className={styles.headerContent}>
          <div className={styles.nameSection}>
            <h1>{user.name}</h1>
            <span className={styles.username}>@{user.username}</span>
          </div>

          <p className={styles.bio}>{user.bio}</p>

          <div className={styles.details}>
            {user.location && (
              <span className={styles.detailItem}>
                <span className={styles.icon}>📍</span> {user.location}
              </span>
            )}
            {user.website && (
              <span className={styles.detailItem}>
                <span className={styles.icon}>🌐</span> 
                <a href={`https://${user.website}`} className={styles.websiteLink}>
                  {user.website}
                </a>
              </span>
            )}
            <span className={styles.detailItem}>
              <span className={styles.icon}>📅</span> Joined {user.joinDate}
            </span>
          </div>

          <div className={styles.stats}>
            <span className={styles.statItem}>
              <span className={styles.number}>{user.following}</span> Following
            </span>
            <span className={styles.statItem}>
              <span className={styles.number}>{user.followers}</span> Followers
            </span>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <div className={styles.tabActive}>Posts</div>
      </div>

      <div className={styles.postsContainer}>
        {user.posts.map(post => (
          <div key={post.id} className={styles.post}>
            <div className={styles.postAvatar}>
              <Image
                src={user.profilePic}
                width={48}
                height={48}
                alt="Avatar"
                className={styles.postAvatarImg}
              />
            </div>
            <div className={styles.postBody}>
              <div className={styles.postHeader}>
                <span className={styles.postName}>{user.name}</span>
                <span className={styles.postUsername}>@{user.username}</span>
                <span className={styles.postDate}>· {post.date}</span>
              </div>
              <p className={styles.postContent}>{post.content}</p>
              <div className={styles.postActions}>
                <span className={styles.actionItem}>{post.comments}</span>
                <span className={styles.actionItem}>{post.retweets}</span>
                <span className={styles.actionItem}>{post.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;