import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TypewriterService } from '../../services/typeWrite/type-writer-service.service';
import { HomeTexts } from '../../models/home/home-texts';

@Component({
  selector: 'app-dynamic-text',
  templateUrl: './dynamic-text.component.html',
  styleUrls: ['./dynamic-text.component.scss']
})
export class DynamicTextComponent implements OnInit, OnChanges, AfterViewInit {

  // #region variables
  text = '';
  cyclesCount = 0;
  @Input() texts: string[] = [];
  @Input() cyclesLimit = CyclesLimitVals.NO_LIMIT as number;
  @Input() showAfterMs = showAfterMsVals.IMMEDIATLY as number;
  @ViewChild('textEl') textEl!: ElementRef<HTMLElement>;
  //'intro-title' | 'hover-title' | 'short-text' = 'intro-title'
  @Input() config: string = 'intro-title';
  @Input() style!: TextStyle;
  // #endregion

  constructor(public write_service: TypewriterService) { }

  ngAfterViewInit(): void {
    if (this.style != null) this.applyCustomStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['config']) this.applyConfig(); 
    if (changes['texts']) {
      console.log("Texts changed in dynamic text component:", this.texts);
      this.scrambleText();
    }
  }

  async ngOnInit(): Promise<void> {
    if (this.config === 'intro-title') this.cycleTexts();
    if (this.config === 'hover-title') this.scrambleText();
    if (this.config === 'short-text') this.cycleTexts();
  }

  private applyCustomStyle() {
    if (!this.textEl) return;
    if (this.style?.fontSize) {
      this.textEl.nativeElement.style.fontSize = this.style.fontSize;
    }
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
  
    const loop = async () => {
      if (this.cyclesCount >= this.cyclesLimit && this.cyclesLimit !== CyclesLimitVals.NO_LIMIT) return;
      const currentText = this.texts[index];
      await this.writeTextAutomatically(currentText);
      if (this.config === 'short-text') {
        // Aspetta tot secondi prima di iniziare la cancellazione
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Cancella il testo, una lettera ogni 500ms
        await this.deleteTextBackward(50);
        index = (index + 1) % this.texts.length;
      }
      ++this.cyclesCount;
      setTimeout(loop, 1000);
    };
  
    loop();
  }

  private async deleteTextBackward(speedMs = 500): Promise<void> {
    while (this.text.length > 0) {
      this.text = this.text.slice(0, -1); // Rimuove l'ultimo carattere
      await new Promise(resolve => setTimeout(resolve, speedMs));
    }
  }
  
  private async writeTextAutomatically(finalText: string, speedMs = 80): Promise<void> {
    try {
      const fullText = finalText;

      await new Promise<void>((resolve, reject) => {
        this.write_service.typeText(
          fullText,
          (current) => {
            this.text = current;
          },
          speedMs, // velocità in ms
          () => {
            resolve(); // risolve la Promise
          }
        );
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**Mostra il testo in scramble - la prima lettera mostra il giro dell'alfabeot in 100ms, la seconda in 200ms, la terza in 300ms e cosi via */
  private scrambleText() {
    this.write_service.scrambleText(
      this.texts[0],
      (current) => {
        this.text = current; 
      },
      100,
      () => console.log("Done!")
    );
  }

  /**Mostra l'effetto hover sul testo quando possibile */
  onHover() {
    if (this.config === 'hover-title')this.scrambleText();
  }

}

export enum CyclesLimitVals {
  NO_LIMIT = -1
}

export enum showAfterMsVals {
  IMMEDIATLY = -1
}

export class TextStyle {
  fontSize = '';
}