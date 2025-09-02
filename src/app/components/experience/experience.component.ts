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
        description: 'Tirocinio universitario'
      },
      {
        title: 'LHub',
        description: 'Sviluppo siti web vetrina con wordpress; focus su HTML e CSS'
      },
      {
        title: 'Artiso',
        description: 'Sviluppo app web in REACT e app descktop in WPF'
      },
      {
        title: 'Softech',
        description: 'Sviluppo Angular, .NET core'
      },
    ];
  }

}

export class WorkExperience {
  title = '';
  description = '';
}
