import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}

export class Flag {
  lang!: string;
  img!: string;
}
