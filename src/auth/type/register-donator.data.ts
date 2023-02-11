import { Gender, UserType } from '@prisma/client';

export type RegisterDonatorData = {
  uid: string;
  name: string;
  birthday: Date;
  email: string;
  photo?: string | null;
  country: string;
  job: string;
  gender: Gender;
};
