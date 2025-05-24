import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Companion, Guest } from '@prisma/client';
import { AttendanceStatusEnum } from '@/types/enum/attendance_status.enum';
import { CompanionModel } from '@/types/models/companion.model';
import { GuestModel as IGuestModel } from '@bdayhero/shared/types/models/guest.model';

@ObjectType()
export class GuestModel implements IGuestModel {
  constructor(guest: Guest & { companion?: Companion[] }) {
    Object.assign(this, guest);
    this.companions = guest.companion;
    if (!this.profile_public) {
      this.clear_user_profile();
    }
  }

  @Field(() => ID, {})
  id!: string;

  @Field(() => String, {})
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  first_name?: string;

  @Field(() => String, {
    nullable: true,
  })
  last_name?: string;

  @Field(() => String, {
    nullable: true,
  })
  initials?: string;

  @Field(() => String, {
    nullable: true,
  })
  avatar_url?: string;

  @Field(() => String, {
    nullable: true,
  })
  bio?: string;

  @Field(() => Number, {
    nullable: true,
  })
  attendance_status?: AttendanceStatusEnum;

  @Field(() => Boolean, {
    nullable: true,
  })
  profile_public?: boolean;

  @Field(() => Boolean, {
    nullable: true,
  })
  need_bed?: boolean;

  @Field(() => Boolean, {
    nullable: true,
  })
  has_bed?: boolean;

  @Field(() => Boolean, {
    nullable: true,
  })
  is_vegan?: boolean;

  @Field(() => [CompanionModel], {
    nullable: true,
  })
  companions?: CompanionModel[];

  public clear_user_profile(): this {
    this.email = 'anonym@example.com';
    delete this.first_name;
    delete this.last_name;
    delete this.avatar_url;
    delete this.bio;
    delete this.companions;
    delete this.initials;
    delete this.need_bed;
    delete this.has_bed;
    delete this.is_vegan;
    return this;
  }
}
