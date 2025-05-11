import { Field, InputType } from "@nestjs/graphql";
import { IsName } from "@/common/validation/decorators/IsName.validation";
import { IsNumber, IsOptional, IsUrl, Length, Max, Min } from "class-validator";
import { AttendanceStatusEnum } from "@/types/enum/attendance_status.enum";
import type { GuestUpdateInputModel as IGuestUpdateInputModel } from "@bdayhero/shared";

@InputType()
export class GuestUpdateInputModel implements IGuestUpdateInputModel {
  @IsName()
  @Field(() => String, { nullable: true })
  first_name?: string;

  @IsName()
  @Field(() => String, { nullable: true })
  last_name?: string;

  @IsOptional()
  @IsNumber()
  @Min(AttendanceStatusEnum.NOT_RESPONDED)
  @Max(AttendanceStatusEnum.MAYBE_ATTENDING)
  @Field(() => Number, { nullable: true })
  attendance_status?: AttendanceStatusEnum;

  @IsOptional()
  @IsUrl()
  @Field(() => String, { nullable: true })
  avatar?: string;

  @IsOptional()
  @Length(1, 20)
  @Field(() => String, { nullable: true })
  bio?: string;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  profile_public?: boolean;
}
