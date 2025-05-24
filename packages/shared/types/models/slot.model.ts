import type { GuestModel } from './guest.model.js';

export interface SlotModel {
  id: number;
  start: Date;
  end: Date;
  capacity: number;
  assigned_guests?: GuestModel[];
}
