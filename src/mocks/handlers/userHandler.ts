import { http, HttpResponse } from 'msw';
import { ENV } from '@/constants/env';
import { data } from '@/mocks/data';

export const userHandler = [
  http.get(`${ENV.BASE_LOCAL_URL}/users`, () => {
    return HttpResponse.json(data.users);
  }),
];
