import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

export class Group {
  description: string;
  select: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService extends ApiService {

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`/api/groups`);
  }

  setGroup(no: number) {
    this.http.get<Group[]>(`/api/groups/${no}`).subscribe(_ => {
      location.href = '/';
    });
  }

  saveGroups(groups: Group[]) {
    this.http.post<Group[]>(`/api/groups`, groups).subscribe(_ => {
      location.href = '/';
    });
  }
}
