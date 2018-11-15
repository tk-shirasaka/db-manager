import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CacheInterceptor } from './cache-interceptor';

export const httpInterCeptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
];
