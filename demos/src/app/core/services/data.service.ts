import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Customer } from 'app/app.model';
import { Event, EventBusService } from 'app/core/services/event-bus.service';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnDestroy {
  private eventbusSub: Subscription;

  private customersSubject$ = new BehaviorSubject<Customer[]>(
    this.getCustomersMockData()
  );
  customer$ = this.customersSubject$.asObservable();

  constructor(private eventbus: EventBusService) {
    this.eventbusSub = this.eventbus.on(Event.CustomerCreationRequested, () => {
      this.addCustomer();
    });
  }

  // did you know that ngOnDestroy is called when a directive, pipe, or SERVICE is destroyed ?
  ngOnDestroy(): void {
    this.eventbusSub.unsubscribe();
  }

  addCustomer(): void {
    const existingCustomers = this.customersSubject$.getValue();
    const newCustomer = this.createNewCustomer();

    this.customersSubject$.next([...existingCustomers, newCustomer]);
  }

  private createNewCustomer(): Customer {
    const existingCustomers = this.customersSubject$.getValue();
    const id = existingCustomers[existingCustomers.length - 1].id + 1;

    return {
      id: id,
      name: 'New Customer ' + id,
      city: 'Somewhere',
      age: id * 5,
    };
  }

  private getCustomersMockData(): Customer[] {
    return [
      {
        id: 1,
        name: 'John Doe',
        city: 'Phoenix',
        age: 42,
      },
      {
        id: 2,
        name: 'Jane Doe',
        city: 'Seattle',
        age: 30,
      },
      {
        id: 3,
        name: 'Michelle Thompson',
        city: 'Orlando',
        age: 22,
      },
    ];
  }
}
