import { http, HttpResponse } from 'msw';
import { ENV } from '@/constants/env';
import { data } from '@/mocks/data';

export const productHandler = [
  http.get(`${ENV.baseURL}/products`, () => {
    return HttpResponse.json(data.products);
  }),
];
