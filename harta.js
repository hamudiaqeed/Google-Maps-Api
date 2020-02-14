function generate_map(lat_val = 44.434203, lng_val = 26.105455, desc_val = 'BitAcademy') {

    var map_el = document.getElementById('harta');
    var map_options_obj = {

        center: {lat: lat_val, lng: lng_val},
        zoom: 15,

    };

    var map_obj = new google.maps.Map(map_el, map_options_obj);

    var marker_options_obj = {

        position: map_options_obj.center,
        map: map_obj,

    };

    var marker_obj = new google.maps.Marker(marker_options_obj);

    var infowindow_options_obj = {

        content: '<h3>' + desc_val + '</h3>',

    };

    var infowindow_obj = new google.maps.InfoWindow(infowindow_options_obj);
    infowindow_obj.open(map_obj, marker_obj);

    marker_obj.addListener('click', function(ev) {

        //console.log(ev);
        infowindow_obj.open(map_obj, marker_obj);

    });

}

generate_map();

document.getElementById('search').onkeypress = function(ev) {

    // console.log(ev);

    if (ev.key == 'Enter' || ev.keyCode == 13){

        // console.log('test');
        var search_str = document.getElementById('search').value;

        var geocoder_obj = new google.maps.Geocoder();

        geocoder_obj.geocode({address: search_str}, function(results, status) {

            if(!results || status == 'ZERO_RESULTS'){

                alert('Adresa nu a fost gasita');

            } 

            else{

                //console.log(results[0]);

                var new_description = results[0].formatted_address;
                var new_lat = results[0].geometry.location.lat();
                var new_lng = results[0].geometry.location.lng();

                generate_map(new_lat, new_lng, new_description);

            }

        });

    }

};