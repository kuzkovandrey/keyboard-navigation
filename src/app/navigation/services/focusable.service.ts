import { Injectable, QueryList } from '@angular/core';
import { FocusableDirective } from '@navigation/directives';
import { FocusableItem, Index } from '@navigation/types';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FocusableService {
  private _focusedItem = new BehaviorSubject<FocusableDirective>(null);

  get focusedItem(): Readonly<FocusableDirective> {
    return Object.freeze(this._focusedItem.value);
  }

  private _focusableList = new BehaviorSubject<FocusableItem[]>(null);

  get focusableList(): FocusableItem[] {
    return this._focusableList.value;
  }

  setFocusedItem(item: FocusableDirective) {
    this._focusedItem.next(item);
    console.log(this.focusedItem);
  }

  findFocusableByIndex(
    index: Index,
    items: FocusableItem[],
  ): FocusableItem | undefined {
    return items.find(
      (item) =>
        item.index.column === index.column && item.index.row === index.row,
    );
  }

  createFocusableList(list: QueryList<FocusableDirective>): FocusableItem[] {
    const array = list.toArray();
    const focusableItems: FocusableItem[] = [];

    array.forEach((focusable, idx) => {
      if (!idx) {
        const index = { row: 0, column: 0 };
        focusableItems.push({ focusable, index });
        focusable.setIndex(index);
        return;
      }

      const prevItem = [...focusableItems].pop() as FocusableItem;

      if (prevItem.focusable.DOMRect.y === focusable.DOMRect.y) {
        const index = {
          row: prevItem.index.row,
          column: prevItem.index.column + 1,
        };

        focusableItems.push({ focusable, index });
        focusable.setIndex(index);

        return;
      }

      const index = { row: prevItem.index.row + 1, column: 0 };

      focusableItems.push({ focusable, index });
      focusable.setIndex(index);
    });

    this._focusableList.next(focusableItems);

    return focusableItems;
  }

  onLeft() {
    const index = this.focusedItem.index;

    const item = this.findFocusableByIndex(
      { ...index, column: index.column - 1 },
      this.focusableList,
    );

    if (item) item.focusable.setFocus();
  }

  onRight() {
    const index = this.focusedItem.index;

    const item = this.findFocusableByIndex(
      { ...index, column: index.column + 1 },
      this.focusableList,
    );

    if (item) item.focusable.setFocus();
  }

  onUp() {
    const index = this.focusedItem.index;

    const item = this.findFocusableByIndex(
      { ...index, row: index.row - 1 },
      this.focusableList,
    );

    if (item) item.focusable.setFocus();
  }

  onDown() {
    const index = this.focusedItem.index;

    const item = this.findFocusableByIndex(
      { ...index, row: index.row + 1 },
      this.focusableList,
    );

    if (item) item.focusable.setFocus();
  }

  onEnter() {
    this.focusedItem.enter();
  }
}
