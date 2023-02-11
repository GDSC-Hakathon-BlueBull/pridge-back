import { UserType } from '@prisma/client';
import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../guard/role.guard';

export const Roles = (role: UserType) => SetMetadata(ROLES_KEY, role);
