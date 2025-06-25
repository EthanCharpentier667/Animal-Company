import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PersonAnimalGroupWeight {
  @Field(() => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => [String])
  animalNames: string[];

  @Field()
  weight: number;

}