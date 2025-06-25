'use client';

import { useQuery } from '@apollo/client';
import { GET_PERSONS } from '@/graphql/queries';
import Link from 'next/link';
import { Person } from '@/types';
import { mockPersons } from '@/data/mockData';

export default function PersonsPage() {
  const { loading, error, data } = useQuery(GET_PERSONS);
  
  const persons = data?.persons || mockPersons;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Propriétaires
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez tous les propriétaires d'animaux enregistrés dans notre système
          </p>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Chargement en cours...</span>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 max-w-md mx-auto">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-700 font-medium">Erreur: {error.message}</p>
            </div>
          </div>
        )}
        
        {/* Stats */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 shadow-xl max-w-sm mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">{persons.length}</div>
            <div className="text-gray-600">Propriétaire{persons.length > 1 ? 's' : ''} enregistré{persons.length > 1 ? 's' : ''}</div>
          </div>
        </div>
        
        {/* Persons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {persons.map((person: Person) => (
            <Link 
              href={`/persons/${person.id}`}
              key={person.id} 
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-2xl border border-white/20 transform hover:scale-105"
            >
              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">
                  {person.firstName.charAt(0)}{person.lastName.charAt(0)}
                </span>
              </div>
              
              {/* Content */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {person.firstName} {person.lastName}
                </h2>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm truncate">{person.email}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm">{person.phoneNumber}</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Voir détails →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}