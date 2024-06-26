import { Field, InputType } from '@nestjs/graphql';
import { IsName } from '@/common/validation/decorators/IsName.validation';
import { IsEmail, IsOptional } from 'class-validator';

@InputType()
export class UserUpdateInputModel {
  @IsOptional()
  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @IsName()
  @Field(() => String, { nullable: true })
  first_name?: string;

  @IsOptional()
  @IsName()
  @Field(() => String, { nullable: true })
  last_name?: string;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
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
