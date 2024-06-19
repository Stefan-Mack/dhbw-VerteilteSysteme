function GetHotelContent() {
  // get input data
  var hotelname = document.getElementById("Spalte1_1").value;
  var ort = document.getElementById("Spalte1_2").value;
  var anreise = document.getElementById("Spalte1_3").value;
  var abreise = document.getElementById("Spalte1_3_2").value;
  var anzahl_freier_Zimmer = document.getElementById("Spalte1_4").value;
  var zimmerpreis = document.getElementById("Spalte1_5").value;

  // create API-URL with parameters
  const baseUrl = "http://localhost:3002/hotels/details?";
  var params = "";
  if (hotelname) params += "hotelname=" + encodeURIComponent(hotelname);
  if (ort) params += "&ort=" + encodeURIComponent(ort);
  if (anreise) params += "&anreisetag=" + encodeURIComponent(anreise);
  if (abreise) params += "&abreisetag=" + encodeURIComponent(abreise);
  if (anzahl_freier_Zimmer) params += "&anzahl_freier_Zimmer=" + encodeURIComponent(anzahl_freier_Zimmer);
  if (zimmerpreis) params += "&zimmerpreis=" + encodeURIComponent(zimmerpreis);

  // API-Call
  fetch(baseUrl + params)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // get the table and clear it
      var hotelTable = document.getElementById("hotelBackendContent");
      hotelTable.innerHTML = "";

      // loop through data and add it to table
      data.forEach(function (hotel) {
        var row = document.createElement("tr");

        var nameEntry = document.createElement("td");
        nameEntry.textContent = hotel.hotelname;
        row.appendChild(nameEntry);

        var cityEntry = document.createElement("td");
        cityEntry.textContent = hotel.ort;
        row.appendChild(cityEntry);

        var priceEntry = document.createElement("td");
        priceEntry.textContent = hotel.zimmerpreis;
        row.appendChild(priceEntry);

        hotelTable.appendChild(row);
      });
    })
    .catch(function (error) {
      console.log("Fehler bei der API-Abfrage:", error);
    });
}