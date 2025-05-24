import { Field, ObjectType } from '@nestjs/graphql';
import { CompanionModel as ICompanionModel } from '@bdayhero/shared';

@ObjectType()
export class CompanionModel implements ICompanionModel {
  @Field(() => String, {})
  name!: string;
}
