import { useEffect } from 'react';
import { useUserRepository } from './repositories/useUserRepository';
import { useSelector } from '@/hooks/useSelector';
import { UserItem } from '@/components/UserItem';
import { Pagination } from './components/Pagination';

export const App = () => {
  const { fetchUsers, selectUsersPaginatedQuery } = useUserRepository();
  const usersPaginatedQuery = useSelector(selectUsersPaginatedQuery);
  const { paginationParams = { _page: 0, _size: 10 } } = usersPaginatedQuery;

  useEffect(() => {
    fetchUsers(paginationParams);
  }, []);

  return (
    <div>
      <input
        autoComplete="off"
        onChange={(event) =>
          fetchUsers({
            ...paginationParams,
            _filter: event.target.value,
          })
        }
      />
      {usersPaginatedQuery.ids.map((id) => (
        <UserItem key={id} id={id} />
      ))}
      <Pagination
        totalPages={usersPaginatedQuery.pagination?.totalPages}
        onChange={(_page) => fetchUsers({ ...paginationParams, _page })}
      />
    </div>
  );
};
