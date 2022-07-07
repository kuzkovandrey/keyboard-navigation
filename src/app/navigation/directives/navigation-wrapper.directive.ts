import { Directive } from '@angular/core';
import { debounceTime, Observable, Subject } from 'rxjs';

@Directive({ selector: '[navigationWrapper]' })
export class NavigationWrapperDirective {
  private readonly DEBOUNCE_INTERVAL = 50;

  private hasCustomFocus = new Subject<boolean>();

  private currentNavGrid = new Subject();

  get hasCustomFocus$(): Observable<boolean> {
    return this.hasCustomFocus
      .asObservable()
      .pipe(debounceTime(this.DEBOUNCE_INTERVAL));
  }

  setFocusState(hasFocus: boolean) {
    this.hasCustomFocus.next(hasFocus);
  }
}
