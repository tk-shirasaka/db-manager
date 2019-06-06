export class Connection {
  database: string;
  description: string;
  permission: number[];
  [key: string]: any;
}

interface Field {
  name: string;
  type: string;
  value: string;
  label?: string;
}

export class FormType {
  name: string;
  fields: Field[];
  quote: string[];
}

export interface Connections {
  connections: Connection[];
  types: {[k: string]: FormType};
}
