// app/tweets/[id]/page.js
import Image from 'next/image';
// Simulated async tweet data fetching (replace with real API call in production)
async function getTweetById(id) {
  console.log(id);
  const tweets = [
    {
      id: 1,
      username: 'user1',
      handle: '@johndoe',
      profileImage: '/jan.jpg',
      content: 'First post!',
      time: '2h',
      comments: 12,
      retweets: 45,
      likes: 89,
      bookmarks: 23,
    },
    {
      id: 2,
      username: 'user2',
      handle: '@janesmith',
      profileImage: '/jan.jpg',
      content: 'Hello world!',
      time: '1h',
      comments: 5,
      retweets: 10,
      likes: 25,
      bookmarks: 8,
    },
  ];
  // Simulate async behavior (e.g., API or DB call)
  await new Promise((resolve) => setTimeout(resolve, 500)); // Mock delay
  return tweets.find((tweet) => tweet.id === parseInt(id)) || null;
}

export default async function TweetPage({ params }) {
  const { id } = await params; // Access the dynamic [id] param
  const tweet = await getTweetById(id); // Fetch tweet asynchronously

  // If no tweet is found, you can redirect or return a not-found state
  if (!tweet) {
    // Option 1: Return a simple not-found UI
    return <div className="p-4 text-white">Tweet not found</div>;

    // Option 2: Trigger Next.js's built-in 404 (uncomment if preferred)
    // import { notFound } from 'next/navigation';
    // notFound();
  }

  return (
    <div className="p-4 border-b border-gray-800">
      <div className="flex space-x-3">
        <Image
          width={200}
          height={200}
          src={tweet.profileImage}
          alt={`${tweet.username}'s profile`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">{tweet.username}</span>
            <span className="text-gray-500">{tweet.handle}</span>
            <span className="text-gray-500">· {tweet.time}</span>
          </div>
          <p className="text-white mt-2">{tweet.content}</p>
          <div className="flex justify-between mt-4 text-gray-500 max-w-md">
            <button className="flex items-center space-x-2 hover:text-blue-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{tweet.comments}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{tweet.retweets}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-red-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{tweet.likes}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>{tweet.bookmarks}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}