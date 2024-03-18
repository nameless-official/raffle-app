import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import {
  MessageService,
  ConfirmationService,
  LazyLoadEvent,
} from 'primeng/api';
import { switchMap, of, debounceTime } from 'rxjs';
import { SearchCondition } from 'src/app/shared/interfaces/search-condition.interface';
import { validateKeyForSearch } from 'src/app/shared/utils/keyboard-validations.util';
import { RafflesService } from '../../services/raffles.service';
import { Raffle } from '../../interfaces/raffle.interface';
import {
  SortOptionList,
  SortValue,
} from '../../interfaces/sort-option-list.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raffles',
  templateUrl: './raffles.component.html',
  styleUrls: ['./raffles.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class RafflesComponent {
  @ViewChild('nameField') nameField: ElementRef;

  private rafflesService = inject(RafflesService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  protected raffles = signal<Raffle[]>([]);
  protected numberShowRegisters = signal<number>(9);
  protected limitData = signal<number>(this.numberShowRegisters());
  protected offsetData = signal<number>(0);
  protected totalRecords = signal<number>(0);
  private orderField = signal<string>('start_date');
  private orderDirection = signal<number>(1);
  protected loadingData = signal<boolean>(false);

  protected sortOrder = signal<number>(0);
  protected sortField = signal<string>('');
  protected sortOptions = signal<SortOptionList[]>([]);

  protected showForm = signal<boolean>(false);

  protected raffle = signal<Raffle>({
    name: '',
    start_date: '',
    end_date: '',
    description: '',
    slug: '',
    image_url: '',
    image_thumbnail_url: '',
  });

  protected raffleDetail = signal<Raffle>({
    name: '',
    start_date: '',
    end_date: '',
    description: '',
    slug: '',
    image_url: '',
    image_thumbnail_url: '',
  });
  protected showDetail = signal<boolean>(false);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.sortOptions.set([
      { label: 'Precio de menor a mayor', value: { field: '', direction: 1 } },
      { label: 'Precio de mayor a menor', value: { field: '', direction: -1 } },
    ]);
  }

  onLoadData(loadEvent: LazyLoadEvent): void {
    this.offsetData.set(loadEvent.first || 0);
    this.limitData.set(loadEvent.rows || 9);
    this.loadData();
  }

  onSortChange(event: any): void {
    const sort: SortValue = event.value;

    this.orderField.set(sort.field);
    this.orderDirection.set(sort.direction);
    this.loadData();
  }

  private loadData(): void {
    this.loadingData.set(true);
    this.rafflesService.getTotalRecords().subscribe({
      next: (totalRecords: number) => {
        if (totalRecords === 0) {
          this.raffles.set([]);
          this.loadingData.set(false);
          return;
        }

        this.totalRecords.set(totalRecords);

        this.rafflesService
          .getAllRecords(
            this.offsetData(),
            this.limitData(),
            this.orderField(),
            this.orderDirection()
          )
          .subscribe({
            next: (responseData: Raffle[]) => {
              console.log(responseData);
              this.raffles.set(responseData);
              this.loadingData.set(false);
            },
            error: () => {
              this.raffles.set([]);
              this.loadingData.set(false);
            },
          });
      },
      error: () => {
        this.loadingData.set(false);
      },
    });
  }

  onTextFilter(eventText: any): void {
    if (!validateKeyForSearch(eventText.key)) return;

    const searchTerm: string = (eventText.target as HTMLInputElement).value;

    if (searchTerm.length === 0) return this.loadData();

    if (eventText.target.id !== 'nameField')
      this.nameField.nativeElement.value = '';

    const fieldSearch = 'description';

    const conditions: SearchCondition[] = [
      {
        field: fieldSearch,
        operator: 'like',
        value: `%${searchTerm}%`,
      },
    ];

    this.loadingData.set(true);

    this.rafflesService
      .getTotalRecordsByConditions(conditions)
      .pipe(
        switchMap((responseData: number) => {
          if (responseData === 0) return of([]);

          this.totalRecords.set(responseData);

          return this.rafflesService
            .searchRecords(conditions)
            .pipe(debounceTime(100));
        })
      )
      .subscribe({
        next: (dataResponse: Raffle[]) => {
          if (dataResponse) this.raffles.set(dataResponse);
          this.loadingData.set(false);
        },
        error: () => this.loadingData.set(false),
      });
  }

  onViewData(raffleData: Raffle): void {
    this.raffleDetail.set({ ...raffleData });
    this.router.navigate([
      `/admin/data-management/raffle-data/${raffleData.slug}`,
    ]);
  }

  onDragEndDetail(): void {
    this.showDetail.set(false);
  }

  onEditData(raffleData: Raffle): void {
    this.raffle.set({ ...raffleData });
    this.showForm.set(true);
  }

  onDeleteData(raffleData: Raffle): void {
    this.confirmationService.confirm({
      key: 'deleteConfirm',
      message: '¿Desea eliminar el registro?',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.rafflesService
          .deleteRecord(Number(raffleData.raffle_id))
          .subscribe((responseData) => {
            if (!responseData) return;
            this.nameField.nativeElement.value = '';
            this.loadData();
            this.messageService.add({
              severity: 'success',
              summary: '¡Registro eliminado con éxito!',
              detail: `El registro ${raffleData.slug} ha sido eliminado exitosamente`,
            });
          });
      },
      reject: () => {},
    });
  }

  processResponseCreate(event: boolean): void {
    this.onFinishResponseForm(event, 'El registro ha sido creado exitosamente');
  }

  processResponseUpdate(event: boolean): void {
    this.onFinishResponseForm(
      event,
      'El registro ha sido Actualizado exitosamente'
    );
  }

  private onFinishResponseForm(stateResponse: boolean, message: string): void {
    if (stateResponse)
      this.messageService.add({
        severity: 'success',
        summary: '¡Operación Exitosa!',
        detail: message,
      });

    this.nameField.nativeElement.value = '';
    this.showForm.set(false);
    this.loadData();
    this.resetObject();
  }

  private resetObject(): void {
    this.raffle.set({
      name: '',
      start_date: '',
      end_date: '',
      description: '',
      slug: '',
      image_url: '',
      image_thumbnail_url: '',
    });
  }

  activeNewRaffleForm(): void {
    this.showForm.set(true);
  }

  onDragEnd(): void {
    this.showForm.set(false);
  }
}
