function mapInit() {
  // follow the Leaflet Getting Started tutorial here

  const map = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmRzZmZzZGYiLCJhIjoiY2ttcDBxNmtrMjl4YTJvbWdreHh1b2VpYyJ9.ifNNh9eYazzEHQcfitD8gQ'
  }).addTo(map);

  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers

  onst endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  console.log(endpoint);
  

  const request = await fetch(endpoint)
  const restaurants_name = await request.json()
  console.log(restaurants_name);

  let userInput = document.querySelector("#userInput");
  let container = document.querySelector(".container");

  userInput.addEventListener("keyup", () => {
    let query = userInput.value;
    let string = [];
    string.push(query);
    console.log(string);
    console.log(findMatches(query, restaurants_name));
  });

  function findMatches(wordToMatch, restaurants) {
    return restaurants.filter((names) => {
      const regex = new RegExp(wordToMatch, "gi");
      return names.name.match(regex) || names.zip.match(regex) || names.category.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurants_name);
    const html = matchArray.map(names => {
      return `
        <li>
          <span class="names">
            ${names.name}
            ${names.category}
            ${names.address_line_1}
            ${names.zip} 
          </span>
        </li>`;
    });

    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener("change", displayMatches);
  searchInput.addEventListener("keyup", (evt) => {displayMatches(evt)});


}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;