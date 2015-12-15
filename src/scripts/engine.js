// This is a simple *viewmodel* - JavaScript that defines the data and behavior of the UI of mapSG application
function mapSGViewModel() {
    this.filterWord = ko.observable("Filter your interests...");
}

// Activate knockout framework
ko.applyBindings(new mapSGViewModel());