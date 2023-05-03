# Progvaramu


## Projekti ülesseadmine arendamiseks
Järgnev juhend aitab ülesseada kõik vajaliku, et rakendus lokaalses arvutis tööle saada. Lokaalselt on võimalik rakendust edasi arendada ja samas ka testida.

## Andmebaas

Andmebaasi koostamiseks on vajalik Dockeri olemasolu. Dockeri saab vajadusel alla laadida [siit](https://www.docker.com/products/docker-desktop/).

Andmebaasi koostamiseks: 
* Avage terminaliaken
  * Windows - Win + R, otsi "cmd" ja vajuta Enter
  * Linux, Ubuntu - Ctrl + Alt + T
  * Mac - Command + tühik, otsi "terminal" ja vajuta Enter
* Koostage docker image: ``` docker build -t hades-clean-dev-db-image ./ ```
* Koostage docker konteiner: ``` docker run -d --name my-postgresdb-container -p 6500:5432 hades-clean-dev-db ```

Kontrollimiseks, kas andmebaasi loomine õnnestus võite kontrollida Docker Desktopi kaudu, kas "Containers" vaate all on näha konteinerit nimega "hades-dev-container".

## Tagasüsteem (backend)

Tagasüsteemi jooksutamiseks on tarvis seadistada arvuti kasutama Java 17.

Kui Java 17 puudub, siis saab selle alla laadida [siit](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).
Valige enda operatsioonisüsteemile vastav fail.

### Windows
Seadistage arvuti kasutama Java 17:

Lõpetage Java 17 installimine. Avage Windows otsing ja otsige "edit the system environment variables".

Kui arvutis pole JAVA_HOME varasemalt seadistatud, siis:
  * System variables -> New
      * Variable name = "JAVA_HOME"
      * Variable value = *installitud Java 17 aadress* (tavaliselt C:\Program Files\Java\jdk-17)

Kui arvutis on JAVA_HOME seadistatud, siis:

  * Otsige System variables alt "JAVA_HOME" muutuja
    * Muutke aadress installitud Java 17 kausta peale (tavaliselt C:\Program Files\Java\jdk-17)
    
Selleks, et kontrollida, kas Windows kasutab Java 17 avage terminal ja vaadake süsteemi Java versiooni käsuga ```java -version```

Väljund võiks olla näiteks: "java version "17.0.6".



