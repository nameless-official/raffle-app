import { Component, OnInit, inject, signal } from '@angular/core';

import { BreadcrumbService } from '../../services/breadcrumb.service';


@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Inicio', routerLink: [''] }
    ]);
  }

  ngOnInit() {}


}
