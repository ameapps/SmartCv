/**
 * Rimuove la querystring dall'URL corrente senza ricaricare la pagina.
 * Usa window.history.replaceState per mantenere lo stato.
 */
export function clearQueryString(): void {
  const cleanUrl = window.location.origin + window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);
}
