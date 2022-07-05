import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Events } from '@navigation/values';
import { FocusService } from '@navigation/services/focus.service';
import { UUID } from '@navigation/utils';

@Directive({
  selector: '[focusable]',
})
export class FocusableDirective implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private element: HTMLElement;

  private elementDOMRect: DOMRect;

  get DOMRect(): Readonly<DOMRect> {
    return Object.freeze(this.elementDOMRect);
  }

  readonly uuid = UUID.generate('focusable');

  @Output() focusChanges = new EventEmitter<boolean>();

  constructor(
    private readonly elementRef: ElementRef,
    private focusService: FocusService,
  ) {}

  ngOnInit() {
    this.element = this.elementRef.nativeElement;
    this.element.tabIndex = -1;
    this.elementDOMRect = this.element.getBoundingClientRect();

    this.subscriptions.add(
      fromEvent(this.element, Events.FOCUS).subscribe(() => {
        this.focusChanges.emit(true);
        this.focusService.setFocusedItem(this);
      }),
    );

    this.subscriptions.add(
      fromEvent(this.element, Events.BLUR).subscribe(() => {
        this.focusChanges.emit(false);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setFocus() {
    this.element.focus();
  }
}
