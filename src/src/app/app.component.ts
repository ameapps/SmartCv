import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { TypewriterService } from "./shared/services/typeWrite/type-writer-service.service";
import { lastValueFrom } from "rxjs";
import { DefaultConfig } from "./shared/models/defaultConfig";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./shared/services/common/common.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "SmartCv";
  displayedText = "";
  onLangSub: any;

  constructor(
    private common: CommonService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    //Operazioni di inizializzazione app
    if (!this.common.hasAppInit) await this.common.initWebApp();
    this.onLangSub = this.translate.onLangChange.subscribe((event) => {
      this.common.getUserData();
      this.cdr.detectChanges(); // forza l'aggiornamento
    });
  }

  ngOnDestroy(): void {
    this.onLangSub.unsubscribe();
  }
}
