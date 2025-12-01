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

## OTTENIMENTO DATI UTENTE DA PARTE DELL'APP 

La soluzione iniziale è stata quella di conservare i file contenenti i dati e le relative traduzioni negli assets del sito. 
Questa soluzione però non mi piace, per diversi motivi: 
- quei file contengono la config di tutti gli utenti: chi dovesse accedere al sito, potrebbe potenzialmente avere accesso alle info lavorative di tutti gli utenti del sito 
- privatezza delle info lavorative: è vero che il CV è una risorsa che deve essere accessibile pubblicamente, ma NON a tutti: solo a potenziali datori di lavoro o persone autorizzare od a cui mi possa far piacere la visione.

La soluzione pensata quindi consiste in: 
- NON avere i file json coi dati negli assets del sito, bensi averli in firebase realtime database. All'avvio, l'app si occuperà di recuperare i dati con cui popolarsi. Lo farà leggendo il querystring, contenente un JWT token indicante l'identità della persona di cui occorre richiedere i dati sul realtime database. In questo modo: aprendo l'app senza querystring, si vedrebbero solo i dati mock; chiunque disponesse dell'url col querystring contenente il token JWT corretto, potrebbe vedere l'app popolata con i propri dati. 
Questa soluzione si integra bene anche con lo sharedLogin (mia app SSO per accedere ai miei siti web dietro autenticazione). Una volta eseguita l'autenticazione, sarà ottenuto un token jwt associato all'utente autenticato da firebase authentication. SharedLogin costruirà quindi la url al progetto smartCv contenente il token JWT ottenuto, di modo che quest'ultimo possa configurarsi con i dati di quell'utente.
- inserire nel querystring il json con tutti i dati dell'utente. Permetto questa opzione per poter dar modo di provare l'app. Questa modalità costringerà all'uso di una URL con un numero enorme di caratteri, molto pesante. Non è questa la modalità d'uso principale dell'app. 

## OTTENIMENTO VALORI ALL'APERTURA DEL SITO 

Una volta eseguita l'autenticazione nell'app SSO, essa permetterà l'apertura del customCv se l'utente lo può fare. 
Il sito aperto (smartCv) deve quindi conoscere quale utente lo ha aperto per potersi autenticare.
Per farlo, ha bisogno del token JWT ottenuto dall'app SSO. 
Può essere passato in due modi: 
- inserendolo nel querystring: all'apertura di smartCv, il sito legge il querystring e trova i dati dell'utente, così da poter richiedere i file dei dati corretti all'app
- tramite una post-message: quando viene aperto smartCv, il tab dell'app SSO gli invia un post message indicando i dati dell'utente. In questo modo il token JWT NON passa attraverlo la URL del browser e nessuno lo può copiare.

## IDEE DI USO DI SMARTCV 

- si può chiamare col token JWT nel querystring dell'url: in questo caso, il token JWT non dovrebbe avere limiti di validità. Link fatti così li genero io a mano, in modo che solo in casi particolare una persona possa avere sempre accesso al sito web 
- smartCv riceve il token dall'app SSO: in questo modo sarà possibile per me bloccare immediatamente l'accesso all'utente a smartCv non appena tolgo il permesso dal realtime database, perchè l'utente non avrà mai modo di sapere il token JWT ricevuto. 
In questo scenario, il token JWT deve avere una scadenza, in modo che dopo un certo tempo, non sia possibile scaricare i dati del sito e serva autenticarsi nuovamente. 

## IDEA DI SVILUPPO 

- se ho il token jwt nell'url, smartCv quello per richiedere i dati dell'utente
- se invece il token non c'è, il sito si apre per default con i dati dell'utente mock ma avvia immediatamente il listener dei post-message per ascoltare i dati inviati dall'app SSO. Se essa invia il token JWT dell'utente, smartCv lo riceverà e potrà usarlo per l'accesso. 