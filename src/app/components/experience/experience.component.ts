import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  workExp: WorkExperience[] = [];

  constructor() { }

  ngOnInit(): void {
    this.workExp = [
      {
        title: 'ZInformatica',
        description: 'Tirocinio universitario',
        isClicked: false,
        dateFrom: 'mm/yy',
        dateTo: 'mm/yy'
      },
      {
        title: 'LHub',
        description: 'Sviluppo siti web vetrina con wordpress; focus su HTML e CSS',
        isClicked: false,
        dateFrom: 'mm/yy',
        dateTo: 'mm/yy'
      },
      {
        title: 'Artiso',
        description: 'Sviluppo app web in REACT e app descktop in WPF',
        isClicked: false,
        dateFrom: 'mm/yy',
        dateTo: 'mm/yy'
      },
      {
        title: 'Softech',
        description: 'Sviluppo Angular, .NET core',
        isClicked: false,
        dateFrom: 'mm/yy',
        dateTo: 'mm/yy'
      },
    ];
  }

  onClickDot(experience: WorkExperience) {
    this.workExp.forEach(exp => {
      exp.isClicked = false;
    });
    experience.isClicked = true;
  }

}

export class WorkExperience {
  title = '';
  description = '';
  isClicked = false;
  dateFrom = 'mm/yy';
  dateTo = 'mm/yy';
}
