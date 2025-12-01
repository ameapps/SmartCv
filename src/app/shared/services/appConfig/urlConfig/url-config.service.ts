import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { decryptAES } from 'src/app/shared/helpers/aes.cyper.helper';
import { IAppConfig } from 'src/app/shared/interface/appConfig/app.config.interface';

@Injectable({
  providedIn: 'root'
})
export class UrlConfigService implements IAppConfig {

  public completeData: { [key: string]: any } = {};

  constructor() { }

  async loadAppData(current_lang = 'en'): Promise<any> {
    try {
      // Estrazione del parametro 'data' dalla querystring
      const url = window.location.href;
      const parsedUrl = new URL(url);
      const dataParam = parsedUrl.toString().split('?data=');
      if (!dataParam || dataParam.length < 2) return null;
      const querystring = dataParam[1];
      // Decodifica e parsing dati app 
      const decoded = decodeURIComponent(querystring);
      const fromAes = await decryptAES(decoded, "smartcv");
      const result = JSON.parse(fromAes);
      
      return result;
    } catch (err) {
      console.error('Errore nel parsing del JSON dal querystring:', err);
      return null;
    }
  }
}
