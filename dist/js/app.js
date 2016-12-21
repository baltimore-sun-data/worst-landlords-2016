var worstLandlords = {
    init: function() {
        worstLandlords.mapInit();
        worstLandlords.onClick();
    },
    share: function() {
        $(".icon-twitter").on("click", function() {
            var tweet = "";
            var url = "";
            var twitter_url = "https://twitter.com/intent/tweet?text=" + tweet + "&url=" + url + "&tw_p=tweetbutton";
            window.open(twitter_url, "mywin", "left=200,top=200,width=500,height=300,toolbar=1,resizable=0");
            return false;
        });
        $(".icon-facebook").on("click", function() {
            var picture = "";
            var title = "";
            var description = "";
            var url = "";
            var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link=" + url + "&picture=" + picture + "&name=" + title + "&description=" + description + "&redirect_uri=http://www.facebook.com";
            window.open(facebook_url, "mywin", "left=200,top=200,width=500,height=300,toolbar=1,resizable=0");
            return false;
        });
    },
    mapInit: function() {
        var landlord0 = new L.LayerGroup();
        var landlord1 = new L.LayerGroup();
        var landlord2 = new L.LayerGroup();
        var landlord3 = new L.LayerGroup();
        var landlord4 = new L.LayerGroup();
        var landlord5 = new L.LayerGroup();
        var landlord6 = new L.LayerGroup();
        var landlord7 = new L.LayerGroup();
        var landlord8 = new L.LayerGroup();
        var landlord9 = new L.LayerGroup();
        markers = [];
        for (var num = 0; num < worstLandlords.properties.length; num++) {
            var latitude = worstLandlords.properties[num].lat;
            var longitude = worstLandlords.properties[num].lon;
            var address = worstLandlords.properties[num].address;
            var landlord_id = worstLandlords.properties[num].landlord_num;
            var prop_id = worstLandlords.properties[num].id;
            if (landlord_id == 0) {
                markers[prop_id] = L.marker([ latitude, longitude ]).addTo(landlord0);
            }
            if (landlord_id == 1) {
                markers[prop_id] = L.marker([ latitude, longitude ]).addTo(landlord1);
            }
            if (landlord_id == 2) {
                markers[prop_id] = L.marker([ latitude, longitude ]).addTo(landlord2);
            }
            if (landlord_id == 3) {
                markers[prop_id] = L.marker([ latitude, longitude ]).addTo(landlord3);
            }
            if (landlord_id == 4) {
                markers[prop_id] = L.marker([ latitude, longitude ]).addTo(landlord4);
            }
            if (landlord_id == 5) {
                markers[prop_id] = L.marker([ latitude, longitude ]).addTo(landlord5);
            }
            if (landlord_id == 6) {
                markers[prop_id] = L.marker([ latitude, longitude ]).addTo(landlord6);
            }
            if (landlord_id == 7) {
                markers[prop_id] = L.marker([ latitude, longitude ]).addTo(landlord7);
            }
            if (landlord_id == 8) {
                markers[prop_id] = L.marker([ latitude, longitude ]).addTo(landlord8);
            }
            if (landlord_id == 9) {
                markers[prop_id] = L.marker([ latitude, longitude ]).addTo(landlord9);
            }
            markers[prop_id].bindPopup("<div id=" + prop_id + " class='popup_box_header'><div style='color:black;'>" + address + "</div></div>");
            markers[prop_id].id = prop_id;
        }
        var tileUrl = "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
        tileAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>', 
        layer = new L.TileLayer(tileUrl, {
            maxZoom: 18,
            attribution: tileAttribution
        });
        map = new L.Map("map", {
            layers: [ landlord0, landlord1, landlord2, landlord3, landlord4, landlord5, landlord6, landlord7, landlord8, landlord9 ]
        }).setView([ 39.282004, -76.6075 ], 12);
        map.addLayer(layer);
        var overlayMaps = {
            "Name 0": landlord0,
            "Name 1": landlord1,
            "Name 2": landlord2,
            "Name 3": landlord3,
            "Name 4": landlord4,
            "Name 5": landlord5,
            "Name 6": landlord6,
            "Name 7": landlord7,
            "Name 8": landlord8,
            "Name 9": landlord9
        };
        L.control.layers(overlayMaps).addTo(map);
        $("#landlord0").click(function(event) {
            event.preventDefault();
            map.removeLayer(landlord0);
            map.removeLayer(landlord1);
            map.removeLayer(landlord2);
            map.removeLayer(landlord3);
            map.removeLayer(landlord4);
            map.removeLayer(landlord5);
            map.removeLayer(landlord6);
            map.removeLayer(landlord7);
            map.removeLayer(landlord8);
            map.removeLayer(landlord9);
            map.addLayer(landlord0);
        });
        $("#landlord1").click(function(event) {
            event.preventDefault();
            map.removeLayer(landlord0);
            map.removeLayer(landlord1);
            map.removeLayer(landlord2);
            map.removeLayer(landlord3);
            map.removeLayer(landlord4);
            map.removeLayer(landlord5);
            map.removeLayer(landlord6);
            map.removeLayer(landlord7);
            map.removeLayer(landlord8);
            map.removeLayer(landlord9);
            map.addLayer(landlord1);
        });
        $("#landlord2").click(function(event) {
            event.preventDefault();
            map.removeLayer(landlord0);
            map.removeLayer(landlord1);
            map.removeLayer(landlord2);
            map.removeLayer(landlord3);
            map.removeLayer(landlord4);
            map.removeLayer(landlord5);
            map.removeLayer(landlord6);
            map.removeLayer(landlord7);
            map.removeLayer(landlord8);
            map.removeLayer(landlord9);
            map.addLayer(landlord2);
        });
        $("#landlord3").click(function(event) {
            event.preventDefault();
            map.removeLayer(landlord0);
            map.removeLayer(landlord1);
            map.removeLayer(landlord2);
            map.removeLayer(landlord3);
            map.removeLayer(landlord4);
            map.removeLayer(landlord5);
            map.removeLayer(landlord6);
            map.removeLayer(landlord7);
            map.removeLayer(landlord8);
            map.removeLayer(landlord9);
            map.addLayer(landlord3);
        });
        $("#landlord4").click(function(event) {
            event.preventDefault();
            map.removeLayer(landlord0);
            map.removeLayer(landlord1);
            map.removeLayer(landlord2);
            map.removeLayer(landlord3);
            map.removeLayer(landlord4);
            map.removeLayer(landlord5);
            map.removeLayer(landlord6);
            map.removeLayer(landlord7);
            map.removeLayer(landlord8);
            map.removeLayer(landlord9);
            map.addLayer(landlord4);
        });
        $("#landlord5").click(function(event) {
            event.preventDefault();
            map.removeLayer(landlord0);
            map.removeLayer(landlord2);
            map.removeLayer(landlord3);
            map.removeLayer(landlord4);
            map.removeLayer(landlord5);
            map.removeLayer(landlord6);
            map.removeLayer(landlord7);
            map.removeLayer(landlord8);
            map.removeLayer(landlord9);
            map.addLayer(landlord5);
        });
        $("#landlord6").click(function(event) {
            event.preventDefault();
            map.removeLayer(landlord0);
            map.removeLayer(landlord1);
            map.removeLayer(landlord2);
            map.removeLayer(landlord3);
            map.removeLayer(landlord4);
            map.removeLayer(landlord5);
            map.removeLayer(landlord6);
            map.removeLayer(landlord7);
            map.removeLayer(landlord8);
            map.removeLayer(landlord9);
            map.addLayer(landlord6);
        });
        $("#landlord7").click(function(event) {
            event.preventDefault();
            map.removeLayer(landlord0);
            map.removeLayer(landlord1);
            map.removeLayer(landlord2);
            map.removeLayer(landlord3);
            map.removeLayer(landlord4);
            map.removeLayer(landlord5);
            map.removeLayer(landlord6);
            map.removeLayer(landlord7);
            map.removeLayer(landlord8);
            map.removeLayer(landlord9);
            map.addLayer(landlord7);
        });
        $("#landlord8").click(function(event) {
            event.preventDefault();
            map.removeLayer(landlord0);
            map.removeLayer(landlord1);
            map.removeLayer(landlord2);
            map.removeLayer(landlord3);
            map.removeLayer(landlord4);
            map.removeLayer(landlord5);
            map.removeLayer(landlord6);
            map.removeLayer(landlord7);
            map.removeLayer(landlord8);
            map.removeLayer(landlord9);
            map.addLayer(landlord8);
        });
        $("#landlord9").click(function(event) {
            event.preventDefault();
            map.removeLayer(landlord0);
            map.removeLayer(landlord1);
            map.removeLayer(landlord2);
            map.removeLayer(landlord3);
            map.removeLayer(landlord4);
            map.removeLayer(landlord5);
            map.removeLayer(landlord6);
            map.removeLayer(landlord7);
            map.removeLayer(landlord8);
            map.removeLayer(landlord9);
            map.addLayer(landlord9);
        });
    },
    landlords: [ {
        name: "Name 0",
        numProperties: 11,
        numUnits: 11,
        numViolations: 1
    }, {
        name: "Name 1",
        numProperties: 12,
        numUnits: 22,
        numViolations: 11
    }, {
        name: "Name 2",
        numProperties: 13,
        numUnits: 33,
        numViolations: 21
    }, {
        name: "Name 3",
        numProperties: 14,
        numUnits: 44,
        numViolations: 31
    }, {
        name: "Name 4",
        numProperties: 15,
        numUnits: 55,
        numViolations: 41
    }, {
        name: "Name 5",
        numProperties: 16,
        numUnits: 66,
        numViolations: 51
    }, {
        name: "Name 6",
        numProperties: 17,
        numUnits: 77,
        numViolations: 61
    }, {
        name: "Name 7",
        numProperties: 18,
        numUnits: 88,
        numViolations: 71
    }, {
        name: "Name 8",
        numProperties: 19,
        numUnits: 99,
        numViolations: 81
    }, {
        name: "Name 9",
        numProperties: 20,
        numUnits: 110,
        numViolations: 91
    } ],
    properties: [ {
        address: "1400 RAMSAY ST",
        landlord_num: 0,
        ecb: 8,
        pros: 2,
        lpv: 0,
        total: 10,
        lat: 39.28342,
        lon: -76.63936,
        id: 1
    }, {
        address: "100 N MONROE ST",
        landlord_num: 0,
        ecb: 3,
        pros: 3,
        lpv: 1,
        total: 7,
        lat: 39.28983,
        lon: -76.64707,
        id: 2
    }, {
        address: "4300 PARK HEIGHTS AV",
        landlord_num: 0,
        ecb: 4,
        pros: 3,
        lpv: 0,
        total: 7,
        lat: 39.3378,
        lon: -76.66512,
        id: 3
    }, {
        address: "4400 PLAINFIELD AV",
        landlord_num: 0,
        ecb: 6,
        pros: 1,
        lpv: 0,
        total: 7,
        lat: 39.32634,
        lon: -76.55582,
        id: 4
    }, {
        address: "4400 DAYTONA AV",
        landlord_num: 0,
        ecb: 2,
        pros: 3,
        lpv: 1,
        total: 6,
        lat: 39.33829,
        lon: -76.67149,
        id: 5
    }, {
        address: "1300 W LAFAYETTE AV",
        landlord_num: 0,
        ecb: 2,
        pros: 1,
        lpv: 1,
        total: 4,
        lat: 39.29908,
        lon: -76.63878,
        id: 6
    }, {
        address: "2400 WASHINGTON BLVD",
        landlord_num: 0,
        ecb: 9,
        pros: 3,
        lpv: 0,
        total: 12,
        lat: 39.26839,
        lon: -76.65058,
        id: 7
    }, {
        address: "2200 N ROSEDALE ST",
        landlord_num: 0,
        ecb: 4,
        pros: 0,
        lpv: 1,
        total: 5,
        lat: 39.3126,
        lon: -76.66958,
        id: 8
    }, {
        address: "2800 ASHLAND AV",
        landlord_num: 0,
        ecb: 0,
        pros: 3,
        lpv: 0,
        total: 3,
        lat: 39.30116,
        lon: -76.5781,
        id: 9
    }, {
        address: "4500 N ROGERS AV",
        landlord_num: 0,
        ecb: 4,
        pros: 0,
        lpv: 0,
        total: 4,
        lat: 39.344,
        lon: -76.69377,
        id: 10
    }, {
        address: "1300 GLENWOOD AV",
        landlord_num: 0,
        ecb: 3,
        pros: 3,
        lpv: 0,
        total: 6,
        lat: 39.3525,
        lon: -76.59615,
        id: 11
    }, {
        address: "4300 FERNHILL AV",
        landlord_num: 0,
        ecb: 10,
        pros: 1,
        lpv: 1,
        total: 12,
        lat: 39.33769,
        lon: -76.69188,
        id: 12
    }, {
        address: "2700 THE ALAMEDA",
        landlord_num: 0,
        ecb: 5,
        pros: 1,
        lpv: 0,
        total: 6,
        lat: 39.32156,
        lon: -76.59128,
        id: 13
    }, {
        address: "4200 SHELDON AV",
        landlord_num: 0,
        ecb: 5,
        pros: 0,
        lpv: 1,
        total: 6,
        lat: 39.32861,
        lon: -76.56462,
        id: 14
    }, {
        address: "4700 GWYNN OAK AV",
        landlord_num: 0,
        ecb: 7,
        pros: 1,
        lpv: 1,
        total: 9,
        lat: 39.33134,
        lon: -76.69574,
        id: 15
    }, {
        address: "2800 KEYWORTH AV",
        landlord_num: 1,
        ecb: 3,
        pros: 3,
        lpv: 1,
        total: 7,
        lat: 39.33262,
        lon: -76.66319,
        id: 16
    }, {
        address: "2000 CECIL AV",
        landlord_num: 1,
        ecb: 5,
        pros: 0,
        lpv: 1,
        total: 6,
        lat: 39.31313,
        lon: -76.60529,
        id: 17
    }, {
        address: "2300 PRESBURY ST",
        landlord_num: 1,
        ecb: 3,
        pros: 3,
        lpv: 1,
        total: 7,
        lat: 39.30766,
        lon: -76.65406,
        id: 18
    }, {
        address: "0 S CAREY ST",
        landlord_num: 1,
        ecb: 6,
        pros: 2,
        lpv: 0,
        total: 8,
        lat: 39.2885,
        lon: -76.63818,
        id: 19
    }, {
        address: "4600 YORK RD",
        landlord_num: 1,
        ecb: 7,
        pros: 3,
        lpv: 1,
        total: 11,
        lat: 39.34446,
        lon: -76.60966,
        id: 20
    }, {
        address: "600 HILLVIEW RD",
        landlord_num: 1,
        ecb: 4,
        pros: 3,
        lpv: 0,
        total: 7,
        lat: 39.25127,
        lon: -76.62291,
        id: 21
    }, {
        address: "2400 FREDERICK AV",
        landlord_num: 1,
        ecb: 4,
        pros: 0,
        lpv: 1,
        total: 5,
        lat: 39.284,
        lon: -76.65492,
        id: 22
    }, {
        address: "2100 GARRISON BLVD",
        landlord_num: 1,
        ecb: 10,
        pros: 0,
        lpv: 1,
        total: 11,
        lat: 39.311,
        lon: -76.67501,
        id: 23
    }, {
        address: "3400 OLD YORK RD",
        landlord_num: 1,
        ecb: 2,
        pros: 1,
        lpv: 1,
        total: 4,
        lat: 39.32994,
        lon: -76.60831,
        id: 24
    }, {
        address: "500 DOLPHIN ST",
        landlord_num: 1,
        ecb: 10,
        pros: 2,
        lpv: 1,
        total: 13,
        lat: 39.30093,
        lon: -76.62791,
        id: 25
    }, {
        address: "1800 EDMONDSON AV",
        landlord_num: 1,
        ecb: 4,
        pros: 1,
        lpv: 1,
        total: 6,
        lat: 39.29521,
        lon: -76.64648,
        id: 26
    }, {
        address: "1500 GORSUCH AV",
        landlord_num: 1,
        ecb: 10,
        pros: 3,
        lpv: 0,
        total: 13,
        lat: 39.32279,
        lon: -76.5971,
        id: 27
    }, {
        address: "1500 SPRUCE ST",
        landlord_num: 1,
        ecb: 9,
        pros: 0,
        lpv: 0,
        total: 9,
        lat: 39.22985,
        lon: -76.58989,
        id: 28
    }, {
        address: "1600 E OLIVER ST",
        landlord_num: 1,
        ecb: 8,
        pros: 1,
        lpv: 1,
        total: 10,
        lat: 39.30744,
        lon: -76.59632,
        id: 29
    }, {
        address: "1700 MANOR AV",
        landlord_num: 1,
        ecb: 6,
        pros: 1,
        lpv: 1,
        total: 8,
        lat: 39.27381,
        lon: -76.53302,
        id: 30
    }, {
        address: "2000 BOYD ST",
        landlord_num: 2,
        ecb: 4,
        pros: 1,
        lpv: 0,
        total: 5,
        lat: 39.28659,
        lon: -76.64878,
        id: 31
    }, {
        address: "1800 MC KEAN AV",
        landlord_num: 2,
        ecb: 7,
        pros: 2,
        lpv: 1,
        total: 10,
        lat: 39.30887,
        lon: -76.64726,
        id: 32
    }, {
        address: "1100 MC CULLOH ST",
        landlord_num: 2,
        ecb: 9,
        pros: 2,
        lpv: 1,
        total: 12,
        lat: 39.30096,
        lon: -76.62584,
        id: 33
    }, {
        address: "100 E TRENTON ST",
        landlord_num: 2,
        ecb: 0,
        pros: 3,
        lpv: 1,
        total: 4,
        lat: 39.31047,
        lon: -76.61483,
        id: 34
    }, {
        address: "1900 CLIFTON AV",
        landlord_num: 2,
        ecb: 2,
        pros: 3,
        lpv: 1,
        total: 6,
        lat: 39.31189,
        lon: -76.64878,
        id: 35
    }, {
        address: "2800 MAYFIELD AV",
        landlord_num: 2,
        ecb: 2,
        pros: 3,
        lpv: 1,
        total: 6,
        lat: 39.32332,
        lon: -76.57443,
        id: 36
    }, {
        address: "900 WHITELOCK ST",
        landlord_num: 2,
        ecb: 2,
        pros: 2,
        lpv: 0,
        total: 4,
        lat: 39.31445,
        lon: -76.63269,
        id: 37
    }, {
        address: "300 N CARROLLTON AV",
        landlord_num: 2,
        ecb: 5,
        pros: 2,
        lpv: 0,
        total: 7,
        lat: 39.2929,
        lon: -76.63697,
        id: 38
    }, {
        address: "4800 MIDLINE RD",
        landlord_num: 2,
        ecb: 10,
        pros: 2,
        lpv: 0,
        total: 12,
        lat: 39.32224,
        lon: -76.53717,
        id: 39
    }, {
        address: "3800 BOARMAN AV",
        landlord_num: 2,
        ecb: 2,
        pros: 2,
        lpv: 0,
        total: 4,
        lat: 39.33451,
        lon: -76.67895,
        id: 40
    }, {
        address: "600 N ELLWOOD AV",
        landlord_num: 2,
        ecb: 8,
        pros: 0,
        lpv: 0,
        total: 8,
        lat: 39.29844,
        lon: -76.5738,
        id: 41
    }, {
        address: "3600 BREHMS LA",
        landlord_num: 2,
        ecb: 6,
        pros: 3,
        lpv: 1,
        total: 10,
        lat: 39.3211,
        lon: -76.56525,
        id: 42
    }, {
        address: "1500 SPRUCE ST",
        landlord_num: 2,
        ecb: 0,
        pros: 0,
        lpv: 0,
        total: 0,
        lat: 39.22985,
        lon: -76.58989,
        id: 43
    }, {
        address: "1200 N CAREY ST",
        landlord_num: 2,
        ecb: 6,
        pros: 0,
        lpv: 1,
        total: 7,
        lat: 39.30264,
        lon: -76.63895,
        id: 44
    }, {
        address: "1500 N SMALLWOOD ST",
        landlord_num: 2,
        ecb: 3,
        pros: 2,
        lpv: 1,
        total: 6,
        lat: 39.3055,
        lon: -76.65249,
        id: 45
    }, {
        address: "2400 LOYOLA NORTHWAY",
        landlord_num: 3,
        ecb: 7,
        pros: 1,
        lpv: 0,
        total: 8,
        lat: 39.33859,
        lon: -76.65857,
        id: 46
    }, {
        address: "300 COLLINS AV",
        landlord_num: 3,
        ecb: 7,
        pros: 0,
        lpv: 1,
        total: 8,
        lat: 39.28111,
        lon: -76.68357,
        id: 47
    }, {
        address: "3300 CLIFTMONT AV",
        landlord_num: 3,
        ecb: 1,
        pros: 2,
        lpv: 0,
        total: 3,
        lat: 39.31828,
        lon: -76.57124,
        id: 48
    }, {
        address: "4600 PEN LUCY RD",
        landlord_num: 3,
        ecb: 5,
        pros: 0,
        lpv: 0,
        total: 5,
        lat: 39.28568,
        lon: -76.69405,
        id: 49
    }, {
        address: "2200 E OLIVER ST",
        landlord_num: 3,
        ecb: 7,
        pros: 3,
        lpv: 0,
        total: 10,
        lat: 39.30781,
        lon: -76.5871,
        id: 50
    }, {
        address: "5300 SINCLAIR LA",
        landlord_num: 3,
        ecb: 1,
        pros: 3,
        lpv: 0,
        total: 4,
        lat: 39.3233,
        lon: -76.54267,
        id: 51
    }, {
        address: "2200 KLOMAN ST",
        landlord_num: 3,
        ecb: 7,
        pros: 2,
        lpv: 0,
        total: 9,
        lat: 39.26229,
        lon: -76.63174,
        id: 52
    }, {
        address: "300 N CARROLLTON AV",
        landlord_num: 3,
        ecb: 5,
        pros: 1,
        lpv: 0,
        total: 6,
        lat: 39.2929,
        lon: -76.63697,
        id: 53
    }, {
        address: "1400 RETREAT ST",
        landlord_num: 3,
        ecb: 3,
        pros: 3,
        lpv: 1,
        total: 7,
        lat: 39.3133,
        lon: -76.64122,
        id: 54
    }, {
        address: "1800 W NORTH AV",
        landlord_num: 3,
        ecb: 4,
        pros: 2,
        lpv: 0,
        total: 6,
        lat: 39.30991,
        lon: -76.64662,
        id: 55
    }, {
        address: "3400 ELMORA AV",
        landlord_num: 3,
        ecb: 0,
        pros: 1,
        lpv: 1,
        total: 2,
        lat: 39.31594,
        lon: -76.5756,
        id: 56
    }, {
        address: "900 PENNSYLVANIA AV",
        landlord_num: 3,
        ecb: 7,
        pros: 0,
        lpv: 0,
        total: 7,
        lat: 39.29692,
        lon: -76.62653,
        id: 57
    }, {
        address: "200 N FREMONT AV",
        landlord_num: 3,
        ecb: 4,
        pros: 1,
        lpv: 1,
        total: 6,
        lat: 39.29132,
        lon: -76.63022,
        id: 58
    }, {
        address: "0 N GILMOR ST",
        landlord_num: 3,
        ecb: 8,
        pros: 1,
        lpv: 1,
        total: 10,
        lat: 39.28913,
        lon: -76.64246,
        id: 59
    }, {
        address: "600 N DECKER AV",
        landlord_num: 3,
        ecb: 4,
        pros: 1,
        lpv: 1,
        total: 6,
        lat: 39.29841,
        lon: -76.5745,
        id: 60
    }, {
        address: "3500 TOWANDA AV",
        landlord_num: 4,
        ecb: 10,
        pros: 2,
        lpv: 1,
        total: 13,
        lat: 39.3272,
        lon: -76.66049,
        id: 61
    }, {
        address: "200 N MONASTERY AV",
        landlord_num: 4,
        ecb: 0,
        pros: 0,
        lpv: 1,
        total: 1,
        lat: 39.28939,
        lon: -76.67467,
        id: 62
    }, {
        address: "400 N ROSE ST",
        landlord_num: 4,
        ecb: 2,
        pros: 3,
        lpv: 0,
        total: 5,
        lat: 39.2957,
        lon: -76.58144,
        id: 63
    }, {
        address: "2100 KIRK AV",
        landlord_num: 4,
        ecb: 10,
        pros: 0,
        lpv: 1,
        total: 11,
        lat: 39.31329,
        lon: -76.60717,
        id: 64
    }, {
        address: "1100 N STRICKER ST",
        landlord_num: 4,
        ecb: 5,
        pros: 3,
        lpv: 0,
        total: 8,
        lat: 39.30129,
        lon: -76.64172,
        id: 65
    }, {
        address: "200 BRIDGEVIEW RD",
        landlord_num: 4,
        ecb: 8,
        pros: 2,
        lpv: 0,
        total: 10,
        lat: 39.25119,
        lon: -76.6182,
        id: 66
    }, {
        address: "2700 ASHLAND AV",
        landlord_num: 4,
        ecb: 10,
        pros: 2,
        lpv: 0,
        total: 12,
        lat: 39.3011,
        lon: -76.5795,
        id: 67
    }, {
        address: "1000 E PATAPSCO AV",
        landlord_num: 4,
        ecb: 4,
        pros: 3,
        lpv: 0,
        total: 7,
        lat: 39.23428,
        lon: -76.59563,
        id: 68
    }, {
        address: "600 MAUDE AV",
        landlord_num: 4,
        ecb: 5,
        pros: 2,
        lpv: 0,
        total: 7,
        lat: 39.23813,
        lon: -76.60034,
        id: 69
    }, {
        address: "2300 ANOKA AV",
        landlord_num: 4,
        ecb: 9,
        pros: 1,
        lpv: 1,
        total: 11,
        lat: 39.3215,
        lon: -76.65571,
        id: 70
    }, {
        address: "3400 RAVENWOOD AV",
        landlord_num: 4,
        ecb: 8,
        pros: 3,
        lpv: 1,
        total: 12,
        lat: 39.31531,
        lon: -76.57545,
        id: 71
    }, {
        address: "0 SHIPLEY ST",
        landlord_num: 4,
        ecb: 9,
        pros: 0,
        lpv: 1,
        total: 10,
        lat: 39.2877,
        lon: -76.65818,
        id: 72
    }, {
        address: "700 N MONROE ST",
        landlord_num: 4,
        ecb: 8,
        pros: 3,
        lpv: 0,
        total: 11,
        lat: 39.29675,
        lon: -76.64744,
        id: 73
    }, {
        address: "400 FORREST ST",
        landlord_num: 4,
        ecb: 9,
        pros: 1,
        lpv: 1,
        total: 11,
        lat: 39.29506,
        lon: -76.60346,
        id: 74
    }, {
        address: "3400 ROUND RD",
        landlord_num: 4,
        ecb: 8,
        pros: 1,
        lpv: 1,
        total: 10,
        lat: 39.24394,
        lon: -76.6247,
        id: 75
    }, {
        address: "1500 PENNSYLVANIA AV",
        landlord_num: 5,
        ecb: 6,
        pros: 1,
        lpv: 1,
        total: 8,
        lat: 39.30263,
        lon: -76.63348,
        id: 76
    }, {
        address: "2100 WILKENS AV",
        landlord_num: 5,
        ecb: 7,
        pros: 1,
        lpv: 0,
        total: 8,
        lat: 39.28121,
        lon: -76.6494,
        id: 77
    }, {
        address: "2600 W PATAPSCO AV",
        landlord_num: 5,
        ecb: 3,
        pros: 0,
        lpv: 0,
        total: 3,
        lat: 39.25289,
        lon: -76.6522,
        id: 78
    }, {
        address: "3600 FAIRVIEW AV",
        landlord_num: 5,
        ecb: 0,
        pros: 3,
        lpv: 1,
        total: 4,
        lat: 39.32297,
        lon: -76.67824,
        id: 79
    }, {
        address: "2600 E MONUMENT ST",
        landlord_num: 5,
        ecb: 3,
        pros: 3,
        lpv: 1,
        total: 7,
        lat: 39.29893,
        lon: -76.58078,
        id: 80
    }, {
        address: "0 S MONASTERY AV",
        landlord_num: 5,
        ecb: 1,
        pros: 0,
        lpv: 0,
        total: 1,
        lat: 39.2864,
        lon: -76.67827,
        id: 81
    }, {
        address: "2500 E MADISON ST",
        landlord_num: 5,
        ecb: 1,
        pros: 2,
        lpv: 0,
        total: 3,
        lat: 39.29995,
        lon: -76.58194,
        id: 82
    }, {
        address: "1500 LESLIE ST",
        landlord_num: 5,
        ecb: 4,
        pros: 3,
        lpv: 0,
        total: 7,
        lat: 39.30592,
        lon: -76.64259,
        id: 83
    }, {
        address: "3700 ST MARGARET ST",
        landlord_num: 5,
        ecb: 9,
        pros: 0,
        lpv: 1,
        total: 10,
        lat: 39.23269,
        lon: -76.59561,
        id: 84
    }, {
        address: "100 N PAYSON ST",
        landlord_num: 5,
        ecb: 1,
        pros: 1,
        lpv: 0,
        total: 2,
        lat: 39.28978,
        lon: -76.6488,
        id: 85
    }, {
        address: "2700 E COLD SPRING LA",
        landlord_num: 5,
        ecb: 7,
        pros: 0,
        lpv: 0,
        total: 7,
        lat: 39.34517,
        lon: -76.57282,
        id: 86
    }, {
        address: "2500 KEYWORTH AV",
        landlord_num: 5,
        ecb: 10,
        pros: 2,
        lpv: 1,
        total: 13,
        lat: 39.33467,
        lon: -76.6594,
        id: 87
    }, {
        address: "900 ALLENDALE ST",
        landlord_num: 5,
        ecb: 2,
        pros: 2,
        lpv: 0,
        total: 4,
        lat: 39.29817,
        lon: -76.67857,
        id: 88
    }, {
        address: "2400 FREDERICK AV",
        landlord_num: 5,
        ecb: 6,
        pros: 2,
        lpv: 0,
        total: 8,
        lat: 39.28422,
        lon: -76.65457,
        id: 89
    }, {
        address: "5700 JONQUIL AV",
        landlord_num: 5,
        ecb: 6,
        pros: 1,
        lpv: 1,
        total: 8,
        lat: 39.35185,
        lon: -76.68843,
        id: 90
    }, {
        address: "2200 POPLAR GROVE ST",
        landlord_num: 6,
        ecb: 8,
        pros: 3,
        lpv: 0,
        total: 11,
        lat: 39.313,
        lon: -76.66605,
        id: 91
    }, {
        address: "2400 S PACA ST",
        landlord_num: 6,
        ecb: 2,
        pros: 0,
        lpv: 1,
        total: 3,
        lat: 39.26407,
        lon: -76.64401,
        id: 92
    }, {
        address: "2600 ROBB ST",
        landlord_num: 6,
        ecb: 0,
        pros: 3,
        lpv: 1,
        total: 4,
        lat: 39.3197,
        lon: -76.59682,
        id: 93
    }, {
        address: "700 MELLO CT",
        landlord_num: 6,
        ecb: 3,
        pros: 3,
        lpv: 1,
        total: 7,
        lat: 39.29857,
        lon: -76.5982,
        id: 94
    }, {
        address: "2300 WILKENS AV",
        landlord_num: 6,
        ecb: 8,
        pros: 1,
        lpv: 0,
        total: 9,
        lat: 39.28031,
        lon: -76.65213,
        id: 95
    }, {
        address: "200 S CALHOUN ST",
        landlord_num: 6,
        ecb: 4,
        pros: 3,
        lpv: 0,
        total: 7,
        lat: 39.28544,
        lon: -76.63941,
        id: 96
    }, {
        address: "500 E 26TH ST",
        landlord_num: 6,
        ecb: 9,
        pros: 2,
        lpv: 1,
        total: 12,
        lat: 39.31906,
        lon: -76.60929,
        id: 97
    }, {
        address: "600 N PULASKI ST",
        landlord_num: 6,
        ecb: 3,
        pros: 0,
        lpv: 1,
        total: 4,
        lat: 39.2955,
        lon: -76.65051,
        id: 98
    }, {
        address: "3100 FERNDALE AV",
        landlord_num: 6,
        ecb: 0,
        pros: 1,
        lpv: 1,
        total: 2,
        lat: 39.32694,
        lon: -76.70263,
        id: 99
    }, {
        address: "300 HERRING CT",
        landlord_num: 6,
        ecb: 10,
        pros: 3,
        lpv: 0,
        total: 13,
        lat: 39.28779,
        lon: -76.59505,
        id: 100
    }, {
        address: "3300 W CATON AV",
        landlord_num: 6,
        ecb: 5,
        pros: 2,
        lpv: 0,
        total: 7,
        lat: 39.28587,
        lon: -76.67318,
        id: 101
    }, {
        address: "400 E 22ND ST",
        landlord_num: 6,
        ecb: 4,
        pros: 1,
        lpv: 0,
        total: 5,
        lat: 39.31451,
        lon: -76.61047,
        id: 102
    }, {
        address: "2200 BARCLAY ST",
        landlord_num: 6,
        ecb: 3,
        pros: 1,
        lpv: 1,
        total: 5,
        lat: 39.3145,
        lon: -76.61117,
        id: 103
    }, {
        address: "5400 NELSON AV",
        landlord_num: 6,
        ecb: 2,
        pros: 0,
        lpv: 0,
        total: 2,
        lat: 39.3484,
        lon: -76.68577,
        id: 104
    }, {
        address: "6600 REISTERSTOWN RD",
        landlord_num: 6,
        ecb: 7,
        pros: 2,
        lpv: 0,
        total: 9,
        lat: 39.35756,
        lon: -76.70439,
        id: 105
    }, {
        address: "2200 POPLAR GROVE ST",
        landlord_num: 7,
        ecb: 6,
        pros: 0,
        lpv: 1,
        total: 7,
        lat: 39.313,
        lon: -76.66605,
        id: 106
    }, {
        address: "600 N GLOVER ST",
        landlord_num: 7,
        ecb: 9,
        pros: 3,
        lpv: 0,
        total: 12,
        lat: 39.2982,
        lon: -76.58016,
        id: 107
    }, {
        address: "3200 LYNDALE AV",
        landlord_num: 7,
        ecb: 8,
        pros: 3,
        lpv: 1,
        total: 12,
        lat: 39.31648,
        lon: -76.57829,
        id: 108
    }, {
        address: "2600 REISTERSTOWN RD",
        landlord_num: 7,
        ecb: 6,
        pros: 1,
        lpv: 1,
        total: 8,
        lat: 39.3175,
        lon: -76.65162,
        id: 109
    }, {
        address: "6100 SHIPVIEW WY",
        landlord_num: 7,
        ecb: 2,
        pros: 2,
        lpv: 1,
        total: 5,
        lat: 39.27659,
        lon: -76.54254,
        id: 110
    }, {
        address: "1700 MALVERN ST",
        landlord_num: 7,
        ecb: 0,
        pros: 0,
        lpv: 0,
        total: 0,
        lat: 39.27346,
        lon: -76.53402,
        id: 111
    }, {
        address: "1600 Mc Culloh St",
        landlord_num: 7,
        ecb: 9,
        pros: 2,
        lpv: 0,
        total: 11,
        lat: 39.30494,
        lon: -76.63079,
        id: 112
    }, {
        address: "900 N CAROLINE ST",
        landlord_num: 7,
        ecb: 3,
        pros: 2,
        lpv: 1,
        total: 6,
        lat: 39.3005,
        lon: -76.59778,
        id: 113
    }, {
        address: "1500 N WASHINGTON ST",
        landlord_num: 7,
        ecb: 10,
        pros: 3,
        lpv: 1,
        total: 14,
        lat: 39.30828,
        lon: -76.59014,
        id: 114
    }, {
        address: "600 LAURENS ST",
        landlord_num: 7,
        ecb: 3,
        pros: 1,
        lpv: 1,
        total: 5,
        lat: 39.30428,
        lon: -76.63568,
        id: 115
    }, {
        address: "6200 FAIRDEL AV",
        landlord_num: 7,
        ecb: 7,
        pros: 3,
        lpv: 0,
        total: 10,
        lat: 39.35115,
        lon: -76.54066,
        id: 116
    }, {
        address: "1900 EDMONDSON AV",
        landlord_num: 7,
        ecb: 7,
        pros: 2,
        lpv: 0,
        total: 9,
        lat: 39.2951,
        lon: -76.64801,
        id: 117
    }, {
        address: "500 S BROADWAY",
        landlord_num: 7,
        ecb: 2,
        pros: 0,
        lpv: 0,
        total: 2,
        lat: 39.28542,
        lon: -76.59344,
        id: 118
    }, {
        address: "3500 HAYWARD AV",
        landlord_num: 7,
        ecb: 4,
        pros: 2,
        lpv: 1,
        total: 7,
        lat: 39.34921,
        lon: -76.68,
        id: 119
    }, {
        address: "3600 ST VICTOR ST",
        landlord_num: 7,
        ecb: 9,
        pros: 2,
        lpv: 1,
        total: 12,
        lat: 39.23413,
        lon: -76.59682,
        id: 120
    }, {
        address: "3300 W BALTIMORE ST",
        landlord_num: 8,
        ecb: 5,
        pros: 2,
        lpv: 1,
        total: 8,
        lat: 39.28583,
        lon: -76.67245,
        id: 121
    }, {
        address: "200 N GILMOR ST",
        landlord_num: 8,
        ecb: 10,
        pros: 1,
        lpv: 1,
        total: 12,
        lat: 39.29089,
        lon: -76.64256,
        id: 122
    }, {
        address: "600 YALE AV",
        landlord_num: 8,
        ecb: 4,
        pros: 1,
        lpv: 0,
        total: 5,
        lat: 39.27573,
        lon: -76.68782,
        id: 123
    }, {
        address: "300 E LANVALE ST",
        landlord_num: 8,
        ecb: 8,
        pros: 3,
        lpv: 1,
        total: 12,
        lat: 39.30895,
        lon: -76.61162,
        id: 124
    }, {
        address: "1300 CLIFTVIEW AV",
        landlord_num: 8,
        ecb: 9,
        pros: 0,
        lpv: 1,
        total: 10,
        lat: 39.31618,
        lon: -76.59698,
        id: 125
    }, {
        address: "200 S ELLICOTT DRWY",
        landlord_num: 8,
        ecb: 6,
        pros: 3,
        lpv: 1,
        total: 10,
        lat: 39.28441,
        lon: -76.6596,
        id: 126
    }, {
        address: "2500 W FAYETTE ST",
        landlord_num: 8,
        ecb: 0,
        pros: 1,
        lpv: 1,
        total: 2,
        lat: 39.28895,
        lon: -76.65692,
        id: 127
    }, {
        address: "3600 GARRISON BLVD",
        landlord_num: 8,
        ecb: 6,
        pros: 2,
        lpv: 0,
        total: 8,
        lat: 39.32965,
        lon: -76.68245,
        id: 128
    }, {
        address: "900 N CALHOUN ST",
        landlord_num: 8,
        ecb: 0,
        pros: 3,
        lpv: 0,
        total: 3,
        lat: 39.29949,
        lon: -76.64012,
        id: 129
    }, {
        address: "2200 POPLAR GROVE ST",
        landlord_num: 8,
        ecb: 3,
        pros: 2,
        lpv: 1,
        total: 6,
        lat: 39.313,
        lon: -76.66605,
        id: 130
    }, {
        address: "1700 PRESSTMAN ST",
        landlord_num: 8,
        ecb: 1,
        pros: 2,
        lpv: 1,
        total: 4,
        lat: 39.30536,
        lon: -76.64481,
        id: 131
    }, {
        address: "100 N SMALLWOOD ST",
        landlord_num: 8,
        ecb: 8,
        pros: 1,
        lpv: 0,
        total: 9,
        lat: 39.28966,
        lon: -76.65159,
        id: 132
    }, {
        address: "2900 ROSALIND AV",
        landlord_num: 8,
        ecb: 8,
        pros: 1,
        lpv: 1,
        total: 10,
        lat: 39.34592,
        lon: -76.66374,
        id: 133
    }, {
        address: "200 N STRICKER ST",
        landlord_num: 8,
        ecb: 9,
        pros: 1,
        lpv: 1,
        total: 11,
        lat: 39.29081,
        lon: -76.64114,
        id: 134
    }, {
        address: "2400 E LAFAYETTE AV",
        landlord_num: 8,
        ecb: 10,
        pros: 1,
        lpv: 0,
        total: 11,
        lat: 39.3111,
        lon: -76.58436,
        id: 135
    }, {
        address: "3400 JUNEWAY",
        landlord_num: 9,
        ecb: 1,
        pros: 2,
        lpv: 1,
        total: 4,
        lat: 39.31794,
        lon: -76.56913,
        id: 136
    }, {
        address: "3700 BEEHLER AV",
        landlord_num: 9,
        ecb: 6,
        pros: 3,
        lpv: 1,
        total: 10,
        lat: 39.34259,
        lon: -76.6752,
        id: 137
    }, {
        address: "100 N SMALLWOOD ST",
        landlord_num: 9,
        ecb: 0,
        pros: 1,
        lpv: 0,
        total: 1,
        lat: 39.28966,
        lon: -76.65159,
        id: 138
    }, {
        address: "700 MURA ST",
        landlord_num: 9,
        ecb: 7,
        pros: 3,
        lpv: 0,
        total: 10,
        lat: 39.30433,
        lon: -76.60756,
        id: 139
    }, {
        address: "200 S AUGUSTA AV",
        landlord_num: 9,
        ecb: 0,
        pros: 1,
        lpv: 1,
        total: 2,
        lat: 39.28327,
        lon: -76.68474,
        id: 140
    }, {
        address: "900 N MONROE ST",
        landlord_num: 9,
        ecb: 0,
        pros: 0,
        lpv: 0,
        total: 0,
        lat: 39.29912,
        lon: -76.64757,
        id: 141
    }, {
        address: "3000 TIVOLY AV",
        landlord_num: 9,
        ecb: 8,
        pros: 3,
        lpv: 0,
        total: 11,
        lat: 39.32539,
        lon: -76.59197,
        id: 142
    }, {
        address: "700 MELLO CT",
        landlord_num: 9,
        ecb: 7,
        pros: 0,
        lpv: 1,
        total: 8,
        lat: 39.29857,
        lon: -76.5982,
        id: 143
    }, {
        address: "600 E PATAPSCO AV",
        landlord_num: 9,
        ecb: 6,
        pros: 1,
        lpv: 1,
        total: 8,
        lat: 39.23614,
        lon: -76.60165,
        id: 144
    }, {
        address: "800 KEVIN RD",
        landlord_num: 9,
        ecb: 0,
        pros: 1,
        lpv: 1,
        total: 2,
        lat: 39.2965,
        lon: -76.68728,
        id: 145
    }, {
        address: "4000 WILSBY AV",
        landlord_num: 9,
        ecb: 1,
        pros: 2,
        lpv: 1,
        total: 4,
        lat: 39.33828,
        lon: -76.60457,
        id: 146
    }, {
        address: "1300 JAMES ST",
        landlord_num: 9,
        ecb: 2,
        pros: 3,
        lpv: 0,
        total: 5,
        lat: 39.28138,
        lon: -76.63642,
        id: 147
    }, {
        address: "2700 THE ALAMEDA",
        landlord_num: 9,
        ecb: 4,
        pros: 2,
        lpv: 0,
        total: 6,
        lat: 39.32156,
        lon: -76.59128,
        id: 148
    }, {
        address: "400 W SARATOGA ST",
        landlord_num: 9,
        ecb: 8,
        pros: 0,
        lpv: 1,
        total: 9,
        lat: 39.29285,
        lon: -76.62124,
        id: 149
    }, {
        address: "4700 HADDON AV",
        landlord_num: 9,
        ecb: 10,
        pros: 0,
        lpv: 0,
        total: 10,
        lat: 39.33317,
        lon: -76.69504,
        id: 150
    } ],
    onClick: function() {
        $(".buttonIcon--splash").on("click", function() {
            $(".splashWrapper").css("top", "-100%");
        });
        $(".list--landlords li").on("click", function() {
            $(".active").removeClass("active");
            $(this).addClass("active");
            var landlord = $(this).data("landlord");
            $(".list--properties--" + landlord).scrollTop(0);
            $(".list--properties--" + landlord).toggleClass("center");
        });
        $(".backButton").on("click", function() {
            var landlord = $(this).data("landlord");
            $(".list--properties--" + landlord).toggleClass("center");
        });
    },
    working: function() {}
};

$(document).ready(function() {
    worstLandlords.init();
    console.log("connected");
});