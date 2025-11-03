import { Component, OnInit } from '@angular/core';
import { AppDataExperienceWorks, AppDataProject } from 'src/app/shared/models/appData';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  userProjects: AppDataProject[] = [];
  showDialog = false;
  dialogData: any = null;
  private longPressTimeouts: any[] = [];

  constructor(private common: CommonService) {}

  async ngOnInit(): Promise<void> {
    if (!this.common.hasAppInit) await this.common.initWebApp();
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