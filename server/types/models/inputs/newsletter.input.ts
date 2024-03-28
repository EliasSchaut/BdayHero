import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class NewsletterInputModel {
  @IsEmail()
  @Field(() => String)
  email!: string;
}
