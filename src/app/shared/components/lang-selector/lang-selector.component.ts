import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss']
})
export class LangSelectorComponent implements OnInit {

  flags: Flag[] = [
    { lang: 'en', img: 'assets/images/icons/langs/EN-US.svg' },
    { lang: 'it', img: 'assets/images/icons/langs/IT-IT.svg' }
  ];

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

  changeLanguage(lang: string): void {
    console.log(`Language changed to: ${lang}`);
    this.translate.use(lang);
  }
}

export class Flag {
  lang!: string;
  img!: string;
}
