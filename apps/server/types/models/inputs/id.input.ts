import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';

@InputType()
export class IdInputModel {
  @IsNumber()
  @Min(0)
  @Max(10000000000)
  @Field(() => Int)
  id!: number;
}
