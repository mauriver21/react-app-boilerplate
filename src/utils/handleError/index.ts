import { AxiosError } from 'axios';

export const handleError = (error: any) => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message
    );
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'Unknown error';
  }
};
