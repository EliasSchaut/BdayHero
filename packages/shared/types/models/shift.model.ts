import type { SlotModel } from './slot.model.js';

export interface ShiftModel {
  id: number;
  name: string;
  desc: string;
  slots: SlotModel[];
}
