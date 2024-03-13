export interface SearchCondition {
  field: string;
  operator: string;
  value: string | number | boolean | number[] | string[];
}
