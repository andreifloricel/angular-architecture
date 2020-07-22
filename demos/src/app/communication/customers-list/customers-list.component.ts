import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import {
  EventBusService,
  EmitEvent,
  Event,
} from '../../core/services/event-bus.service';
import { Customer } from 'app/app.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersListComponent {
  @Input() customers: Customer[];
  @Output() customerSelected = new EventEmitter<Customer>();

  constructor(private eventbus: EventBusService) {}

  selectCustomer(cust: Customer) {
    // send to parent via output property
    // note: could use eventbus as well if desired but output property
    // would be the preferred method for passing data to am immediate parent
    // or NOT !?
    this.customerSelected.emit(cust);

    // Send customer to any eventbus listeners listening for the CustomerSelected event
    this.eventbus.emit(new EmitEvent(Event.CustomerSelected, cust));
  }
}
