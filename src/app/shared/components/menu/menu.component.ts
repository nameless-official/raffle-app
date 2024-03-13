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
          { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
        ]
      },
      {
        label: 'Páginas', icon: 'pi pi-fw pi-copy', routerLink: ['/pages'],
        items: [
          
        ]
      },
    ];
  }
}
