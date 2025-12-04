import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { deepClone } from "src/app/shared/helpers/object.helper";
import { AppDataAbout } from "src/app/shared/models/appData";
import { CommonService } from "src/app/shared/services/common/common.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit {
  public texts: string[] = ["ABOUT"];
  public userAbout: AppDataAbout = new AppDataAbout();

  constructor(
    private common: CommonService,
    private translate: TranslateService
  ) {
    this.subscribe();
  }

  private subscribe() {
    this.translate.onLangChange.subscribe(() => {
      setTimeout(() => {
        // L'esecuz. dell'evento costringe la view a controllare i bindings; riassegnare un array cambia il riferimento.
        this.texts = [this.translate.instant("PAGES.ABOUT.TITLE")];
        if (this.common?.appData?.about != null)
          //Attendo che il file json sia stato ricaricato
          this.userAbout = deepClone(this.common.appData.about);
      }, 100);
    });
  }

  async ngOnInit(): Promise<void> {
    //Operazioni di inizializzazione app
    if (!this.common.hasAppInit) await this.common.initWebApp();
    this.texts = [this.translate.instant("PAGES.ABOUT.TITLE")];
    this.userAbout = deepClone(this.common.appData.about);
  }
}
