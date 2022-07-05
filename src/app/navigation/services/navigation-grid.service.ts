import { NavGrid } from '@navigation/types';
import { Injectable, QueryList } from '@angular/core';
import { FocusableDirective } from '@navigation/directives';

@Injectable()
export class NavigationGridService {
  createNavGrid(list: QueryList<FocusableDirective>): NavGrid {
    const array = list.toArray();
    const grid: NavGrid = {};

    array.forEach((focusable) => {
      const rowPosition = focusable.DOMRect.y;
      const row = grid[rowPosition];

      grid[rowPosition] = row ? [...row, focusable] : [focusable];
    });

    return Object.fromEntries(
      // eslint-disable-next-line
      Object.entries(grid).map(([_, value], index) => [index, value]),
    );
  }

  onLeft() {
    console.log('onLeft');
  }

  onRight() {
    console.log('onRight');
  }

  onUp() {
    console.log('onUp');
  }

  onDown() {
    console.log('onDown');
  }
}
