import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
});

@InputType()
export class OrderByInput {
  @Field()
  field: string;

  @Field(() => OrderDirection, { defaultValue: OrderDirection.ASC })
  direction: OrderDirection;
}

@InputType()
export class AnimalOrderInput {
  @Field(() => [OrderByInput], { defaultValue: [] })
  orderBy?: OrderByInput[];
}