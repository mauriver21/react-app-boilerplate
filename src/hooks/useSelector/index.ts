import { RootState } from '@/interfaces/RootState';
import {
  TypedUseSelectorHook,
  useSelector as useBaseSelector,
} from 'react-redux';

export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector;
