import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Guest } from '@prisma/client';
import { AttendanceStatusEnum } from '@/types/enum/attendanceStatus.enum';
import { CompanionModel } from '@/types/models/companion.model';

@ObjectType()
export class GuestModel {
  constructor(guest: Guest) {
    Object.assign(this, guest);
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
  avatar_url?: string;

  @Field(() => String, {
    nullable: true,
  })
  bio?: string;

  @Field(() => AttendanceStatusEnum, {
    nullable: true,
  })
  attendance_status?: AttendanceStatusEnum;

  @Field(() => Boolean, {
    nullable: true,
  })
  profile_public?: boolean;

  @Field(() => [CompanionModel], {
    nullable: true,
  })
  companions?: CompanionModel[];

  public clear_user_profile(): this {
    delete this.first_name;
    delete this.last_name;
    delete this.avatar_url;
    delete this.bio;
    return this;
  }
}
