/**
 * Deriva una chiave AES-GCM a partire da una passphrase testuale
 */
async function deriveAESKey(passphrase: string): Promise<CryptoKey> {
  const enc = new TextEncoder().encode(passphrase);
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode("salt123"), // puoi cambiare il salt
      iterations: 100000,
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Cifra un testo con AES-GCM
 * @param plaintext Testo da cifrare
 * @param passphrase Chiave testuale (es. "smartcv")
 * @returns stringa Base64 contenente IV + dati cifrati
 */
export async function encryptAES(plaintext: string, passphrase: string): Promise<string> {
  const key = await deriveAESKey(passphrase);
  const iv = crypto.getRandomValues(new Uint8Array(12)); // vettore di inizializzazione
  const data = new TextEncoder().encode(plaintext);

  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);

  // Concatena IV + ciphertext
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.length);

  // Converti in Base64
  let binary = "";
  combined.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary);
}

/**
 * Decifra un testo cifrato con AES-GCM
 * @param encrypted Base64 contenente IV + dati cifrati
 * @param passphrase Chiave testuale (stessa usata per cifrare)
 * @returns testo originale
 */
export async function decryptAES(encrypted: string, passphrase: string): Promise<string> {
  const combinedStr = atob(encrypted);
  const combined = new Uint8Array(combinedStr.split("").map(c => c.charCodeAt(0)));

  const iv = combined.slice(0, 12);
  const data = combined.slice(12);

  const key = await deriveAESKey(passphrase);
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data.buffer);

  return new TextDecoder().decode(plaintext);
}
