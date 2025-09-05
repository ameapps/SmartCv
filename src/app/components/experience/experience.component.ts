import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  workExp: WorkExperience[] = [];
  showDialog = false;
  dialogData: any = null;
  private longPressTimeouts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.workExp = [
      {
        title: 'ZInformatica',
        description: 'Asp .NET MVC',
        isClicked: false,
        dateFrom: 'mm/yy',
        dateTo: 'mm/yy',
        country: 'Italy'
      },
      {
        title: 'LHub',
        description: 'Wordpress; HTML & CSS',
        isClicked: false,
        dateFrom: 'mm/yy',
        dateTo: 'mm/yy',
        country: 'Italy'
      },
      {
        title: 'Artiso',
        description: 'React, WPF',
        isClicked: false,
        dateFrom: 'mm/yy',
        dateTo: 'mm/yy',
        country: 'Germany'
      },
      {
        title: 'Softech',
        description: 'Angular, Ionic, .NET core, Sql server, postGreSQL',
        isClicked: false,
        dateFrom: 'mm/yy',
        dateTo: 'mm/yy',
        country: 'Italy'
      },
    ];
  }


  onClickDot(experience: WorkExperience) {
    this.workExp.forEach(exp => {
      exp.isClicked = false;
    });
    experience.isClicked = true;
  }

  onDotPress(exp: WorkExperience, idx: number) {
    this.clearLongPressTimeout(idx);
    this.longPressTimeouts[idx] = setTimeout(() => {
      this.openDialog(exp);
    }, 2000);
  }

  onDotRelease(exp: WorkExperience, idx: number) {
    this.clearLongPressTimeout(idx);
  }

  clearLongPressTimeout(idx: number) {
    if (this.longPressTimeouts[idx]) {
      clearTimeout(this.longPressTimeouts[idx]);
      this.longPressTimeouts[idx] = null;
    }
  }

  openDialog(exp: WorkExperience) {
    this.dialogData = exp;
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.dialogData = null;
  }

}

export class WorkExperience {
  title = '';
  description = '';
  isClicked = false;
  dateFrom = 'mm/yy';
  dateTo = 'mm/yy';
  country = '';
}
