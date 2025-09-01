import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HomeTexts } from 'src/app/shared/models/home/home-texts';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { TypewriterService } from 'src/app/shared/services/typeWrite/type-writer-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  texts: HomeTexts = {
    name: '',
    shortDescr: '',
    longDescr: `Self-taught programmer motivated by passion and personal projects. Expert
    of searching bugs on Google and quickly scanning the best StackOverflow
    answers.`
  }

  constructor(private translate: TranslateService, private common: CommonService, private typewriterService: TypewriterService, private router: Router) { }

  async cycleTexts(): Promise<void> {
    const texts = [
      'CODE WIZARD',
      'SOFTWARE ENGINEER',
      'EXPERT AI USER'
    ];
    let index = 0;
    //Eseguo la scrittura del testo in loop 
    const loop = async () => {
      await this.writeTextAutomatically(texts[index], 'shortDescr');
      index = (index + 1) % texts.length;
      setTimeout(loop, 1000); // tempo di pausa dopo la scrittura, non fissa
    };
    // inizia il ciclo
    loop(); 
  }
  
  async ngOnInit(): Promise<void> {
    setTimeout(async () => {
      await this.writeTextAutomatically(this.common.appConfig.pages.home.name, 'name');
      this.cycleTexts();
    }, 500); //Timer per dare il tempo di caricare la config dagli assets
  }

  private async writeTextAutomatically(finalText: string, refText: keyof HomeTexts): Promise<void> {
    try {
      const fullText = finalText;
  
      await new Promise<void>((resolve, reject) => {
        this.typewriterService.typeText(
          fullText,
          (current) => {
            this.texts[refText] = current;
          },
          80, // velocità in ms
          () => {
            console.log('Scrittura completata!');
            resolve(); // risolve la Promise
          }
        );
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**Method opening the given linkedIn profile! */
  public learnMore() {
    console.warn('TODO!')
  }
}
