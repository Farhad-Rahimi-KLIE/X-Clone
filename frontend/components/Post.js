'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Post({ posts, users }) {  // Changed 'post' to 'posts' since we want multiple posts
  const router = useRouter();

  // Remove the useState with static tweets since we want to use props instead
  // const [tweets, setTweets] = useState([...]);

  // Ensure we have posts and users before rendering
  if (!posts || !users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black text-white">
      {/* Header */}
      <div className="p-2 border-b border-gray-800 sticky top-0 backdrop-blur-sm bg-black">
        <h1 className="text-xl font-bold">For you</h1>
      </div>

      {/* Tweets */}
      {posts.map((post) => {
        // Find the user for this specific post
        const user = users.find((u) => u.id === post.userId);

        const handleProfileClick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (user?.id) {
            router.push(`/profiles/${user.id}`);
          }
        };

        return (
          <Link href={`/tweets/${post.id}`} key={post.id} className="block">
            <div className="p-4 border-b border-gray-800 hover:bg-gray-900">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <Image
                      width={32}
                      height={32}
                      src={user?.profileImage || '/default-profile.jpg'} // Add fallback image
                      alt={`${user?.username || 'User'}'s profile`}
                      className="w-8 h-8 rounded-full object-cover cursor-pointer"
                      onClick={handleProfileClick}
                    />
                    <span
                      onClick={handleProfileClick}
                      className="font-bold cursor-pointer hover:underline"
                    >
                      {user?.username || 'Unknown User'}
                    </span>
                    <span className="text-gray-500">
                      @{user?.handle || 'unknown'}
                    </span>
                    <span className="text-gray-500">· {post.time || 'N/A'}</span>
                  </div>
                  <p className="mt-1">{post.content || 'No content'}</p>
                  <div className="flex justify-between mt-3 text-gray-500 max-w-full">
                    <button className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>{post.comments || 0}</span>
                    </button>
                    <button className="flex items-center space-x-2 cursor-pointer hover:text-green-400">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>{post.retweets || 0}</span>
                    </button>
                    <button className="flex items-center cursor-pointer space-x-2 hover:text-red-400">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{post.likes || 0}</span>
                    </button>
                    <button className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      <span>{post.bookmarks || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}