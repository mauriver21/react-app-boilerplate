import { QueryKey } from '@/constants/enums';
import { useUserModel } from '@/models/useUserModel';
import { PaginationParams, useDebounce } from 'react-redux-use-model';

export const useUserController = (
  defaultPaginationParams: PaginationParams = {
    _page: 0,
    _size: 10,
    _filter: '',
  },
) => {
  const userModel = useUserModel();

  const filterUsers = useDebounce(
    (paginationParams: Partial<PaginationParams>) => {
      userModel.listUsers({
        queryKey: QueryKey.UsersFiltered,
        paginationParams: { ...defaultPaginationParams, ...paginationParams },
        invalidateQuery: { strategy: 'onFilterChange' },
      });
    },
  );

  const listUsers = () => {
    userModel.listUsers({
      queryKey: QueryKey.Users,
      paginationParams: defaultPaginationParams,
    });
  };

  const fetchUsers = () => {
    if (defaultPaginationParams?._filter) {
      filterUsers(defaultPaginationParams);
    } else {
      listUsers();
    }
  };

  const selectUsersPaginatedQuery = userModel.selectPaginatedQuery;
  const selectUserEntity = userModel.selectEntity;

  return {
    fetchUsers,
    filterUsers,
    selectUsersPaginatedQuery,
    selectUserEntity,
  };
};
