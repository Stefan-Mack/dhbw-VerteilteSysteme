function GetRatingContent() {
  // get input data
  var FremdID = document.getElementById("foreignIdInput").value;
  var Kategorie = document.getElementById("categoryInput").value;
  var SternAnzahl = document.getElementById("starNumberInput").value;
  var Freitext = document.getElementById("textInput").value;

  // create API-URL with parameters
  const baseUrl = "http://localhost:3004/bewertung/details?";
  var params = "";
  if (FremdID) params += "fremdID=" + encodeURIComponent(FremdID);
  if (Kategorie) params += "&kategorie=" + encodeURIComponent(Kategorie);
  if (SternAnzahl) params += "&anzahl_Sterne=" + encodeURIComponent(SternAnzahl);
  if (Freitext) params += "&freitext=" + encodeURIComponent(Freitext);

  // API-Call
  fetch(baseUrl + params)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // get the table and clear it
      var ratingTable = document.getElementById("ratingBackendContent");
      ratingTable.innerHTML = "";

      // loop through the data and add it to the table
      data.forEach(function (bew) {
        var row = document.createElement("tr");

        var idEntry = document.createElement("td");
        idEntry.textContent = bew._id;
        row.appendChild(idEntry);

        var foreignIdEntry = document.createElement("td");
        foreignIdEntry.textContent = bew.fremdID;
        row.appendChild(foreignIdEntry);

        var categoryEntry = document.createElement("td");
        categoryEntry.textContent = bew.kategorie;
        row.appendChild(categoryEntry);

        var starEntry = document.createElement("td");
        starEntry.textContent = bew.anzahl_Sterne;
        row.appendChild(starEntry);

        var textEntry = document.createElement("td");
        textEntry.textContent = bew.freitext;
        row.appendChild(textEntry);

        // Update-Funktion:
        var upbuttonCell = document.createElement("button");
        upbuttonCell.innerText = "Ändern";
        upbuttonCell.setAttribute("data-id", bew._id);
        upbuttonCell.onclick = function () {
          var id = this.getAttribute("data-id"); // ID
          $('#myModal_bew').modal('show'); // opens modal
          document.getElementById("modal-ok-button4").onclick = function () {
            closeModal_bew(id);
          }
        }
        row.appendChild(upbuttonCell);

        // delete button:
        var buttonCell = document.createElement("button");
        buttonCell.innerText = "Löschen";
        buttonCell.onclick = function () {
          fetch("http://localhost:3004/bewertung/" + bew._id, { method: "DELETE", }).then(res => console.log(res))
          alert("Löschen erfolgreich!");
        }
        row.appendChild(buttonCell);

        ratingTable.appendChild(row);
      });
    })
    .catch(function (error) {
      console.log("Fehler bei der API-Anfrage:", error);
    });
}

function CreateRatingContent() {
  var FremdID = document.getElementById("foreignIdInput").value;
  var Kategorie = document.getElementById("categoryInput").value;
  var SternAnzahl = document.getElementById("starNumberInput").value;
  var Freitext = document.getElementById("textInput").value;
  fetch("http://localhost:3004/bewertung/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fremdID: FremdID,
      kategorie: Kategorie,
      anzahl_Sterne: SternAnzahl,
      freitext: Freitext
    })
  })
    .then(res => console.log(res))
  alert("Erstellen erfolgreich!");
}


function closeModal_bew(id) {
  // update all changed values and if not changed, take the old value from fetch

  fetch("http://localhost:3004/bewertung/details?_id=" + id)
    .then(res => res.json())
    .then(data => {
      // get input data
      var foreignId = document.getElementById("mod_foreignIdInput").value || data[0].fremdID;
      var category = document.getElementById("mod_categoryInput").value || data[0].kategorie;
      var starCount = document.getElementById("mod_starNumberInput").value || data[0].anzahl_Sterne;
      var text = document.getElementById("mod_textInput").value || data[0].freitext;

      // put request
      fetch("http://localhost:3004/bewertung/" + id, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // mapping
          fremdID: foreignId,
          kategorie: category,
          anzahl_Sterne: starCount,
          freitext: text
        })
      })
        .then(res => console.log(res))
    })
  $('#myModal_bew').modal('hide'); // close modal
  alert("Der Eintrag " + id + " wurde erfolgreich geändert!");
}