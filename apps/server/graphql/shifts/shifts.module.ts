import { Module } from '@nestjs/common';
import { ShiftsService } from '@/graphql/shifts/shifts.service';
import { ShiftsResolver } from '@/graphql/shifts//shifts.resolver';

@Module({
  providers: [ShiftsService, ShiftsResolver],
})
export class ShiftsModule {}
