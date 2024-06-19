const mongoose = require('mongoose');
const FlugModel = require('./models/flugModel');


const fluggesellschaften = [
  'Lufthansa',
  'Air France',
  'British Airways',
  'Delta Air Lines',
  'Emirates',
  'United Airlines',
  'American Airlines',
  'KLM',
  'Turkish Airlines',
  'Singapore Airlines',
  'Qatar Airways',
  'Air Canada',
  'Thai Airways',
  'Aeroflot',
  // add more airlines here
];

const flughaefen = [
  { ort: 'Berlin', kuerzel: 'BER' },
  { ort: 'Frankfurt', kuerzel: 'FRA' },
  { ort: 'London', kuerzel: 'LHR' },
  { ort: 'Paris', kuerzel: 'CDG' },
  { ort: 'Amsterdam', kuerzel: 'AMS' },
  { ort: 'Istanbul', kuerzel: 'IST' },
  { ort: 'Madrid', kuerzel: 'MAD' },
  { ort: 'Hamburg', kuerzel: 'HAM' },
  { ort: 'München', kuerzel: 'MUC' },
  { ort: 'Barcelona', kuerzel: 'BCN' },
  { ort: 'Rom', kuerzel: 'FCO' },
  { ort: 'Wien', kuerzel: 'VIE' },
  { ort: 'Zürich', kuerzel: 'ZRH' },
  // add more airports here
];

// connect to MongoDB Atlas
mongoose.connect('mongodb+srv://reisebuero:reise4buero2Metzger0@verteiltesysteme.k0nfvny.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Verbindung zur Datenbank hergestellt');
    generateDummyData();
  })
  .catch(error => {
    console.error('Fehler beim Verbinden zur Datenbank:', error);
  });

// genarate dummy data and save it to the database
function generateDummyData() {
  const dummyData = [];

  for (let i = 1; i <= 50; i++) {
    let randomFlughafenAbflug = getRandomElement(flughaefen);
    let randomFlughafenAnkunft = getRandomElement(flughaefen);

    // make sure that the departure and arrival airports are different
    while (randomFlughafenAbflug.kuerzel === randomFlughafenAnkunft.kuerzel) {
      randomFlughafenAbflug = getRandomElement(flughaefen);
      randomFlughafenAnkunft = getRandomElement(flughaefen);
    }

    let abflugszeit = generateRandomFutureDate(new Date());
    let ankunftszeit = generateRandomFutureDate(abflugszeit);

    // make sure that the arrival time is after the departure time
    while (ankunftszeit <= abflugszeit) {
      ankunftszeit = generateRandomFutureDate(abflugszeit);
    }

    const dummyFlug = {
      fluggesellschaft: getRandomElement(fluggesellschaften),
      flugnummer: generateFlightNumber(getRandomElement(fluggesellschaften)),
      abflugort: randomFlughafenAbflug.kuerzel,
      ankunftsort: randomFlughafenAnkunft.kuerzel,
      abflugszeit: abflugszeit,
      ankunftszeit: ankunftszeit,
      anzahl_freier_sitzplaetze: Math.floor(Math.random() * 200) + 1,
      preis_pro_sitzplatz: generateRealisticPrice(randomFlughafenAbflug.ort, randomFlughafenAnkunft.ort)
    };

    dummyData.push(dummyFlug);
  }

  FlugModel.insertMany(dummyData)
    .then(() => {
      console.log('Dummydaten erfolgreich gespeichert');
      mongoose.disconnect();
    })
    .catch(error => {
      console.error('Fehler beim Speichern der Dummydaten:', error);
      mongoose.disconnect();
    });
}


// support function: Get a random element from an array
function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// support function: generate flight number (example: LH123)
function generateFlightNumber(fluggesellschaft) {
  const randomThreeDigitNumber = Math.floor(Math.random() * 900) + 100;
  return `${fluggesellschaft.substring(0, 2)}${randomThreeDigitNumber}`;
}

// support function: generate random future date (maximum 1 year from now)
function generateRandomFutureDate(abflugszeit) {
  const currentDate = new Date();
  const maxYear = currentDate.getFullYear() + 1;
  const randomYear = Math.floor(Math.random() * (maxYear - currentDate.getFullYear())) + currentDate.getFullYear();
  const randomMonth = Math.floor(Math.random() * 12);
  const randomDay = Math.floor(Math.random() * 28) + 1;
  const randomHour = Math.floor(Math.random() * 24);
  const randomMinute = Math.floor(Math.random() * 60);
  const randomSecond = Math.floor(Math.random() * 60);

  const ankunftszeit = new Date(randomYear, randomMonth, randomDay, randomHour, randomMinute, randomSecond);

  // make sure that the arrival time is after the departure time
  if (ankunftszeit <= abflugszeit) {
    return generateRandomFutureDate(abflugszeit); // recursively call the function until the arrival time is after the departure time
  }

  return ankunftszeit;
}

// support function: generate realistic price based on the airports
function generateRealisticPrice(abflugort, ankunftort) {
  // here you can implement a logic to generate a realistic price based on the departure and arrival airports
  // for this example, we just generate a random price between 100 and 1000
  return Math.floor(Math.random() * 901) + 100;
}