// data/sampleData.js
export const initialUsers = [
    { id: '1', username: 'user1', profilePicture: '/avatar1.png', bio: 'Hello!', followers: [], following: [] },
    { id: '2', username: 'user2', profilePicture: '/avatar2.png', bio: 'Coder', followers: [], following: [] },
    { id: '3', username: 'user3', profilePicture: '/avatar3.png', bio: 'Designer', followers: [], following: [] },
  ];
  
  export const initialPosts = [
    { id: 'p1', userId: '1', content: 'First post!', createdAt: new Date(), likes: 0 },
    { id: 'p2', userId: '2', content: 'Hello world!', createdAt: new Date(), likes: 0 },
    { id: 'p3', userId: '3', content: 'Nice day!', createdAt: new Date(), likes: 0 },
  ];