import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';
import { IsName } from '@/common/validation/decorators/IsName.validation';

@InputType()
export class UserInputModel {
  @IsName()
  @Field(() => String, {})
  first_name!: string;

  @IsName()
  @Field(() => String, {})
  last_name!: string;

  @IsOptional()
  @IsEmail()
  @Field(() => String, { nullable: true, defaultValue: null })
  email?: string;

  @IsOptional()
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  public?: boolean;

  @IsOptional()
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  has_bed?: boolean;

  @IsOptional()
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  need_bed?: boolean;

  @IsOptional()
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  nerd?: boolean;

  @IsOptional()
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  vegan?: boolean;
}
