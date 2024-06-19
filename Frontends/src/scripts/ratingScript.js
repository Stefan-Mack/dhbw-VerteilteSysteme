function GetRatingContent() {
  // get input data
  var kategorie = document.getElementById("categoryInput").value;
  var anzahl_Sterne = document.getElementById("starNumberInput").value;
  var freitext = document.getElementById("textInput").value;


  // create API-URL with parameters
  const baseUrl = "http://localhost:3004/bewertung/details?";
  var apiUrl = "";
  if (kategorie) apiUrl += "&kategorie=" + encodeURIComponent(kategorie);
  if (anzahl_Sterne) apiUrl += "&anzahl_Sterne=" + encodeURIComponent(anzahl_Sterne);
  if (freitext) apiUrl += "&freitext=" + encodeURIComponent(freitext);

  // API-Call
  fetch(baseUrl + apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // get the table and clear it
      var ratingTable = document.getElementById("ratingBackendContent");
      ratingTable.innerHTML = "";

      // loop through data and add it to table
      data.forEach(function (rating) {
        var row = document.createElement("tr");

        var categoryEntry = document.createElement("td");
        categoryEntry.textContent = rating.kategorie;
        row.appendChild(categoryEntry);

        var ratingEntry = document.createElement("td");
        ratingEntry.textContent = rating.anzahl_Sterne;
        row.appendChild(ratingEntry);

        var textEntry = document.createElement("td");
        textEntry.textContent = rating.freitext;
        row.appendChild(textEntry);

        ratingTable.appendChild(row);
      });
    })
    .catch(function (error) {
      console.log("Fehler bei der API-Abfrage:", error);
    });
}
