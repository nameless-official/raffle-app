import { Component, inject, signal } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableLazyLoadEvent, Table } from 'primeng/table';
import { switchMap, of, debounceTime } from 'rxjs';
import { ConfigurationDatagrid } from 'src/app/shared/interfaces/configuration-datagrid.interface';
import { DataSourceOperations } from 'src/app/shared/interfaces/datasource-operations.interface';
import { SearchCondition } from 'src/app/shared/interfaces/search-condition.interface';
import { validateKeyForSearch } from 'src/app/shared/utils/keyboard-validations.util';
import { RaffleStatus } from '../../interfaces/raffle-status.interface';
import { RaffleStatusService } from '../../services/raffle-status.service';

@Component({
  selector: 'app-raffle-status',
  templateUrl: './raffle-status.component.html',
  styleUrls: ['./raffle-status.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RaffleStatusComponent {

  protected raffleStatusList = signal<RaffleStatus[]>([]);
  protected configurationDatagrid = signal<ConfigurationDatagrid | null>(null);
  protected operationsDatagrid = signal<DataSourceOperations | null>(null);

  private limitData = signal<number>(10);
  private offsetData = signal<number>(0);
  private orderField = signal<string>("name");
  private orderDirection = signal<number>(1);
  protected loadingData = signal<boolean>(false);
  protected showForm = signal<boolean>(false);

  private RaffleStatusService = inject(RaffleStatusService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  protected raffleStatus = signal<RaffleStatus>({
    code: '',
    name: '',
    sort: 1,
    is_finished: false
  });

  constructor() {
    this.configurationDatagrid.set({
      cols: [
        {
          field: 'code',
          header: 'Código'
        },
        {
          field: 'name',
          header: 'Nombre'
        },
        {
          field: 'sort',
          header: 'Orden'
        },
        {
          field: 'is_finished',
          header: '¿Está finalizado?',
          dataType: 'boolean'
        },
      ],
      filtersFields: ['name'],
      numberShowRows: this.limitData(),
      recordKey: 'raffle_status_id',
      rowsPerPageOptions: [10, 25, 50],
      title: 'Estados de los sorteos',
      totalRecords: 0,
      resizableColumns: true,
      batchDelete: true
    });

    this.operationsDatagrid.set({
      loadData: (loadEvent: TableLazyLoadEvent) => {
        this.offsetData.set(loadEvent.first || 0);
        this.limitData.set(loadEvent.rows || 10);

        if (loadEvent.sortField) {
          this.orderField.set(loadEvent.sortField.toString());
          this.orderDirection.set(loadEvent.sortOrder);
          this.loadData(true);
          return
        }

        this.loadData();
      },
      refresh: () => {
        this.loadData()
      },
      create: () => { this.showForm.set(true); },
      delete: (record: Record<string, string | number | boolean>) => {

        this.confirmationService.confirm({
          key: 'deleteConfirm',
          message: '¿Desea eliminar el registro?',
          header: 'Confirmación de Eliminación',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Si',
          rejectLabel: 'No',
          accept: () => {
            this.RaffleStatusService.deleteRecord(Number(record.raffle_status_id)).subscribe((responseData) => {
              if (!responseData) return
              this.loadData()
              this.messageService.add({
                severity: 'success',
                summary: '¡Registro eliminado con éxito!',
                detail: `El registro ${record.name} ha sido eliminado exitosamente`
              });

            })
          },
          reject: () => { }
        });
      },
      onDeleteBatch: (records: Record<string, string | number | boolean | any>[]) => {

        if (records.length === 0) return this.messageService.add({
          severity: 'error',
          summary: '¡Operación Fallida!',
          detail: 'Debe seleccionar al menos un registro para utilizar esta función.'
        });

        this.confirmationService.confirm({
          key: 'deleteConfirm',
          message: '¿Desea eliminar los registros seleccionados?',
          header: 'Confirmación de Eliminación',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Si',
          rejectLabel: 'No',
          accept: () => {
            const recordsIds = records.map((record: RaffleStatus) => record.raffle_status_id);

            const conditions: SearchCondition[] = [{
              field: 'raffle_status_id',
              operator: 'in',
              value: recordsIds
            }];

            this.loadingData.set(true);
            this.RaffleStatusService.deleteBatchRecords(conditions).subscribe({
              next: (dataResponse: any) => {
                if (!dataResponse) return
                this.loadData()
                this.loadingData.set(false)
                this.messageService.add({
                  severity: 'success',
                  summary: '¡Registro eliminado con éxito!',
                  detail: `Los registros han sido eliminados exitosamente`
                });
              },
              error: () => this.loadingData.set(false)
            })
          },
          reject: () => { }
        });
      },
      update: (record: Record<string, string | number | boolean>) => {
        this.raffleStatus.set({
          raffle_status_id: Number(record.raffle_status_id) || 0,
          name: record.name.toString() || '',
          code: record.code.toString() || '',
          sort: Number(record.sort) || 1,
          is_finished: Boolean(record.is_finished) || false
        });

        this.showForm.set(true);
      },

      onGlobalFilter: (table: Table, event: any) => {

        if (!validateKeyForSearch(event.key)) return

        const searchTerm: string = (event.target as HTMLInputElement).value;


        const filterFields: string[] = table.globalFilterFields;

        if (searchTerm.length === 0) return this.loadData();

        const conditions: SearchCondition[] = [{
          field: filterFields[0],
          operator: 'like',
          value: `%${searchTerm}%`
        }];

        this.loadingData.set(true);

        this.RaffleStatusService.getTotalRecordsByConditions(conditions).pipe(
          switchMap((responseData: number) => {

            this.configurationDatagrid.update((record) => {
              record.totalRecords = responseData;
              return record
            })

            if (responseData === 0) return of([])

            return this.RaffleStatusService.searchRecords(conditions)
              .pipe(debounceTime(100))

          })
        ).subscribe(
          {
            next: (dataResponse: RaffleStatus[]) => {
              if (dataResponse) this.raffleStatusList.set(dataResponse);
              this.loadingData.set(false);
            },
            error: () => this.loadingData.set(false)
          }
        )
      }
    })
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(reOrder: boolean = false): void {
    this.loadingData.set(true);

    this.RaffleStatusService.getTotalRecords().subscribe(
      {
        next: (responseData: number) => {
          this.configurationDatagrid.update((record) => {
            record.totalRecords = responseData;
            return record
          })

          if (responseData === 0) {
            this.raffleStatusList.set([]);
            this.loadingData.set(false);
            return
          }

          if (reOrder) {
            this.RaffleStatusService.getAllRecords(this.offsetData(), this.limitData(), this.orderField(), this.orderDirection()).subscribe((responseData: RaffleStatus[]) => {
              if (responseData) this.raffleStatusList.set(responseData);

              this.loadingData.set(false);
            });
          } else {
            this.RaffleStatusService.getAllRecords(this.offsetData(), this.limitData()).subscribe((responseData: RaffleStatus[]) => {
              if (responseData) this.raffleStatusList.set(responseData);

              this.loadingData.set(false);
            });
          }

        },
        error: () => this.loadingData.set(false)
      }
    )


  }

  processResponseCreate(event: boolean): void {
    this.orderField.set('raffle_status_id');
    this.orderDirection.set(-1);
    this.onFinishResponseForm(event, 'El registro ha sido creado exitosamente', true);
  }

  processResponseUpdate(event: boolean): void {
    this.onFinishResponseForm(event, 'El registro ha sido Actualizado exitosamente');
  }

  private onFinishResponseForm(stateResponse: boolean, message: string, reorder: boolean = false): void {
    if (stateResponse) this.messageService.add({
      severity: 'success',
      summary: '¡Operación Exitosa!',
      detail: message
    });

    this.showForm.set(false);
    this.loadData(reorder);
    this.resetObject();
  }

  onDragEnd(): void {
    this.resetObject();
    this.showForm.set(false);
  }


  private resetObject(): void {
    this.raffleStatus.set({
      code: '',
      name: '',
      sort: 1,
      is_finished: false
    });
  }
}
