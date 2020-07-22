import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { Observable, Subject } from 'rxjs';
import { Customer } from 'app/app.model';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
})
export class CommunicationComponent implements OnInit, OnDestroy {
  customer$: Observable<Customer[]>;
  customer: Customer;
  private componentDestroy$ = new Subject();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.customer$ = this.dataService.customer$;
  }

  selected(cust: Customer) {
    this.customer = cust;
  }

  addCustomer() {
    this.dataService.addCustomer();
  }

  ngOnDestroy() {
    this.componentDestroy$.next();
    this.componentDestroy$.complete();
  }
}
