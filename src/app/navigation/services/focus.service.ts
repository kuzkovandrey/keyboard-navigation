import { Injectable } from '@angular/core';
import { FocusableDirective } from '@navigation/directives';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class FocusService {
  private focusedItem = new ReplaySubject<FocusableDirective>(1);

  get focusedItem$(): Observable<FocusableDirective> {
    return this.focusedItem.asObservable();
  }

  setFocusedItem(item: FocusableDirective) {
    this.focusedItem.next(item);
    console.log(item);
  }
}
