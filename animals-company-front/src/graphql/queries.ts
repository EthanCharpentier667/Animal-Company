import { gql } from '@apollo/client';

export const GET_PERSONS = gql`
  query GetPersons {
    persons {
      id
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;

export const GET_PERSON = gql`
  query GetPerson($id: Float!) {
    person(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;

export const GET_ANIMALS = gql`
  query GetAnimals {
    animals {
      id
      name
      dateOfBirth
      species
      breed
      color
      weight
      person_id
    }
  }
`;

export const GET_ANIMAL = gql`
  query GetAnimal($id: Float!) {
    animal(id: $id) {
      id
      name
      dateOfBirth
      species
      breed
      color
      weight
      person_id
    }
  }
`;