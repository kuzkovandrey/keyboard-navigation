import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { NativeEvents } from '@navigation/values';
import { FocusService } from '@navigation/services/focus.service';

@Directive({
  selector: '[focusable]',
})
export class FocusableDirective implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private element: HTMLElement;

  private elementDomRect: DOMRect;

  get domRect(): Readonly<DOMRect> {
    return Object.freeze(this.elementDomRect);
  }

  @Output() focusChanges = new EventEmitter<boolean>();

  constructor(
    private readonly elementRef: ElementRef,
    private focusService: FocusService,
  ) {}

  ngOnInit() {
    this.element = this.elementRef.nativeElement;
    this.element.tabIndex = 1;
    this.elementDomRect = this.element.getBoundingClientRect();

    this.subscriptions.add(
      fromEvent(this.element, NativeEvents.FOCUS).subscribe(() => {
        this.focusChanges.emit(true);
        this.focusService.setFocusedItem(this);
      }),
    );

    this.subscriptions.add(
      fromEvent(this.element, NativeEvents.BLUR).subscribe(() => {
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
