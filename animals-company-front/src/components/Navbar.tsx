'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Animals Company
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
                pathname === '/' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Accueil
            </Link>
            <Link 
              href="/persons" 
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
                pathname?.startsWith('/persons') 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Propriétaires
            </Link>
            <Link 
              href="/animals" 
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
                pathname?.startsWith('/animals') 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Animaux
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}