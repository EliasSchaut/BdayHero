import { Field, ObjectType } from '@nestjs/graphql';
import { IsName } from '@/common/validation/decorators/IsName.validation';

@ObjectType()
export class CompanionModel {
  @IsName()
  @Field(() => String, {})
  name!: string;
}
