import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  public model!: any[];

  ngOnInit() {
    this.model = [
      {
        label: 'Inicio', icon: 'pi pi-fw pi-home',
        items: [
          { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] }
        ]
      },
      {
        label: 'Páginas', icon: 'pi pi-fw pi-copy', routerLink: ['/pages'],
        items: [
          {
            label: 'Estados de Sorteos', icon: 'pi pi-fw pi-th-large', routerLink: ['/admin/data-management/raffles-status'],
          },
          {
            label: 'Niveles de premios', icon: 'pi pi-fw pi-th-large', routerLink: ['/admin/data-management/prize-levels'],
          },
          {
            label: 'Premios', icon: 'pi pi-fw pi-th-large', routerLink: ['/admin/data-management/prizes'],
          },
          {
            label: 'Sorteos', icon: 'pi pi-fw pi-th-large', routerLink: ['/admin/data-management/raffles'],
          },
        ]
      },
    ];
  }
}
