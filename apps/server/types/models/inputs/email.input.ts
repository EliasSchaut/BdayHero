import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class EmailInputModel {
  @IsEmail()
  @Length(1, 255)
  @Field(() => String)
  email!: string;
}
