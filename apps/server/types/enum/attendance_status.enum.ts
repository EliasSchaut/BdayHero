import { registerEnumType } from "@nestjs/graphql";
import { AttendanceStatus as AttendanceStatusEnum } from "@bdayhero/shared/types/enums/attendance_status.enum";

export { AttendanceStatusEnum };

registerEnumType(AttendanceStatusEnum, {
  name: "AttendanceStatusEnum",
});
