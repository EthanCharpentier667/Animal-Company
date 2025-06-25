import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class SpeciesCount {
  @Field()
  species: string;

  @Field()
  count: number;
}