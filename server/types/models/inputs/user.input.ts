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
  dorffuehrung?: boolean;

  @IsOptional()
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  weinprobe?: boolean;
}
