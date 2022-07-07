import { NavigationGridDirective } from './navigation-grid.directive';
import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Events } from '@navigation/values';
import { FocusableService } from '@navigation/services/focusable.service';
import { UUID } from '@navigation/utils';
import { Index } from '@navigation/types';

@Directive({
  selector: '[focusable]',
})
export class FocusableDirective implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private parentNavGrid: NavigationGridDirective;

  private element: HTMLElement;

  private elementDOMRect: DOMRect;

  index: Index;

  get DOMRect(): Readonly<DOMRect> {
    return Object.freeze(this.elementDOMRect);
  }

  readonly uuid = UUID.generate('focusable');

  @Output() focusChanges = new EventEmitter<boolean>();

  constructor(
    private readonly elementRef: ElementRef,
    private readonly focusService: FocusableService,
    private readonly viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.parentNavGrid = this.viewContainerRef.injector.get(
      NavigationGridDirective,
    );

    this.element = this.elementRef.nativeElement;

    this.element.tabIndex = -1;

    this.element.style.outline = 'none';

    this.elementDOMRect = this.element.getBoundingClientRect();

    this.subscriptions.add(
      fromEvent(this.element, Events.FOCUS).subscribe(() => {
        this.setFocusAttribute(true);
        this.focusChanges.emit(true);
        this.focusService.setFocusedItem(this);
      }),
    );

    this.subscriptions.add(
      fromEvent(this.element, Events.BLUR).subscribe(() => {
        this.setFocusAttribute(false);
        this.focusChanges.emit(false);
      }),
    );
  }

  private setFocusAttribute(hasFocus: boolean) {
    this.element.setAttribute('data-focused', `${hasFocus}`);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setFocus() {
    this.element.focus();
  }

  setIndex(index: Index) {
    this.index = index;
  }

  enter() {
    this.element.click();
  }
}
