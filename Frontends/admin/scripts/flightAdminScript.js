function GetFlightContent() {
    // get input data
    var airline = document.getElementById("airlineInput").value;
    var fligthNumber = document.getElementById("flightNrInput").value;
    var departurePlace = document.getElementById("departurePlaceInput").value;
    var arrivalPlace = document.getElementById("arrivalPlaceInput").value;
    var departureTime = document.getElementById("departureTimeInput").value;
    var arrivalTime = document.getElementById("arrivalTimeInput").value;
    var freeSeats = document.getElementById("freeSeatsInput").value;
    var price = document.getElementById("priceInput").value;
    
    // create API-URL with parameters
    const baseUrl = "http://localhost:3001/fluege/details?";
    var params = "";
    if (airline) params += "fluggesellschaft=" + encodeURIComponent(airline);
    if (fligthNumber) params += "&flugnummer=" + encodeURIComponent(fligthNumber);
    if (departurePlace) params += "&abflugort=" + encodeURIComponent(departurePlace);
    if (arrivalPlace) params += "&ankunftsort=" + encodeURIComponent(arrivalPlace);
    if (departureTime) params += "&abflugszeit=" + encodeURIComponent(departureTime);
    if (arrivalTime) params += "&ankunftszeit=" + encodeURIComponent(arrivalTime);
    if (freeSeats) params += "&anzahl_freier_sitzplaetze=" + encodeURIComponent(freeSeats);
    if (price) params += "&preis_pro_sitzplatz=" + encodeURIComponent(price);
    
    // API-Call
    fetch(baseUrl + params)
        .then(function (response) {
        return response.json();
        })
    .then(function (data) {
      // get the table and clear it
      var flugTable = document.getElementById("fligthBackendContent");
      flugTable.innerHTML = "";
      
      // loop through the data and add it to the table
      data.forEach(function (flug) {    
        var row = document.createElement("tr");

        var idEntry = document.createElement("td");
        idEntry.textContent = flug._id;
        row.appendChild(idEntry);

        var airlineEntry = document.createElement("td");
        airlineEntry.textContent = flug.fluggesellschaft;
        row.appendChild(airlineEntry);

        var flightNumberEntry = document.createElement("td");
        flightNumberEntry.textContent = flug.flugnummer;
        row.appendChild(flightNumberEntry);

        var departurePlaceEntry = document.createElement("td");
        departurePlaceEntry.textContent = flug.abflugort;
        row.appendChild(departurePlaceEntry);

        var arrivalPlaceEntry = document.createElement("td");
        arrivalPlaceEntry.textContent = flug.ankunftsort;
        row.appendChild(arrivalPlaceEntry);

        var departureTimeEntry = document.createElement("td");
        departureTimeEntry.textContent = flug.abflugszeit;
        row.appendChild(departureTimeEntry);

        var freeSeatsEntry = document.createElement("td");
        freeSeatsEntry.textContent = flug.ankunftszeit;
        row.appendChild(freeSeatsEntry);

        var platzzahlCell = document.createElement("td");
        platzzahlCell.textContent = flug.anzahl_freier_sitzplaetze;
        row.appendChild(platzzahlCell);

        var priceEntry = document.createElement("td");
        priceEntry.textContent = flug.preis_pro_sitzplatz;
        row.appendChild(priceEntry);

        // update function button:
        var upbuttonCell = document.createElement("button");
        upbuttonCell.innerText = "Ändern";
        upbuttonCell.setAttribute("data-id", flug._id);
        upbuttonCell.onclick = function() {
            var id = this.getAttribute("data-id"); // Id
            $('#myModal_flug').modal('show'); // opens modal
            document.getElementById("modal-ok-button2").onclick = function() {
                closeModal_flug(id);
            }
            }
        row.appendChild(upbuttonCell);

        // delete button
        var buttonCell = document.createElement("button");
        buttonCell.innerText = "Löschen";
        buttonCell.onclick = function() {
        fetch("http://localhost:3001/fluege/" + flug._id, {method: "DELETE", }) .then(res => console.log(res)) 
        alert("Löschen erfolgreich!");}
        row.appendChild(buttonCell);

        flugTable.appendChild(row);
      });
    })
    .catch(function (error) {
      console.log("Fehler bei der API-Anfrage:", error);
    });
}

function CreateFlightContent() {
    // get input data
    var airline = document.getElementById("airlineInput").value;
    var flightNumber = document.getElementById("flightNrInput").value;
    var departurePlace = document.getElementById("departurePlaceInput").value;
    var arrivalPlace = document.getElementById("arrivalPlaceInput").value;
    var departureTime = document.getElementById("departureTimeInput").value;
    var arrivalTime = document.getElementById("arrivalTimeInput").value;
    var freeSeats = document.getElementById("freeSeatsInput").value;
    var price = document.getElementById("priceInput").value;
    
    // post request, submit new entry
    fetch("http://localhost:3001/fluege/", {
        method: "POST", 
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        fluggesellschaft: airline,
        flugnummer: flightNumber,
        abflugort: departurePlace,
        ankunftsort: arrivalPlace,
        abflugszeit: departureTime,
        ankunftszeit: arrivalTime,
        anzahl_freier_sitzplaetze: freeSeats,
        preis_pro_sitzplatz: price
        })
       })
        .then(res => console.log(res))
    alert("Erstellen erfolgreich!");
}

function closeModal_flug(id) {
    // update all hanged values and if not changed, take the old value from fetch
    
    fetch("http://localhost:3001/fluege/details?_id=" + id)
    .then(res => res.json())
    .then(data => {
    // get input data
    var airline = document.getElementById("mod_airlineInput").value || data[0].fluggesellschaft;
    var flightNumber = document.getElementById("mod_flightNrInput").value || data[0].flugnummer;
    var departurePlace = document.getElementById("mod_departurePlaceInput").value || data[0].abflugort;
    var arrivalPlace = document.getElementById("mod_arrivalPlaceInput").value || data[0].ankunftsort;
    var departureTime = document.getElementById("mod_departureTimeInput").value || data[0].abflugszeit;
    var arrivalTime = document.getElementById("mod_arrivalTimeInput").value || data[0].ankunftszeit;
    var freeSeat = document.getElementById("mod_freeSeatsInput").value || data[0].anzahl_freier_sitzplaetze;
    var price = document.getElementById("mod_priceInput").value || data[0].preis_pro_sitzplatz;
    
    // put request
    fetch("http://localhost:3001/fluege/" + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
        // mapping
        fluggesellschaft: airline,
        flugnummer: flightNumber,
        abflugort: departurePlace,
        ankunftsort: arrivalPlace,
        abflugszeit: departureTime,
        ankunftszeit: arrivalTime,
        anzahl_freier_sitzplaetze: freeSeat,
        preis_pro_sitzplatz: price
        })
    })
    .then(res => console.log(res))
    })
    $('#myModal_flug').modal('hide'); // close modal
    alert("Der Eintrag " + id + " wurde erfolgreich geändert!");
}