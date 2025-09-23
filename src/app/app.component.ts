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
  title = 'SmartCv';
  displayedText = '';

  constructor(private common: CommonService) {
  }

  async ngOnInit() {
    //Operazioni di inizializzazione app 
    if (!this.common.hasAppInit) await this.common.initWebApp();
  }
}
