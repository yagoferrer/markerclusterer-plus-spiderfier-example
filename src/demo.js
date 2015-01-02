'use strict';
(function(){

    var gm = google.maps;

    var config = {
        el: 'map',
        lat: 37.4419,
        lon: -122.1419,
        zoom: 15,
        minZoom: 15,
        type: google.maps.MapTypeId.ROADMAP
    };

    var spiderConfig = {
        keepSpiderfied: true,
        event: 'mouseover'
    };

    // A list of Markers with the same location
    var data = [
        {lat: 37.4419, lon: -122.1419, title: 'location 1'},
        {lat: 37.4419, lon: -122.1419, title: 'location 2'},
        {lat: 37.4419, lon: -122.1419, title: 'Marker same location 3'},
        {lat: 37.4419, lon: -122.1419, title: 'Marker same location 4'},
        {lat: 37.4419, lon: -122.1419, title: 'Marker same location 5'},
        {lat: 37.4419, lon: -122.1419, title: 'Marker same location 6'},
        {lat: 37.4419, lon: -122.1419, title: 'Marker same location 7'},
        {lat: 37.4419, lon: -122.1419, title: 'Marker same location 8'},
        {lat: 37.4419, lon: -122.1419, title: 'Marker same location 9'}
    ];


    function initialize() {

        var map = new gm.Map(document.getElementById(config.el), {
            zoom: config.zoom,
            center: new gm.LatLng(config.lat, config.lon),
            mapTypeId: config.type
        });


        var markerSpiderfier = new OverlappingMarkerSpiderfier(map, spiderConfig);

        var markers = [];


        for (var x in data) {

            var loc = new gm.LatLng(data[x].lat, data[x].lon);

            var marker = new gm.Marker({
                position: loc,
                title: data[x].title,
                map: map
            });

            marker.desc = data[x].title;

            markers.push(marker); // Saving Markers

            markerSpiderfier.addMarker(marker);  // Adds the Marker to OverlappingMarkerSpiderfier
        }


        var iw = new gm.InfoWindow();

        markerSpiderfier.addListener('click', function(marker, e) {
            iw.setContent(marker.title);
            iw.open(map, marker);
        });

        markerSpiderfier.addListener('spiderfy', function(markers) {
            iw.close();
        });


        var markerCluster = new MarkerClusterer(map, markers);

        markerCluster.setMaxZoom(config.minZoom);
        
    }

    gm.event.addDomListener(window, 'load', initialize);

})();



