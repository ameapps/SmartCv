import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { deepClone } from "src/app/shared/helpers/object.helper";
import { AppDataExperience, AppDataExperienceWorks } from "src/app/shared/models/appData";
import { CommonService } from "src/app/shared/services/common/common.service";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"],
})
export class ExperienceComponent implements OnInit {
  showDialog = false;
  dialogData: any = null;
  private longPressTimeouts: any[] = [];
  texts: string[] = ['EXPERIENCE'];
  public get currentYear() {
    return new Date().getFullYear();
  }
  public userExperiences: AppDataExperienceWorks[] = [];

  public get long_descr(): string {
    return this.common?.appData?.experience.long_descr;
  };

  constructor(private common: CommonService, private translate: TranslateService) {
    this.subscribe();
  }

  private subscribe() {
    this.translate.onLangChange.subscribe(() => {
      setTimeout(() => {
        // L'esecuz. dell'evento costringe la view a controllare i bindings; riassegnare un array cambia il riferimento.
        this.texts = [this.translate.instant("PAGES.EXPERIENCE.TITLE")];
        if (this.common?.appData?.experience != null)
          //Attendo che il file json sia stato ricaricato
          this.userExperiences = deepClone(this.common.appData.experience.list);
      }, 100);
    });
  }

  async ngOnInit(): Promise<void> {
    if (!this.common.hasAppInit) await this.common.initWebApp();
    this.texts = [this.translate.instant("PAGES.EXPERIENCE.TITLE")];
    this.userExperiences = deepClone(this.common.appData.experience.list);
  }

  onClickDot(experience: AppDataExperienceWorks) {
    this.userExperiences.forEach((exp) => {
      exp.isClicked = false;
    });
    experience.isClicked = true;
  }

  onDotPress(exp: AppDataExperienceWorks, idx: number) {
    this.clearLongPressTimeout(idx);
    this.longPressTimeouts[idx] = setTimeout(() => {
      this.openDialog(exp);
    }, 250);
  }

  onDotRelease(exp: AppDataExperienceWorks, idx: number) {
    this.clearLongPressTimeout(idx);
  }

  clearLongPressTimeout(idx: number) {
    if (this.longPressTimeouts[idx]) {
      clearTimeout(this.longPressTimeouts[idx]);
      this.longPressTimeouts[idx] = null;
    }
  }

  openDialog(exp: AppDataExperienceWorks) {
    this.dialogData = exp;
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.dialogData = null;
  }
}