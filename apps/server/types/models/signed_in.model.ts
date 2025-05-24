import { Field, ObjectType } from '@nestjs/graphql';
import type { SignedInModel as ISignedInModel } from '@bdayhero/shared';

@ObjectType()
export class SignedInModel implements ISignedInModel {
  constructor(barrier_token: string) {
    this.barrier_token = barrier_token;
  }

  @Field(() => String, { nullable: true })
  barrier_token?: string;
}
