import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppDataHome } from 'src/app/shared/models/appData';
import { HomeTexts } from 'src/app/shared/models/home/home-texts';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { TypewriterService } from 'src/app/shared/services/typeWrite/type-writer-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  get homeTexts(): AppDataHome {
    return this.common.appData[this.common.current_lang].home;
  }

  constructor(public common: CommonService) { }

  async ngOnInit(): Promise<void> {
    await this.common.initWebApp();
  }

  /**Method opening the given linkedIn profile! */
  public learnMore() {
    console.warn('TODO!')
  }
}
