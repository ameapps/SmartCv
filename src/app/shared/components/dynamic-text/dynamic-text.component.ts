import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TypewriterService } from '../../services/typeWrite/type-writer-service.service';
import { HomeTexts } from '../../models/home/home-texts';

@Component({
  selector: 'app-dynamic-text',
  templateUrl: './dynamic-text.component.html',
  styleUrls: ['./dynamic-text.component.scss']
})
export class DynamicTextComponent implements OnInit, OnChanges {

  // #region variables
  text = '';
  cyclesCount = 0;
  @Input() texts: string[] = [];
  @Input() cyclesLimit = CyclesLimitVals.NO_LIMIT as number;
  @Input() showAfterMs = showAfterMsVals.IMMEDIATLY as number;

  //'intro-title' | 'hover-title' | 'short-text' = 'intro-title'
  @Input() config: string = 'intro-title';
  // #endregion

  constructor(public write_service: TypewriterService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['config']) this.applyConfig(); 
  }

  async ngOnInit(): Promise<void> {
    this.cycleTexts();
  }

  private applyConfig() {
    if (this.config === 'intro-title') this.applyConfigIntroTitle();
    if (this.config === 'hover-title') this.applyConfigHoverTitle();
    if (this.config === 'short-text') this.applyConfigShortText();
  }

  applyConfigShortText() {
    this.showAfterMs = 1000;
    this.cyclesLimit = 999;
  }

  applyConfigIntroTitle() {
    this.cyclesLimit = 1;
  }

  applyConfigHoverTitle() {
    // throw new Error('Method not implemented.');
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