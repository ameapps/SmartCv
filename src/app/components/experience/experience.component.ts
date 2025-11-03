import { Component, OnInit } from "@angular/core";
import { AppDataExperience, AppDataExperienceWorks } from "src/app/shared/models/appData";
import { CommonService } from "src/app/shared/services/common/common.service";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"],
})
export class ExperienceComponent implements OnInit {
  userExperiences: AppDataExperienceWorks[] = [];
  showDialog = false;
  dialogData: any = null;
  private longPressTimeouts: any[] = [];
  public get currentYear() {
    return new Date().getFullYear();
  }

  constructor(private common: CommonService) {}

  async ngOnInit(): Promise<void> {
    if (!this.common.hasAppInit) await this.common.initWebApp();
    this.userExperiences = this.common.appData.experience.list;
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