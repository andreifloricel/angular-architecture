import { Injectable } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private eventBusSubject$ = new Subject();

  on(event: Event, action: any): Subscription {
    return this.eventBusSubject$
      .pipe(
        filter((e: EmitEvent) => e.name === event),
        map((e: EmitEvent) => e.payload)
      )
      .subscribe(action);
  }

  emit(event: EmitEvent) {
    this.eventBusSubject$.next(event);
  }

  // only for didactical purposes, the on() method with provided callback is recommended
  subscribeToEvent(event: Event): Observable<any> {
    return this.eventBusSubject$.pipe(
      filter((e: EmitEvent) => e.name === event),
      map((e: EmitEvent) => e.payload)
    );
  }
}

export class EmitEvent {
  constructor(public name: Event, public payload?: any) {}
}

export enum Event {
  CustomerSelected,
  CustomerCreationRequested,
  // what about alternative names?
  // CustomerCreated
  // or
  // CreateCustomer
}
