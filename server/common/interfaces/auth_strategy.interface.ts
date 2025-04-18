import { GuestModel } from '@/types/models/guest.model';

export interface AuthStrategyInterface {
  validate(...options: any): Promise<GuestModel>;
}
