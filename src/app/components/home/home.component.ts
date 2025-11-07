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
    return this.common.appData.home;
  }

  constructor(
    private translate: TranslateService, 
    public common: CommonService, 
    private typewriterService: 
    TypewriterService, 
    private router: Router
  ) { }

  async cycleTexts(): Promise<void> {
    const texts = [
      'CODE WIZARD',
      'SOFTWARE ENGINEER',
      'EXPERT AI USER'
    ];
    let index = 0;
    //Eseguo la scrittura del testo in loop 
    const loop = async () => {
      index = (index + 1) % texts.length;
      setTimeout(loop, 1000); // tempo di pausa dopo la scrittura, non fissa
    };
    // inizia il ciclo
    loop(); 
  }
  
  async ngOnInit(): Promise<void> {
    if (!this.common.hasAppInit) await this.common.initWebApp();
  }

  /**Method opening the given linkedIn profile! */
  public learnMore() {
    console.warn('TODO!')
  }
}
