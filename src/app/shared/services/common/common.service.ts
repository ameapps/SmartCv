import {
  Injectable,
} from "@angular/core";
import { DefaultConfig } from "../../models/defaultConfig";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { AppData } from "../../models/appData";
import { AssetsConfigService } from "../appConfig/assetsConfig/assets-config.service";
import { UrlConfigService } from "../appConfig/urlConfig/url-config.service";
import { clearQueryString as clearQuerystring } from "../../helpers/querystring.helper";
import { deepClone } from "../../helpers/object.helper";
import { CloudConfigService } from "../appConfig/cloudConfig/cloud-config.service";
import { FirebaseConfig } from "../../models/firebaseConfig";
import { LocalStorage } from "../../models/local.storage.model";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  // #region variables
  public hasAppInit = false;
  public appConfig!: DefaultConfig;
  public appData: { [key: string]: AppData } = {};
  public current_user = "Demo";
  public localStorage: LocalStorage = new LocalStorage();
  public fbUserConfig!: FirebaseConfig;
  // #endregion

  // #region getters/setters

  get current_lang(): string {
    return this.translate.currentLang;
  }

  get isAssetsConfig(): boolean {
    return this.appConfig.common.app.data_source === "assets";
  }

  get isUrlConfig(): boolean {
    return this.appConfig.common.app.data_source === "url";
  }

  get isCloudConfig(): boolean {
    return this.appConfig.common.app.data_source === "cloud";
  }

  public get isDataReady(): boolean {
    return Object.keys(this.appData).length > 0;
  }

  //#endregion

  constructor(
    public http_service: HttpClient,
    private translate: TranslateService,
    private assetsConfigService: AssetsConfigService,
    private urlService: UrlConfigService,
    private cloudConfigService: CloudConfigService
  ) {}

  /**Operazioni essenziali che devono SEMPRe essere eseguite all'avvio dell'app */
  public async initWebApp(): Promise<void> {
    try {
      if (this.hasAppInit) return;
      //01. Imposto la lingua in base a quella del browser
      this.setLanguageBasedOnBrowser();
      //02. Carico il file di config dell'app
      const appConfig = await this.loadAppConfig();
      if (appConfig != null) this.appConfig = appConfig;
      this.hasAppInit = true;
      //03. Carico i dati dell'app
      if (!this.isLangSaved())
        this.appData[this.current_lang] =
          (await this.getUserData()) ?? new AppData();
      //04. Pulisco la query string se necessario
      if (this.canCleanQuerystring()) clearQuerystring();
      this.hasAppInit = true;
    } catch (error) {
      console.error("Errore nell'inizializzazione dell'app:", error);
      this.hasAppInit = true;
    }
  }

  /**Se la lingua è già stata scaricata nel sito */
  public isLangSaved() {
    return this.appData[this.current_lang] != null;
  }

  /**Se è possibile pulire la query string */
  private canCleanQuerystring() {
    const cond1 = this.appConfig.common.app.data_source === "url";
    const cond2 = this.appConfig.common.app.data_source === "cloud";
    return cond1 || cond2;
  }

  // #region load app data

  /**Caricamento dei dati dell'applicazione dall'appsettings */
  //TODO: salvare le lingue in un dizionario, cosi da non doverle richiedere tutte le volte
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
    const dbUrl = this.appConfig.firebase.dbUrl;
    this.localStorage.firebaseConfig = this.fbUserConfig;
    //01. Estrazione dalla url del token JWT
    const uid: string = this.getUid();
    //02. Richiedo a firebase realtime database i dati
    const app = await this.cloudConfigService.getFbApp();
    const data = await this.cloudConfigService.getData(
      app,
      uid,
      this.current_lang,
      dbUrl
    );
    console.log("Cloud data loaded:", data);

    return data;
  }

  /**Recupera la Uid salvata e se non la trova, cerca di recuperarla dalla URL */
  private getUid() {
    if (this.appConfig.common.app.uId) return this.appConfig.common.app.uId;
    const uid: string = this.cloudConfigService.getUidFromUrl();
    if (!uid) throw new Error("UID not found in URL");
    this.appConfig.common.app.uId = uid;

    return uid;
  }

  /**Caricamento dei dati dell'applicazione dalla URL */
  private async loadUrlData(): Promise<AppData | undefined> {
    return await this.urlService.loadAppData(this.current_lang);
  }

  /**Caricamento dei dati dell'applicazione dagli assets */
  private async loadAssetsData(): Promise<AppData | undefined> {
    return await this.assetsConfigService.loadAppData(this.current_lang);
  }

  /**Verifica se l'URL contiene dati codificati */
  private isDataUrl(): boolean {
    const url = window.location.href;
    const dataParam = url.includes("?data=");
    return dataParam;
  }

  /**Impostazione dei dati utente */
  public async getUserData(): Promise<AppData | undefined> {
    this.current_user = this.appConfig.common.app.current_user ?? "DEMO";
    let allAppData = await this.loadAppData();

    return allAppData;
  }

  //#endregion

  /**Caricamento della configurazione dell'app dagli assets */
  private async loadAppConfig(): Promise<DefaultConfig | undefined> {
    try {
      const value = await lastValueFrom(
        this.http_service.get<DefaultConfig>(
          "assets/config/default-config.json"
        )
      );
      return value;
    } catch (error) {
      console.error(
        "Errore nel caricamento della configurazione dell'app:",
        error
      );
      return undefined;
    }
  }

  /**Defizione della lingua dell'app in base a quella del browser */
  private setLanguageBasedOnBrowser() {
    const browserLang =
      navigator.language ||
      (navigator.languages && navigator.languages[0]) ||
      "it";
    const langToUse = browserLang.split("-")[0];
    this.setAppLanguage(langToUse);
  }

  private setAppLanguage(langToUse: string) {
    this.translate.setDefaultLang(langToUse);
    this.translate.use(langToUse.match(/^(it|en)$/) ? langToUse : "it");
  }
}
