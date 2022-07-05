import { FocusableDirective } from '@navigation/directives';

export type NavGrid = {
  [rowIndex: string | number]: FocusableDirective[];
};
