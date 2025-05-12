import { Field, InputType } from "@nestjs/graphql";
import {
  ArrayMaxSize,
  IsEmail,
  IsNumber,
  IsOptional,
  Length,
  Max,
  Min,
} from "class-validator";
import { IsName } from "@/common/validation/decorators/IsName.validation";
import { CompanionInputModel } from "@/types/models/inputs/companion.input";
import { AttendanceStatusEnum } from "@/types/enum/attendance_status.enum";

@InputType()
export class GuestInputModel {
  @IsEmail()
  @Field(() => String, {})
  email!: string;

  @IsName()
  @Length(1, 20)
  @Field(() => String, {})
  first_name?: string;

  @IsName()
  @Length(1, 20)
  @Field(() => String, {})
  last_name?: string;

  @IsOptional()
  @IsNumber()
  @Min(AttendanceStatusEnum.NOT_RESPONDED)
  @Max(AttendanceStatusEnum.MAYBE_ATTENDING)
  @Field(() => Number, {
    nullable: true,
    defaultValue: AttendanceStatusEnum.NOT_RESPONDED,
  })
  attendance_status?: AttendanceStatusEnum;

  @IsOptional()
  @Length(1, 20)
  @Field(() => String, { nullable: true })
  bio?: string | null;

  @IsOptional()
  @Field(() => Boolean, { nullable: true, defaultValue: true })
  profile_public?: boolean;

  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  need_bed?: boolean;

  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  has_bed?: boolean;

  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  is_vegan?: boolean;

  @IsOptional()
  @ArrayMaxSize(Number(process.env.MAX_COMPANIONS_PER_GUEST))
  @Field(() => [CompanionInputModel], { nullable: true, defaultValue: [] })
  companions?: CompanionInputModel[];
}
