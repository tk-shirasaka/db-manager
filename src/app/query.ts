interface Data {
  [key: string]: string;
}
export class Result {
  query: string;
  error: string;
  count: number;
  header: string[];
  history: string[];
  data: Data[];
}
