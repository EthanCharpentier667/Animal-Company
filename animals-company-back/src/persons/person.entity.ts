import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Person {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    phoneNumber: string;
}