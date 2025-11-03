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