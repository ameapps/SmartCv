import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TypewriterService } from './shared/services/typeWrite/type-writer-service.service';
import { lastValueFrom } from 'rxjs';
import { DefaultConfig } from './shared/models/defaultConfig';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './shared/services/common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'customCv';
  displayedText = '';

  constructor(
    private translate: TranslateService,
    private http_service: HttpClient,
    private typewriterService: TypewriterService,
    private common: CommonService
  ) {
  }

  async ngOnInit() {
    //01. Imposto la lingua del sito in base alla lingua del browser
    this.setLanguageBasedOnBrowser();
    //02. Carico il file di config dell'app 
    this.common.appConfig = await this.common.loadAppConfig();
    console.info('info', this.common.appConfig);
    this.writeTextAutomatically();
  }

  private setLanguageBasedOnBrowser() {
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'it';
    const langToUse = browserLang.split('-')[0];
    this.translate.setDefaultLang('it');
    this.translate.use(langToUse.match(/^(it|en)$/) ? langToUse : 'it');
  }

  private writeTextAutomatically() {
    try {
      const fullText = 'Ciao! Sto scrivendo in automatico... 🚀';
      this.typewriterService.typeText(
        fullText,
        (current) => {
          this.displayedText = current;
        },
        80, // velocità in ms
        () => {
          console.log('Scrittura completata!');
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
