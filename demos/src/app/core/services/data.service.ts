import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Customer } from 'app/app.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private customersSubject$ = new BehaviorSubject<Customer[]>(
    this.getCustomersMockData()
  );
  customer$ = this.customersSubject$.asObservable();

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
