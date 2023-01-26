import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/utils/types';

export const Role = (role: RoleType) => SetMetadata('role', role);