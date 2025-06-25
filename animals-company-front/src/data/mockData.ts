import { Animal, Person } from '@/types';

export const mockPersons: Person[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '098-765-4321'
  }
];

export const mockAnimals: Animal[] = [
  {
    id: 1,
    name: 'Rex',
    dateOfBirth: '2018-05-12',
    species: 'Dog',
    breed: 'German Shepherd',
    color: 'Brown',
    weight: 30,
    person_id: 1
  },
  {
    id: 2,
    name: 'Whiskers',
    dateOfBirth: '2019-08-23',
    species: 'Cat',
    breed: 'Siamese',
    color: 'White',
    weight: 5,
    person_id: 2
  }
];