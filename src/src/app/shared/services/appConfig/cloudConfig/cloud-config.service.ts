import { Injectable } from '@angular/core';
import { FirebaseHelper } from 'src/app/shared/helpers/FirebaseHelper';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CloudConfigService {

  constructor(private fbService: FirebaseService) { }
  
  public async getData(app: FirebaseApp, uid: string, current_lang: string, dbUrl: string | undefined) {
    return await FirebaseHelper.getData(app, `users/list/${uid}/products/smart_cv/${current_lang}`, dbUrl);
  }

  public async getFbApp() {
    const fbCredentials = await this.fbService.getFirebaseConfig();
    const app = initializeApp(fbCredentials as any);
    return app;
  }

  /**Estrazione dell'Uid firebase dalla URL */
  public getUidFromUrl(): string {
    try {
      const url = window.location.href;
      const isUserUrl = url.includes('?user=');
      if (!isUserUrl) return '';
      const dataParam = url.toString().split('?user=');
      if (!dataParam || dataParam.length < 2) return '';
      const uid = dataParam[1];

      return uid;
    } catch (error) {
      console.error('Error extracting JWT from URL:', error);
      return '';
    }
  }
}
