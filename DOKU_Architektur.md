# DOKU_Architektur

Unser System ist in eine modulare Architektur gegliedert, die aus mehreren Microservices und Frontends besteht, um eine skalierbare und benutzerfreundliche Plattform zu gewährleisten. Um das System zu nutzen, muss das standardmäßige `node_modules`-Verzeichnis zu den jeweiligen Microservices hinzugefügt werden.

## Microservices

Jeder Microservice verfügt über eine dedizierte Datenbank.

### BewertungsMicroservice
Der BewertungsMicroservice verwaltet alle Aspekte der Kundenbewertungen. Er ermöglicht das Hinzufügen neuer Bewertungen, das Abrufen bestehender Bewertungen und das Aktualisieren von Bewertungsdaten.

### FlugMicroservice
Der FlugMicroservice bietet Funktionen für die Verwaltung von Flugdaten. Er stellt Informationen zu Flugrouten, Abflug- und Ankunftszeiten sowie Preisen bereit und ermöglicht Benutzern das Buchen von Flügen.

### HotelMicroservice
Der HotelMicroservice verwaltet alle hotelbezogenen Informationen. Dies umfasst die Verwaltung von Hotelstandorten, Verfügbarkeit von Zimmern, Buchungen und Preisen.

### MietwagenMicroservice
Der MietwagenMicroservice bietet Funktionalitäten zur Verwaltung von Mietwagenangeboten. Benutzer können Mietwagen reservieren, Verfügbarkeit prüfen und Reservierungen stornieren.

Jeder Microservice ist unabhängig voneinander entwickelt, um spezifische Geschäftsfunktionen abzudecken und kann horizontal skalieren, um eine hohe Verfügbarkeit und Leistung zu gewährleisten.

## Frontends

### User-Frontend
Das User-Frontend ist für normale Benutzer konzipiert, die grundlegende Lesezugriffe benötigen. Es bietet eine intuitive Benutzeroberfläche zum Durchsuchen von Hotels, Flügen, Mietwagenangeboten und Bewertungen.

### Admin-Frontend
Das Admin-Frontend richtet sich an Administratoren mit erweiterten Berechtigungen. Administratoren können nicht nur Daten anzeigen, sondern auch neue Hotels hinzufügen, Flugdaten aktualisieren, Mietwagenangebote löschen und Bewertungen verwalten.

Beide Frontends sind eng an die jeweiligen Benutzeranforderungen angepasst und bieten eine nahtlose Benutzererfahrung. Die klare Trennung zwischen User- und Admin-Funktionalitäten gewährleistet Sicherheit und Benutzerfreundlichkeit.

Die Architektur ermöglicht eine flexible Erweiterung der Funktionalitäten und eine einfache Integration neuer Microservices, um auf zukünftige Anforderungen reagieren zu können.
