import { Field, InputType } from "@nestjs/graphql";
import { IsName } from "@/common/validation/decorators/IsName.validation";
import { Length } from "class-validator";

@InputType()
export class CompanionInputModel {
  @IsName()
  @Length(1, 20)
  @Field(() => String, {})
  name!: string;
}
