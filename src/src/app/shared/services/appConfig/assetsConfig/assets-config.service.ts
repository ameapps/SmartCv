import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CommonService } from '../../common/common.service';
import { IAppConfig } from 'src/app/shared/interface/appConfig/app.config.interface';

@Injectable({
  providedIn: 'root'
})
export class AssetsConfigService implements IAppConfig {


  constructor(private http_service: HttpClient) { }

  /**Caricamento dei dati dell'applicazione dall'appsettings */
  public async loadAppData(current_lang = 'en'): Promise<any> {
    const path = `assets/data/${current_lang}/app-data.json`;
    console.log('current_lang', current_lang);
    const value = await lastValueFrom(
      this.http_service.get<any>(path)
    );
    return value;
  }
}
