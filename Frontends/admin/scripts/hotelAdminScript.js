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
  if (hotelname) params += "hotelname=" + encodeURIComponent(hotelname);
  if (ort) params += "&ort=" + encodeURIComponent(ort);
  if (datum) params += "&datum=" + encodeURIComponent(datum);
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

      // loop through the data and add it to the table
      data.forEach(function (hotel) {
        var row = document.createElement("tr");

        var idEntry = document.createElement("td");
        idEntry.textContent = hotel._id;
        row.appendChild(idEntry);
        
        var nameEntry = document.createElement("td");
        nameEntry.textContent = hotel.hotelname;
        row.appendChild(nameEntry);

        var cityEntry = document.createElement("td");
        cityEntry.textContent = hotel.ort;
        row.appendChild(cityEntry);

        var dateEntry = document.createElement("td");
        dateEntry.textContent = hotel.datum;
        row.appendChild(dateEntry);

        var roomCountEntry = document.createElement("td");
        roomCountEntry.textContent = hotel.anzahl_freier_Zimmer;
        row.appendChild(roomCountEntry);

        var priceEntry = document.createElement("td");
        priceEntry.textContent = hotel.zimmerpreis;
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
            hotelname: hotelname,
            ort: city,
            datum: date,
            zimmerpreis: roomPrice,
            anzahl_freier_Zimmer: roomCount
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
        var hotelname = document.getElementById("mod_hotelNameInput").value || data[0].hotelname;
        var city = document.getElementById("mod_cityInput").value || data[0].ort;
        var date = document.getElementById("mod_dayInput").value || data[0].datum;
        var roomCount = document.getElementById("mod_roomCountInput").value || data[0].anzahl_freier_Zimmer;
        var roomPrice = document.getElementById("mod_priceInput").value || data[0].zimmerpreis;

        // put request
        fetch("http://localhost:3002/hotels/" + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // mapping
            hotelname: hotelname,
            ort: city,
            datum: date,
            zimmerpreis: roomPrice,
            anzahl_freier_Zimmer: roomCount
        })
    })
    .then(res => console.log(res))
    })
    $('#myModal_hotel').modal('hide'); // close modal
    alert("Der Eintrag " + id + " wurde erfolgreich geändert!");
}