import { useEffect } from 'react';
import { useUserController } from './controllers/useUserController';
import { useSelector } from './hooks/useSelector';

export const App = () => {
  const { fetchUsers, filterUsers, selectUsersPaginatedQuery } =
    useUserController();
  const usersPaginatedQuery = useSelector(selectUsersPaginatedQuery);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <input
        autoComplete="off"
        onChange={(event) => filterUsers({ _filter: event.target.value })}
      />
      {usersPaginatedQuery.ids.map((id) => (
        <div key={id}>{id}</div>
      ))}
    </div>
  );
};
