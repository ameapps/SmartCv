import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { deepClone } from 'src/app/shared/helpers/object.helper';
import { AppDataContact, AppDataSkills } from 'src/app/shared/models/appData';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  userSkills: AppDataSkills = new AppDataSkills();
  texts = ['SKILLS'];

  constructor(private common: CommonService, private translate: TranslateService) {
    this.subscribe();
  }

  private subscribe() {
    this.translate.onLangChange.subscribe(() => {
      setTimeout(() => {
        // L'esecuz. dell'evento costringe la view a controllare i bindings; riassegnare un array cambia il riferimento.
        this.texts = [this.translate.instant("PAGES.SKILLS.TITLE")];
        if (this.common?.appData[this.common.current_lang]?.skills != null)
          //Attendo che il file json sia stato ricaricato
          this.userSkills = deepClone(this.common.appData[this.common.current_lang].skills);
      }, 100);
    });
  }
  async ngOnInit(): Promise<void> {
    await this.common.initWebApp();
    this.texts = [this.translate.instant("PAGES.SKILLS.TITLE")];
    this.userSkills = deepClone(this.common.appData[this.common.current_lang].skills);

  }

}
