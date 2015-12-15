'use strict' 
var mapSG;
function initMap() {
    // Create the SG map
    mapSG = new google.maps.Map(document.getElementById('map-sg'), {
        zoom: 12,
        center: {lat: 1.3149014, lng: 103.7769791}
    });
    // Add markers on SG map
    var locs = [
        {title: 'Nanyang Technological University', latLng: {lat: 1.348283, lng: 103.683119}},
        {title: 'National University of Singapore', latLng: {lat: 1.296729, lng: 103.776351}},
        {title: 'Marina Bay', latLng: {lat: 1.286848, lng: 103.854554}},
        {title: 'Resorts World Sentosa', latLng: {lat: 1.255145, lng: 103.821810}},
        {title: 'China Town', latLng: {lat: 1.283467, lng: 103.844410}},
        {title: 'Singapore Zoo', latLng: {lat: 1.404338, lng: 103.792995}},
        {title: 'Changi Airport Singapore', latLng: {lat: 1.364422, lng: 103.991518}},
        {title: 'Orchard Road', latLng: {lat: 1.301532, lng: 103.838447}},
        {title: 'Marina Bay Sands', latLng: {lat: 1.283725, lng: 103.860793}},
        {title: 'Bukit Timah Nature Reserve', latLng: {lat: 1.348399, lng: 103.777454}},
        {title: 'National Museum of Singapore', latLng: {lat: 1.296562, lng: 103.848561}},
        {title: 'Clarke Quay', latLng: {lat: 1.290596, lng: 103.846471}},
        {title: 'City Hall', latLng: {lat: 1.290654, lng: 103.851773}},
        {title: 'Tian Tian Hainanese Chicken Rice', latLng: {lat: 1.280538, lng: 103.844465}},
        {title: 'Garden by the Bay', latLng: {lat: 1.281566, lng: 103.863608}}
    ]; // Locations information
    var locLength = locs.length; 
    
    var markers = [];
    for (var i = 0; i < locLength; ++i) {
        markers.push(new google.maps.Marker({
            position: locs[i].latLng,
            map: mapSG,
            title: locs[i].title
        }));
    }
}