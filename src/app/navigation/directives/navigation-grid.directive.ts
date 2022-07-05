import {
  AfterContentInit,
  ContentChildren,
  Directive,
  HostListener,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { FocusableDirective } from '@navigation/directives';
import { NavigationGridService } from '@navigation/services';
import { Keys } from '@navigation/values';
import { NavGrid } from '@navigation/types';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[navigationGrid]',
  providers: [NavigationGridService],
})
export class NavigationGridDirective implements AfterContentInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  @ContentChildren(FocusableDirective, {
    descendants: true,
    emitDistinctChangesOnly: true,
  })
  private focusableItems: QueryList<FocusableDirective>;

  private navGrid: NavGrid;

  private readonly keyHandlers = {
    [Keys.ARROW_LEFT]: this.navGridService.onLeft,
    [Keys.ARROW_RIGHT]: this.navGridService.onRight,
    [Keys.ARROW_UP]: this.navGridService.onUp,
    [Keys.ARROW_DOWN]: this.navGridService.onDown,
  };

  @HostListener('keydown', ['$event'])
  private onKeyDown({ key }: KeyboardEvent) {
    if (this.keyHandlers[key as Keys]) this.keyHandlers[key as Keys]();
  }

  constructor(private readonly navGridService: NavigationGridService) {}

  ngAfterContentInit() {
    this.navGrid = this.navGridService.createNavGrid(this.focusableItems);
    console.log(this.navGrid);

    this.subscriptions.add(
      this.focusableItems.changes.subscribe(() => {
        this.navGrid = this.navGridService.createNavGrid(this.focusableItems);
        console.log(this.navGrid);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
