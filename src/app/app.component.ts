import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CommonService } from "./shared/services/common/common.service";
import { AppData } from "./shared/models/appData";

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
    await this.common.initWebApp();
    this.onLangSub = this.translate.onLangChange.subscribe((event) => {
      this.onLangChanged(event.lang);
    });
  }

  ngOnDestroy(): void {
    this.onLangSub.unsubscribe();
  }

  public async onLangChanged(lang: string) {
    if (!this.common.isLangSaved()) this.common.appData[lang] = await this.common.getUserData() ?? new AppData();
    this.cdr.detectChanges();
  }
}
