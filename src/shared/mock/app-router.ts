import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

export const ActivatedRouteProviderMock = {
  provide: ActivatedRoute,
  useValue: {
    paramMap: of({ get: (key: string) => '1' }),
    snapshot: { paramMap: { get: (key: string) => '1' } },
  },
};
