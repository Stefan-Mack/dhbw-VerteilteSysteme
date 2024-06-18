# DOKU_Benutzer

## Anleitung zur Nutzung der Webseite

Unsere Webseite "MeinUrlaub" bietet zwei verschiedene Frontends: 
- **Admin-Webfrontend**
- **User-Webfrontend**

Diese Aufteilung ermöglicht es Benutzern mit unterschiedlichen Berechtigungen auf die Datenbank zuzugreifen. 
- **User:** nur Lesezugriff
- **Administrator:** kann Daten lesen, erstellen, aktualisieren und löschen.

- Beide Benutzerrollen haben Zugriff auf die Server für Bewertungen, Hotels, Flüge und Mietwagen.


### Anleitung für das User-Webfrontend:

In der Navigationsleiste hat der Benutzer die Möglichkeit, zwischen vier verschiedenen Kategorien zu wählen:
- **Navigationsleiste:** Wählen Sie zwischen Hotels, Flügen, Mietwagen oder Bewertungen.
- **Suche:** Geben Sie Ihre Kriterien ein und klicken Sie auf "Suche!".
- **Ergebnisse:** Alle passenden Ergebnisse werden in tabellarischer Form angezeigt.
- **Besonderheiten:** Datumsformat YYYY-MM-DD verwenden. Keine Buchungsmöglichkeit.

- Aktuell ausgewählte Kategorie -> Blau hinterlegte Überschrift in der Navigationsleiste

- Benutzer haben nur Lesezugriff auf die Datenbanken und können nach Hotels, Flügen, Mietwagen oder Bewertungen suchen und anzeigen lassen

- Um eine Suche durchzuführen, muss der Benutzer in der entsprechenden Kategorie sein -> kann seine Suchkriterien in die Eingabefelder eingeben

- Nicht alle Felder müssen ausgefüllt werden -> leere Suche gibt alle Ergebnisse zurück.

- Es gibt keine Rechtschreibüberprüfung

- Eingabefelder variieren je nach Kategorie -> Daten müssen im richtigen Format eingegeben werden (z.B. YYYY-MM-DD für Datumsangaben)

- Start- und Enddatum im Hotel-MS müssen identisch sein, wenn nur Hotels für einen bestimmten Tag gesucht werden sollen

- Die Suche startet nach Bestätigung mit dem Button "Suche!".

- Die Ergebnisse werden in Tabellenform dargestellt -> nur die notwendigsten Informationen werden angezeigt


- Unsere Website bietet keine Buchungsmöglichkeiten an -> dient rein zur Information


### Anleitung für das Admin-Webfrontend:

- Als Administrator hat man Lese- und Schreibzugriff auf die Datenbanken.

- Von den jeweiligen Hauptseiten aus kann der Admin zwei Aktionen ausführen:
  - Daten aus Datenbank anzeigen.
  - Neuen Datensatz anlegen.

- Beim Klicken auf "Anzeigen" nach dem Ausfüllen der Eingabefelder werden die Suchergebnisse angezeigt.

- Die Suche funktioniert analog zur User-Suche.

- Beim Klicken auf "Erstellen" nach vollständigem Ausfüllen der Eingabefelder wird ein neuer Datensatz mit den angegebenen Werten angelegt.

- Für die fehlerfreie Anlage eines neuen Datensatzes müssen alle Eingabefelder gültige Werte enthalten.

- Anforderungen für das Anlegen von:
  - **Hotel:** Name, Ort, Datum, Zimmeranzahl, Zimmerpreis.
  - **Flug:** Fluggesellschaft, Flugnummer, Abflugort, Zielort, Abflugzeit, Ankunftszeit, verfügbare Plätze, Preis pro Person.
  - **Mietwagen:** Anbieter, Ausleihort, Rückgabeort, Fahrzeugtyp, Ausleihdatum, Rückgabedatum, Anzahl der Sitze, Preis.
  - **Bewertung:** Fremd-ID, Kategorie, Sternebewertung, Freitext.

- Der Admin kann in der Ergebnisliste auf Ändern und Löschen von Datensätzen zugreifen.

- Löschen erfolgt mit einem Klick auf den entsprechenden Knopf, Ändern öffnet ein Modal zur Bearbeitung.

- Nicht ausgefüllte Felder im Modal behalten die bestehenden Werte in der Datenbank bei.


- Die CRUD-Funktionalität ist für alle 4 Datenbanken implementiert.

