import { GuestModel } from '@/types/models/guest.model';

export interface AuthStrategyInterface {
  name: string;
  authenticate(...options: any): Promise<any>;
  validate(...options: any): Promise<GuestModel>;
}
