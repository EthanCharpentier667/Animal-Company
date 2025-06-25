import { Field, ID, InputType } from "@nestjs/graphql";
import { Timestamp } from 'typeorm';

@InputType()
export class CreatePersonInput {
    @Field(() => ID)
    id: number;

    @Field()
    lastName: string;

    @Field()
    firstName: string;

    @Field()
    email: string;

    @Field()
    phoneNumber: string;
}