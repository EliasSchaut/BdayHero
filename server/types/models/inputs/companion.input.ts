import { Field, InputType } from '@nestjs/graphql';
import { IsName } from '@/common/validation/decorators/IsName.validation';

@InputType()
export class CompanionInputModel {
  @IsName()
  @Field(() => String, {})
  name!: string;
}
