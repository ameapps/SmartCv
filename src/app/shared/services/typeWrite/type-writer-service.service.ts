import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypewriterService {
  
  /**
   * Esegue scrittura simulata di un testo.
   * @param text Testo completo da scrivere.
   * @param onUpdate Callback chiamata ogni volta che si aggiorna il testo.
   * @param speed Velocità di scrittura (millisecondi per lettera).
   * @param onComplete Callback opzionale quando il testo è completo.
   */
  public typeText(
    text: string,
    onUpdate: (current: string) => void,
    speed: number = 100,
    onComplete?: () => void
  ): void {
    let currentText = '';
    let index = 0;

    const interval = setInterval(() => {
      currentText += text.charAt(index);
      onUpdate(currentText);
      index++;

      if (index >= text.length) {
        clearInterval(interval);
        if (onComplete) {
          onComplete();
        }
      }
    }, speed);
  }

  /**effetto tipo "slot machine" o scramble", in cui ogni lettera della parola viene “ciclata” attraverso tutte le lettere dell’alfabeto prima di arrivare a quella finale. Ogni lettera ha un tempo crescente per completare l’animazione. */
  public scrambleText(
    text: string,
    onUpdate: (current: string) => void,
    baseDuration: number = 100,
    onComplete?: () => void
  ): void {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const target = text.toUpperCase().split('');
    const result: string[] = Array(target.length).fill('');
    let completed = 0;
  
    target.forEach((char, i) => {
      const duration = baseDuration * (i + 1);
      const steps = alphabet.length;
      let step = 0;
  
      const interval = setInterval(() => {
        // Mostra una lettera casuale dell'alfabeto
        result[i] = alphabet.charAt(step % alphabet.length);
        onUpdate(result.join(''));
        step++;
  
        if (step >= steps) {
          clearInterval(interval);
          result[i] = char; // Fissa la lettera corretta
          completed++;
          onUpdate(result.join(''));
          if (completed === target.length && onComplete) {
            onComplete();
          }
        }
      }, duration / steps); // Distribuisce la durata totale su tutti i passaggi
    });
  }
  
}
