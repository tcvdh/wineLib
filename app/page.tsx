import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <main className="text-center space-y-8 py-16">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome to WineLib
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal wine collection manager. Discover, track, and rate your favorite wines.
          </p>
          <Link 
            href="/wines"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Wine Collection
          </Link>
        </main>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 py-16">
          <div className="text-center space-y-4">
            <div className="bg-gray-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center">
              <Image
                src="/search-icon.svg"
                alt="Search"
                width={24}
                height={24}
                priority
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Discover Wines</h2>
            <p className="text-gray-600">Search and explore wines from around the world</p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="bg-gray-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center">
              <Image
                src="/collection-icon.svg"
                alt="Collection"
                width={24}
                height={24}
                priority
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Track Collection</h2>
            <p className="text-gray-600">Manage your personal wine collection</p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="bg-gray-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center">
              <Image
                src="/rate-icon.svg"
                alt="Rate"
                width={24}
                height={24}
                priority
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Rate & Review</h2>
            <p className="text-gray-600">Keep track of your wine ratings and notes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
