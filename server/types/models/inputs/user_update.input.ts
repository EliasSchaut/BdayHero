import { Field, InputType } from '@nestjs/graphql';
import { IsName } from '@/common/validation/decorators/IsName.validation';
import { IsEmail, IsOptional } from 'class-validator';

@InputType()
export class UserUpdateInputModel {
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
  dorffuehrung?: boolean;

  @IsOptional()
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  weinprobe?: boolean;
}
