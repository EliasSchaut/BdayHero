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
    this.has_bed = user.has_bed;
    this.need_bed = user.need_bed;
    this.nerd = user.nerd;
    this.vegan = user.vegan;
    this.is_admin = user.is_admin;
    this.mail_verified = user.mail_verified;
    this.login_challenge = user.login_challenge;
    this.mail_challenge = user.mail_challenge;
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
    description:
      'Indicates whether the user has a bed to offer for other guests',
    nullable: true,
  })
  has_bed?: boolean;

  @Field(() => Boolean, {
    description: 'Indicates whether the user needs a bed for their stay',
    nullable: true,
  })
  need_bed?: boolean;

  @Field(() => Boolean, {
    description:
      'Indicates whether the user is a nerd who likes to play the nerd game',
    nullable: true,
  })
  nerd?: boolean;

  @Field(() => Boolean, {
    description: 'Indicates whether the user eats vegan food only',
    nullable: true,
  })
  vegan?: boolean;

  @Field(() => Boolean, {
    description: 'Indicates whether the user is an admin',
    nullable: true,
  })
  is_admin?: boolean;

  @Field(() => String, {
    description: 'Challenge string used for email verification',
    nullable: true,
  })
  mail_challenge?: string;

  @Field(() => String, {
    description: 'Challenge string used authentication',
    nullable: true,
  })
  login_challenge?: string;

  @Field(() => Boolean, {
    description: 'Indicates whether the user email is verified',
    nullable: true,
  })
  mail_verified?: boolean;

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
    this.mail_challenge = undefined;
    this.login_challenge = undefined;
    this.mail_verified = undefined;
    this.has_bed = undefined;
    this.need_bed = undefined;
    this.nerd = undefined;
    this.vegan = undefined;
  }
}
