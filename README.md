# orleans-isochrone

[Accéder à la démo](https://benjaminhabert.github.io/orleans_isochrone/)

![map of Orléans](screenshot.png)

## Informations générales

Cette carte représente le temps de déplacement à Orléans en transports en commun. Par exemple la zone jaune représente un déplacement de 30 minutes ou moins depuis le marqueur bleu. Il est possible de modifier le jour et l'horaire de départ du déplacement.

Le réseau de transport d'Orléans est administré par [Tao](https://www.reseau-tao.fr/index.php?), il comprend **2 lignes de Tram** et **42 lignes de bus**. Nous utilisons les horaires de passages *théoriques* fournis par Tao pour estimer les temps de déplacement (disponibles [ici](https://transport.data.gouv.fr/resources/10221)). Plus précisément nous utilisons les journées suivantes :
 - Jeudi 2 Juillet 2020
 - Samedi 4 Juiller 2020
 - Dimanche 5 Juillet 2020


## Informations techniques

- Sources de données:
    - données GTFS avec les horaires de passage théorique des trams et bus: [transport.data.gouv.fr](https://transport.data.gouv.fr/resources/10221)
    - données cartographiques [openstreetmap](https://download.geofabrik.de/europe/france/centre.html) de la région Centre

- Logiciels
    - [Graphhopper](https://github.com/graphhopper/graphhopper) est utilisé pour analyser les données et produire les courbes isochrones de déplacement
    - Vuejs pour développer le site web

- Inrastructure
    - github-pages pour l'hébergement du site web (statique)
    - AWS EC2 pour héberger le back-end (graphhopper)


# Development information


## Front-end setup

```
git clone https://github.com/BenjaminHabert/orleans_isochrone.git
cd orleans-isochrone/
npm install
npm run serve
npm run lint
npm run build
```

**Note** : the build was slightly modified in `vue.conig.js` to make it compatible with github-pages.


## Back-end infrastructure details

### Graphhopper

Graphhopper provides a quickstart example for routing / isochrone mapping [here](https://github.com/graphhopper/graphhopper/blob/master/reader-gtfs/README.md#quick-start) which uses this [configuration](https://github.com/graphhopper/graphhopper/blob/master/reader-gtfs/config-example-pt.yml). [Here](https://github.com/graphhopper/graphhopper/blob/stable/docs/web/api-doc.md#isochrone) is a short API description for their isochrone feature.

When graphhopper is launched for the first time, the data is analysed and graph data is created. On the next launch only the graph data is used; the input data can be discarded. Because this first run is computationnaly heavy, it can be run on a more powerful machine than the one used for the server.

### Server

I use as a server a virtual machine (EC2 on AWS) with 4Gb ram (in my situation graphhopper uses ~1.5 Gb). The graph data was generated on another machine and then uploaded.

nginx is used to encrypt the traffic and to redirect queries to graphhopper with runs as localhost. [certbot](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx) was used to generate the certificate (which required having a domain name).

