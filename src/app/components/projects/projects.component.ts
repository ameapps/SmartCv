import { Component, OnInit } from '@angular/core';
import { AppDataExperienceWorks } from 'src/app/shared/models/appData';

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
        image: 'https://github.com/ameapps/SharedLogin/blob/master/src/assets/images/products/WordleClone/vect.png?raw=true',
        link: 'https://ameapps.github.io/WordleCloneV2/',
        name: "WordleClone",
        description: "App che simula il gioco Wordle",
        isClicked: false,
        isHovering: false
      },
      {
        image: 'https://raw.githubusercontent.com/ameapps/SharedLogin/7aeadbf876af41b4981ea1883666fb8948cb3c77/src/assets/images/products/SportTracker/vect.svg',
        link: 'https://ameapps.github.io/SportTracker/#/menu/homepage',
        name: "SportMonitoring",
        description: "App per il monitoraggio delle attività sportive e del cibo assunto",
        isClicked: false,
        isHovering: false
      },
      {
        image: 'https://raw.githubusercontent.com/ameapps/SharedLogin/7aeadbf876af41b4981ea1883666fb8948cb3c77/src/assets/images/products/GameScopa/vect.svg',
        link: 'https://ameapps.github.io/GameScopa',
        name: "GameScopa",
        description: "Celebre gioco di carte italiano",
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

  onClickDot(experience: AppDataExperienceWorks) {
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