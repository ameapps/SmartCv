import { Component, OnInit } from '@angular/core';
import { WorkExperience } from '../experience/experience.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Projects[] = [];
  showDialog = false;
  dialogData: any = null;
  private longPressTimeouts: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.projects = [
      {
        image: '',
        link: '',
        name: "SportMonitoring",
        description: "Lorem ipsum dolor sit amet",
        isClicked: false,
      },
      {
        image: '',
        link: '',
        name: "GameScopa",
        description: "Lorem ipsum dolor sit amet",
        isClicked: false,
      }
    ];
  }

  onClickProject(project: Projects) {
    window.open(project?.link)
  }

  onClickDot(experience: WorkExperience) {
    this.projects.forEach((exp) => {
      exp.isClicked = false;
    });
    experience.isClicked = true;
  }
}

export class Projects {
  name = '';
  image = '';
  link = '';
  description = '';
  isClicked = false;
}