import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable()
export class BreadcrumbService {

  private itemsSource = new Subject<MenuItem[]>();

  public itemsHandler = this.itemsSource.asObservable();

  setItems(items: MenuItem[]) {
    this.itemsSource.next(items);
  }
}
