import { Component, Input } from '@angular/core';
import { DataSourceOperations } from '../../interfaces/datasource-operations.interface';
import { ConfigurationDatagrid } from '../../interfaces/configuration-datagrid.interface';


@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss']
})
export class DatagridComponent {
  @Input({ required: true }) dataSource: any[] = []
  @Input() loading: boolean = false
  @Input({ required: true }) configurations!: ConfigurationDatagrid
  @Input({ required: true }) operationsData!: DataSourceOperations
  selectedRecords: Record<string, string | number | boolean | any>[] = []

  constructor() { }

  getFieldData(record: any, field: string): any {
    const fieldParts = field.split('.');
    let data = record;

    for (const part of fieldParts) {
      if (data) {
        data = data[part];
      } else {
        break;
      }
    }

    return data;
  }

  validateIsSortable(columnHeader: boolean, field: string): string | null {

    if (columnHeader === undefined) return field
    if (columnHeader) return field

    return null;
  }

  getDataTypeColumn(dataType: string): string {
    if (!dataType) return 'string'

    return dataType
  }
}
