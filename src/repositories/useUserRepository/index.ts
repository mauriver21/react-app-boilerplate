import { QueryKey } from '@/constants/enums';
import { useUserModel } from '@/models/useUserModel';
import { handleError } from '@/utils/handleError';
import { PaginationParams, useDebounce } from 'react-redux-use-model';

export const useUserRepository = () => {
  const userModel = useUserModel();

  const filterUsers = useDebounce((paginationParams: PaginationParams) => {
    return userModel.listUsers({
      queryKey: QueryKey.UsersFiltered,
      paginationParams,
      invalidateQuery: { strategy: 'onFilterChange' },
    });
  });

  const listUsers = (paginationParams: PaginationParams) => {
    return userModel.listUsers({
      queryKey: QueryKey.UsersListed,
      paginationParams,
    });
  };

  const fetchUsers = async (
    paginationParams?: Partial<{
      page: number;
      size: number;
      filter: string;
    }>,
  ) => {
    try {
      const { page = 0, size = 10, filter } = paginationParams || {};
      const params = { _page: page, _size: size, _filter: filter };
      if (filter) {
        await filterUsers(params);
      } else {
        await listUsers(params);
      }
    } catch (error) {
      console.error(handleError(error));
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
