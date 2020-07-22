import { Component, OnDestroy, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { Observable, Subject } from 'rxjs';
import { Customer } from 'app/app.model';
import {
  EmitEvent,
  Event,
  EventBusService,
} from 'app/core/services/event-bus.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
})
export class CommunicationComponent implements OnInit, OnDestroy {
  customer$: Observable<Customer[]>;
  customer: Customer;
  private componentDestroy$ = new Subject();

  constructor(
    private dataService: DataService,
    private eventbus: EventBusService
  ) {}

  ngOnInit() {
    this.customer$ = this.dataService.customer$;
  }

  ngOnDestroy() {
    this.componentDestroy$.next();
    this.componentDestroy$.complete();
  }

  selected(cust: Customer) {
    this.customer = cust;
  }

  addCustomer() {
    // 1. EventBus
    this.eventbus.emit(new EmitEvent(Event.CustomerCreationRequested));

    // 2. Observable Service
    // this.dataService.addCustomer();
  }
}
