import { Field, InputType } from '@nestjs/graphql';
import { IsJWT } from 'class-validator';

@InputType()
export class TokenInputModel {
  @IsJWT({ always: true })
  @Field(() => String)
  token!: string;
}
