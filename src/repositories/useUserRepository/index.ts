import { QueryKey } from '@/constants/enums';
import { useUserModel } from '@/models/useUserModel';
import { PaginationParams, useDebounce } from 'react-redux-use-model';

export const useUserRepository = () => {
  const userModel = useUserModel();

  const listUsers = (paginationParams: PaginationParams) => {
    return userModel.listUsers({
      queryKey: QueryKey.UsersListed,
      paginationParams,
    });
  };

  const filterUsers = useDebounce(listUsers);

  const selectUsersPaginatedQuery = userModel.selectPaginatedQuery;
  const selectUserEntity = userModel.selectEntity;

  return {
    listUsers,
    filterUsers,
    selectUsersPaginatedQuery,
    selectUserEntity,
  };
};
