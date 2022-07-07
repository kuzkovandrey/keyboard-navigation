import {
  AfterContentInit,
  ContentChildren,
  Directive,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { FocusableDirective } from '@navigation/directives';
import { Keys } from '@navigation/values';
import { Subscription } from 'rxjs';
import { FocusableService } from '@navigation/services/focusable.service';
import { KeysService } from '@navigation/services/keys.service';

@Directive({
  selector: '[navigationGrid]',
  providers: [FocusableService, KeysService],
})
export class NavigationGridDirective implements AfterContentInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  @ContentChildren(FocusableDirective, {
    descendants: true,
    emitDistinctChangesOnly: true,
  })
  private items: QueryList<FocusableDirective>;

  private readonly keyHandlers = {
    [Keys.ARROW_LEFT]: this.onLeft.bind(this),
    [Keys.ARROW_RIGHT]: this.onRight.bind(this),
    [Keys.ARROW_UP]: this.onUp.bind(this),
    [Keys.ARROW_DOWN]: this.onDown.bind(this),
    [Keys.ENTER]: this.onEnter.bind(this),
    default: this.setFocusToLatestElement.bind(this),
  };

  constructor(
    private readonly focusableService: FocusableService,
    private readonly keysService: KeysService,
  ) {}

  ngAfterContentInit() {
    this.focusableService.createFocusableList(this.items);

    this.subscriptions.add(
      this.keysService.onKeyDown$.subscribe(({ key: k }) => {
        const key = k as Keys;
        const handler = this.keyHandlers[key] ?? this.keyHandlers.default;

        handler();
      }),
    );

    this.subscriptions.add(
      this.items.changes.subscribe(() => {
        this.focusableService.createFocusableList(this.items);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onLeft() {
    this.focusableService.onLeft();
  }

  onRight() {
    this.focusableService.onRight();
  }

  onUp() {
    this.focusableService.onUp();
  }

  onDown() {
    this.focusableService.onDown();
  }

  onEnter() {
    this.focusableService.onEnter();
  }

  setFocusToLatestElement() {
    console.log('default');
  }
}
