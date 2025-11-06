# WORK 

Qui scrivo i miei ragionamenti nello sviluppo del'app 

## PROBLEMA CON TRADUZIONE E DATI SENSIBILI 

Per poter visualizzare il progetto in github pages, il repository deve essere pubblico. 
Non mi va però che chiunque possa accedere a certe informazioni.
Vorrei quindi far si che si possano scaricare in realtime da un BE.

Per poter sia tradurre i dati, sia supportare il multiutente, non potendo senza creare un server apposito servire le traduzioni da remoto, posso soltanto aggiungere i dati al i18n sotto il nome dell'utente che usa il sito. 
Sarà così più facile da configurare. 
Dove nell'app servono i dati tradotti, invece che passare le chiavi i18n direttamente alla view, posso fare in modo che sia costruito un oggetto typescript che sia valorizzato con i dati tradotti. 
In questo modo, posso aggiungere al file di config del progetto se devono essere usate le traduzioni i18n oppure no e per quale utente devono essere utilizzate.

**idea**
Occorre eseguire una distinzione tra le stringhe di traduzione di cui ha bisogno l'app per mostrare i testi che non variano al cambiare dell'utente da quelli che variano. 
Inoltre occorre distiniguere le configurazioni da applicare dai dati. 
Meglio mettere tutto in file separati.

- esistera un file di config solo per le impostazioni 
- per ogni lingua e per ogni utente, esisterà un file contenente i dati da mostrare (ES: descrizioni).