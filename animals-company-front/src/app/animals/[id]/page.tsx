'use client';

import { useQuery } from '@apollo/client';
import { GET_ANIMAL, GET_PERSON } from '@/graphql/queries';
import Link from 'next/link';
import { Animal, Person } from '@/types';
import { mockAnimals, mockPersons } from '@/data/mockData';
import { use } from 'react';

export default function AnimalDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { loading: animalLoading, error: animalError, data: animalData } = useQuery(GET_ANIMAL, {
    variables: { id: parseFloat(resolvedParams.id) },
    skip: !resolvedParams.id
  });
  
  // Récupérer l'animal
  const animal = animalData?.animal || mockAnimals.find(a => a.id.toString() === resolvedParams.id);
  
  // Récupérer le propriétaire si on a un animal
  const { loading: personLoading, error: personError, data: personData } = useQuery(GET_PERSON, {
    variables: { id: animal?.person_id },
    skip: !animal?.person_id
  });
  
  // Trouver le propriétaire dans les données
  const owner = personData?.person || mockPersons.find(p => p.id.toString() === animal?.person_id.toString());
  
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
  
  if (animalLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <span className="ml-3 text-gray-600">Chargement en cours...</span>
      </div>
    );
  }
  
  if (animalError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-red-700 font-medium">Erreur: {animalError.message}</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!animal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Animal non trouvé</h1>
          <p className="text-gray-600 mb-6">L'animal que vous cherchez n'existe pas.</p>
          <Link href="/animals" className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/animals" 
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8 group transition-colors"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la liste des animaux
        </Link>
        
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center">
              <span className="text-4xl">{getAnimalEmoji(animal.species)}</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                {animal.name}
              </h1>
              <p className="text-xl text-gray-600">{animal.species} • {animal.breed}</p>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Informations détaillées
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Espèce</label>
                    <p className="text-lg text-gray-800 mt-1">{animal.species}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Race</label>
                    <p className="text-lg text-gray-800 mt-1">{animal.breed}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Couleur</label>
                    <div className="flex items-center mt-1">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 mr-2"></div>
                      <p className="text-lg text-gray-800">{animal.color}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Date de naissance</label>
                    <p className="text-lg text-gray-800 mt-1">{animal.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Poids</label>
                    <p className="text-lg text-gray-800 mt-1">{animal.weight} kg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Owner Info */}
          <div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Propriétaire
              </h2>
              
              {personLoading && (
                <div className="flex items-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                  <span className="text-gray-600">Chargement...</span>
                </div>
              )}
              
              {personError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm">Erreur: {personError.message}</p>
                </div>
              )}
              
              {owner ? (
                <Link 
                  href={`/persons/${owner.id}`}
                  className="block group hover:bg-gray-50 rounded-xl p-4 -m-4 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">
                        {owner.firstName.charAt(0)}{owner.lastName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {owner.firstName} {owner.lastName}
                      </h3>
                      <div className="space-y-1 mt-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {owner.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {owner.phoneNumber}
                        </div>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p>Aucun propriétaire associé</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}