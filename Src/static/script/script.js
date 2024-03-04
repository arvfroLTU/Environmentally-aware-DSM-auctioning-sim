
function changeClass0(){
  var element = document.querySelector("#nr0");
  element.classList.replace("options", "selected");
  var button = document.querySelector("#button0");
  button.classList.replace("options", "selected");

  var element2 = document.querySelector("#nr1");
  element2.classList.replace("selected", "options");
  var button1 = document.querySelector("#button1");
  button1.classList.replace("selected", "options");

  var element3 = document.querySelector("#nr2");
  element3.classList.replace("selected", "options");
  var button2 = document.querySelector("#button2");
  button2.classList.replace("selected", "options");
}

function changeClass1(){
  var element = document.querySelector("#nr1");
  element.classList.replace("options", "selected");
  var button1 = document.querySelector("#button1");
  button1.classList.replace("options", "selected");

  var element2 = document.querySelector("#nr0");
  element2.classList.replace("selected", "options");
  var button = document.querySelector("#button0");
  button.classList.replace("selected", "options");

  var element3 = document.querySelector("#nr2");
  element3.classList.replace("selected", "options");
  var button2 = document.querySelector("#button2");
  button2.classList.replace("selected", "options");
}

function changeClass2(){
  var element = document.querySelector("#nr2");
  element.classList.replace("options", "selected");
  var button2 = document.querySelector("#button2");
  button2.classList.replace("options", "selected");

  var element2 = document.querySelector("#nr0");
  element2.classList.replace("selected", "options");
  var button = document.querySelector("#button0");
  button.classList.replace("selected", "options");

  var element3 = document.querySelector("#nr1");
  element3.classList.replace("selected", "options");
  var button1 = document.querySelector("#button1");
  button1.classList.replace("selected", "options");
  
}

//start coordinates for the map //its coordinates for stockholm
var start = { lat: 59.326038, lng:17.8172531};

let directionsService, directionsRenderer

//initialize the Google Map
function initMap(){
  
var mapOptions = {
  center: start,
  zoom: 4,
};

map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

directionsService = new google.maps.DirectionsService();
directionsRenderer = new google.maps.DirectionsRenderer();
directionsRenderer.setMap(map);

}

//Make a route and then display it on the map
function calcRoute(source, destination){

  var mapOptions = {
    center: start,
    zoom: 4,
  };

  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // var overSea = false;

  var rendererOptions = {
    preserveViewport: true,
    suppressMarkers: false,
  };

  var sourceSplit = source.split(', ');
  var destinationSplit = destination.split(', ');

  if (destinationSplit[1] != null) {
    // overSea = false;
    if(destinationSplit[2] == null){
      var routes = [{ origin: sourceSplit[0], destination: destinationSplit[0] }, { origin: sourceSplit[0], destination: destinationSplit[1] }];
    }else{
      var routes = [{ origin: sourceSplit[0], destination: destinationSplit[0] }, { origin: sourceSplit[0], destination: destinationSplit[1]}, { origin: sourceSplit[0], destination: destinationSplit[2] }];
    }
    const drawContinental = (route) => {
      var request = {
        origin: route.origin,
        destination: route.destination,
        travelMode: "DRIVING"
      };

      var directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions);
      directionsRenderer.setMap(map);

      directionsService.route(request, function (result, status) {

        if (status == "OK") {
          directionsRenderer.setDirections(result);
        }
      });
    };

    routes.forEach(drawContinental);

  }
  else {
    let req = {
      origin: source,
      destination: destination,
      travelMode: "DRIVING",
    };
    directionsService.route(req, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result)
      }
    })
  }

// Commented code below is out-phased code from earlier parts of project, before it took different turn
// Shippingcoords and oversea are for drawing between continents while code below that is for checking distances between places

// shippingCoords = [
//   { lat: 51.949597, lng: 4.145262 },
//   { lat: 40.617483, lng: -74.066808 }
// ]
// if (overSea == true) {
//   shippingPath = new google.maps.Polyline({
//     path: shippingCoords,
//     geodesic: true,
//     strokeColor: "#000000",
//     strokeOpacity: 1.0,
//     strokeWeight: 2,
//   })

//   shippingPath.setMap(map)
// }

  // seller = "Stockholm"
  // buyer = "Luleå"

  // wareHouses = ["Sundsvall", "Sundsvall", "Umeå", "Sundsvall", "Sundsvall", "Sundsvall", "Sundsvall", "Sundsvall", "Sundsvall", "Uppsala"]

  // buyerWH = ""
  // sellerWH = ""
  // let buyerDistance, sellerDistance

  // calcDist(seller, wareHouses[0]);
  // calcDist(seller, wareHouses[9]);

  // function calcDist(i, y) {
  //   var origin = i;
  //   var destination = y;
  //   var service = new google.maps.DistanceMatrixService();
  //   service.getDistanceMatrix(
  //     {
  //       origins: [origin],
  //       destinations: [destination],
  //       travelMode: "DRIVING",
  //     }, callback);
  // }

  // function callback(response, status) {
  //   if (status != "OK") {
  //     console.log("ERRORRRRRR");
  //   } else {
  //     if (response.rows[0].elements[0].status == "ZERO_RESULTS") {
  //       console.log("Could not be found");
  //     } else {
  //       console.log(response.rows[0].elements[0].distance.value / 1000 + "km");
  //     };
  //   }
  // }

}
function changeInfo(x){
  const info = getInfo(x);
  if(info[5] == null && info[10]==null){
    calcRoute(info[1], info[4]);
    document.getElementById("info").innerHTML = "<div><h1>Seller</h1><p>Location: "+info[1]+"</p></div><div><h2>Buyer 1</h2><p>Score = "+info[3]+ "</p><p>Fairness index = "+info[2]+ "</p><p>Location = "+info[4]+ "</p><p>Info Info Info</p></div>";
  }else if(info[10]==null){
    calcRoute(info[1], info[4]+','+info[7]);
    document.getElementById("info").innerHTML = "<div><h1>Seller</h1><p>Location: "+info[1]+"</p></div><div class='infoInner'><div class='infoInnerDiv'><h2>Buyer "+x+"</h2><p>Score = "+info[3]+ "</p><p>Fairness index = "+info[2]+ "</p><p>Location = "+info[4]+ "</p></div><div class='infoInnerDiv'><h2>Buyer "+(x+1)+"</h2><p>Score = "+info[6]+ "</p><p>Fairness index = "+info[5]+ "</p><p>Location = "+info[7];
  }else{
    calcRoute(info[1], info[4]+','+info[7]+','+info[10]);
    document.getElementById("info").innerHTML = "<div><h1>Seller</h1><p>Location: "+info[1]+"</p></div><div class='infoInner'><div class='infoInnerDiv'><h2>Buyer "+x+"</h2><p>Score = "+info[3]+ "</p><p>Fairness index = "+info[2]+ "</p><p>Location = "+info[4]+ "</p></div><div class='infoInnerDiv'><h2>Buyer "+(x+1)+"</h2><p>Score = "+info[6]+ "</p><p>Fairness index = "+info[5]+ "</p><p>Location = "+info[7]+"</div></div><div class='infoInnerDiv'><h2>Buyer "+(x+2)+"</h2><p>Score = "+info[9]+ "</p><p>Fairness index = "+info[8]+ "</p><p>Location = "+info[10];
  }
}