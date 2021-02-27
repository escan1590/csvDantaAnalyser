# GL02 RH - Synevent

## Installation

Node.js installation de la librairie _node-module_ :

```bash
npm install
```

Installation de la libraire _Date-fns_ pour la gestion des dates :

```bash
npm install date-fns --save
```

Si l'installation du node module n'a pas fonctionné correctement, il est également nécessaire d'installer la libraire _sharp_ :

```bash
npm install sharp
```

<<<<<<< .mine
=======


>>>>>>> .r41
## Utilisation

### Commande générale

```bash
node index.js <command> (ou simplement node index <command>)
```

### Aide

```bash
node index.js help (ou simplement node index -h)
```

<<<<<<< .mine
### IND1 : Donner le nombre de tweets sur un hashtag par journée et/ou sur une période donnée.
=======
### NONE : Verifie si les fichiers le logiciel arrive bien à lire/trouver les fichiers dans le dossier ./data
>>>>>>> .r41

<<<<<<< .mine
=======
```bash
node index.js check
```
**Résultat (si tout c'est bien passé) :**

```bash
We have found "3471" tweets in "11" differents folders from ./data
In "317"ms.
```

>>>>>>> .r41
**Gestion des erreurs :**

- Si vous n'avez pas de dossier `./data`
```bash
error: ENOENT: no such file or directory, scandir 
'./src/data'

```
- Si le dossier `./data` est vide
```bash
We have found 0 tweet in the folder undefined from ./data
In 0ms.

```




### 1 :  Donner le nombre de tweets sur un hashtag par journée et/ou sur une période donnée.

```bash
node index.js nbTweetHashtag <hashtag> <dateDébut> <dateFin>
```

**Résultat (exemple de dates) :**

```bash
$ node index.js nbTweetHashtag --hashtag eaw18 --beginDate "2018-03-23 00:00" --endDate "2018-03-26 00:00" 

There are 383 tweets with the hashtag 'eaw18',
                between the : 2018-03-23 00:00 and the 2018-03-26 00:00.
┌───────────────────┬────────────┬────────┐
│ (iteration index) │    Key     │ Values │
├───────────────────┼────────────┼────────┤
│         0         │  'Friday'  │  317   │
│         1         │ 'Saturday' │   46   │
│         2         │  'Sunday'  │   20   │
└───────────────────┴────────────┴────────┘

$ node index.js nbTweetHashtag

There are 3471 tweets  with all the hashtags,
                    between the : `1970-01-01T00:00:00.000Z` and the `2021-01-10T20:57:27.978Z`
┌───────────────────┬─────────────┬────────┐
│ (iteration index) │     Key     │ Values │
├───────────────────┼─────────────┼────────┤
│         0         │  'Friday'   │  1835  │
│         1         │ 'Saturday'  │  372   │
│         2         │  'Monday'   │   33   │
│         3         │  'Tuesday'  │   51   │
│         4         │  'Sunday'   │  173   │
│         5         │ 'Thursday'  │  913   │
│         6         │ 'Wednesday' │   94   │
└───────────────────┴─────────────┴────────┘
```

<<<<<<< .mine
=======
- Retourne aussi un fichier .txt et un graphique en forme d'histogramme en .svg et .png avec les mêmes données.


>>>>>>> .r41
**Gestion des erreurs :**

- Indiquer à l'utilisateur que le hashtag saisi n'existe pas encore

```bash
$ node index.js nbTweetHashtag data/ bsoir "2018-03-23 00:00" "2018-03-26 00:00"

Oops ! This hashtag doesn't exist yet. (Try EAW18 for example)
There is 0 tweet with the hashtag 'bsoir',
                    between the : 2018-03-23 00:00 and the 2018-03-26 00:00.
```

- Indiquer à l'utilisateur que les dates n'ont pas le bon format et/ou qu'elles ne sont pas écrites dans le bon ordre chronologique

```bash
$ node index.js nbTweetHashtag data/ eaw18 "2018-03-26 00:00" "2018-03-23 00:00"

Be careful ! The dates format is not correct. You should use this format : "YYYY-MM-DD HH:MM"
And do not forget to put the dates in order.
```

ou

```bash
$ node index.js nbTweetHashtag data/ eaw18 Friday Monday

Warning ! The dates format is not correct. You should use this format : "YYYY-MM-DD HH:MM"
And do not forget to put the dates in order.
```

### 2 : Donner le top 10 des tweets comportant un hashtag ayant été le plus retweeté.

```bash
node index.js topTenTweet #<hashtag>
```

**Résultat :**

```bash
$ node index.js topTenTweet #EAW18
{
  Date_publication: 2018-03-23T15:02:04.000Z,
  Auteur: 'Michael L. Nelson',
  IDauteur: '@Michael L. Nelson',
  hashtags: [ '#EAW18' ],
  Lieu: 'Norfolk, VA',
  Langue_utilisateur: 'en',
  ID: '977198802619781120',
  Url: 'https://twitter.com/phonedude_mln/status/977198802619781120',
  Text: '"Weaponized Web Archives: Provenance Laundering of Short Order Evidence"\n' +
    '#EAW18 @WebSciDL @hvdsomp @weiglemc @stewartbrand',
  media: '',
  info_auteur: 'Head of @WebSciDL, Computer Science, Old Dominion University; Formerly: @NASA_Langley (1991-2002), @UNCSILS (2000-2001); \n' +
    'OAI-PMH OAI-ORE Memento ResourceSync',
  Retweet: 46,
  Like: 50,
  Utilisateur_verifie: false
}
{
  Date_publication: 2018-03-17T16:10:11.000Z,
  Auteur: 'Bergis Jules ��',
  IDauteur: '@Bergis Jules ��',
  hashtags: [ '#EAW18' ],
  Lieu: 'California, USA',
  Langue_utilisateur: 'en',
  ID: '975041617684934656',
  Url: 'https://twitter.com/BergisJules/status/975041617684934656',
  Text: 'On March 22nd-24th, 2018 @documentnow and @rhizome/@webrecorder_io will host Ethics and Archiving the Web in NYC. I hope you can join us in person or via the livestream. Much thanks to @US_IMLS &amp; @knightfdn for supporting. https://t.co/PfmlVLYxsA #EAW18',
  media: '',
  info_auteur: 'immigrant | archivist | doer of things | @DocumentNow https://t.co/s643ifXmdI',
  Retweet: 77,
  Like: 90,
  Utilisateur_verifie: false
}

(... etc)
```

- Création d'un fichier `.txt` dans le dossier _TopTens_ : `\src\TopTens\top10tweets.txt` :

```
1.
Date_publication:Fri Mar 23 2018 16:02:04 GMT+0100 (GMT+01:00)
Auteur:Michael L. Nelson
IDauteur:@Michael L. Nelson
hashtags:#EAW18
Lieu:Norfolk, VA
Langue_utilisateur:en
ID:977198802619781120
Url:https://twitter.com/phonedude_mln/status/977198802619781120
Text:"Weaponized Web Archives: Provenance Laundering of Short Order Evidence"
#EAW18 @WebSciDL @hvdsomp @weiglemc @stewartbrand
media:
info_auteur:Head of @WebSciDL, Computer Science, Old Dominion University; Formerly: @NASA_Langley (1991-2002), @UNCSILS (2000-2001);
OAI-PMH OAI-ORE Memento ResourceSync
Retweet:46
Like:50
Utilisateur_verifie:false


2.
Date_publication:Sat Mar 17 2018 17:10:11 GMT+0100 (GMT+01:00)
Auteur:Bergis Jules 🇱🇨
IDauteur:@Bergis Jules 🇱🇨
hashtags:#EAW18
Lieu:California, USA
Langue_utilisateur:en
ID:975041617684934656
Url:https://twitter.com/BergisJules/status/975041617684934656
Text:On March 22nd-24th, 2018 @documentnow and @rhizome/@webrecorder_io will host Ethics and Archiving the Web in NYC. I hope you can join us in person or via the livestream. Much thanks to @US_IMLS &amp; @knightfdn for supporting. https://t.co/PfmlVLYxsA #EAW18
media:
info_auteur:immigrant | archivist | doer of things | @DocumentNow https://t.co/s643ifXmdI
Retweet:77
Like:90
Utilisateur_verifie:false

(... etc jusqu'à 10)
```

**Gestion des erreurs :**

- Gestion du cas où aucun hashtag n’est spécifié ou n'existe pas, ou bien, lorsque le nombre tweets est insuffisant.

```bash
$ node index.js topTenTweet '#EAW'

error: Error Less than 10 tweets or non-Existant hashtag
```

### 3 : Donner le top 10 des auteurs de tweets avec le plus d’informations à leur sujet.

```bash
node index.js topTenAuthor #<hashtag>
```

**Résultat :**

```bash
$ node index.js topTenAuthor #eaw18
Auteur {
  user_created_at: 2014-09-05T13:04:57.000Z,
  user_screen_name: 'sdaythomson',
  user_default_profile_image: false,
  user_description: 'Research Officer for Digital Preservation Coalition. Preserving bits and drinking tea. Views my own.',
  user_favourites_count: 1566,
  user_followers_count: 827,
  user_friends_count: 555,
  user_listed_count: 33,
  user_location: 'Glasgow, UK',
  user_name: 'Sara Day Thomson',
  user_statuses_count: 1596,
  user_time_zone: '',
  user_urls: '',
  user_verified: false,
  retweet_count: 22,
  recurrence: 6
}
Auteur {
  user_created_at: 2009-02-25T04:18:34.000Z,
  user_screen_name: 'ablwr',
  user_default_profile_image: false,
	...
}
(... etc)

Check ! We found tweets with the hashtag '#eaw18'
```

**Gestion des erreurs :**

- Gestion du cas où aucun hashtag n’est spécifié ou n'existe pas.

```bash
$ node index.js topTenAuthor '#ea8'

Oops ! No tweet has been found with the hashtag '#ea8'
```

### 4 : Donner la liste des hashtags associés à un hashtag de référence.

```bash
node index.js refHash <hashtag>
```

**Résultat :**

```bash
$ node index.js refHash "#EAW18"
Hashtify { hashtag: '#liulockout', rec: 1 }
Hashtify { hashtag: '#hail', rec: 1 }
Hashtify { hashtag: '#GoBlue', rec: 2 }
Hashtify { hashtag: '#ethics', rec: 4 }
Hashtify { hashtag: '#webarchiving', rec: 8 }
```

- Création d'un fichier `.txt` dans un nouveau dossier : `\src\TopTens\HashtagAssociate.txt` et aussi de 2 graphiques `HashtagAssociate_Proportion`  cirulaire
et `HashtagAssociate_Bar` en histogramme en `.svg` en `.png`.

```
Reference Hashtag Associate: #EAW18

1.
hashtag:#liulockout
rec:1


2.
hashtag:#hail
rec:1


3.
hashtag:#GoBlue
rec:2


4.
hashtag:#ethics
rec:4


5.
hashtag:#webarchiving
rec:8
```

**Gestion des erreurs :**

- Gestion du cas où aucun hashtag n’est spécifié ou n'existe pas.

```bash
$ node index.js refHash "#EA"

error: nonExistant Hashtag
```

### IND5 : Visualiser la proportion de tweets par pays/région.

<<<<<<< .mine
=======



### 5 :  Visualiser la proportion de tweets par pays/région.

>>>>>>> .r41
```bash
node index.js viz-fd
```

**Résultat :**

```bash
$ node index.js viz-fd
VisuaKeep { location: 'New York, NY', count: 226 }
VisuaKeep { location: 'Norfolk, VA', count: 58 }
VisuaKeep { location: 'Seattle, WA', count: 19 }
VisuaKeep { location: 'Hanover, NH', count: 14 }
VisuaKeep { location: 'Brooklyn', count: 92 }
VisuaKeep { location: 'eXistenZ', count: 57 }
VisuaKeep { location: 'Badalona, Espanya', count: 19 }
VisuaKeep { location: 'London', count: 23 }
VisuaKeep { location: 'Amherst, MA', count: 136 }
VisuaKeep {
  location: 'Massachusett land//what is currently Massachusetts',
  count: 1
}
VisuaKeep { location: 'May Subd Geog', count: 77 }
VisuaKeep { location: 'Around the way', count: 3 }
VisuaKeep { location: 'Lenapehoking', count: 21 }
VisuaKeep { location: 'Maryland, USA', count: 24 }
VisuaKeep { location: 'Providence, RI', count: 44 }
VisuaKeep { location: 'up norf.', count: 9 }
VisuaKeep { location: 'Urbana-Champaign, Illinois', count: 2 }
VisuaKeep { location: 'Columbia, SC', count: 4 }
VisuaKeep { location: 'Wakanda ��', count: 83 }
VisuaKeep { location: 'Philadelphia, Pennsylvania', count: 5 }
VisuaKeep { location: "Schrödinger's Box", count: 1 }
VisuaKeep { location: 'Chesapeake City, MD', count: 1 }
VisuaKeep { location: 'Silver Spring, MD', count: 88 }
VisuaKeep {
  location: 'Budapest, Hungary and Western NY State',
  count: 5
}

(... etc)
```

> Le png généré pour autant de données est complètement illisible. C'est pour cela que nous avons décidé de créer une deuxième commande en ciblant des dates précises (voir ci-dessous).

**Autre possibilité pour traiter seulement entre deux journées précises** :

Traitement des tweets en fonction de dates :

```bash
node index.js viz-fld 19 Mar 23 Mar
```

​ **Attention**, il faut bien respecter cette syntaxe :

<<<<<<< .mine
​ `viz-fld 'dayNum' 'monthString' 'dayNum' 'monthString' quotes are importants`
=======
​	` viz-fld dayNum monthString dayNum monthString no quotes required `
>>>>>>> .r41

**Gestion des erreurs :**

- Format des données saisies

```bash
<<<<<<< .mine
$ node index.js viz-fld '19' 'Mar' '23' 'Mar'
Warning ! Empty file, or wrong format of data.It should be like : viz-fld 'dayNum' 'monthString' 'dayNum' 'monthString' and quotes are importants
=======
$ node index.js viz-fld 19 Mar 23 M
Warning ! Empty file, or wrong format of data.It should be like : viz-fld dayNum monthString dayNum monthString   
No quote required
>>>>>>> .r41
```

---

<<<<<<< .mine
=======
### 6 : Donne le top 10 des hashtags

```bash
node index.js topTenHashtag [dateMin] [dateMax] [nbr]
```

>>>>>>> .r41
**Résultat :**

```bash
$ node index topTenHashtag  --dateMin "2000-01-01 00:00" --dateMax "2020-01-01 00:00" --nbr 5

[ 
  hashtagNbr { hashtag: '#eaw18', number: 1782 },
  hashtagNbr { hashtag: '#webarchiving', number: 51 },
  hashtagNbr { hashtag: '#neaartsp18', number: 15 },
  hashtagNbr { hashtag: '#mac2018', number: 11 },
  hashtagNbr { hashtag: '#digipres', number: 11 } 
]

Check !Files are created in the directory './src/TopTens/Hashtag_Top_5.png or .svg'
```

**Gestion des erreurs :**

-

```bash
$ node index topTenHashtag --nbr -1 

--> Si le nbr rentré est incorrect ou si nbr n''est pas défini on prend 10 par défault
```

```bash
$ node index topTenHashtag --nbr 5 --dateMin 2020-01-01 --dateMax 2005-02-15
--> Si la date ne respecte pas se format "YYYY-MM-DD HH:MM" on prend `new Date(0)` pour dateMin et `new Date(now)` pour dateMax
```

### EXTR : Extrait des tweets selon les critères fournis par l'utilisateur

```bash
node index.js extractTweet [f]|[fileName] [dateMax] [dateMin] [t]|[hashtag] [a]|[author] [idAuthor] [i]|[idTweet] [l]|[lang] [p]|[place] [k]|[keyword]
```

**Résultat :**

```bash
$ node index extractTweet -p France -i 975508974836633601 -a Elise --idAuthor @Lizy1984 -t #TRIFORCE -l en -k hope --dateMin "2018-03-19 00:07:18 +0100" --dateMax "2018-03-19 00:07:18 +0100"

Tweets extracted as ./extractedTweets/search_result (default file).txt.
```
> L'option --fileName permet de choisir un fichier d'enregistrement différent. S'il existe le fichier existant est écrasé, autrement un nouveau est créé dans le dossier 'extractedTweets'.

**Gestion des erreurs :**

- Vérification de la cohérence des dates

```bash
$ node index extractTweet --dateMin "2018-03-19" --dateMax "2018-03-11" -a Elise -k hope

error: The dates are in the wrong order!
```

- Vérification du format de date

```bash
$ node index extractTweet --dateMin "2018-03-195" --dateMax "2018-03-116" -a Elise -k hope
Oops! The --dateMin option is invalide, so it has been ignored.
Oops! The --dateMax option is invalide, so it has been ignored.

Tweets extracted as ./extractedTweets/search_result (default file).txt.
```




### RECH : Rechercher des tweets selon les critères fournis par l'utilisateur

```bash
node index.js searchTweet [dateMax] [dateMin] [t]|[hashtag] [a]|[author] [idAuthor] [i]|[idTweet] [l]|[lang] [p]|[place] [k]|[keyword]
```

**Résultat :**

```bash
$ node index searchTweet -p France -i 975508974836633601 -a Elise --idAuthor @Lizy1984 -t #TRIFORCE -l en -k hope --dateMin "2018-03-19 00:07:18 +0100" --dateMax "2018-03-19 00:07:18 +0100"
{
  Date_publication: 2018-03-18T23:07:18.000Z,
  Auteur: 'Elise Atangana',
  IDauteur: '@Lizy1984',
  Hashtags: [ '#TRIFORCE' ],
  Lieu: 'Paris, France',
  Langue_utilisateur: 'en',
  ID: '975508974836633601',
  Url: 'https://twitter.com/Lizy1984/status/975508974836633601',
  Text: 'RT @BergisJules: On March 22nd-24th, 2018 @documentnow and @rhizome/@webrecorder_io will host Ethics and Archiving the Web in NYC. I hope y…',
  Media: '',
  Info_auteur: '#independent #art #curatorialproject #ontheroof #revuenoire #digital #communication #mobility #SNCF',
  Retweet: 77,
  Like: 0,
  Utilisateur_verifie: false
}
```

**Gestion des erreurs :**

- Vérification de la cohérence des dates

```bash
$ node index searchTweet --dateMin "2018-03-19" --dateMax "2018-03-11" -a Elise -k hope

error: The dates are in the wrong order!
```

- Vérification du format de date

```bash
$ node index searchTweet --dateMin "2018-03-195" --dateMax "2018-03-116" -a Elise -k hope
Oops! The --dateMin option is invalide, so it has been ignored.
Oops! The --dateMax option is invalide, so it has been ignored.
{
  Date_publication: 2018-03-18T23:07:18.000Z,
  Auteur: 'Elise Atangana',
  IDauteur: '@Lizy1984',
  Hashtags: [ '#TRIFORCE' ],
  Lieu: 'Paris, France',
  Langue_utilisateur: 'en',
  ID: '975508974836633601',
  Url: 'https://twitter.com/Lizy1984/status/975508974836633601',
  Text: 'RT @BergisJules: On March 22nd-24th, 2018 @documentnow and @rhizome/@webrecorder_io will host Ethics and Archiving the Web in NYC. I hope y…',
  Media: '',
  Info_auteur: '#independent #art #curatorialproject #ontheroof #revuenoire #digital #communication #mobility #SNCF',
  Retweet: 77,
  Like: 0,
  Utilisateur_verifie: false
}
```






### Version :

#### 0.18

- Add some documentation to the 'topTenHashtag' command

#### 0.17

- Add `check` function to check if the software can find the differents csv files in the `./data` folder

#### 0.16

- Add charts and .txt file for the functions `refHash` and `nbTweetHashtag`
- Create a file `./creatChart.js` for all the charts

#### 0.15

- Add `searchTweet` and `extractTweet` documentation
- `No results found bug` solved

#### 0.14

- 'searchTweet' command implementation finished
- 'extractTweet' command implementation finished

#### 0.12

- Start the implementation of the 'extractTweet' command

#### 0.10

- Start the implementation of the 'searchTweet' command

#### 0.09

- Add some documentation

#### 0.00 - 0.07

Command implemented:
- check
- viz-fd
- viz-fld
- topTenTweet
- topTenAuthor
- nbTweetHashtag
- refHash

- Start the documentation

## List of Contributors

#Phase 2 (implementation v0.07)
- [Elina_ROBERT](elina.robert@utt.fr)
- [Franck_Emmanuel_FOTSO_TALLA](franck_emmanuel.fotso_talla@utt.fr)
- [Daniel_TCHATCHOUANG_OUOKAM](daniel.tchatchouang_ouokam@utt.fr)
- [Noémie_HAMMANN](noemie.hammann@utt.fr)

#Phase 3 (maintenance vX.XX)
 - [Shiqi_Gao](shiqi.gao@utt.fr)
 - [Ludovic_Marquès](ludovic.marques@utt.fr)
 - [Loïc_Sauter](loic.sauter@utt.fr)

### TO DO

1. La commande de recherche `RECH` n'a pas pu être finalisée dans les temps impartis. (FAIT)

<<<<<<< .mine
2. La commande `EXTR` d'extraction de tweets n'a pas pu être commencée car elle dépend de la commande de recherche.
=======
2. La commande `EXTR` d'extraction de tweets n'a pas pu être commencée car elle dépend de la commande de recherche. (FAIT)

3. Specifies the final maintenance version

4. Ajouter des graphiques et des fichiers .txt pour les fonctions `refHash` et `nbTweetHashtag`

5. Ajouter la fonction check pour vérifier si les fichiers .csv sont lisibles

>>>>>>> .r41
