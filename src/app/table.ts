export interface Column {
  name: string;
  type: string;
  unsigned: boolean;
  autoincrement: boolean;
  primary: boolean;
  default: any;
  notnull: boolean;
  length: number;
}
