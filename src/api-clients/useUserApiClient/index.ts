import type { User } from '@/interfaces/User';
import { axiosLocal } from '@/utils/axiosLocal';
import type { ListResponse, PaginationParams } from 'react-redux-use-model';

export const useUserApiClient = () => {
  const listUsers = async (
    params: PaginationParams,
  ): Promise<ListResponse<User>> => {
    const response = await axiosLocal.get<ListResponse<User>>('/users', {
      params,
    });
    return response.data;
  };

  return { listUsers };
};
