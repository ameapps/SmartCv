import { Injectable, OnInit, OnDestroy, EventEmitter } from "@angular/core";
import { DefaultConfig } from "../../models/defaultConfig";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { AppData } from "../../models/appData";
import { AssetsConfigService } from "../appConfig/assetsConfig/assets-config.service";
import { UrlConfigService } from "../appConfig/urlConfig/url-config.service";
import { clearQueryString } from "../../helpers/querystring.helper";
import { deepClone } from "../../helpers/object.helper";
import { CloudConfigService } from "../appConfig/cloudConfig/cloud-config.service";
import { FirebaseConfig } from "../../models/firebaseConfig";
import { LocalStorage } from "../../models/local.storage.model";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  // #region variables
  public hasAppInit = false;
  public appConfig!: DefaultConfig;
  public appData!: AppData;
  public current_user = 'Demo';
  public localStorage: LocalStorage = new LocalStorage();
  public fbUserConfig!: FirebaseConfig;
  // #endregion

  // #region getters/setters

  get current_lang(): string {
    return this.translate.currentLang;
  }

  get isAssetsConfig(): boolean {
    return this.appConfig.common.app.app_data === 'assets';
  }

  get isUrlConfig(): boolean {
    return this.appConfig.common.app.app_data === 'url';
  }

  get isCloudConfig(): boolean {
    return this.appConfig.common.app.app_data === 'cloud';
  }

  //#endregion

  constructor(
    public http_service: HttpClient,
    private translate: TranslateService,
    private assetsConfigService: AssetsConfigService,
    private urlService: UrlConfigService,
    private cloudConfigService: CloudConfigService,
    private firebaseService: FirebaseService
  ) { }

  /**Operazioni essenziali che devono SEMPRe essere eseguite all'avvio dell'app */
  public async initWebApp() {
    this.setLanguageBasedOnBrowser();
    //02. Carico il file di config dell'app 
    const appConfig = await this.loadAppConfig();
    if (appConfig != null) this.appConfig = appConfig;
    this.fbUserConfig = await this.firebaseService.getFirebaseConfig() ?? {} as FirebaseConfig;
    console.info('info', this.appConfig);
    this.hasAppInit = true;
    //03. Carico i dati dell'app 
    if (this.appData == null) this.appData = await this.getUserData() ?? {} as AppData;
    if (this.appConfig.common.app.app_data === 'url') clearQueryString();
  }

  // #region load app data

  /**Caricamento dei dati dell'applicazione dall'appsettings */
  public async loadAppData(): Promise<AppData | undefined> {
    if (this.isAssetsConfig) {
      return await this.loadAssetsData();
    } else if (this.isUrlConfig && this.isDataUrl()) {
      return await this.loadUrlData();
    } else if (this.isCloudConfig) {
      return await this.loadCloudData();
    }

    return undefined;
  }

  /**Caricamento dei dati dell'applicazione dal cloud */
  private async loadCloudData(): Promise<AppData | undefined> {
    const dbUrl = this.fbUserConfig.dbUrl; // this.appConfig.firebase.dbUrl;
    this.localStorage.firebaseConfig = this.fbUserConfig;
    //01. Estrazione dalla url del token JWT
    const uid: string = this.cloudConfigService.getUidFromUrl();
    if (!uid) throw new Error('UID not found in URL');
    //02. Richiedo a firebase realtime database i dati
    const app = await this.cloudConfigService.getFbApp();
    const data = await this.cloudConfigService.getData(app, uid, this.current_lang, dbUrl);

    return data;
  }

  /**Caricamento dei dati dell'applicazione dalla URL */
  private async loadUrlData(): Promise<AppData | undefined> {
    return await this.urlService.loadAppData(this.current_lang);
  }

  /**Caricamento dei dati dell'applicazione dagli assets */
  private async loadAssetsData(): Promise<AppData | undefined> {
    const data = await this.assetsConfigService.loadAppData(this.current_lang);
    const result: AppData = data['USER'];

    return result;
  }

  /**Verifica se l'URL contiene dati codificati */
  private isDataUrl(): boolean {
    const url = window.location.href;
    const dataParam = url.includes('?data=');
    return dataParam;
  }

  /**Impostazione dei dati utente */
  public async getUserData(): Promise<AppData | undefined> {
    this.current_user = this.appConfig.common.app.current_user ?? 'DEMO';
    let allAppData = await this.loadAppData();

    return allAppData;
  }

  //#endregion

  /**Caricamento della configurazione dell'app dagli assets */
  private async loadAppConfig(): Promise<DefaultConfig | undefined> {
    try {
      const value = await lastValueFrom(
        this.http_service.get<DefaultConfig>("assets/config/default-config.json")
      );
      return value;
    } catch (error) {
      console.error("Errore nel caricamento della configurazione dell'app:", error);
      return undefined;
    }
  }

  /**Defizione della lingua dell'app in base a quella del browser */
  private setLanguageBasedOnBrowser() {
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'it';
    const langToUse = browserLang.split('-')[0];
    this.setAppLanguage(langToUse);
  }

  private setAppLanguage(langToUse: string) {
    this.translate.setDefaultLang(langToUse);
    this.translate.use(langToUse.match(/^(it|en)$/) ? langToUse : 'it');
  }
}
