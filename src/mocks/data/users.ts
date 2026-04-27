import { User } from '@/interfaces/User';
import { createRandomUser } from '@/mocks/fakers/createRandomUser';

export const users: User[] = Array(100)
  .fill(null)
  .map(() => createRandomUser());
