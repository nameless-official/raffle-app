import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { switchMap, of, debounceTime } from 'rxjs';
import { SearchCondition } from 'src/app/shared/interfaces/search-condition.interface';
import { validateKeyForSearch } from 'src/app/shared/utils/keyboard-validations.util';
import { Prize } from '../../interfaces/prize.interface';
import { SortOptionList } from '../../interfaces/sort-option-list.interface';
import { PrizesService } from '../../services/prizes.service';

@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PrizesComponent {
  @ViewChild('nameField') nameField: ElementRef;

  private prizesService = inject(PrizesService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  protected prizes = signal<Prize[]>([]);
  protected numberShowRegisters = signal<number>(9);
  protected limitData = signal<number>(this.numberShowRegisters());
  protected offsetData = signal<number>(0);
  protected totalRecords = signal<number>(0);
  private orderField = signal<string>("name");
  private orderDirection = signal<number>(1);
  protected loadingData = signal<boolean>(false);


  protected sortOrder = signal<number>(0);
  protected sortField = signal<string>('');
  protected sortOptions = signal<SortOptionList[]>([]);

  protected showForm = signal<boolean>(false);

  protected prize = signal<Prize>({
    name: '',
    description: '',
    value: '',
    quantity: 0,
    image_url: '',
    image_thumbnail_url: '',
  });

  protected prizeDetail = signal<Prize>(
    {
      name: '',
      description: '',
      value: '',
      quantity: 0,
      image_url: '',
      image_thumbnail_url: '',
    }
  );
  protected showDetail = signal<boolean>(false);


  constructor() { }

  ngOnInit(): void {
    this.sortOptions.set([
      { label: 'Precio de menor a mayor', value: { field: '', direction: 1 } },
      { label: 'Precio de mayor a menor', value: { field: '', direction: -1 } }
    ]);
  }


  onLoadData(loadEvent: LazyLoadEvent): void {

    this.offsetData.set(loadEvent.first || 0);
    this.limitData.set(loadEvent.rows || 9);
    this.loadData()
  }



  private loadData(): void {
    this.loadingData.set(true)
    this.prizesService.getTotalRecords().subscribe({
      next: (totalRecords: number) => {
        if (totalRecords === 0) {
          this.prizes.set([]);
          this.loadingData.set(false)
          return
        }

        this.totalRecords.set(totalRecords)

        this.prizesService.getAllRecords(this.offsetData(), this.limitData(), this.orderField(), this.orderDirection()).subscribe({
          next: (responseData: Prize[]) => {
            this.prizes.set(responseData);
            this.loadingData.set(false)
          },
          error: () => {
            this.prizes.set([]);
            this.loadingData.set(false)

          }
        })
      },
      error: () => {
        this.loadingData.set(false)
      }
    })
  }

  onTextFilter(eventText: any): void {
    if (!validateKeyForSearch(eventText.key)) return

    const searchTerm: string = (eventText.target as HTMLInputElement).value;

    if (searchTerm.length === 0) return this.loadData();

    if (eventText.target.id !== 'nameField') this.nameField.nativeElement.value = ''

    const fieldSearch = 'description'

    const conditions: SearchCondition[] = [{
      field: fieldSearch,
      operator: 'like',
      value: `%${searchTerm}%`
    }];

    this.loadingData.set(true);

    this.prizesService.getTotalRecordsByConditions(conditions).pipe(
      switchMap((responseData: number) => {
        if (responseData === 0) return of([])

        this.totalRecords.set(responseData);

        return this.prizesService.searchRecords(conditions)
          .pipe(debounceTime(100))

      })
    ).subscribe(
      {
        next: (dataResponse: Prize[]) => {
          if (dataResponse) this.prizes.set(dataResponse);
          this.loadingData.set(false);
        },
        error: () => this.loadingData.set(false)
      }
    )
  }


  onDragEndDetail(): void {
    this.showDetail.set(false);
  }


  onEditData(prizeData: Prize): void {
    this.prize.set({ ...prizeData })
    this.showForm.set(true)
  }


  onDeleteData(prizeData: Prize): void {
    this.confirmationService.confirm({
      key: 'deleteConfirm',
      message: '¿Desea eliminar el registro?',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.prizesService.deleteRecord(Number(prizeData.prize_id)).subscribe((responseData) => {
          if (!responseData) return
          this.nameField.nativeElement.value = ''
          this.loadData()
          this.messageService.add({
            severity: 'success',
            summary: '¡Registro eliminado con éxito!',
            detail: `El registro ${prizeData.name} ha sido eliminado exitosamente`
          });

        })
      },
      reject: () => { }
    });
  }

  processResponseCreate(event: boolean): void {
    this.onFinishResponseForm(event, 'El registro ha sido creado exitosamente');
  }

  processResponseUpdate(event: boolean): void {
    this.onFinishResponseForm(event, 'El registro ha sido Actualizado exitosamente');
  }

  private onFinishResponseForm(stateResponse: boolean, message: string): void {
    if (stateResponse) this.messageService.add({
      severity: 'success',
      summary: '¡Operación Exitosa!',
      detail: message
    });

    this.nameField.nativeElement.value = ''
    this.showForm.set(false);
    this.loadData();
    this.resetObject();
  }

  private resetObject(): void {
    this.prize.set(
      {
        name: '',
        description: '',
        value: '',
        quantity: 0,
        image_url: '',
        image_thumbnail_url: '',
      }
    );
  }

  activeNewPrizeForm(): void {
    this.showForm.set(true)
  }

  onDragEnd(): void {
    this.showForm.set(false);
  }
}
