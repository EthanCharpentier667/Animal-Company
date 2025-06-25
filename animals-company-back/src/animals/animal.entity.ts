import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Animal {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => String)
    @Column({ 
        type: 'date',
        transformer: {
            to: (value: Date) => value,
            from: (value: string) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
                });
            }
        },
    })
    dateOfBirth: string;

    @Field()
    @Column()
    species: string;

    @Field()
    @Column()
    breed: string;

    @Field()
    @Column()
    color: string;

    @Field()
    @Column()
    weight: number;

    @Field()
    @Column()
    person_id: number;
}