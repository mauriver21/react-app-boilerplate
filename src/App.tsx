import { useEffect } from 'react';
import { useUserRepository } from './repositories/useUserRepository';
import { useSelector } from '@/hooks/useSelector';
import { UserItem } from '@/components/UserItem';
import { Pagination } from './components/Pagination';

export const App = () => {
  const { fetchUsers, selectUsersPaginatedQuery } = useUserRepository();
  const usersPaginatedQuery = useSelector(selectUsersPaginatedQuery);
  const pagination = usersPaginatedQuery.pagination;

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <input
        autoComplete="off"
        onChange={(event) =>
          fetchUsers({
            ...pagination,
            filter: event.target.value,
          })
        }
      />
      {usersPaginatedQuery.ids.map((id) => (
        <UserItem key={id} id={id} />
      ))}
      <Pagination
        totalPages={pagination?.totalPages}
        onChange={(page) =>
          fetchUsers({ ...usersPaginatedQuery.pagination, page })
        }
      />
    </div>
  );
};
