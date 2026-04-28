import { useUserRepository } from '@/repositories/useUserRepository';
import { useSelector } from '@/hooks/useSelector';
import React from 'react';

export interface UserItemProps {
  id: string;
}

export const UserItem: React.FC<UserItemProps> = ({ id }) => {
  const { selectUserEntity } = useUserRepository();
  const userEntity = useSelector((state) => selectUserEntity(state, id));

  return <div>{userEntity.loading ? 'Loading...' : userEntity.data?.name}</div>;
};
