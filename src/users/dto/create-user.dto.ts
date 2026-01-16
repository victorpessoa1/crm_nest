import { Roles } from 'src/generated/prisma/enums';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: Roles;
}
