import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PersonAnimalWeight {
  @Field(() => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  animalName: string;

  @Field()
  weight: number;

}