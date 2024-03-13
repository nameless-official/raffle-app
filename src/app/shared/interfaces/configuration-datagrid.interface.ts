import { ColumnDatagrid } from "./column-datagrid.interface";

export interface ConfigurationDatagrid {
  cols: ColumnDatagrid[];
  title: string;
  numberShowRows: number;
  filtersFields: string[];
  rowsPerPageOptions: number[];
  selectionMode?: 'multiple' | 'single';
  recordKey: string;
  totalRecords: number;
  resizableColumns?: boolean;
  reorderableColumns?: boolean;
  batchDelete?: boolean;
  allowCreate?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  allowEditOrDelete?: boolean
}
