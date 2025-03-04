import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import Gadgets from '@/components/Gadgets';

export default function Home() {
  return (
    <div className='flex'>
      {/* Sidebar */}
      <div className="w-1/4 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Feed */}
      <div className="w-2/4 border-x border-gray-800">
        <Feed />
      </div>

      {/* Gadgets/Widgets */}
      <div className="w-1/4 sticky top-0 h-screen">
        <Gadgets />
      </div>
    </div>
  );
}