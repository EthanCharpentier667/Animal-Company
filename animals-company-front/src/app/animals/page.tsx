'use client';

import { useQuery } from '@apollo/client';
import { GET_ANIMALS } from '@/graphql/queries';
import Link from 'next/link';
import { Animal } from '@/types';
import { mockAnimals } from '@/data/mockData';

export default function AnimalsPage() {
  const { loading, error, data } = useQuery(GET_ANIMALS);
  
  const animals = data?.animals || mockAnimals;
  
  const getAnimalEmoji = (species: string) => {
    switch (species.toLowerCase()) {
      case 'chien': return '🐕';
      case 'chat': return '🐱';
      case 'oiseau': return '🐦';
      case 'poisson': return '🐠';
      case 'lapin': return '🐰';
      case 'hamster': return '🐹';
      default: return '🐾';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Nos Animaux
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez tous les animaux enregistrés dans notre système de gestion
          </p>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
            <div className="text-3xl font-bold text-gray-800">{animals.length}</div>
            <div className="text-gray-600">Animal{animals.length > 1 ? 'aux' : ''} enregistré{animals.length > 1 ? 's' : ''}</div>
          </div>
        </div>
        
        {/* Animals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {animals.map((animal: Animal) => (
            <Link 
              href={`/animals/${animal.id}`}
              key={animal.id} 
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-2xl border border-white/20 transform hover:scale-105"
            >
              {/* Animal Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">
                  {getAnimalEmoji(animal.species)}
                </span>
              </div>
              
              {/* Content */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                  {animal.name}
                </h2>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm font-medium">{animal.species}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="text-sm">{animal.breed}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">{animal.dateOfBirth}</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {animal.color}
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      Voir détails →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}