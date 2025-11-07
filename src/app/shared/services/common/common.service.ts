import { Injectable, OnInit, OnDestroy, EventEmitter } from "@angular/core";
import { DefaultConfig } from "../../models/defaultConfig";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { AppData } from "../../models/appData";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  // #region variables
  public hasAppInit = false;
  public appConfig!: DefaultConfig;
  public appData!: AppData;
  public current_user = 'Demo';
  get current_lang(): string {
    return this.translate.currentLang;
  }

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
    //03. Carico i dati dell'app 
    await this.getUserData();
  }

  /**Caricamento dei dati dell'applicazione dall'appsettings */
  public async loadAppData(): Promise<any> {
    const path = `assets/data/${this.current_lang}/app-data.json`;
    console.log('this.current_lang', this.current_lang); 
    const value = await lastValueFrom(
      this.http_service.get<any>(path)
    );
    return value;
  }

  /**Impostazione dei dati utente */
  public async getUserData() {
    this.current_user = this.appConfig.common.app.current_user ?? 'DEMO';
    const allAppData = await this.loadAppData();
    this.appData = allAppData[this.current_user] as any;
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
