// components/Gadgets.tsx
export default function Gadgets() {
    return (
      <div className="p-4">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Twitter"
            className="w-full bg-gray-400 rounded-full py-2 px-4 outline-none"
          />
        </div>
  
        {/* Trends */}
        <div className="bg-gray-900 rounded-xl p-4 mb-6">
          <h2 className="text-xl font-bold mb-4 text-amber-50">Trends for you</h2>
          {['Next.js', 'React', 'TypeScript'].map((trend, index) => (
            <div key={index} className="py-2 hover:bg-gray-800">
              <p className="text-gray-300 text-sm">Trending</p>
              <p className="font-bold text-amber-50">{trend}</p>
              <p className="text-gray-500 text-sm">12K Tweets</p>
            </div>
          ))}
        </div>
  
        {/* Who to Follow */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h2 className="text-xl font-bold mb-4 text-amber-50">Who to follow</h2>
          {['User1', 'User2'].map((user, index) => (
            <div key={index} className="flex items-center space-x-3 py-2 hover:bg-gray-800">
              <div className="w-10 h-10 bg-gray-600 rounded-full" />
              <div>
                <p className="font-bold text-amber-50">{user}</p>
                <p className="text-gray-300 text-sm">@{user.toLowerCase()}</p>
              </div>
              <button className="ml-auto bg-white text-black rounded-full px-4 py-1">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }