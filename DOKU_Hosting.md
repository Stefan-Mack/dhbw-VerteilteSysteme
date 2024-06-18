# DOKU_Hosting

## Zusammenfassung

Es ist uns leider nicht gelungen, die Microservices zu hosten.

## Grundsätzliches

- Ziel: Kostenfreies Hosting des gesamten Projekts.

- Gliederung: 
    - Hosting der Datenbanken
    - Hosting der Websites
    - Hosting der Microservices

## Hosting der Datenbanken

Aufgrund unserer Erfahrungen mit **MongoDB** während der Vorlesung haben wir uns entschieden, unsere 4 Datenbanken direkt bei MongoDB zu hosten.

## Hosting der Websites

Ein Gratishoster ist **bplaced freestyle**. 
- bplaced freestyle bietet kostenlose Subdomains an
- Mit .htaccess wäre eine einfache Zugangsbeschränkung für den Adminbereich möglich

## Hosting der Microservices

Leider haben wir keinen geeigneten kostenlosen Hostanbieter für unsere Microservices gefunden, der unseren Ansprüchen gerecht wird und auf dem wir unser System zum Laufen bekommen haben.

Während unserer Suche stießen wir auf **Glitch**, jedoch mit der Einschränkung, dass die Apps nach 5 Minuten in den Sleep-Modus wechseln und alle Projekte öffentlich sind.

Zudem fehlte uns im Rahmen dieses Projekts die Zeit, um die Microservices zu hosten.

## Schlussbemerkung

Aufgrund der Schwierigkeiten beim Deployment der Express-Microservices haben wir auch darauf verzichtet, die HTML-Seiten zu hosten.