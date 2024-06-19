function GetCarContent() {
  // get input data
  var provider = document.getElementById("providerInput").value;
  var rentPlace = document.getElementById("rentPlaceInput").value;
  var returnPlace = document.getElementById("returnPlaceInput").value;
  var carModell = document.getElementById("carModelInput").value;
  var seatNumber = document.getElementById("seatNumberInput").value;
  var ausleihdatum = document.getElementById("startTimeInput").value;
  var rueckgabedatum = document.getElementById("endTimeInput").value;
  var preis = document.getElementById("priceInput").value;


  // create API-URL with parameters
  const baseUrl = "http://localhost:3003/autos/details?";
  var params = "";
  if (provider) params += "anbieter=" + encodeURIComponent(provider);
  if (rentPlace) params += "&ausleihort=" + encodeURIComponent(rentPlace);
  if (returnPlace) params += "&rueckgabeort=" + encodeURIComponent(returnPlace);
  if (carModell) params += "&modell=" + encodeURIComponent(carModell);
  if (seatNumber) params += "&anzahl_sitze=" + encodeURIComponent(seatNumber);
  if (ausleihdatum) params += "&ausleihdatum=" + encodeURIComponent(ausleihdatum);
  if (rueckgabedatum) params += "&rueckgabedatum=" + encodeURIComponent(rueckgabedatum);
  if (preis) params += "&preis=" + encodeURIComponent(preis);


  // API-Call
  fetch(baseUrl + params)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // get the table and clear it
      var carTable = document.getElementById("carBackendContent");
      carTable.innerHTML = "";

      // loop through data and add it to table
      data.forEach(function (mietwagen) {
        var row = document.createElement("tr");

        var providerEntry = document.createElement("td");
        providerEntry.textContent = mietwagen.anbieter;
        row.appendChild(providerEntry);

        var carModellEntry = document.createElement("td");
        carModellEntry.textContent = mietwagen.modell;
        row.appendChild(carModellEntry);

        var seatNumberEntry = document.createElement("td");
        seatNumberEntry.textContent = mietwagen.anzahl_sitze;
        row.appendChild(seatNumberEntry);

        var priceEntry = document.createElement("td");
        priceEntry.textContent = mietwagen.preis;
        row.appendChild(priceEntry);

        carTable.appendChild(row);
      });
    })
    .catch(function (error) {
      console.log("Fehler bei API-Abfrage:", error);
    });
}