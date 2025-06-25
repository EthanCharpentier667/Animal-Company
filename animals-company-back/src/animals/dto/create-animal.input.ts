import { Field, ID, InputType } from "@nestjs/graphql";
import { Timestamp } from 'typeorm';

@InputType()
export class CreateAnimalInput {

  @Field()
  name: string;

  @Field(() => String)
  dateOfBirth: string;

  @Field()
  species: string;

  @Field()
  breed: string;

  @Field()
  color: string;

  @Field()
  weight: number;

  @Field()
  person_id: number;
}