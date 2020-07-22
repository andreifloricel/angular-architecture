import { Component, OnDestroy, OnInit } from '@angular/core';

import { EventBusService, Event } from './core/services/event-bus.service';
import { Observable, Subscription } from 'rxjs';
import { DataService } from './core/services/data.service';
import { map } from 'rxjs/operators';
import { Customer } from 'app/app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  customerNumber$: Observable<number>;
  customer: Customer;
  eventbusSub: Subscription;

  constructor(
    private eventbus: EventBusService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.setupEventbus();
    this.setupObservableService();
  }

  ngOnDestroy() {
    this.eventbusSub.unsubscribe();
  }

  // Example of using an event bus to provide loosely coupled communication (mediator pattern)
  private setupEventbus() {
    // verbose version
    this.eventbusSub = this.eventbus
      .subscribeToEvent(Event.CustomerSelected)
      .subscribe((cust) => (this.customer = cust));

    /*// clean version with callback
    this.eventbusSub = this.eventbus.on(
      Event.CustomerSelected,
      (cust) => (this.customer = cust)
    );*/
  }

  // Example of using BehaviorSubject to be notified when a service changes
  private setupObservableService() {
    this.customerNumber$ = this.dataService.customer$.pipe(
      map((customers) => customers.length)
    );
  }
}
