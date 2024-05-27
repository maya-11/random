let map;
let marker;
let busMarker;
let userLocation;
let directionsService;
let directionsRenderer;

function initMap() {
    // Initial location (Johannesburg, South Africa)
    const initialPosition = { lat: -26.2041, lng: 28.0473 };

    // The map, centered at the initial position
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: initialPosition,
    });

    // The marker, positioned at the initial location
    marker = new google.maps.Marker({
        position: initialPosition,
        map: map,
        title: "Johannesburg, South Africa",
    });

    // Check for geolocation support
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(userLocation);
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "Your Location",
                });
                // Example bus marker
                addBusMarker({ lat: -26.2041, lng: 28.0473 }); // Johannesburg coordinates
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        handleLocationError(false, map.getCenter());
    }

    // Initialize the Places service
    const service = new google.maps.places.PlacesService(map);

    // Initialize the Directions service and renderer
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    document.getElementById("navigationButton").addEventListener("click", () => {
        const navContainer = document.getElementById("navigationContainer");
        navContainer.classList.toggle("open");
    });
}

function handleLocationError(browserHasGeolocation, pos) {
    alert(browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.");
}

function addBusMarker(busLocation) {
    busMarker = new google.maps.Marker({
        position: busLocation,
        map: map,
        icon: {
            url: "bus-icon.png",
            scaledSize: new google.maps.Size(50, 50),
        },
        title: "Bus Location",
    });
    updateBusInfo(busLocation);
}

function updateBusInfo(busLocation) {
    if (userLocation) {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(userLocation.lat, userLocation.lng),
            new google.maps.LatLng(busLocation.lat, busLocation.lng)
        );
        document.getElementById("distance").innerText = `Distance from you: ${(distance / 1000).toFixed(2)} km`;
    }
}

function calculateAndDisplayRoute() {
    const origin = document.getElementById('from_places').value;
    const destination = document.getElementById('to_places').value;
    const travelMode = document.getElementById('travel_mode').value;

    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode[travelMode],
        },
        (response, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);
                const route = response.routes[0].legs[0];
                document.getElementById('in_mile').innerHTML = 'Distance in Miles: ' + route.distance.text;
                document.getElementById('in_kilo').innerHTML = 'Distance in Kilometers: ' + (route.distance.value / 1000).toFixed(2);
                document.getElementById('duration_text').innerHTML = 'Duration: ' + route.duration.text;
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        }
    );
}
document.addEventListener("DOMContentLoaded", function() {
    const navigationButton = document.getElementById("navigationButton");
    const navigationContainer = document.getElementById("navigationContainer");

    navigationButton.addEventListener("click", function() {
        navigationContainer.classList.toggle("closed");
    });
});

    document.addEventListener('DOMContentLoaded', function() {
        const navigationContainer = document.getElementById('navigationContainer');
        const navigationButton = document.getElementById('navigationButton');

        navigationButton.addEventListener('click', function() {
            navigationContainer.classList.toggle('closed');
            navigationContainer.classList.toggle('open');
        });
    });

