import { delay, http, HttpResponse } from 'msw';
import { ENV } from '@/constants/env';
import { data } from '@/mocks/data';
import { objectMatchCriteria } from '@/utils/objectMatchCriteria';
import { paginateData } from '@/utils/paginateData';

export const userHandler = [
  http.get(`${ENV.BASE_LOCAL_URL}/users`, async ({ request }) => {
    const url = new URL(request.url);
    const size = url.searchParams.get('_size');
    const page = url.searchParams.get('_page');
    const filter = url.searchParams.get('_filter');
    let users = data.users;

    if (filter) {
      users = users.filter((item) => objectMatchCriteria(item, filter));
    }

    const { content, totalPages } = paginateData(users, {
      limit: Number(size),
      page: Number(page),
    });

    await delay(200);

    return HttpResponse.json(
      {
        data: content,
        pagination: {
          size,
          page,
          totalElements: users.length,
          totalPages,
        },
      },
      { status: 200 },
    );
  }),
];
