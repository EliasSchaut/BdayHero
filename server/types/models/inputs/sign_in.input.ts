import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class SignInInputModel {
  @IsString()
  @Length(1, 255)
  @IsEmail()
  @Field(() => String)
  email!: string;
}
