import { faker } from '@faker-js/faker';
import { User } from '@/interfaces/User';
import { v4 as uuid } from 'uuid';

export const createRandomUser = (data?: Partial<User>): User => ({
  id: uuid(),
  name: faker.lorem.sentence({ min: 1, max: 2 }),
  email: faker.internet.email(),
  ...data,
});
