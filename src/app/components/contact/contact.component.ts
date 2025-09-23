import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private common: CommonService) { }

  async ngOnInit(): Promise<void> {
    //Operazioni di inizializzazione app 
    //private common: CommonService
    if (!this.common.hasAppInit) await this.common.initWebApp();
  }

}
