import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IData {
  [k: string]: string;
}

@Injectable()
export class ApiService {

  constructor(protected http: HttpClient) { }
}
