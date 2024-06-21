function GetHotelContent() {
  // get input data
  var hotelname = document.getElementById("hotelNameInput").value;
  var ort = document.getElementById("cityInput").value;
  var anreise = document.getElementById("arrivalDayInput").value;
  var abreise = document.getElementById("departureDayInput").value;
  var anzahl_freier_Zimmer = document.getElementById("roomCountInput").value;
  var zimmerpreis = document.getElementById("priceInput").value;

  // create API-URL with parameters
  const baseUrl = "http://localhost:3002/hotels/details?";
  var params = "";
  if (hotelname) params += "name_hotel=" + encodeURIComponent(hotelname);
  if (ort) params += "&standort_hotel=" + encodeURIComponent(ort);
  if (anreise) params += "&anreisetag=" + encodeURIComponent(anreise);
  if (abreise) params += "&abreisetag=" + encodeURIComponent(abreise);
  if (anzahl_freier_Zimmer) params += "&anz_zimmer_frei=" + encodeURIComponent(anzahl_freier_Zimmer);
  if (zimmerpreis) params += "&preis_zimmer=" + encodeURIComponent(zimmerpreis);

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