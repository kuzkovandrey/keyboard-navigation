import {
  AfterContentInit,
  ContentChildren,
  Directive,
  HostListener,
  QueryList,
} from '@angular/core';
import { FocusableDirective } from '@navigation/directives';
import { NavigationGridService } from '@navigation/services';
import { Keys } from '@navigation/values';
import { NavGrid } from '@navigation/types';

@Directive({
  selector: '[navigationGrid]',
  providers: [NavigationGridService],
})
export class NavigationGridDirective implements AfterContentInit {
  @ContentChildren(FocusableDirective, {
    descendants: true,
    emitDistinctChangesOnly: true,
  })
  private focusableItems: QueryList<FocusableDirective>;

  private navGrid: NavGrid;

  private readonly keyHandlers = {
    [Keys.ARROW_LEFT]: this.onLeft.bind(this),
    [Keys.ARROW_RIGHT]: this.onRight.bind(this),
    [Keys.ARROW_UP]: this.onUp.bind(this),
    [Keys.ARROW_DOWN]: this.onDown.bind(this),
  };

  @HostListener('keydown', ['$event'])
  private onKeyDown({ key }: KeyboardEvent) {
    if (this.keyHandlers[key as Keys]) this.keyHandlers[key as Keys]();
  }

  constructor(private readonly navGridService: NavigationGridService) {}

  ngAfterContentInit() {
    this.navGrid = this.navGridService.createNavGrid(this.focusableItems);
    console.log(this.navGrid);

    this.focusableItems.changes.subscribe(() => {
      this.navGrid = this.navGridService.createNavGrid(this.focusableItems);
      console.log(this.navGrid);
    });
  }

  onLeft() {
    this.navGridService.onLeft();
  }

  onRight() {
    this.navGridService.onRight();
  }

  onUp() {
    this.navGridService.onUp();
  }

  onDown() {
    this.navGridService.onDown();
  }
}