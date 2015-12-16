'use strict' 
var mapSG;
var locs = [
    {index: 0, title: 'Nanyang Technological University', latLng: {lat: 1.348283, lng: 103.683119}},
    {index: 1, title: 'National University of Singapore', latLng: {lat: 1.296729, lng: 103.776351}},
    {index: 2, title: 'Marina Bay', latLng: {lat: 1.286848, lng: 103.854554}},
    {index: 3, title: 'Resorts World Sentosa', latLng: {lat: 1.255145, lng: 103.821810}},
    {index: 4, title: 'China Town', latLng: {lat: 1.283467, lng: 103.844410}},
    {index: 5, title: 'Singapore Zoo', latLng: {lat: 1.404338, lng: 103.792995}},
    {index: 6, title: 'Changi Airport Singapore', latLng: {lat: 1.364422, lng: 103.991518}},
    {index: 7, title: 'Orchard Road', latLng: {lat: 1.301532, lng: 103.838447}},
    {index: 8, title: 'Marina Bay Sands', latLng: {lat: 1.283725, lng: 103.860793}},
    {index: 9, title: 'Bukit Timah Nature Reserve', latLng: {lat: 1.348399, lng: 103.777454}},
    {index: 10, title: 'National Museum of Singapore', latLng: {lat: 1.296562, lng: 103.848561}},
    {index: 11, title: 'Clarke Quay', latLng: {lat: 1.290596, lng: 103.846471}},
    {index: 12, title: 'City Hall', latLng: {lat: 1.290654, lng: 103.851773}},
    {index: 13, title: 'Tian Tian Hainanese Chicken Rice', latLng: {lat: 1.280538, lng: 103.844465}},
    {index: 14, title: 'Garden by the Bay', latLng: {lat: 1.281566, lng: 103.863608}}
]; 
var locLength = locs.length; // Locations information
var markers = []; // Make it globally accessible

// Add an info window on the marker
var contentString = '';
var infowindow; 

// Initialize the mapSG
function initMap() {
    // Create the SG map
    mapSG = new google.maps.Map(document.getElementById('map-sg'), {
        zoom: 12,
        // center: {lat: 1.3149014, lng: 103.7769791}
        center: {lat: 1.348630, lng: 103.839105}
    });
    // Initiate markers on SG map
    for (var i = 0; i < locLength; ++i) {
        markers.push(new google.maps.Marker({
            position: locs[i].latLng,
            map: mapSG,
            title: locs[i].title
        }));
    }
    // Add an info window on the marker
    infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    for (var i = 0; i < locLength; ++i) {
        // Process listener in closure
        (function(j) {
            markers[j].addListener('click', function() {
                contentString = '<div><h2 id="window-title">' + locs[j].title + '</h2></div>';
                infowindow.setContent(contentString);
                infowindow.open(mapSG, markers[j]);
            });
        })(i);
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

// Function to check match string subset
var stringStartsWith = function (string, startsWith) {          
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of the UI of mapSG application
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
        clearMarkers();
        var filteredItemsLength = self.filteredItems().length;
        var index;
        for (var i = 0; i < filteredItemsLength; ++i) {
            index = self.filteredItems()[i].index;
            markers[index].setMap(mapSG);
        }
    };
    
    // Debug & test module
    self.filterTestText = ko.computed(function() {
        var result = 'Note: ' + self.filteredItems().length + ' items found for query "' + self.filter() + '"';
        return result;
    });
}

// Activate knockout framework
ko.applyBindings(new mapSGViewModel());



























