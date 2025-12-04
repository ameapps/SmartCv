import { Injectable } from '@angular/core';
import { CommonService } from '../common/common.service';
import { AssetsService } from '../assets/assets.service';
import { FirebaseConfig } from '../../models/firebaseConfig';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private assets_service: AssetsService) { }

  /**Metodo che recupera le credenziali Firebase dell'utente specificato */
  public async getFirebaseConfig(): Promise<FirebaseConfig | undefined> {
    try {
      const fbConfig = await this.assets_service.getFile(
        'assets/firebase/fb-proj-configs.json'
      );
      if (!fbConfig) {
        console.error('Impossibile caricare la configurazione Firebase.');
        return;
      }
      const fbUserConfig: FirebaseConfig = fbConfig;
      if (!fbUserConfig) {
        console.error(
          `Configurazione Firebase non trovata.`
        );
        return;
      }

      return fbUserConfig;
    } catch (error) {
      console.error(
        'Errore nel recupero della configurazione Firebase:',
        error
      );
      return;
    }
  }
}
