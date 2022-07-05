import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({ selector: '[defaultFocus]' })
export class DefaultFocusDirective implements AfterViewInit {
  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }
}
