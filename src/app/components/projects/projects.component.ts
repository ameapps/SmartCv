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
        image: 'https://raw.githubusercontent.com/ameapps/SharedLogin/7aeadbf876af41b4981ea1883666fb8948cb3c77/src/assets/images/products/SportTracker/vect.svg',
        link: 'https://ameapps.github.io/SportTracker/#/menu/homepage',
        name: "SportMonitoring",
        description: "Lorem ipsum dolor sit amet",
        isClicked: false,
        isHovering: false
      },
      {
        image: 'https://raw.githubusercontent.com/ameapps/SharedLogin/7aeadbf876af41b4981ea1883666fb8948cb3c77/src/assets/images/products/GameScopa/vect.svg',
        link: 'https://ameapps.github.io/GameScopa',
        name: "GameScopa",
        description: "Lorem ipsum dolor sit amet",
        isClicked: false,
        isHovering: false
      }
    ];
  }

  onHoverProject(project: Projects) {
    this.projects.map((exp) => {
      exp.isHovering = false;
    });
    project.isHovering = true;
  }

  onClickProject(project: Projects) {
    window.open(project?.link);
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
  isHovering = false
}