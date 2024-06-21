function GetHotelContent() {
  // get input data
  var hotelname = document.getElementById("hotelNameInput").value;
  var ort = document.getElementById("cityInput").value;
  var datum = document.getElementById("dayInput").value;
  var anzahl_freier_Zimmer = document.getElementById("roomCountInput").value;
  var zimmerpreis = document.getElementById("priceInput").value;

  // create API-URL with parameters
  const baseUrl = "http://localhost:3002/hotels/details?";
  var params = "";
  if (hotelname) params += "name_hotel=" + encodeURIComponent(hotelname);
  if (ort) params += "&standort_hotel=" + encodeURIComponent(ort);
  if (datum) params += "&datum=" + encodeURIComponent(datum);
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

      // loop through the data and add it to the table
      data.forEach(function (hotel) {
        var row = document.createElement("tr");

        var idEntry = document.createElement("td");
        idEntry.textContent = hotel._id;
        row.appendChild(idEntry);
        
        var nameEntry = document.createElement("td");
        nameEntry.textContent = hotel.name_hotel;
        row.appendChild(nameEntry);

        var cityEntry = document.createElement("td");
        cityEntry.textContent = hotel.standort_hotel;
        row.appendChild(cityEntry);

        var dateEntry = document.createElement("td");
        dateEntry.textContent = hotel.datum;
        row.appendChild(dateEntry);

        var roomCountEntry = document.createElement("td");
        roomCountEntry.textContent = hotel.anz_zimmer_frei;
        row.appendChild(roomCountEntry);

        var priceEntry = document.createElement("td");
        priceEntry.textContent = hotel.preis_zimmer;
        row.appendChild(priceEntry);

        // update function button
        var upbuttonCell = document.createElement("button");
        upbuttonCell.innerText = "Ändern";
        upbuttonCell.setAttribute("data-id", hotel._id);
        upbuttonCell.onclick = function() {
            var id = this.getAttribute("data-id"); // Id
            $('#myModal_hotel').modal('show'); // opens modal
            document.getElementById("modal-ok-button").onclick = function() {
                closeModal_hotel(id);
            }
            }
        row.appendChild(upbuttonCell);

        // delete button:
        var buttonCell = document.createElement("button");
        buttonCell.innerText = "Löschen";
        buttonCell.onclick = function() {
        fetch("http://localhost:3002/hotels/" + hotel._id, {method: "DELETE", }) .then(res => console.log(res)) 
        alert("Löschen erfolgreich!");}
        row.appendChild(buttonCell);

        hotelTable.appendChild(row);
      });
    })
    .catch(function (error) {
      console.log("Fehler bei der API-Anfrage:", error);
    });
}

function CreateHotelContent() {
    // get input data
    var hotelname = document.getElementById("hotelNameInput").value;
    var city = document.getElementById("cityInput").value;
    var date = document.getElementById("dayInput").value;
    var roomCount = document.getElementById("roomCountInput").value;
    var roomPrice = document.getElementById("priceInput").value;
    
    // post request, submit ne entry
    fetch("http://localhost:3002/hotels/", {
            method: "POST", 
            headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name_hotel: hotelname,
            standort_hotel: city,
            datum: date,
            preis_zimmer: roomPrice,
            anz_zimmer_frei: roomCount
        })
    })
        .then(res => console.log(res))  
    alert("Erstellen erfolgreich!");
}


function closeModal_hotel(id) {
    // update all changed values and if not changed, take the old value from fetch

    fetch("http://localhost:3002/hotels/details?_id=" + id)
    .then(res => res.json())
    .then(data => {
        // get input data
        var hotelname = document.getElementById("mod_hotelNameInput").value || data[0].name_hotel;
        var city = document.getElementById("mod_cityInput").value || data[0].standort_hotel;
        var date = document.getElementById("mod_dayInput").value || data[0].datum;
        var roomCount = document.getElementById("mod_roomCountInput").value || data[0].anz_zimmer_frei;
        var roomPrice = document.getElementById("mod_priceInput").value || data[0].preis_zimmer;

        // put request
        fetch("http://localhost:3002/hotels/" + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // mapping
            name_hotel: hotelname,
            standort_hotel: city,
            datum: date,
            preis_zimmer: roomPrice,
            anz_zimmer_frei: roomCount
        })
    })
    .then(res => console.log(res))
    })
    $('#myModal_hotel').modal('hide'); // close modal
    alert("Der Eintrag " + id + " wurde erfolgreich geändert!");
}