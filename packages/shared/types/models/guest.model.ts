import { AttendanceStatus } from "../enums/attendance_status.enum";
import { CompanionModel } from "./companion.model";

export interface GuestModel {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  initials?: string;
  avatar_url?: string;
  bio?: string;
  attendance_status?: AttendanceStatus;
  profile_public?: boolean;
  need_bed?: boolean;
  has_bed?: boolean;
  is_vegan?: boolean;
  companions?: CompanionModel[];
}
