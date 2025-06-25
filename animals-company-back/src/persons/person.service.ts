import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';
import { CreatePersonInput } from './dto/create-person.input';
import { PersonAnimalCount } from './dto/animal-count.input';
import { PersonAnimalWeight } from './dto/animal-weight.input';
import { PersonAnimalGroupWeight } from './dto/animal-weight-group.input';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  findOne(id: number): Promise<Person | null> {
    return this.personRepository.findOne({ where: { id } });
  }

  create(createPersonInput: CreatePersonInput): Promise<Person> {
    const person = this.personRepository.create({
        ...createPersonInput
    });
    return this.personRepository.save(person);
  }

  async findPersonWithMostAnimals(): Promise<PersonAnimalCount> {
    const result = await this.personRepository
      .createQueryBuilder('person')
      .leftJoin('animal', 'animal', 'person.id = animal.person_id')
      .select('person.id', 'id')
      .addSelect('person.firstName', 'firstName')
      .addSelect('person.lastName', 'lastName')
      .addSelect('COUNT(animal.id)', 'count')
      .groupBy('person.id')
      .orderBy('count', 'DESC')
      .limit(1)
      .getRawOne();

    if (!result) {
      throw new Error('No persons with animals found');
    }

    return {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      count: parseInt(result.count)
    };
  }

  async findPersonWithMostCats(): Promise<PersonAnimalCount> {
    const result = await this.personRepository
      .createQueryBuilder('person')
      .leftJoin('animal', 'animal', 'person.id = animal.person_id AND animal.species = :species', { species: 'cat' })
      .select('person.id', 'id')
      .addSelect('person.firstName', 'firstName')
      .addSelect('person.lastName', 'lastName')
      .addSelect('COUNT(animal.id)', 'count')
      .groupBy('person.id')
      .orderBy('count', 'DESC')
      .limit(1)
      .getRawOne();

    if (!result) {
      throw new Error('No persons with cats found');
    }

    return {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      count: parseInt(result.count)
    };
  }

  async findPersonWiththeHeaviestAnimal(): Promise<PersonAnimalWeight> {
    const result = await this.personRepository
      .createQueryBuilder('person')
      .leftJoin('animal', 'animal', 'person.id = animal.person_id')
      .select('person.id', 'id')
      .addSelect('person.firstName', 'firstName')
      .addSelect('person.lastName', 'lastName')
      .addSelect('animal.name', 'animalName')
      .addSelect('animal.weight', 'weight')
      .orderBy('animal.weight', 'DESC')
      .limit(1)
      .getRawOne();

    if (!result) {
      throw new Error('No persons with animals found');
    }

    return {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      animalName: result.animalName,
      weight: result.weight
    };
  }

  async findPersonWithMostHeavyAnimalGroup(): Promise<PersonAnimalGroupWeight> {
    const result = await this.personRepository
      .createQueryBuilder('person')
      .leftJoin('animal', 'animal', 'person.id = animal.person_id')
      .select('person.id', 'id')
      .addSelect('person.firstName', 'firstName')
      .addSelect('person.lastName', 'lastName')
      .addSelect('SUM(animal.weight)', 'totalWeight')
      .groupBy('person.id')
      .groupBy('person.firstName')
      .groupBy('person.lastName')
      .orderBy('totalWeight', 'DESC')
      .limit(1)
      .getRawOne();
    
    if (!result) {
      throw new Error('No persons with animals found');
    }
    const animals = await this.personRepository
      .createQueryBuilder('person')
      .innerJoin('animal', 'animal', 'person.id = animal.person_id')
      .select('animal.name', 'name')
      .where('person.id = :personId', { personId: result.id })
      .getRawMany();

    return {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      animalNames: animals.map(a => a.name),
      weight: parseFloat(result.totalWeight)
    };
  }
}