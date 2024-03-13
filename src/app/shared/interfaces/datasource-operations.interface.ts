import { SortEvent } from "primeng/api";
import { Table, TableLazyLoadEvent } from "primeng/table";


export interface DataSourceOperations {
  loadData: (event: TableLazyLoadEvent) => void;
  refresh: () => void;
  create: () => void;
  delete: (record: Record<string, string | number | boolean>) => void;
  onDeleteBatch: (records: Record<string, string | number | boolean | any>[]) => void;
  update: (record: Record<string, string | number | boolean>) => void;
  onGlobalFilter: (table: Table, event: Event) => void;
}
