import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class ValidationCtxType {
  ctx!: ExecutionContext;
  req!: Request;
}
