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
}
