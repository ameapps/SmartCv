# TUTORIAL 

## COME MOSTRARE UN'IMMAGINE PRESENTE SU ONEDRIVE 
- click sui 3 puntini 
- cliccare in incorpora 
- generare l'elemento html da onedrive
- incollarlo nel html

## COME VISUALIZZARE UIN VIDEO DI ONEDRIVE IN STREAMING
- click sui 3 puntini 
- cliccare in incorpora 
- copiare il link al video nel browser
- verà farra una redirect
- copiare il link finale 
- creare un iframe

## COME AGGIUNGERE FONT A PROGETTO ANGULAR 
- cercare su google fonts il font desiderato 
- inserire nel file index.html i link href del font 
- nel styles.scss mettere nel body -> font-family: nome-font

## COME TOGLIERE I BORDI DI UN NUOVO PROGETTO ANGULAR 
Bisognava andare nel CSS globale ed indicare nella regola del body che il margine è 0. 

## COME IMPOSTARE L'ALTEZZA DELLA PAGINA ALL'ALTEZZA MASSIMA DELLO SCHERMO E NON DI PIu' 
Se si ha un container alto 100vh e si mette come primo elemento al suo interno (in verticale )
un elemento con altezza fissa, NON bisogna dare all'elemento successivo altezza 100%, perchè altrimenti costringerà il padre a diventare alto quanto tutto lo spazio disponibile per il secondo 
elemento (100%) + l'altezza fissa. 

## HASH NELL'URL DEL SITO 
L'hash serve a fare in modo che il browser non faccia richieste reali al server per ogni rotta, ma che tutto venga gestito interamente dal client Angular.
useHash: false: https://example.com/about
useHash: true: https://example.com/#/about
*cioè*
usare l’hash serve a fare in modo che il routing non sia gestito dal server web, ma sia gestito dall'app angular. 
*questo perchè*
Il server web può essere configurato per cercare i file del sito in una cartella. 
ES: è possibile indicare in IIS in quale cartella sono presenti i file del progetto (come ../app oppure../ oppure ../app/ste/ ecc)

## COME PUBBLICARE SU GITHUB 
- controllare nell'app routing ci sia la voce per l'hash per la gestione delle rotte 
- usare comanod cosi fatto: ng build --configuration=production --output-path docs --base-href /SmartCv/ 
Dove: 
- configuration production è necessaria 
- --output-path docs serve a dare il nome 'doc' alla cartella di pubblicazione generata da angular (normalmente si chiama dist)
- --base-href /SmartCv/ assegna al href dell'index.html il nome del branch in uso. Senza di questo, il server web di github non riesce a trovare i file del sito, perchè li cerca sempre al path 
https://nome-utente-github.github.io/nome-branch
ES LINK FUNZIONANTE: https://stefanoyoyo.github.io/SmartCv/#/homepage

## COME MUOVERSI NEL PROGETTO DA STACKBLITS 
https://customcv-naet--4200--96435430.local-corp.webcontainer.io/#/skills

## ALGORITMO PER COMPRIRE TESTO 
https://craftyspace.net/huffman/