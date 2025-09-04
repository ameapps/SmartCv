import { Injectable, OnInit, OnDestroy, EventEmitter } from "@angular/core";
import { DefaultConfig } from "../../models/defaultConfig";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CommonService implements OnDestroy {
  // #region variables
  appConfig!: DefaultConfig;

  //#endregion

  constructor(private http_service: HttpClient) {}

  async loadAppConfig(): Promise<DefaultConfig> {
    const value = await lastValueFrom(
      this.http_service.get<DefaultConfig>("assets/config/default-config.json")
    );
    return value;
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
}
