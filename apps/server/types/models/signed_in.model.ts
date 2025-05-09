import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignedInModel {
  constructor(barrier_token: string) {
    this.barrier_token = barrier_token;
  }

  @Field(() => String, { nullable: true })
  barrier_token?: string;
}
