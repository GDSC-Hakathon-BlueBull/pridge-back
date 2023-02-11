import { Gender } from '@prisma/client';

type AddressData = {
  country: string;
  code: number;
  city: string;
  street: string;
  detail?: string | null;
  firstName: string;
  lastName: string;
};

export type RegisterConsumerData = {
  uid: string;
  name: string;
  birthday: Date;
  email: string;
  photo?: string | null;
  country: string;
  address: AddressData;
};
