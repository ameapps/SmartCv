import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { deepClone } from 'src/app/shared/helpers/object.helper';
import { AppDataExperienceWorks, AppDataProject } from 'src/app/shared/models/appData';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  showDialog = false;
  dialogData: any = null;
  public userProjects: AppDataProject[] = [];
  texts = ['PROJECTS'];

  constructor(private common: CommonService, private translate: TranslateService) {
    this.subscribe();
  }

  private subscribe() {
    this.translate.onLangChange.subscribe(() => {
      setTimeout(() => {
        // L'esecuz. dell'evento costringe la view a controllare i bindings; riassegnare un array cambia il riferimento.
        this.texts = [this.translate.instant("PAGES.PROJECTS.TITLE")];
        if (this.common?.appData?.projects != null)
          //Attendo che il file json sia stato ricaricato
          this.userProjects = deepClone(this.common.appData.projects.list);
      }, 100);
    });
  }

  async ngOnInit(): Promise<void> {
    if (!this.common.hasAppInit) await this.common.initWebApp();
    this.texts = [this.translate.instant("PAGES.PROJECTS.TITLE")];
    this.userProjects = this.common.appData.projects.list;
  }

  onHoverProject(project: AppDataProject) {
    this.userProjects.map((exp) => {
      exp.isHovering = false;
    });
    project.isHovering = true;
  }

  onClickProject(project: AppDataProject) {
    window.open(project?.link);
  }

  onClickDot(experience: AppDataExperienceWorks) {
    this.userProjects.forEach((exp) => {
      exp.isClicked = false;
    });
    experience.isClicked = true;
  }
}