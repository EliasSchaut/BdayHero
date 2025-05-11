import { AttendanceStatus } from "../../enums/attendance_status.enum";

export interface GuestUpdateInputModel {
  first_name?: string;
  last_name?: string;
  attendance_status?: AttendanceStatus;
  avatar?: string;
  bio?: string;
  profile_public?: boolean;
}
