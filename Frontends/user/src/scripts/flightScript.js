function FLUG_FUNKTION() {
  // Eingabedaten erfassen
  var fluggesellschaft = document.getElementById("airlineInput").value;
  var abflugort = document.getElementById("departurePlacInput").value;
  var ankunftsort = document.getElementById("arrivalPlaceInput").value;
  var abflugszeit = document.getElementById("departureTimeInput").value;
  var ankunftszeit = document.getElementById("arrivalTimeInput").value;
  var anzahl_freier_sitzplaetze = document.getElementById("freeSeatsInput").value;
  var preis_pro_sitzplatz = document.getElementById("priceInput").value;


  // API-URL erstellen
  const baseUrl = "http://localhost:3001/fluege/details?";
  var params = "";
  if (fluggesellschaft) params += "fluggesellschaft=" + encodeURIComponent(fluggesellschaft);
  if (abflugort) params += "&abflugort=" + encodeURIComponent(abflugort);
  if (ankunftsort) params += "&ankunftsort=" + encodeURIComponent(ankunftsort);
  if (abflugszeit) params += "&abflugszeit=" + encodeURIComponent(abflugszeit);
  if (ankunftszeit) params += "&ankunftszeit=" + encodeURIComponent(ankunftszeit);
  if (anzahl_freier_sitzplaetze) params += "&anzahl_freier_sitzplaetze=" + encodeURIComponent(anzahl_freier_sitzplaetze);
  if (preis_pro_sitzplatz) params += "&preis_pro_sitzplatz=" + encodeURIComponent(preis_pro_sitzplatz);


  // API-Call
  fetch(baseUrl + params)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // get the table and clear it
      var flightTable = document.getElementById("flightBackendContent");
      flightTable.innerHTML = "";

      // loop through data and add it to table
      data.forEach(function (flug) {
        var row = document.createElement("tr");

        var airlineEntry = document.createElement("td");
        airlineEntry.textContent = flug.fluggesellschaft;
        row.appendChild(airlineEntry);

        var flightNumberEntry = document.createElement("td");
        flightNumberEntry.textContent = flug.flugnummer;
        row.appendChild(flightNumberEntry);

        var departureTimeEntry = document.createElement("td");
        departureTimeEntry.textContent = flug.abflugszeit;
        row.appendChild(departureTimeEntry);

        var arrivalTimeEntry = document.createElement("td");
        arrivalTimeEntry.textContent = flug.ankunftszeit;
        row.appendChild(arrivalTimeEntry);

        var priceEntry = document.createElement("td");
        priceEntry.textContent = flug.preis_pro_sitzplatz;
        row.appendChild(priceEntry);

        flightTable.appendChild(row);
      });
    })
    .catch(function (error) {
      console.log("Fehler bei der API-Abfrage:", error);
    });
}
