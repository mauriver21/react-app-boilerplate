import { EntityName } from '@/constants/enums';
import { useUserApiClient } from '@/api-clients/useUserApiClient';
import {
  useModel,
  EntityActionType,
  ListQueryHandler,
} from 'react-redux-use-model';
import { User } from '@/interfaces/User';

export const useUserModel = () => {
  const movieApiClient = useUserApiClient();
  const model = useModel<
    User,
    {
      listUsers: ListQueryHandler<User>;
    }
  >({
    entityName: EntityName.Users,
    config: {
      paginationSizeMultiplier: 5,
    },
    handlers: {
      listUsers: {
        apiFn: movieApiClient.listUsers,
        action: EntityActionType.LIST,
      },
    },
  });

  return model;
};
