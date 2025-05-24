import { AttendanceStatus } from '../../enums/attendance_status.enum.js';
import type { CompanionModel } from '../companion.model.js';

export interface GuestUpdateInputModel {
  first_name?: string;
  last_name?: string;
  attendance_status?: AttendanceStatus;
  avatar?: string;
  bio?: string;
  profile_public?: boolean;
  need_bed?: boolean;
  has_bed?: boolean;
  is_vegan?: boolean;
  companions?: CompanionModel[];
}
