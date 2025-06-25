import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PersonAnimalCount {
  @Field(() => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  count: number;
}