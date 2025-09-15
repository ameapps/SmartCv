import { Component, Input, OnInit } from '@angular/core';
import { TypewriterService } from '../../services/typeWrite/type-writer-service.service';
import { HomeTexts } from '../../models/home/home-texts';

@Component({
  selector: 'app-dynamic-text',
  templateUrl: './dynamic-text.component.html',
  styleUrls: ['./dynamic-text.component.scss']
})
export class DynamicTextComponent implements OnInit {

  @Input() text = '';

  constructor(public write_service: TypewriterService) { }

  async ngOnInit(): Promise<void> {
    setTimeout(async () => {
      await this.writeTextAutomatically('ciaooo');
      this.cycleTexts();
    }, 500); //Timer per dare il tempo di caricare la config dagli assets
  }

  async cycleTexts(): Promise<void> {
    const texts = [
      'CODE WIZARD',
      'SOFTWARE ENGINEER',
      'EXPERT AI USER'
    ];
    let index = 0;
    //Eseguo la scrittura del testo in loop 
    const loop = async () => {
      await this.writeTextAutomatically(texts[index]);
      index = (index + 1) % texts.length;
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
