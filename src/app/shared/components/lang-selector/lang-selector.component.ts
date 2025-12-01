import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CommonService } from "../../services/common/common.service";

@Component({
  selector: "app-lang-selector",
  templateUrl: "./lang-selector.component.html",
  styleUrls: ["./lang-selector.component.scss"],
})
export class LangSelectorComponent implements OnInit, OnDestroy {
  flags: Flag[] = [
    { lang: "en", img: "assets/images/icons/langs/EN-US.svg" },
    { lang: "it", img: "assets/images/icons/langs/IT-IT.svg" },
  ];
  langChangeTimeout!: NodeJS.Timeout;

  get isUrlDataMode(): boolean {
    return this.common.appConfig?.common.app.app_data === 'url';
  }

  constructor(private translate: TranslateService, private common: CommonService) {}

  ngOnDestroy(): void {
    clearTimeout(this.langChangeTimeout);
  }

  ngOnInit(): void {}

  changeLanguage(lang: string): void {
    console.log(`Language changed to: ${lang}`);
    this.translate.use(lang);
  }
}

export class Flag {
  lang!: string;
  img!: string;
}
