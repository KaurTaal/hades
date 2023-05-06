# Progvaramu


## Projekti ülesseadmine arendamiseks
Järgnev juhend aitab üles seada kõik vajaliku, et rakendus lokaalses arvutis tööle saada. Lokaalselt on võimalik rakendust edasi arendada ja samas ka testida.

## Andmebaas

Andmebaasi koostamiseks on vajalik Dockeri olemasolu. Dockeri saab vajadusel alla laadida [siit](https://www.docker.com/products/docker-desktop/).

Andmebaasi koostamiseks: 
* Avage terminaliaken kataloogis ```hades/database```
* Koostage Dockeri tõmmis: ```docker build -t hades-db-image .```
* Koostage Dockeri konteiner: ```docker run -d --name hades-db-container -p 6500:5432 hades-db-image```

Peale eelnevaid tegevusi peaks töötama andmebaasi konteiner algse struktuuriga. 
Konteineri kohta saate infot näiteks käsuga ```docker ps``` või avades Docker Desktopi.

Andmebaas sisaldab ühte admin kasutajat:  
- E-mail: ``taalkaur@gmail.com``
- parool: ``hB64m,'8XQb+X$C%LC(P3M5;4U"=qj,5``

## Tagasüsteem (backend)

Tagasüsteemi on võimalik käivitada kahte moodi. Esimene variant on käivitada Spring Boot lokaalselt (sobilikum variant arendamiseks) või
käivitada Spring Boot koos andmebaasiga Dockeris.

### Lokaalselt käivitamine

Tagasüsteemi jooksutamiseks on tarvis seadistada arvuti kasutama Java 17. Java versiooni kontrollimiseks sisestage käsk ``java -version``.
Kui Java 17 puudub, siis saab selle alla laadida [siit](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).

Lisaks on tarvis Gradle'it. Gradle'i jaoks on vajadusel põhjalik installimisjuhend [siin](https://gradle.org/install/). Juhendist on võimalik
leida juhiseid nii Windowsi kui ka teiste operatsioonisüsteemide jaoks.

Tagasüsteemi käivitamise eelduseks on töötav andmebaas ja korrektne seadistus baasiga ühenduse loomiseks. Kui andmebaas on loodud eelneva peatüki 
järgi, siis faili `application.properties` sisu võiks olla järgnev:

```
server.port = 8081
spring.datasource.url= jdbc:postgresql://localhost:6500/hades
spring.database.driverClassName=org.postgresql.Driver
spring.datasource.username = postgres
spring.datasource.password = hades-dev
```

Käivitamine:

- Avage terminaliaken kataloogis ``hades/backend``
- Sisestage käsk ``gradle bootRun``

Kui käivitamisel ilmnevad Java versiooni vead, siis tasub kontrollida Gradle'i poolt kasutatavat Java versiooni käsuga ``gradle -version``.  

Eduka rakenduse käivitumisel on võimalik kontrollida rakenduse töökorras olemist aadressil ``http://localhost:8081/api/health/check``.

### Dockeriga käivitamine

Looge andmebaasi image, kui Te seda pole veel teinud:
- Kataloogis `hades/database` käsk `docker build -t hades-db-image .`

Looge tagasüsteemi tõmmis, kui Te seda pole veel teinud:
- Avage terminaliaken kataloogis `hades/backend`
- Sisestage `gradle clean`
- Sisestage `gradle bootJar`
- Sisestage `docker build -t hades-backend-image .`
- Siestage `docker compose -f docker-compose-be-with-db.yml up -d`

Eduka rakenduse käivitumisel on võimalik kontrollida rakenduse töökorras olemist aadressil `http://localhost:6358/api/health/check`

## Eesliides (frontend)

Eesliidest on samuti võimalik käivitada lokaalselt ja luua sellele docker image. 
Lokaalselt kasutamiseks tuleks eelistada lokaalselt käivitamise varianti.

### Lokaalselt käivitamine

Eesliidese jooksutamiseks on tarvis installida Node.js. Kui arvutis puudub Node, 
siis on võimalik seda alla laadida [siit](https://nodejs.org/en/download) (valige "LTS" versioon).

NB! Enne käivitamist tehke kindlaks, et eesliidese fail `hades/frontend/proxy.config.json` kasutaks õiget tagasüsteemi porti.
Vastavalt juhendi eelnevatele punktidele on see kas `8081` või `6358`.

Käivitamine:  
- Avage terminaliaken kataloogis `hades/frontend`
- Sisetage käsk `npm install`
- Sisestage käsk `npm run start`

Rakendus peaks olema kättesaadav lingil `http://localhost:4200/public/login`.


### Docker konteineri loomine kasutuskeskkonna jaoks

- Avage terminaliaken kataloogis `hades/frontend`
- Sisestage käsk `docker build -t hades-frontend-image .`
- Sisestage käsk `docker run -d --name hades-frontend-container -p 7500:80 hades-frontend-image`

NB! Enne tõmmise loomist tehke kindlaks, et failis `nginx.conf` on `proxy_pass` tagasüsteemi päringute puhul seadistatud korrektsele aadressile.
