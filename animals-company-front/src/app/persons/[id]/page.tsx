'use client';

import { useQuery } from '@apollo/client';
import { GET_PERSON, GET_ANIMALS } from '@/graphql/queries';
import Link from 'next/link';
import { Person, Animal } from '@/types';
import { mockPersons, mockAnimals } from '@/data/mockData';
import { use } from 'react';

export default function PersonDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { loading: personLoading, error: personError, data: personData } = useQuery(GET_PERSON, {
    variables: { id: parseFloat(resolvedParams.id) },
    skip: !resolvedParams.id
  });
  
  const { loading: animalsLoading, error: animalsError, data: animalsData } = useQuery(GET_ANIMALS);

  // Fallback si l'API ne répond pas
  const person = personData?.person || mockPersons.find(p => p.id === resolvedParams.id);
  const allAnimals = animalsData?.animals || mockAnimals;
  const personAnimals = allAnimals.filter((animal: Animal) => animal.person_id.toString() === resolvedParams.id);
  
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
  
  if (personLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Chargement en cours...</span>
      </div>
    );
  }
  
  if (personError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-red-700 font-medium">Erreur: {personError.message}</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!person) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Personne non trouvée</h1>
          <p className="text-gray-600 mb-6">La personne que vous cherchez n'existe pas.</p>
          <Link href="/persons" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/persons" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group transition-colors"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la liste des propriétaires
        </Link>
        
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {person.firstName.charAt(0)}{person.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {person.firstName} {person.lastName}
              </h1>
              <p className="text-xl text-gray-600">Propriétaire d'animaux</p>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Informations de contact
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="text-gray-800">{person.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Téléphone</p>
                    <p className="text-gray-800">{person.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animals Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Animaux associés
                </h2>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {personAnimals.length} animal{personAnimals.length > 1 ? 'x' : ''}
                </div>
              </div>
              
              {animalsLoading && (
                <div className="flex items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mr-3"></div>
                  <span className="text-gray-600">Chargement des animaux...</span>
                </div>
              )}
              
              {animalsError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-700 text-sm">Erreur: {animalsError.message}</p>
                </div>
              )}
              
              {personAnimals.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🐾</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun animal enregistré</h3>
                  <p className="text-gray-600">Cette personne n'a pas encore d'animaux associés à son compte.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {personAnimals.map((animal: Animal) => (
                    <Link 
                      href={`/animals/${animal.id}`}
                      key={animal.id}
                      className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border border-green-100 hover:border-green-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-2xl">{getAnimalEmoji(animal.species)}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                            {animal.name}
                          </h3>
                          <p className="text-gray-600 text-sm">{animal.species} • {animal.breed}</p>
                          <p className="text-gray-500 text-xs mt-1">{animal.color}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}