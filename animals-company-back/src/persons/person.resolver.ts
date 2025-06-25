import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Person } from './person.entity';
import { PersonService } from './person.service';
import { CreatePersonInput } from './dto/create-person.input';
import { PersonAnimalCount } from './dto/animal-count.input';
import { PersonAnimalWeight } from './dto/animal-weight.input';
import { PersonAnimalGroupWeight } from './dto/animal-weight-group.input';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => [Person])
  async persons(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Query(() => Person)
  async person(@Args('id') id: number): Promise<Person> {
    const person = await this.personService.findOne(id);
    if (!person) {
      throw new Error(`Person with id ${id} not found`);
    }
    return person;
  }

  @Mutation(() => Person)
  async createPerson(
    @Args('input') createPersonInput: CreatePersonInput,
  ): Promise<Person> {
    return this.personService.create(createPersonInput);
  }

  @Query(() => PersonAnimalCount)
  async personWithMostAnimals(): Promise<PersonAnimalCount> {
    return this.personService.findPersonWithMostAnimals();
  }

  @Query(() => PersonAnimalCount)
  async personWithMostCats(): Promise<PersonAnimalCount> {
    return this.personService.findPersonWithMostCats();
  }

  @Query(() => PersonAnimalWeight)
  async personWithHeaviestAnimal(): Promise<PersonAnimalWeight> {
    return this.personService.findPersonWiththeHeaviestAnimal();
  }

  @Query(() => PersonAnimalGroupWeight)
  async personWithHeaviestAnimalGroup(): Promise<PersonAnimalGroupWeight> {
    return this.personService.findPersonWithMostHeavyAnimalGroup();
  }
}