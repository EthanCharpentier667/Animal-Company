export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface Animal {
  id: number;
  name: string;
  dateOfBirth: string;
  species: string;
  breed: string;
  color: string;
  weight: number;
  person_id: number;
}