import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType()
export class UserModel {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.public = user.public;
    this.is_admin = user.is_admin;
    this.challenge = user.challenge;
    this.verified = user.verified;
  }

  @Field(() => ID, {
    description: 'Unique id number of user used for comparison',
  })
  id!: string;

  @Field(() => String, {
    description:
      'Unique private email of user used to login and receive emails',
    nullable: true,
  })
  email?: string | null;

  @Field(() => String, {
    description: 'First name of user. Only public if profile is public',
    nullable: true,
  })
  first_name?: string;

  @Field(() => String, {
    description: 'Last name of user. Only public if profile is public',
    nullable: true,
  })
  last_name?: string;

  @Field(() => Boolean, {
    description:
      'Indicates whether the user wants their participation to be public',
    nullable: true,
  })
  public?: boolean;

  @Field(() => Boolean, {
    description: 'Indicates whether the user is an admin',
    nullable: true,
  })
  is_admin?: boolean;

  @Field(() => String, {
    description:
      'Challenge string used for password reset and account verification',
    nullable: true,
  })
  challenge?: string;

  @Field(() => Boolean, {
    description: 'Indicates whether the user account is verified',
    nullable: true,
  })
  verified?: boolean;

  // clears all user fields that are not meant to be seen by public
  public convert_to_public(): this {
    if (!this.public) {
      this.clear_user_profile();
    }
    this.clear_system_info();
    return this;
  }

  private clear_user_profile() {
    this.first_name = undefined;
    this.last_name = undefined;
  }

  private clear_system_info() {
    this.email = undefined;
    this.is_admin = undefined;
    this.challenge = undefined;
    this.verified = undefined;
  }
}
