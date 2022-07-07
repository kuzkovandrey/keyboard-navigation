import { fromEvent, Observable, Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Events } from '@navigation/values';

@Injectable()
export class KeysService {
  private onKeyDown = new Subject<KeyboardEvent>();

  get onKeyDown$(): Observable<KeyboardEvent> {
    return this.onKeyDown.asObservable();
  }

  constructor(@Inject(DOCUMENT) document: Document) {
    fromEvent<KeyboardEvent>(document, Events.KEYDOWN).subscribe((event) => {
      this.onKeyDown.next(event);
    });
  }
}
