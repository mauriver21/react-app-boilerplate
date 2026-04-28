import { QueryKey } from '@/constants/enums';
import { useUserModel } from '@/models/useUserModel';
import { PaginationParams, useDebounce } from 'react-redux-use-model';

export const useUserController = () => {
  const userModel = useUserModel();

  const filterUsers = useDebounce((paginationParams: PaginationParams) => {
    userModel.listUsers({
      queryKey: QueryKey.UsersFiltered,
      paginationParams,
      invalidateQuery: { strategy: 'onFilterChange' },
    });
  });

  const listUsers = (paginationParams: PaginationParams) => {
    userModel.listUsers({
      queryKey: QueryKey.UsersListed,
      paginationParams,
    });
  };

  const fetchUsers = (
    paginationParams?: Partial<{
      page: number;
      size: number;
      filter: string;
    }>,
  ) => {
    const { page = 0, size = 10, filter } = paginationParams || {};
    const params = { _page: page, _size: size, _filter: filter };
    if (filter) {
      filterUsers(params);
    } else {
      listUsers(params);
    }
  };

  const selectUsersPaginatedQuery = userModel.selectPaginatedQuery;
  const selectUserEntity = userModel.selectEntity;

  return {
    fetchUsers,
    selectUsersPaginatedQuery,
    selectUserEntity,
  };
};
