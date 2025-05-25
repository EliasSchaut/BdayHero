import { AttendanceStatus } from '../enums/attendance_status.enum.js';
import type { CompanionModel } from './companion.model.js';
import type { SlotModel } from './slot.model.js';

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
  assigned_slots?: SlotModel[];
}
