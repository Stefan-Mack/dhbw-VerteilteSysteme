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
  var Verfuegbarkeit = document.getElementById("availableInput").value;

  // create API-URL with parameters
  const baseUrl = "http://localhost:3003/autos/details?";
  var params = "";
  if (provider) params += "anbieter=" + encodeURIComponent(provider);
  if (rentPlace) params += "&standort_ausleihen=" + encodeURIComponent(rentPlace);
  if (returnPlace) params += "&standort_rueckgabe=" + encodeURIComponent(returnPlace);
  if (carModell) params += "&fzg_modell=" + encodeURIComponent(carModell);
  if (seatNumber) params += "&anz_sitze=" + encodeURIComponent(seatNumber);
  if (ausleihdatum) params += "&datum_ausleihen=" + encodeURIComponent(ausleihdatum);
  if (rueckgabedatum) params += "&datum_rueckgabe=" + encodeURIComponent(rueckgabedatum);
  if (preis) params += "&preis=" + encodeURIComponent(preis);
  if (Verfuegbarkeit) params += "&verfuegbarkeit=" + encodeURIComponent(Verfuegbarkeit);

  // API-Call
  fetch(baseUrl + params)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // get the table and clear it
      var carTable = document.getElementById("carBackendContent");
      carTable.innerHTML = "";

      // loop through the data and add it to the table
      data.forEach(function (wagen) {
        var row = document.createElement("tr");

        var idEntry = document.createElement("td");
        idEntry.textContent = wagen._id;
        row.appendChild(idEntry);

        var providerEntry = document.createElement("td");
        providerEntry.textContent = wagen.anbieter;
        row.appendChild(providerEntry);

        var rentPlaceEntry = document.createElement("td");
        rentPlaceEntry.textContent = wagen.standort_ausleihen;
        row.appendChild(rentPlaceEntry);

        var rueckortEntry = document.createElement("td");
        rueckortEntry.textContent = wagen.standort_rueckgabe;
        row.appendChild(rueckortEntry);

        var carModellCell = document.createElement("td");
        carModellCell.textContent = wagen.fzg_modell;
        row.appendChild(carModellCell);

        var seatNumberEntry = document.createElement("td");
        seatNumberEntry.textContent = wagen.anz_sitze;
        row.appendChild(seatNumberEntry);

        var rentDateEntry = document.createElement("td");
        rentDateEntry.textContent = wagen.datum_ausleihen;
        row.appendChild(rentDateEntry);

        var returnDateEntry = document.createElement("td");
        returnDateEntry.textContent = wagen.datum_rueckgabe;
        row.appendChild(returnDateEntry);

        var availableEntry = document.createElement("td");
        availableEntry.textContent = wagen.verfuegbarkeit;
        row.appendChild(availableEntry);

        var priceEntry = document.createElement("td");
        priceEntry.textContent = wagen.preis;
        row.appendChild(priceEntry);

        // update function button:
        var upbuttonCell = document.createElement("button");
        upbuttonCell.innerText = "Ändern";
        upbuttonCell.setAttribute("data-id", wagen._id);
        upbuttonCell.onclick = function () {
          var id = this.getAttribute("data-id"); // ID
          $('#myModal_wagen').modal('show'); // opens modal
          document.getElementById("modal-ok-button3").onclick = function () {
            closeModal_wagen(id);
          }
        }
        row.appendChild(upbuttonCell);

        // delete button
        var buttonCell = document.createElement("button");
        buttonCell.innerText = "Löschen";
        buttonCell.onclick = function () {
          fetch("http://localhost:3003/autos/" + wagen._id, { method: "DELETE", }).then(res => console.log(res))
          alert("Löschen erfolgreich!");
        }
        row.appendChild(buttonCell);

        carTable.appendChild(row);
      });
    })
    .catch(function (error) {
      console.log("Fehler bei der API-Anfrage:", error);
    });
}

function CreateCarContent() {
  // get input data
  var provider = document.getElementById("providerInput").value;
  var rentPlace = document.getElementById("rentPlaceInput").value;
  var returnPlace = document.getElementById("returnPlaceInput").value;
  var carModell = document.getElementById("carModelInput").value;
  var seatNumber = document.getElementById("seatNumberInput").value;
  var ausleihdatum = document.getElementById("startTimeInput").value;
  var rueckgabedatum = document.getElementById("endTimeInput").value;
  var preis = document.getElementById("priceInput").value;
  var Verfuegbarkeit = document.getElementById("availableInput").value;

  // post request, submit new entry
  fetch("http://localhost:3003/autos/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      anbieter: provider,
      standort_ausleihen: rentPlace,
      datum_ausleihen: ausleihdatum,
      standort_rueckgabe: returnPlace,
      datum_rueckgabe: rueckgabedatum,
      fzg_modell: carModell,
      anz_sitze: seatNumber,
      preis: preis,
      verfuegbarkeit: Verfuegbarkeit,
    })
  })
    .then(res => console.log(res))
  alert("Erstellen erfolgreich!");
}


function closeModal_wagen(id) {
  // update all changed values and if not changed, take the old value from fetch

  fetch("http://localhost:3003/autos/details?_id=" + id)
    .then(res => res.json())
    .then(data => {
      // get input data
      var provider = document.getElementById("mod_providerInput").value || data[0].anbieter;
      var rentPlace = document.getElementById("mod_rentPlaceInput").value || data[0].ausleihort;
      var returnPlace = document.getElementById("mod_returnPlaceInput").value || data[0].rueckgabeort;
      var carModell = document.getElementById("mod_carModelInput").value || data[0].modell;
      var seatNumber = document.getElementById("mod_seatNumberInput").value || data[0].anzahl_sitze;
      var ausleihdatum = document.getElementById("mod_startTimeInput").value || data[0].ausleihdatum;
      var rueckgabedatum = document.getElementById("mod_endTimeInput").value || data[0].rueckgabedatum;
      var preis = document.getElementById("mod_priceInput").value || data[0].preis;
      var verfuegbarkeit = document.getElementById("mod_availableInput").value || data[0].verfuegbarkeit;

      // put request
      fetch("http://localhost:3003/autos/" + id, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // mapping
          anbieter: provider,
          ausleihort: rentPlace,
          ausleihdatum: ausleihdatum,
          rueckgabeort: returnPlace,
          rueckgabedatum: rueckgabedatum,
          modell: carModell,
          anzahl_sitze: seatNumber,
          preis: preis,
          verfuegbarkeit: verfuegbarkeit,
        })
      })
        .then(res => console.log(res))
    })
  $('#myModal_wagen').modal('hide'); // close modal
  alert("Der Eintrag " + id + " wurde erfolgreich geändert!");
}