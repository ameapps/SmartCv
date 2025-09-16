import { Component, Input, OnInit } from '@angular/core';
import { TypewriterService } from '../../services/typeWrite/type-writer-service.service';
import { HomeTexts } from '../../models/home/home-texts';

@Component({
  selector: 'app-dynamic-text',
  templateUrl: './dynamic-text.component.html',
  styleUrls: ['./dynamic-text.component.scss']
})
export class DynamicTextComponent implements OnInit {

  // #region variables
  text = '';
  cyclesCount = 0;
  @Input() texts: string[] = [];
  @Input() cyclesLimit = CyclesLimitVals.NO_LIMIT;
  @Input() showAfterMs = showAfterMsVals.IMMEDIATLY;

  //'intro-title' | 'hover-title' | 'short-text' = 'intro-title'
  @Input() config: string = 'intro-title';
  // #endregion

  constructor(public write_service: TypewriterService) { }

  async ngOnInit(): Promise<void> {
    setTimeout(async () => {
      this.cycleTexts();
    }, 500 + this.showAfterMs); //Timer per dare il tempo di caricare la config dagli assets
  }

  async cycleTexts(): Promise<void> {
    let index = 0;
    //Eseguo la scrittura del testo in loop 
    const loop = async () => {
      if (this.cyclesCount >= this.cyclesLimit && this.cyclesLimit != CyclesLimitVals.NO_LIMIT) return;
      await this.writeTextAutomatically(this.texts[index]);
      index = (index + 1) % this.texts.length;
      ++this.cyclesCount;
      setTimeout(loop, 1000); // tempo di pausa dopo la scrittura, non fissa
    };
    // inizia il ciclo
    loop(); 
  }
  
  private async writeTextAutomatically(finalText: string): Promise<void> {
    try {
      const fullText = finalText;
  
      await new Promise<void>((resolve, reject) => {
        this.write_service.typeText(
          fullText,
          (current) => {
            this.text = current;
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

}

export enum CyclesLimitVals {
  NO_LIMIT = -1
}

export enum showAfterMsVals {
  IMMEDIATLY = -1
}