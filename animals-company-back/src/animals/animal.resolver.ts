import { Args, Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { Animal } from './animal.entity';
import { AnimalService } from './animal.service';
import { CreateAnimalInput } from './dto/create-animal.input';
import { AnimalOrderInput } from './dto/order.input';
import { SpeciesCount } from './dto/species-count.input';

@Resolver(() => Animal)
export class AnimalResolver {
    constructor(private animalService: AnimalService) {}

    @Query(() => [Animal])
    async animals(
        @Args('options', { nullable: true }) options?: AnimalOrderInput,
    ): Promise<Animal[]> {
        return this.animalService.findAll(options);
    }

    @Query(() => Animal)
    async animal(@Args('id') id: number): Promise<Animal> {
        const animal = await this.animalService.findOne(id);
        if (!animal) {
            throw new Error(`Animal with id ${id} not found`);
        }
        return animal;
    }

    @Query(() => SpeciesCount)
    async mostRepresentedSpecies(): Promise<SpeciesCount> {
        return this.animalService.findMostRepresentedSpecies();
    }

    @Mutation(() => Animal)
    async createAnimal(
        @Args('input') createAnimalInput: CreateAnimalInput,
    ): Promise<Animal> {
        return this.animalService.create(createAnimalInput);
    }
}