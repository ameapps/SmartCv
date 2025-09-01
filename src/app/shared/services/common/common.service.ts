import { Injectable, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { DefaultConfig } from '../../models/defaultConfig';

@Injectable({
  providedIn: 'root',
})
export class CommonService implements OnDestroy {
  // #region variables
  appConfig!: DefaultConfig;

  //#endregion

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
