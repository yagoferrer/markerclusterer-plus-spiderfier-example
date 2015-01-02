data = [
    {lat: 37.4419, lon: -122.1419, title: "location 1"},
    {lat: 37.4419, lon: -122.1419, title: "location 2"},
    {lat: 37.4419, lon: -122.1419, title: "Marker same location 3"},
    {lat: 37.4419, lon: -122.1419, title: "Marker same location 4"},
    {lat: 37.4419, lon: -122.1419, title: "Marker same location 5"},
    {lat: 37.4419, lon: -122.1419, title: "Marker same location 6"},
    {lat: 37.4419, lon: -122.1419, title: "Marker same location 7"},
    {lat: 37.4419, lon: -122.1419, title: "Marker same location 8"},
    {lat: 37.4419, lon: -122.1419, title: "Marker same location 9"}
]



var minClusterZoom = 15;

function initialize() {

    var center = new google.maps.LatLng(37.4419, -122.1419);

    var gm = google.maps;

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    var options =  {
        keepSpiderfied: true,
        event: 'mouseover'
    };


    var oms = new OverlappingMarkerSpiderfier(map, options);

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

        oms.addMarker(marker);  // <-- here
    }



    var iw = new gm.InfoWindow();

    oms.addListener('click', function(marker, event) {
        iw.setContent(marker.title);
        iw.open(map, marker);
    });

    oms.addListener('spiderfy', function(markers) {
        iw.close();
    });


    var markerCluster = new MarkerClusterer(map, markers);
    markerCluster.setMaxZoom(minClusterZoom);


}


google.maps.event.addDomListener(window, 'load', initialize);