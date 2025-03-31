import { Reflector } from '@nestjs/core';
import { RoleEnum } from '@/types/enum/role.enum';

export const Role = Reflector.createDecorator<RoleEnum>();
