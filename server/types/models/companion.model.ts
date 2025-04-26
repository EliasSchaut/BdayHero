import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CompanionModel {
  @Field(() => String, {})
  name!: string;
}
