import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { AnimalOrderInput } from './dto/order.input';

@Injectable()
export class AnimalService {
    constructor(
        @InjectRepository(Animal)
        private animalRepository: Repository<Animal>,
    ) {}

    async findAll(options?: AnimalOrderInput): Promise<Animal[]> {
        const query = this.animalRepository.createQueryBuilder('animal');
        if (options?.orderBy && options.orderBy.length > 0) {
            options.orderBy.forEach((orderByItem) => {
                const allowedFields = ['id', 'name', 'dateOfBirth', 'species', 'breed', 'color', 'weight', 'person_id'];
                if (allowedFields.includes(orderByItem.field)) {
                    query.addOrderBy(`animal.${orderByItem.field}`, orderByItem.direction);
                }
            });
        } else {
            query.orderBy('animal.id', 'ASC');
        }
        
        return query.getMany();
    }

    async findMostRepresentedSpecies(): Promise<{ species: string; count: number }> {
        const result = await this.animalRepository
            .createQueryBuilder('animal')
            .select('animal.species', 'species')
            .addSelect('COUNT(animal.id)', 'count')
            .groupBy('animal.species')
            .orderBy('count', 'DESC')
            .limit(1)
            .getRawOne();

        return {
            species: result?.species || '',
            count: parseInt(result?.count || '0')
        };
    }

    async findOne(id: number): Promise<Animal | null> {
        return this.animalRepository.findOne({ where: { id } });
    }

    async create(createAnimalInput: CreateAnimalInput): Promise<Animal> {
        const animal = this.animalRepository.create(createAnimalInput);
        return this.animalRepository.save(animal);
    }
}
