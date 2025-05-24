import { Module } from '@nestjs/common';
import { ShiftService } from '@/graphql/shift/shift.service';
import { ShiftResolver } from '@/graphql/shift//shift.resolver';

@Module({
  providers: [ShiftService, ShiftResolver],
})
export class ShiftModule {}
