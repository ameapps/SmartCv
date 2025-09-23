import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private common: CommonService, private translate: TranslateService) { }

  async ngOnInit(): Promise<void> {
    //Operazioni di inizializzazione app 
    if (!this.common.hasAppInit) await this.common.initWebApp();
  }

}
