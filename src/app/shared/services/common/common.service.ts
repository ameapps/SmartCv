import { Injectable, OnInit, OnDestroy, EventEmitter } from "@angular/core";
import { DefaultConfig } from "../../models/defaultConfig";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  // #region variables
  public hasAppInit = false;
  public appConfig!: DefaultConfig;

  //#endregion

  constructor(
    private http_service: HttpClient, 
    private translate: TranslateService
  ) {}

  /**Operazioni essenziali che devono SEMPRe essere eseguite all'avvio dell'app */
  public async initWebApp() {
    this.setLanguageBasedOnBrowser();
    //02. Carico il file di config dell'app 
    this.appConfig = await this.loadAppConfig();
    console.info('info', this.appConfig);
    this.hasAppInit = true;
  }

  /**Caricamento della configurazione dell'app dagli assets */
  private async loadAppConfig(): Promise<DefaultConfig> {
    const value = await lastValueFrom(
      this.http_service.get<DefaultConfig>("assets/config/default-config.json")
    );
    return value;
  }

  /**Defizione della lingua dell'app in base a quella del browser */
  private setLanguageBasedOnBrowser() {
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'it';
    const langToUse = browserLang.split('-')[0];
    this.translate.setDefaultLang('it');
    this.translate.use(langToUse.match(/^(it|en)$/) ? langToUse : 'it');
  }
}
