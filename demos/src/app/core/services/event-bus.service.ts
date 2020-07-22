import { Injectable } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private subject$ = new Subject();

  on(event: Event, action: any): Subscription {
    return this.subject$
      .pipe(
        filter((e: EmitEvent) => e.name === event),
        map((e: EmitEvent) => e.value)
      )
      .subscribe(action);
  }

  emit(event: EmitEvent) {
    this.subject$.next(event);
  }
}

export class EmitEvent {
  constructor(public name: Event, public value?: any) {}
}

export enum Event {
  CustomerSelected,
}
