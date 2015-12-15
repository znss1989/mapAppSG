'use strict' 
var mapSG;
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
]; 
var locLength = locs.length; // Locations information
var markers = [];

// Initialize the mapSG
function initMap() {
    // Create the SG map
    mapSG = new google.maps.Map(document.getElementById('map-sg'), {
        zoom: 12,
        center: {lat: 1.3149014, lng: 103.7769791}
    });
    // Initiate markers on SG map
    for (var i = 0; i < locLength; ++i) {
        markers.push(new google.maps.Marker({
            position: locs[i].latLng,
            map: mapSG,
            title: locs[i].title
        }));
    }
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of the UI of mapSG application
var stringStartsWith = function (string, startsWith) {          
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};

function mapSGViewModel() {
    var self = this;
    self.items = ko.observableArray(locs);
    self.filterText = ko.observable("Filter your interest...");
    self.filter = ko.computed(function() {
        return self.filterText().toLowerCase();
    });

    // Intermediate filtered results
    self.filterItems = self.items();
    self.filteredItems = ko.computed(function() {
        if (!self.filter() || self.filter() == 'filter your interest...') {
            return self.items();
        }
        else {
            return ko.utils.arrayFilter(self.items(), function(item) {
                return stringStartsWith(item.title.toLowerCase(), self.filter());
            });            
        }
    }); 
    
    // Function to update the markers displayed
    self.markersUpdate = function() {
        deleteMarkers();
        var filteredItemsLength = self.filteredItems().length;
        for (var i = 0; i < filteredItemsLength; ++i) {
            markers.push(new google.maps.Marker({
                position: self.filteredItems()[i].latLng,
                map: mapSG,
                title: self.filteredItems()[i].title
            }));
        }
    };
    
    // Debug & test module
    self.filterTestText = ko.computed(function() {
        console.log(self.filter() == 'filter your interest...');
        var result = self.filter() + ' ' + self.filteredItems().length;
        return result;
    });
}

// Activate knockout framework
ko.applyBindings(new mapSGViewModel());



























