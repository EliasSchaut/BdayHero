import type { SignedInModel as ISignedInModel } from "@bdayhero/shared/types/models/signed_in.model";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignedInModel implements ISignedInModel {
  constructor(barrier_token: string) {
    this.barrier_token = barrier_token;
  }

  @Field(() => String, { nullable: true })
  barrier_token?: string;
}
