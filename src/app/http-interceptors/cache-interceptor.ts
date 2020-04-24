import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';

import { of } from 'rxjs';
import { tap, catchError, share } from 'rxjs/operators';

import { PartsDialogComponent } from '../parts/dialog/dialog.component';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  cache = new Map;

  constructor(private dialog: MatDialog) { }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler) {
    const cache = this.cache.get(req.url);
    if (req.method !== 'GET') {
      this.cache.forEach(item => {
        if (item.url.indexOf(req.url) >= 0) {
          this.cache.delete(item.url);
        }
      });
      next.handle(req);
    } else if (req.url !== req.urlWithParams) {
        this.cache.delete(req.url);
    } else if (cache && Date.now() < cache.limit) {
      return cache.response ? of(cache.response) : cache.request;
    }

    return this.sendRequest<T>(req, next);
  }

  sendRequest<T>(req: HttpRequest<T>, next: HttpHandler) {
    const cache = {
      limit: Date.now() + 300000,
      url: req.url,
      response: null,
      request: next.handle(req).pipe(
        tap(event => this.handleCache(cache, event)),
        catchError(res => this.handleError(res)),
        share()
      )
    };
    this.cache.set(req.url, cache);

    return cache.request;
  }

  handleCache(cache, event) {
    if (event instanceof HttpResponse) {
      cache.response = event;
    }
  }

  handleError(res) {
    this.dialog.open(PartsDialogComponent, {
      width: '80%',
      data: { confirm: false, title: 'リクエストエラー', contents: res.error },
    });
    return [];
  }
}
