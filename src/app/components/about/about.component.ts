import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { deepClone } from 'src/app/shared/helpers/object.helper';
import { AppDataAbout } from 'src/app/shared/models/appData';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public texts: string[] = [this.translate.instant("PAGES.ABOUT.TITLE")];
  public get userAbout(): AppDataAbout {
    return this.common.appData.about;
  }

  constructor(private common: CommonService, private translate: TranslateService) { 
    this.translate.onLangChange.subscribe(() => {
      // L'esecuz. dell'evento costringe la view a controllare i bindings; riassegnare un array cambia il riferimento.
      this.texts = [this.translate.instant("PAGES.ABOUT.TITLE")];
    });
  }

  async ngOnInit(): Promise<void> {
    //Operazioni di inizializzazione app 
    if (!this.common.hasAppInit) await this.common.initWebApp();
  }

}
