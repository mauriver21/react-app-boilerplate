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

  const fetchUsers = async (paginationParams: PaginationParams) => {
    try {
      const { _filter } = paginationParams;

      if (_filter) {
        await filterUsers(paginationParams);
      } else {
        await listUsers(paginationParams);
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
