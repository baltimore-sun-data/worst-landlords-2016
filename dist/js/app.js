var worstLandlords = {
    init: function() {
        worstLandlords.onClick();
        worstLandlords.mapInit();
        worstLandlords.share();
        worstLandlords.readHash();
    },
    share: function() {
        $(".icon-twitter").on("click", function() {
            var tweet = "See which landlords in Baltimore have the worst track records based on compiled data.";
            var url = "http://data.baltimoresun.com/news/rent-court/worst-landlords-2016/";
            var twitter_url = "https://twitter.com/intent/tweet?text=" + tweet + "&url=" + url + "&tw_p=tweetbutton";
            window.open(twitter_url, "mywin", "left=200,top=200,width=500,height=300,toolbar=1,resizable=0");
            return false;
        });
        $(".icon-facebook").on("click", function() {
            var picture = "";
            var title = "Baltimore's worst landlords";
            var description = "See which landlords in Baltimore have the worst track records based on compiled data.";
            var url = "http://data.baltimoresun.com/news/rent-court/worst-landlords-2016/";
            var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link=" + url + "&picture=" + picture + "&name=" + title + "&description=" + description + "&redirect_uri=http://www.facebook.com";
            window.open(facebook_url, "mywin", "left=200,top=200,width=500,height=300,toolbar=1,resizable=0");
            return false;
        });
    },
    mapInit: function() {
        var landlords = [ landlord0 = new L.LayerGroup(), landlord1 = new L.LayerGroup(), landlord2 = new L.LayerGroup(), landlord3 = new L.LayerGroup(), landlord4 = new L.LayerGroup(), landlord5 = new L.LayerGroup(), landlord6 = new L.LayerGroup(), landlord7 = new L.LayerGroup(), landlord8 = new L.LayerGroup(), landlord9 = new L.LayerGroup() ];
        var markers = [];
        var marketStyle = {
            color: "#999",
            weight: 1
        };
        var marketStyleViolations = {
            color: "#27a3a3",
            weight: 1
        };
        var latitude;
        var longitude;
        var address;
        var landlord_id;
        var prop_id;
        var landlordsList = [ "BLUE OCEAN", "BLUE STAR", "C BROWN PROPERTIES", "DUNNE WRIGHT", "HABC", "M.A.R.M.", "MARYLAND PROPERTY MANAGEMENT, LLC", "PROGRESSIVE PROPERTY INC", "SAGE MANAGEMENT", "WAZ INVESTMENT" ];
        for (var num = 0; num < worstLandlords.properties.length; num++) {
            latitude = worstLandlords.properties[num].lat;
            longitude = worstLandlords.properties[num].lon;
            address = worstLandlords.properties[num].address;
            landlord_id = worstLandlords.properties[num].landlord_num;
            prop_id = worstLandlords.properties[num].id;
            if (worstLandlords.properties[num].ecb != 0 || worstLandlords.properties[num].pros != 0) {
                markers[prop_id] = L.circleMarker([ latitude, longitude ], marketStyleViolations).addTo(landlords[landlord_id]).setRadius(4).on("click", markerClick);
            } else {
                markers[prop_id] = L.circleMarker([ latitude, longitude ], marketStyle).addTo(landlords[landlord_id]).setRadius(4).on("click", markerClick);
            }
            markers[prop_id].bindPopup("<div id=" + prop_id + " class='popup_box_header'>" + "<div style=color:#1e1e1e;'>" + "<span style='font-weight:bold;'>" + landlordsList[landlord_id] + "</span>" + "<br>" + address + "</div>" + "</div>");
            markers[prop_id].id = prop_id;
        }
        var tileUrl = "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
        tileAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
        layer = new L.TileLayer(tileUrl, {
            maxZoom: 18,
            attribution: tileAttribution
        });
        map = new L.Map("map", {
            layers: landlords
        }).setView([ 39.2904, -76.6122 ], 12);
        map.addLayer(layer);
        $(".landlord").on("click", function() {
            var landlord = $(this).data("landlord");
            $(".active").removeClass("active");
            $(this).addClass("active");
            $(".list--properties--" + landlord).scrollTop(0);
            $(".list--properties--" + landlord).toggleClass("center");
            $(".buttonWrap").addClass("active");
            for (var i = 0; i < landlords.length; i++) {
                map.removeLayer(landlords[i]);
                map.addLayer(landlords[landlord]);
            }
            map.panTo(new L.LatLng(39.2904, -76.6122));
            window.location.hash = landlord + 1;
        });
        $(".property").on("click", function() {
            var propID = $(this).data("id");
            map.panTo(new L.LatLng(worstLandlords.properties[propID].lat, worstLandlords.properties[propID].lon));
            markers[propID + 1].openPopup();
            $(".property.active").removeClass("active");
            $(this).addClass("active");
        });
        $(".backButton").on("click", function() {
            $(".buttonWrap").toggleClass("active");
            $(".list--properties.center").toggleClass("center");
            window.location.hash = "";
            for (var i = 0; i < landlords.length; i++) {
                map.addLayer(landlords[i]);
            }
        });
        function markerClick(e) {
            try {
                var divID = e.target.id - 1;
                var propDiv = $(".list--properties.center");
                $(".property.active").removeClass("active");
                $(".property--" + divID).addClass("active");
                propDiv.animate({
                    scrollTop: propDiv.scrollTop() - propDiv.offset().top + $(".property--" + divID).offset().top - 100
                });
            } catch (e) {
                return false;
            }
        }
        worstLandlords.readHash(landlords);
    },
    readHash: function(landlords) {
        var landlord = Number(window.location.hash.substring(1)) - 1;
        if (landlord >= 0) {
            $(".splashWrapper").addClass("top");
            $(".list__item--" + landlord).addClass("active");
            $(".list--properties--" + landlord).scrollTop(0);
            $(".list--properties--" + landlord).addClass("center");
            $(".buttonWrap").addClass("active");
            for (var i = 0; i < landlords.length; i++) {
                map.removeLayer(landlords[i]);
                map.addLayer(landlords[landlord]);
            }
            map.panTo(new L.LatLng(39.2904, -76.6122));
        }
    },
    onClick: function() {
        $(".buttonIcon--splash").on("click", function() {
            $(".splashWrapper").addClass("top");
        });
        $(".buttonDiv--splash, .methodologyOut").on("click", function() {
            $(".overlay").fadeOut();
            $(".overlay--methodology").fadeIn();
        });
        $(".icon-info-circled").on("click", function() {
            $(".overlay").fadeOut();
            $(".overlay--violations").fadeIn();
        });
        $(".overlay, .content .icon-cancel-1").on("click", function() {
            $(".overlay").fadeOut();
        });
        $(".overlay .content").click(function(e) {
            e.stopPropagation();
        });
    },
    landlords: [ {
        name: "BLUE OCEAN",
        numProperties: 39,
        numUnits: 1439,
        numViolations: 25
    }, {
        name: "BLUE STAR",
        numProperties: 276,
        numUnits: 311,
        numViolations: 154
    }, {
        name: "C BROWN POPERTIES",
        numProperties: 41,
        numUnits: 54,
        numViolations: 68
    }, {
        name: "DUNN WRIGHT",
        numProperties: 259,
        numUnits: 337,
        numViolations: 231
    }, {
        name: "HABC",
        numProperties: 236,
        numUnits: 519,
        numViolations: 74
    }, {
        name: "M.A.R.M.",
        numProperties: 99,
        numUnits: 2182,
        numViolations: 103
    }, {
        name: "MARYLAND PROPERTY MANAGEMENT, LLC",
        numProperties: 136,
        numUnits: 174,
        numViolations: 95
    }, {
        name: "PROGRESSIVE PROPERTY INC",
        numProperties: 21,
        numUnits: 26,
        numViolations: 64
    }, {
        name: "SAGE MANAGEMENT",
        numProperties: 36,
        numUnits: 960,
        numViolations: 37
    }, {
        name: "WAZ INVESTMENT",
        numProperties: 81,
        numUnits: 109,
        numViolations: 121
    } ],
    properties: [ {
        id: 1,
        landlord_num: 0,
        address: "5683 PURDUE AVE",
        units: 41,
        ecb: 2,
        pros: 0,
        lat: 39.358922,
        lon: -76.592867
    }, {
        id: 2,
        landlord_num: 0,
        address: "3951 W NORTHERN PKWY",
        units: 10,
        ecb: 2,
        pros: 0,
        lat: 39.349558,
        lon: -76.689729
    }, {
        id: 3,
        landlord_num: 0,
        address: "3320 PRESSTMAN ST",
        units: 18,
        ecb: 1,
        pros: 0,
        lat: 39.304567,
        lon: -76.672974
    }, {
        id: 4,
        landlord_num: 0,
        address: "4001 W NORTHERN PKWY",
        units: 10,
        ecb: 1,
        pros: 0,
        lat: 39.349299,
        lon: -76.690176
    }, {
        id: 5,
        landlord_num: 0,
        address: "707 COOKS LANE",
        units: 5,
        ecb: 1,
        pros: 0,
        lat: 39.293956,
        lon: -76.703463
    }, {
        id: 6,
        landlord_num: 0,
        address: "2304 WINCHESTER ST",
        units: 228,
        ecb: 0,
        pros: 0,
        lat: 39.301887,
        lon: -76.654328
    }, {
        id: 7,
        landlord_num: 0,
        address: "1600 N HILTON ST",
        units: 122,
        ecb: 0,
        pros: 0,
        lat: 39.305503,
        lon: -76.672454
    }, {
        id: 8,
        landlord_num: 0,
        address: "4300 SEMINOLE AVE",
        units: 82,
        ecb: 0,
        pros: 0,
        lat: 39.298671,
        lon: -76.694177
    }, {
        id: 9,
        landlord_num: 0,
        address: "901 NOTTINGHAM ROAD",
        units: 80,
        ecb: 0,
        pros: 0,
        lat: 39.297297,
        lon: -76.705182
    }, {
        id: 10,
        landlord_num: 0,
        address: "4501 FAIRVIEW AVE",
        units: 75,
        ecb: 0,
        pros: 0,
        lat: 39.320315,
        lon: -76.692929
    }, {
        id: 11,
        landlord_num: 0,
        address: "4001 CLARKS LANE",
        units: 72,
        ecb: 0,
        pros: 0,
        lat: 39.3586,
        lon: -76.703917
    }, {
        id: 12,
        landlord_num: 0,
        address: "2742 N ROSEDALE ST",
        units: 54,
        ecb: 0,
        pros: 0,
        lat: 39.317497,
        lon: -76.670684
    }, {
        id: 13,
        landlord_num: 0,
        address: "5906 PARK HEIGHTS AVE",
        units: 54,
        ecb: 0,
        pros: 0,
        lat: 39.356068,
        lon: -76.689692
    }, {
        id: 14,
        landlord_num: 0,
        address: "6810 PARK HEIGHTS AVE",
        units: 53,
        ecb: 0,
        pros: 0,
        lat: 39.364346,
        lon: -76.702699
    }, {
        id: 15,
        landlord_num: 0,
        address: "2111 GARRISON BLVD",
        units: 49,
        ecb: 0,
        pros: 0,
        lat: 39.311619,
        lon: -76.67475
    }, {
        id: 16,
        landlord_num: 0,
        address: "3333 WINTERBOURNE ROAD",
        units: 46,
        ecb: 0,
        pros: 0,
        lat: 39.305756,
        lon: -76.673406
    }, {
        id: 17,
        landlord_num: 0,
        address: "6101 PARK HEIGHTS AVE",
        units: 36,
        ecb: 0,
        pros: 0,
        lat: 39.357861,
        lon: -76.691641
    }, {
        id: 18,
        landlord_num: 0,
        address: "4501 BONNER ROAD",
        units: 33,
        ecb: 0,
        pros: 0,
        lat: 39.319813,
        lon: -76.692203
    }, {
        id: 19,
        landlord_num: 0,
        address: "2900 WYNHAM ROAD",
        units: 32,
        ecb: 0,
        pros: 0,
        lat: 39.319401,
        lon: -76.69397
    }, {
        id: 20,
        landlord_num: 0,
        address: "3703 CLARKS LANE",
        units: 32,
        ecb: 0,
        pros: 0,
        lat: 39.360481,
        lon: -76.701009
    }, {
        id: 21,
        landlord_num: 0,
        address: "700 NOTTINGHAM ROAD",
        units: 30,
        ecb: 0,
        pros: 0,
        lat: 39.294241,
        lon: -76.703418
    }, {
        id: 22,
        landlord_num: 0,
        address: "6001 PARK HEIGHTS AVE",
        units: 27,
        ecb: 0,
        pros: 0,
        lat: 39.356983,
        lon: -76.689555
    }, {
        id: 23,
        landlord_num: 0,
        address: "3915-3921 BELVIEU AVE",
        units: 24,
        ecb: 0,
        pros: 0,
        lat: 39.339451,
        lon: -76.683419
    }, {
        id: 24,
        landlord_num: 0,
        address: "6000 PARK HEIGHTS AVE",
        units: 24,
        ecb: 0,
        pros: 0,
        lat: 39.35637,
        lon: -76.69037
    }, {
        id: 25,
        landlord_num: 0,
        address: "4401 FAIRVIEW AVE",
        units: 23,
        ecb: 0,
        pros: 0,
        lat: 39.320807,
        lon: -76.691453
    }, {
        id: 26,
        landlord_num: 0,
        address: "6420 PARK HEIGHTS AVE",
        units: 22,
        ecb: 0,
        pros: 0,
        lat: 39.360515,
        lon: -76.698425
    }, {
        id: 27,
        landlord_num: 0,
        address: "706 NOTTINGHAM ROAD",
        units: 20,
        ecb: 0,
        pros: 0,
        lat: 39.294668,
        lon: -76.702929
    }, {
        id: 28,
        landlord_num: 0,
        address: "4501 WAKEFIELD ROAD",
        units: 19,
        ecb: 0,
        pros: 0,
        lat: 39.319002,
        lon: -76.691694
    }, {
        id: 29,
        landlord_num: 0,
        address: "3906 GROVELAND AVE",
        units: 18,
        ecb: 0,
        pros: 0,
        lat: 39.341058,
        lon: -76.684955
    }, {
        id: 30,
        landlord_num: 0,
        address: "4610-4614 WALLINGTON AVE",
        units: 18,
        ecb: 0,
        pros: 0,
        lat: 39.33954,
        lon: -76.682987
    }, {
        id: 31,
        landlord_num: 0,
        address: "3329 BRIGHTON ST",
        units: 12,
        ecb: 0,
        pros: 0,
        lat: 39.304789,
        lon: -76.673157
    }, {
        id: 32,
        landlord_num: 0,
        address: "3912 W NORTHERN PKWY",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.350459,
        lon: -76.689562
    }, {
        id: 33,
        landlord_num: 0,
        address: "3932 W NORTHERN PKWY",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.350383,
        lon: -76.69
    }, {
        id: 34,
        landlord_num: 0,
        address: "3952 W NORTHERN PKWY",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.350097,
        lon: -76.690295
    }, {
        id: 35,
        landlord_num: 0,
        address: "705 NOTTINGHAM ROAD",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.294319,
        lon: -76.701867
    }, {
        id: 36,
        landlord_num: 0,
        address: "707 NOTTINGHAM ROAD",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.294642,
        lon: -76.702168
    }, {
        id: 37,
        landlord_num: 0,
        address: "709 NOTTINGHAM ROAD",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.295028,
        lon: -76.702277
    }, {
        id: 38,
        landlord_num: 0,
        address: "4509 WAKEFIELD ROAD",
        units: 9,
        ecb: 0,
        pros: 0,
        lat: 39.318487,
        lon: -76.692721
    }, {
        id: 39,
        landlord_num: 0,
        address: "2730 N LONGWOOD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.318155,
        lon: -76.669528
    }, {
        id: 40,
        landlord_num: 1,
        address: "1918 N CHARLES ST",
        units: 3,
        ecb: 8,
        pros: 0,
        lat: 39.311896,
        lon: -76.616886
    }, {
        id: 41,
        landlord_num: 1,
        address: "2544 QUANTICO AVE",
        units: 1,
        ecb: 8,
        pros: 0,
        lat: 39.338284,
        lon: -76.660674
    }, {
        id: 42,
        landlord_num: 1,
        address: "151 DENISON ST",
        units: 2,
        ecb: 5,
        pros: 0,
        lat: 39.289588,
        lon: -76.675434
    }, {
        id: 43,
        landlord_num: 1,
        address: "4742 ELISON AVE",
        units: 1,
        ecb: 5,
        pros: 0,
        lat: 39.322643,
        lon: -76.554964
    }, {
        id: 44,
        landlord_num: 1,
        address: "216 S PAYSON ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.284398,
        lon: -76.648693
    }, {
        id: 45,
        landlord_num: 1,
        address: "605 OLDHAM ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.285862,
        lon: -76.555479
    }, {
        id: 46,
        landlord_num: 1,
        address: "3803 MOUNT PLEASANT AVE",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.29077,
        lon: -76.56514
    }, {
        id: 47,
        landlord_num: 1,
        address: "120 S HIGHLAND AVE",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.290824,
        lon: -76.56961
    }, {
        id: 48,
        landlord_num: 1,
        address: "510 N PORT ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.297147,
        lon: -76.583076
    }, {
        id: 49,
        landlord_num: 1,
        address: "1052 N IRIS AVE",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.304316,
        lon: -76.562909
    }, {
        id: 50,
        landlord_num: 1,
        address: "1310 W LEXINGTON ST",
        units: 3,
        ecb: 2,
        pros: 0,
        lat: 39.291216,
        lon: -76.638803
    }, {
        id: 51,
        landlord_num: 1,
        address: "1114 W CROSS ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.281663,
        lon: -76.63064
    }, {
        id: 52,
        landlord_num: 1,
        address: "344 S FULTON AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.283293,
        lon: -76.645139
    }, {
        id: 53,
        landlord_num: 1,
        address: "615 OLDHAM ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.285681,
        lon: -76.555415
    }, {
        id: 54,
        landlord_num: 1,
        address: "626 DENISON ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.295075,
        lon: -76.674518
    }, {
        id: 55,
        landlord_num: 1,
        address: "405 N PORT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.296012,
        lon: -76.582665
    }, {
        id: 56,
        landlord_num: 1,
        address: "519 N PORT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.297307,
        lon: -76.582762
    }, {
        id: 57,
        landlord_num: 1,
        address: "1027 N CARROLLTON AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.300956,
        lon: -76.637177
    }, {
        id: 58,
        landlord_num: 1,
        address: "1132 N CARROLLTON AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.301922,
        lon: -76.637713
    }, {
        id: 59,
        landlord_num: 1,
        address: "2711 E CHASE ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.303658,
        lon: -76.579336
    }, {
        id: 60,
        landlord_num: 1,
        address: "1200 N LUZERNE AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.304906,
        lon: -76.581503
    }, {
        id: 61,
        landlord_num: 1,
        address: "1537 POPLAR GROVE ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.305732,
        lon: -76.665251
    }, {
        id: 62,
        landlord_num: 1,
        address: "1636 N FULTON AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.307451,
        lon: -76.646612
    }, {
        id: 63,
        landlord_num: 1,
        address: "2001 CECIL AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.313126,
        lon: -76.605032
    }, {
        id: 64,
        landlord_num: 1,
        address: "2222 AIKEN ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.315791,
        lon: -76.598964
    }, {
        id: 65,
        landlord_num: 1,
        address: "4124 FAIRVIEW AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.322867,
        lon: -76.687216
    }, {
        id: 66,
        landlord_num: 1,
        address: "1916 E 31ST ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.326537,
        lon: -76.58844
    }, {
        id: 67,
        landlord_num: 1,
        address: "3919 BOARMAN AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.33406,
        lon: -76.681623
    }, {
        id: 68,
        landlord_num: 1,
        address: "3421 E BALTIMORE ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.292299,
        lon: -76.568724
    }, {
        id: 69,
        landlord_num: 1,
        address: "2512 MCCULLOH ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.31307,
        lon: -76.639974
    }, {
        id: 70,
        landlord_num: 1,
        address: "2504 N CALVERT ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.318463,
        lon: -76.614525
    }, {
        id: 71,
        landlord_num: 1,
        address: "1706 MALVERN ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.273308,
        lon: -76.534263
    }, {
        id: 72,
        landlord_num: 1,
        address: "520 HURLEY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.27766,
        lon: -76.663493
    }, {
        id: 73,
        landlord_num: 1,
        address: "611 S SMALLWOOD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280258,
        lon: -76.649999
    }, {
        id: 74,
        landlord_num: 1,
        address: "307 S AUGUSTA AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280961,
        lon: -76.684288
    }, {
        id: 75,
        landlord_num: 1,
        address: "428 S PAYSON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.282109,
        lon: -76.648192
    }, {
        id: 76,
        landlord_num: 1,
        address: "226 S CALHOUN ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.284888,
        lon: -76.639562
    }, {
        id: 77,
        landlord_num: 1,
        address: "646 S MACON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.285077,
        lon: -76.55738
    }, {
        id: 78,
        landlord_num: 1,
        address: "631 S MACON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.285371,
        lon: -76.556973
    }, {
        id: 79,
        landlord_num: 1,
        address: "2553 W LOMBARD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.285528,
        lon: -76.657441
    }, {
        id: 80,
        landlord_num: 1,
        address: "514 S CLINTON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.28576,
        lon: -76.570133
    }, {
        id: 81,
        landlord_num: 1,
        address: "3400 W CATON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.286313,
        lon: -76.673315
    }, {
        id: 82,
        landlord_num: 1,
        address: "2134 BOYD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.286581,
        lon: -76.651095
    }, {
        id: 83,
        landlord_num: 1,
        address: "311 BAYLIS ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.288062,
        lon: -76.568028
    }, {
        id: 84,
        landlord_num: 1,
        address: "250 N PAYSON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.291784,
        lon: -76.649132
    }, {
        id: 85,
        landlord_num: 1,
        address: "27 N KRESSON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.293738,
        lon: -76.559782
    }, {
        id: 86,
        landlord_num: 1,
        address: "130 N COLLINGTON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.293774,
        lon: -76.586593
    }, {
        id: 87,
        landlord_num: 1,
        address: "105 N JANNEY ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.294139,
        lon: -76.560596
    }, {
        id: 88,
        landlord_num: 1,
        address: "1610 W FRANKLIN ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.294166,
        lon: -76.643268
    }, {
        id: 89,
        landlord_num: 1,
        address: "145 N POTOMAC ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.294244,
        lon: -76.574661
    }, {
        id: 90,
        landlord_num: 1,
        address: "3316 EDMONDSON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.294386,
        lon: -76.673438
    }, {
        id: 91,
        landlord_num: 1,
        address: "928 BENNETT PL",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.295146,
        lon: -76.63315
    }, {
        id: 92,
        landlord_num: 1,
        address: "402 N PORT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.295944,
        lon: -76.583007
    }, {
        id: 93,
        landlord_num: 1,
        address: "403 N PORT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.295977,
        lon: -76.582663
    }, {
        id: 94,
        landlord_num: 1,
        address: "407 N PORT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.296047,
        lon: -76.582668
    }, {
        id: 95,
        landlord_num: 1,
        address: "726 N GRANTLEY ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.296061,
        lon: -76.67705
    }, {
        id: 96,
        landlord_num: 1,
        address: "409 N PORT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.296062,
        lon: -76.582717
    }, {
        id: 97,
        landlord_num: 1,
        address: "411 N PORT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.296116,
        lon: -76.582673
    }, {
        id: 98,
        landlord_num: 1,
        address: "418 N PORT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.296203,
        lon: -76.583025
    }, {
        id: 99,
        landlord_num: 1,
        address: "424 N PORT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.296301,
        lon: -76.583032
    }, {
        id: 100,
        landlord_num: 1,
        address: "427 N BRADFORD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.296316,
        lon: -76.584105
    }, {
        id: 101,
        landlord_num: 1,
        address: "423 N PORT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.296325,
        lon: -76.582689
    }, {
        id: 102,
        landlord_num: 1,
        address: "426 N PORT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.296334,
        lon: -76.583035
    }, {
        id: 103,
        landlord_num: 1,
        address: "428 N PORT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.296366,
        lon: -76.583039
    }, {
        id: 104,
        landlord_num: 1,
        address: "1946 HARLEM AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.29652,
        lon: -76.648925
    }, {
        id: 105,
        landlord_num: 1,
        address: "615 N BELNORD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.298232,
        lon: -76.5785
    }, {
        id: 106,
        landlord_num: 1,
        address: "2229 E MADISON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.299573,
        lon: -76.585751
    }, {
        id: 107,
        landlord_num: 1,
        address: "801 N BRADFORD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.300128,
        lon: -76.584346
    }, {
        id: 108,
        landlord_num: 1,
        address: "1228 E EAGER ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.301807,
        lon: -76.600789
    }, {
        id: 109,
        landlord_num: 1,
        address: "1028 N EDEN ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.30239,
        lon: -76.599684
    }, {
        id: 110,
        landlord_num: 1,
        address: "1208 N CAREY ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.3028,
        lon: -76.639153
    }, {
        id: 111,
        landlord_num: 1,
        address: "1713 N PATTERSON PARK AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.310347,
        lon: -76.585567
    }, {
        id: 112,
        landlord_num: 1,
        address: "1406 WHITELOCK ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.311432,
        lon: -76.640013
    }, {
        id: 113,
        landlord_num: 1,
        address: "2201 AIKEN ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.315199,
        lon: -76.598943
    }, {
        id: 114,
        landlord_num: 1,
        address: "3627 ELMORA AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.315777,
        lon: -76.567274
    }, {
        id: 115,
        landlord_num: 1,
        address: "645 GUTMAN AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.31704,
        lon: -76.606606
    }, {
        id: 116,
        landlord_num: 1,
        address: "2503 BARCLAY ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.318524,
        lon: -76.610832
    }, {
        id: 117,
        landlord_num: 1,
        address: "2908 MILES AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.321627,
        lon: -76.624504
    }, {
        id: 118,
        landlord_num: 1,
        address: "936 MONTPELIER ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.32478,
        lon: -76.603753
    }, {
        id: 119,
        landlord_num: 1,
        address: "4018 WILSBY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.338657,
        lon: -76.604755
    }, {
        id: 120,
        landlord_num: 1,
        address: "5402 NARCISSUS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.349018,
        lon: -76.684669
    }, {
        id: 121,
        landlord_num: 1,
        address: "5516 MIDWOOD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.355978,
        lon: -76.601568
    }, {
        id: 122,
        landlord_num: 1,
        address: "2700 ROSLYN AVE",
        units: 8,
        ecb: 0,
        pros: 0,
        lat: 39.318358,
        lon: -76.678451
    }, {
        id: 123,
        landlord_num: 1,
        address: "2236 EUTAW PL",
        units: 5,
        ecb: 0,
        pros: 0,
        lat: 39.311299,
        lon: -76.635297
    }, {
        id: 124,
        landlord_num: 1,
        address: "1700 S CHARLES ST",
        units: 4,
        ecb: 0,
        pros: 0,
        lat: 39.270427,
        lon: -76.614199
    }, {
        id: 125,
        landlord_num: 1,
        address: "2410 SAINT PAUL ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.316746,
        lon: -76.61551
    }, {
        id: 126,
        landlord_num: 1,
        address: "2446 DRUID HILL AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.312222,
        lon: -76.640443
    }, {
        id: 127,
        landlord_num: 1,
        address: "2919 E MONUMENT ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.2989,
        lon: -76.576058
    }, {
        id: 128,
        landlord_num: 1,
        address: "3020 MCELDERRY ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.298234,
        lon: -76.574318
    }, {
        id: 129,
        landlord_num: 1,
        address: "320 E BELVEDERE AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.364349,
        lon: -76.613688
    }, {
        id: 130,
        landlord_num: 1,
        address: "3324 GWYNNS FALLS PKWY",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.314564,
        lon: -76.673804
    }, {
        id: 131,
        landlord_num: 1,
        address: "3538 PELHAM AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.319962,
        lon: -76.564735
    }, {
        id: 132,
        landlord_num: 1,
        address: "3545 JUNEWAY",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.318275,
        lon: -76.565506
    }, {
        id: 133,
        landlord_num: 1,
        address: "3702 ERDMAN AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.316315,
        lon: -76.568839
    }, {
        id: 134,
        landlord_num: 1,
        address: "3706 OLD YORK ROAD",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.333723,
        lon: -76.60787
    }, {
        id: 135,
        landlord_num: 1,
        address: "3803 W SARATOGA ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.290518,
        lon: -76.679992
    }, {
        id: 136,
        landlord_num: 1,
        address: "3813 WHITE AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.347427,
        lon: -76.547774
    }, {
        id: 137,
        landlord_num: 1,
        address: "5560 MIDWOOD AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.357175,
        lon: -76.600728
    }, {
        id: 138,
        landlord_num: 1,
        address: "9 YORK CT",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.337391,
        lon: -76.609592
    }, {
        id: 139,
        landlord_num: 1,
        address: "1007 BRANTLEY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296035,
        lon: -76.634499
    }, {
        id: 140,
        landlord_num: 1,
        address: "1009 N PAYSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300269,
        lon: -76.649067
    }, {
        id: 141,
        landlord_num: 1,
        address: "1010 DARLEY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.317086,
        lon: -76.600032
    }, {
        id: 142,
        landlord_num: 1,
        address: "1024 CAMERON ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.356852,
        lon: -76.599568
    }, {
        id: 143,
        landlord_num: 1,
        address: "1049 GREENMOUNT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.302541,
        lon: -76.607363
    }, {
        id: 144,
        landlord_num: 1,
        address: "1069 W LEXINGTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.290745,
        lon: -76.635945
    }, {
        id: 145,
        landlord_num: 1,
        address: "1101 GORSUCH AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.325472,
        lon: -76.602483
    }, {
        id: 146,
        landlord_num: 1,
        address: "1117 N CAREY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.301604,
        lon: -76.638595
    }, {
        id: 147,
        landlord_num: 1,
        address: "1127 ASHBURTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.30106,
        lon: -76.66151
    }, {
        id: 148,
        landlord_num: 1,
        address: "1129 N CARROLLTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.301858,
        lon: -76.6372
    }, {
        id: 149,
        landlord_num: 1,
        address: "1140 N CARROLLTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.302072,
        lon: -76.637721
    }, {
        id: 150,
        landlord_num: 1,
        address: "115 N JANNEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294315,
        lon: -76.560604
    }, {
        id: 151,
        landlord_num: 1,
        address: "117 N JANNEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294349,
        lon: -76.560609
    }, {
        id: 152,
        landlord_num: 1,
        address: "118 S MONROE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.285759,
        lon: -76.64702
    }, {
        id: 153,
        landlord_num: 1,
        address: "1200 BONAPARTE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.315509,
        lon: -76.599815
    }, {
        id: 154,
        landlord_num: 1,
        address: "1217 E FEDERAL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308119,
        lon: -76.601568
    }, {
        id: 155,
        landlord_num: 1,
        address: "1222 E EAGER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.301801,
        lon: -76.600936
    }, {
        id: 156,
        landlord_num: 1,
        address: "1226 E EAGER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.301805,
        lon: -76.60084
    }, {
        id: 157,
        landlord_num: 1,
        address: "1239 WASHINGTON BLVD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.281032,
        lon: -76.634588
    }, {
        id: 158,
        landlord_num: 1,
        address: "1300 MCHENRY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284728,
        lon: -76.638023
    }, {
        id: 159,
        landlord_num: 1,
        address: "1302 MCHENRY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284728,
        lon: -76.638067
    }, {
        id: 160,
        landlord_num: 1,
        address: "1304 E EAGER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.301813,
        lon: -76.600067
    }, {
        id: 161,
        landlord_num: 1,
        address: "1336 N LUZERNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306749,
        lon: -76.581628
    }, {
        id: 162,
        landlord_num: 1,
        address: "14 N BENTALOU ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.288451,
        lon: -76.653139
    }, {
        id: 163,
        landlord_num: 1,
        address: "1411 N CAROLINE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306608,
        lon: -76.597839
    }, {
        id: 164,
        landlord_num: 1,
        address: "1412 E OLIVER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.307478,
        lon: -76.599075
    }, {
        id: 165,
        landlord_num: 1,
        address: "1413 GITTINGS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.369504,
        lon: -76.5861
    }, {
        id: 166,
        landlord_num: 1,
        address: "1422 N EDEN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306773,
        lon: -76.599961
    }, {
        id: 167,
        landlord_num: 1,
        address: "1434 N FULTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.30505,
        lon: -76.646416
    }, {
        id: 168,
        landlord_num: 1,
        address: "1525 E 29TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.32439,
        lon: -76.594658
    }, {
        id: 169,
        landlord_num: 1,
        address: "1526 N SPRING ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.30801,
        lon: -76.599152
    }, {
        id: 170,
        landlord_num: 1,
        address: "1531 RALWORTH ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.339114,
        lon: -76.592006
    }, {
        id: 171,
        landlord_num: 1,
        address: "1535 N WOODYEAR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306868,
        lon: -76.640988
    }, {
        id: 172,
        landlord_num: 1,
        address: "1568 MORELAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306086,
        lon: -76.65605
    }, {
        id: 173,
        landlord_num: 1,
        address: "16 S MONROE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.287297,
        lon: -76.64713
    }, {
        id: 174,
        landlord_num: 1,
        address: "1621 N BENTALOU ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306894,
        lon: -76.653638
    }, {
        id: 175,
        landlord_num: 1,
        address: "1623 MORELAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.307025,
        lon: -76.655559
    }, {
        id: 176,
        landlord_num: 1,
        address: "1629 RUTLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.309546,
        lon: -76.592654
    }, {
        id: 177,
        landlord_num: 1,
        address: "1635 N BENTALOU ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.307163,
        lon: -76.653656
    }, {
        id: 178,
        landlord_num: 1,
        address: "1640 NORTHWICK ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.343598,
        lon: -76.587606
    }, {
        id: 179,
        landlord_num: 1,
        address: "1644 CHILTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.327681,
        lon: -76.592481
    }, {
        id: 180,
        landlord_num: 1,
        address: "1708 N CAREY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308842,
        lon: -76.643131
    }, {
        id: 181,
        landlord_num: 1,
        address: "1711 N BENTALOU ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.307965,
        lon: -76.653703
    }, {
        id: 182,
        landlord_num: 1,
        address: "1726 E 28TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.324084,
        lon: -76.591114
    }, {
        id: 183,
        landlord_num: 1,
        address: "1729 N BENTALOU ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308317,
        lon: -76.653718
    }, {
        id: 184,
        landlord_num: 1,
        address: "1732 E 30TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.325529,
        lon: -76.591038
    }, {
        id: 185,
        landlord_num: 1,
        address: "1739 N CASTLE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.310516,
        lon: -76.589112
    }, {
        id: 186,
        landlord_num: 1,
        address: "1800 N CHAPEL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.311125,
        lon: -76.5911
    }, {
        id: 187,
        landlord_num: 1,
        address: "1802 E 28TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.324083,
        lon: -76.590498
    }, {
        id: 188,
        landlord_num: 1,
        address: "1807 LAURETTA AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294375,
        lon: -76.646501
    }, {
        id: 189,
        landlord_num: 1,
        address: "1836 W NORTH AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.310063,
        lon: -76.647787
    }, {
        id: 190,
        landlord_num: 1,
        address: "1843 DRUID HILL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306651,
        lon: -76.634006
    }, {
        id: 191,
        landlord_num: 1,
        address: "1921 WOODBOURNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.354896,
        lon: -76.580459
    }, {
        id: 192,
        landlord_num: 1,
        address: "1933 HARLEM AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296167,
        lon: -76.648538
    }, {
        id: 193,
        landlord_num: 1,
        address: "2007 HOLLINS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286863,
        lon: -76.648874
    }, {
        id: 194,
        landlord_num: 1,
        address: "201 S CATHERINE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284654,
        lon: -76.655733
    }, {
        id: 195,
        landlord_num: 1,
        address: "2032 ROBB ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313701,
        lon: -76.603159
    }, {
        id: 196,
        landlord_num: 1,
        address: "2033 E LANVALE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.309679,
        lon: -76.588858
    }, {
        id: 197,
        landlord_num: 1,
        address: "2038 W FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.289558,
        lon: -76.649902
    }, {
        id: 198,
        landlord_num: 1,
        address: "204 S GILMOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.285168,
        lon: -76.642432
    }, {
        id: 199,
        landlord_num: 1,
        address: "206 S GILMOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.285127,
        lon: -76.642429
    }, {
        id: 200,
        landlord_num: 1,
        address: "2100 CLIFTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312019,
        lon: -76.651917
    }, {
        id: 201,
        landlord_num: 1,
        address: "2108 N ROSEDALE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.311896,
        lon: -76.66976
    }, {
        id: 202,
        landlord_num: 1,
        address: "2108 N SMALLWOOD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312025,
        lon: -76.65313
    }, {
        id: 203,
        landlord_num: 1,
        address: "211 S GILMOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.285065,
        lon: -76.641921
    }, {
        id: 204,
        landlord_num: 1,
        address: "2144 HOLLINS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.28714,
        lon: -76.651221
    }, {
        id: 205,
        landlord_num: 1,
        address: "2230 CEDLEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.263307,
        lon: -76.632116
    }, {
        id: 206,
        landlord_num: 1,
        address: "2247 CECIL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.314482,
        lon: -76.603939
    }, {
        id: 207,
        landlord_num: 1,
        address: "2301 E LAFAYETTE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.31084,
        lon: -76.585386
    }, {
        id: 208,
        landlord_num: 1,
        address: "2306 BARCLAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.31573,
        lon: -76.611458
    }, {
        id: 209,
        landlord_num: 1,
        address: "2317 LAURETTA AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293946,
        lon: -76.653724
    }, {
        id: 210,
        landlord_num: 1,
        address: "2325 W LANVALE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296816,
        lon: -76.654499
    }, {
        id: 211,
        landlord_num: 1,
        address: "2335 EDMONDSON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294532,
        lon: -76.65434
    }, {
        id: 212,
        landlord_num: 1,
        address: "2400 BARCLAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.316652,
        lon: -76.611555
    }, {
        id: 213,
        landlord_num: 1,
        address: "2434 DRUID PARK DR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.329021,
        lon: -76.655998
    }, {
        id: 214,
        landlord_num: 1,
        address: "2470 KEYWORTH AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.335041,
        lon: -76.659314
    }, {
        id: 215,
        landlord_num: 1,
        address: "2508 WOODBROOK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312067,
        lon: -76.643379
    }, {
        id: 216,
        landlord_num: 1,
        address: "2533 WOODBROOK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312847,
        lon: -76.643689
    }, {
        id: 217,
        landlord_num: 1,
        address: "2542 ASHLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.301178,
        lon: -76.581199
    }, {
        id: 218,
        landlord_num: 1,
        address: "2554 CECIL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.319879,
        lon: -76.599448
    }, {
        id: 219,
        landlord_num: 1,
        address: "2563 HARLEM AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295861,
        lon: -76.659244
    }, {
        id: 220,
        landlord_num: 1,
        address: "2611 HAFER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283047,
        lon: -76.658072
    }, {
        id: 221,
        landlord_num: 1,
        address: "2622 PARK HEIGHTS TERR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.338556,
        lon: -76.662368
    }, {
        id: 222,
        landlord_num: 1,
        address: "2709 PELHAM AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.326377,
        lon: -76.5739
    }, {
        id: 223,
        landlord_num: 1,
        address: "2719 RIGGS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300187,
        lon: -76.662326
    }, {
        id: 224,
        landlord_num: 1,
        address: "2722 KINSEY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.287908,
        lon: -76.659785
    }, {
        id: 225,
        landlord_num: 1,
        address: "2803 ROCKROSE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.329069,
        lon: -76.661134
    }, {
        id: 226,
        landlord_num: 1,
        address: "2805 ERDMAN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.323089,
        lon: -76.576449
    }, {
        id: 227,
        landlord_num: 1,
        address: "2810 CLIFTON PARK TERR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.322631,
        lon: -76.576726
    }, {
        id: 228,
        landlord_num: 1,
        address: "2811 E BIDDLE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.304747,
        lon: -76.578041
    }, {
        id: 229,
        landlord_num: 1,
        address: "2827 MILES AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.320903,
        lon: -76.623574
    }, {
        id: 230,
        landlord_num: 1,
        address: "2836 W NORTH AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.309431,
        lon: -76.664931
    }, {
        id: 231,
        landlord_num: 1,
        address: "2841 MILES AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321115,
        lon: -76.623743
    }, {
        id: 232,
        landlord_num: 1,
        address: "2848 BOARMAN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.337501,
        lon: -76.669402
    }, {
        id: 233,
        landlord_num: 1,
        address: "2907 ROCKROSE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.328706,
        lon: -76.661896
    }, {
        id: 234,
        landlord_num: 1,
        address: "2913 EDGECOMBE CIRCLE NORTH",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.34319,
        lon: -76.664176
    }, {
        id: 235,
        landlord_num: 1,
        address: "2930 WINDSOR AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.31248,
        lon: -76.667591
    }, {
        id: 236,
        landlord_num: 1,
        address: "2931 ARUNAH AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295001,
        lon: -76.666252
    }, {
        id: 237,
        landlord_num: 1,
        address: "2939 ERDMAN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.322076,
        lon: -76.57493
    }, {
        id: 238,
        landlord_num: 1,
        address: "3013 HERBERT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.309524,
        lon: -76.668377
    }, {
        id: 239,
        landlord_num: 1,
        address: "3018 E NORTHERN PKWY",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.363008,
        lon: -76.550155
    }, {
        id: 240,
        landlord_num: 1,
        address: "3020 BRENDAN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.323053,
        lon: -76.570466
    }, {
        id: 241,
        landlord_num: 1,
        address: "3046 BRIGHTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.305358,
        lon: -76.668652
    }, {
        id: 242,
        landlord_num: 1,
        address: "305 S PAYSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283999,
        lon: -76.648137
    }, {
        id: 243,
        landlord_num: 1,
        address: "308 S PULASKI ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283666,
        lon: -76.650052
    }, {
        id: 244,
        landlord_num: 1,
        address: "310 E 27TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321007,
        lon: -76.612206
    }, {
        id: 245,
        landlord_num: 1,
        address: "316 S PAYSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283792,
        lon: -76.648667
    }, {
        id: 246,
        landlord_num: 1,
        address: "318 WHITRIDGE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321655,
        lon: -76.612091
    }, {
        id: 247,
        landlord_num: 1,
        address: "3214 CLIFTMONT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.319044,
        lon: -76.573326
    }, {
        id: 248,
        landlord_num: 1,
        address: "3225 BRIGHTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.304857,
        lon: -76.671808
    }, {
        id: 249,
        landlord_num: 1,
        address: "328 S FULTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283567,
        lon: -76.645173
    }, {
        id: 250,
        landlord_num: 1,
        address: "3336 W BELVEDERE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.348067,
        lon: -76.677931
    }, {
        id: 251,
        landlord_num: 1,
        address: "3418 PIEDMONT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.316455,
        lon: -76.675354
    }, {
        id: 252,
        landlord_num: 1,
        address: "3424 JUNEWAY",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.318218,
        lon: -76.568608
    }, {
        id: 253,
        landlord_num: 1,
        address: "3555 JUNEWAY",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.318321,
        lon: -76.565146
    }, {
        id: 254,
        landlord_num: 1,
        address: "3646 KENYON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.318675,
        lon: -76.562219
    }, {
        id: 255,
        landlord_num: 1,
        address: "3720 EDMONDSON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294163,
        lon: -76.679299
    }, {
        id: 256,
        landlord_num: 1,
        address: "38 N MORLEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.287706,
        lon: -76.673462
    }, {
        id: 257,
        landlord_num: 1,
        address: "3802 BONNER ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.323315,
        lon: -76.681876
    }, {
        id: 258,
        landlord_num: 1,
        address: "3818 EDNOR ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.334687,
        lon: -76.599539
    }, {
        id: 259,
        landlord_num: 1,
        address: "3818 ROLAND VIEW AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.333803,
        lon: -76.658468
    }, {
        id: 260,
        landlord_num: 1,
        address: "3910 MOUNT PLEASANT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.291084,
        lon: -76.564209
    }, {
        id: 261,
        landlord_num: 1,
        address: "4011 W COLD SPRING LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.334918,
        lon: -76.685105
    }, {
        id: 262,
        landlord_num: 1,
        address: "402 E LORRAINE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.320199,
        lon: -76.610917
    }, {
        id: 263,
        landlord_num: 1,
        address: "4108 IDAHO AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.340391,
        lon: -76.550155
    }, {
        id: 264,
        landlord_num: 1,
        address: "4131 MARY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.344745,
        lon: -76.54308
    }, {
        id: 265,
        landlord_num: 1,
        address: "414 GWYNN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29224,
        lon: -76.673924
    }, {
        id: 266,
        landlord_num: 1,
        address: "414 N STREEPER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296387,
        lon: -76.57736
    }, {
        id: 267,
        landlord_num: 1,
        address: "416 E LORRAINE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.320235,
        lon: -76.610575
    }, {
        id: 268,
        landlord_num: 1,
        address: "417 E LORRAINE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.31992,
        lon: -76.610576
    }, {
        id: 269,
        landlord_num: 1,
        address: "418 WHITRIDGE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321705,
        lon: -76.610521
    }, {
        id: 270,
        landlord_num: 1,
        address: "419 N PORT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296256,
        lon: -76.582684
    }, {
        id: 271,
        landlord_num: 1,
        address: "421 N PORT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29629,
        lon: -76.582686
    }, {
        id: 272,
        landlord_num: 1,
        address: "422 E LORRAINE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.3202,
        lon: -76.610423
    }, {
        id: 273,
        landlord_num: 1,
        address: "429 WHITRIDGE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321422,
        lon: -76.61029
    }, {
        id: 274,
        landlord_num: 1,
        address: "4326 E LOMBARD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.291916,
        lon: -76.560184
    }, {
        id: 275,
        landlord_num: 1,
        address: "434 E LORRAINE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.320224,
        lon: -76.610118
    }, {
        id: 276,
        landlord_num: 1,
        address: "439 N MONTFORD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296331,
        lon: -76.583311
    }, {
        id: 277,
        landlord_num: 1,
        address: "441 E 28TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321944,
        lon: -76.609921
    }, {
        id: 278,
        landlord_num: 1,
        address: "446 E 28TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.322368,
        lon: -76.609762
    }, {
        id: 279,
        landlord_num: 1,
        address: "4710 PARKSIDE DR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.322524,
        lon: -76.556999
    }, {
        id: 280,
        landlord_num: 1,
        address: "4721 OLD YORK ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.345838,
        lon: -76.607586
    }, {
        id: 281,
        landlord_num: 1,
        address: "5023 FRANKFORD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.327644,
        lon: -76.541624
    }, {
        id: 282,
        landlord_num: 1,
        address: "5110 HOLDER AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.345697,
        lon: -76.559379
    }, {
        id: 283,
        landlord_num: 1,
        address: "512 DENISON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293207,
        lon: -76.67434
    }, {
        id: 284,
        landlord_num: 1,
        address: "518 N HIGHLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29767,
        lon: -76.569997
    }, {
        id: 285,
        landlord_num: 1,
        address: "522 E 27TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321036,
        lon: -76.608326
    }, {
        id: 286,
        landlord_num: 1,
        address: "524 N CHESTER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297191,
        lon: -76.588051
    }, {
        id: 287,
        landlord_num: 1,
        address: "527 N STREEPER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297674,
        lon: -76.577054
    }, {
        id: 288,
        landlord_num: 1,
        address: "540 E PATAPSCO AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.236539,
        lon: -76.602414
    }, {
        id: 289,
        landlord_num: 1,
        address: "600 N PAYSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295404,
        lon: -76.649314
    }, {
        id: 290,
        landlord_num: 1,
        address: "605 N HIGHLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.298426,
        lon: -76.569578
    }, {
        id: 291,
        landlord_num: 1,
        address: "609 WINSTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.349852,
        lon: -76.607298
    }, {
        id: 292,
        landlord_num: 1,
        address: "613 N BELNORD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.298195,
        lon: -76.578497
    }, {
        id: 293,
        landlord_num: 1,
        address: "621 E 30TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.32412,
        lon: -76.607865
    }, {
        id: 294,
        landlord_num: 1,
        address: "622 ALLENDALE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29498,
        lon: -76.678677
    }, {
        id: 295,
        landlord_num: 1,
        address: "623 DUMBARTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.337943,
        lon: -76.60632
    }, {
        id: 296,
        landlord_num: 1,
        address: "623 E 30TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.324108,
        lon: -76.607817
    }, {
        id: 297,
        landlord_num: 1,
        address: "721 RADNOR AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.347047,
        lon: -76.604896
    }, {
        id: 298,
        landlord_num: 1,
        address: "722 MELVILLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.331627,
        lon: -76.605482
    }, {
        id: 299,
        landlord_num: 1,
        address: "722 N PORT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299488,
        lon: -76.583217
    }, {
        id: 300,
        landlord_num: 1,
        address: "723 GORSUCH AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.326688,
        lon: -76.60571
    }, {
        id: 301,
        landlord_num: 1,
        address: "727 MILYER LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29513,
        lon: -76.703643
    }, {
        id: 302,
        landlord_num: 1,
        address: "733 N LINWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300028,
        lon: -76.576514
    }, {
        id: 303,
        landlord_num: 1,
        address: "805 MANGOLD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.28107,
        lon: -76.627334
    }, {
        id: 304,
        landlord_num: 1,
        address: "805 N KENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300265,
        lon: -76.577891
    }, {
        id: 305,
        landlord_num: 1,
        address: "807 LYNDHURST ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296689,
        lon: -76.681123
    }, {
        id: 306,
        landlord_num: 1,
        address: "808 APPLETON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.298028,
        lon: -76.64859
    }, {
        id: 307,
        landlord_num: 1,
        address: "809 PONCA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283772,
        lon: -76.554475
    }, {
        id: 308,
        landlord_num: 1,
        address: "822 N KENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300579,
        lon: -76.578398
    }, {
        id: 309,
        landlord_num: 1,
        address: "905 RAMSAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283476,
        lon: -76.632067
    }, {
        id: 310,
        landlord_num: 1,
        address: "913 N GILMOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299573,
        lon: -76.642711
    }, {
        id: 311,
        landlord_num: 1,
        address: "917 BENNETT PL",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294833,
        lon: -76.632729
    }, {
        id: 312,
        landlord_num: 1,
        address: "917 N GILMOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29969,
        lon: -76.642718
    }, {
        id: 313,
        landlord_num: 1,
        address: "932 N GILMOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29966,
        lon: -76.643247
    }, {
        id: 314,
        landlord_num: 1,
        address: "947 MONTPELIER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.324461,
        lon: -76.603876
    }, {
        id: 315,
        landlord_num: 1,
        address: "950 NORTH HILL ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.338083,
        lon: -76.601142
    }, {
        id: 316,
        landlord_num: 2,
        address: "1000 FELL ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.279994,
        lon: -76.589487
    }, {
        id: 317,
        landlord_num: 2,
        address: "316 N HILTON ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.291041,
        lon: -76.672883
    }, {
        id: 318,
        landlord_num: 2,
        address: "1026 POPLAR GROVE ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.299857,
        lon: -76.665582
    }, {
        id: 319,
        landlord_num: 2,
        address: "808 NEWINGTON AVE",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.313859,
        lon: -76.632249
    }, {
        id: 320,
        landlord_num: 2,
        address: "891 N HOWARD ST",
        units: 2,
        ecb: 2,
        pros: 0,
        lat: 39.300704,
        lon: -76.619891
    }, {
        id: 321,
        landlord_num: 2,
        address: "3903 EIERMAN AVE",
        units: 2,
        ecb: 2,
        pros: 0,
        lat: 39.330467,
        lon: -76.567018
    }, {
        id: 322,
        landlord_num: 2,
        address: "721 BARTLETT AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.315746,
        lon: -76.606102
    }, {
        id: 323,
        landlord_num: 2,
        address: "2533 LOYOLA SOUTHWAY",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.33727,
        lon: -76.660307
    }, {
        id: 324,
        landlord_num: 2,
        address: "3617 RAVENWOOD AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.315047,
        lon: -76.567277
    }, {
        id: 325,
        landlord_num: 2,
        address: "3706 ERDMAN AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.316209,
        lon: -76.568833
    }, {
        id: 326,
        landlord_num: 2,
        address: "3616 ELMLEY AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.317465,
        lon: -76.568567
    }, {
        id: 327,
        landlord_num: 2,
        address: "4351 SHAMROCK AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.325789,
        lon: -76.562443
    }, {
        id: 328,
        landlord_num: 2,
        address: "3156 STAFFORD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.279675,
        lon: -76.669691
    }, {
        id: 329,
        landlord_num: 2,
        address: "253 S LOUDON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.282246,
        lon: -76.681673
    }, {
        id: 330,
        landlord_num: 2,
        address: "317 S FREMONT AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.284764,
        lon: -76.626355
    }, {
        id: 331,
        landlord_num: 2,
        address: "1736 EASTERN AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.285854,
        lon: -76.591883
    }, {
        id: 332,
        landlord_num: 2,
        address: "1021 N ROSEDALE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.300064,
        lon: -76.667849
    }, {
        id: 333,
        landlord_num: 2,
        address: "2203 HOMEWOOD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.314776,
        lon: -76.606921
    }, {
        id: 334,
        landlord_num: 2,
        address: "2717 N ROSEDALE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.317435,
        lon: -76.669393
    }, {
        id: 335,
        landlord_num: 2,
        address: "4020 W COLD SPRING LANE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.335287,
        lon: -76.685458
    }, {
        id: 336,
        landlord_num: 2,
        address: "3316 W GARRISON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.346102,
        lon: -76.676152
    }, {
        id: 337,
        landlord_num: 2,
        address: "1810 N CALVERT ST",
        units: 4,
        ecb: 0,
        pros: 0,
        lat: 39.310236,
        lon: -76.613978
    }, {
        id: 338,
        landlord_num: 2,
        address: "2125 MCCULLOH ST",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.309552,
        lon: -76.636025
    }, {
        id: 339,
        landlord_num: 2,
        address: "2125-1/2 MCCULLOH ST",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.309552,
        lon: -76.636025
    }, {
        id: 340,
        landlord_num: 2,
        address: "2718 BERYL AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.303351,
        lon: -76.579155
    }, {
        id: 341,
        landlord_num: 2,
        address: "102 S REGESTER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.290135,
        lon: -76.592696
    }, {
        id: 342,
        landlord_num: 2,
        address: "1055 ELLICOTT DR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299737,
        lon: -76.668735
    }, {
        id: 343,
        landlord_num: 2,
        address: "14 N CHESTER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292363,
        lon: -76.587824
    }, {
        id: 344,
        landlord_num: 2,
        address: "1606 MORELAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306538,
        lon: -76.656075
    }, {
        id: 345,
        landlord_num: 2,
        address: "1624 BRADDISH AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306704,
        lon: -76.661092
    }, {
        id: 346,
        landlord_num: 2,
        address: "2004 ELLSWORTH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306216,
        lon: -76.589539
    }, {
        id: 347,
        landlord_num: 2,
        address: "228 S STRICKER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284777,
        lon: -76.641046
    }, {
        id: 348,
        landlord_num: 2,
        address: "2504 MARBOURNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.253858,
        lon: -76.649935
    }, {
        id: 349,
        landlord_num: 2,
        address: "2816 RIGGS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.30051,
        lon: -76.66403
    }, {
        id: 350,
        landlord_num: 2,
        address: "3013 ELIZABETH AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.254993,
        lon: -76.650938
    }, {
        id: 351,
        landlord_num: 2,
        address: "3215 PHELPS LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.287316,
        lon: -76.67082
    }, {
        id: 352,
        landlord_num: 2,
        address: "3522 ELMORA AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.315937,
        lon: -76.571483
    }, {
        id: 353,
        landlord_num: 2,
        address: "3622 COTTAGE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.330752,
        lon: -76.658466
    }, {
        id: 354,
        landlord_num: 2,
        address: "38 S PULASKI ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286331,
        lon: -76.650194
    }, {
        id: 355,
        landlord_num: 2,
        address: "4221 FLOWERTON ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.2982,
        lon: -76.68758
    }, {
        id: 356,
        landlord_num: 2,
        address: "26 S MONASTERY AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.286208,
        lon: -76.678522
    }, {
        id: 357,
        landlord_num: 3,
        address: "1707 ASHBURTON ST",
        units: 1,
        ecb: 0,
        pros: 1,
        lat: 39.307587,
        lon: -76.661861
    }, {
        id: 358,
        landlord_num: 3,
        address: "627 GLENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 1,
        lat: 39.353276,
        lon: -76.606719
    }, {
        id: 359,
        landlord_num: 3,
        address: "1350 CARROLL ST",
        units: 1,
        ecb: 13,
        pros: 0,
        lat: 39.279218,
        lon: -76.635368
    }, {
        id: 360,
        landlord_num: 3,
        address: "3314 CARLISLE AVE",
        units: 6,
        ecb: 10,
        pros: 0,
        lat: 39.319645,
        lon: -76.674549
    }, {
        id: 361,
        landlord_num: 3,
        address: "1612 ABBOTSTON ST",
        units: 1,
        ecb: 6,
        pros: 0,
        lat: 39.322767,
        lon: -76.593943
    }, {
        id: 362,
        landlord_num: 3,
        address: "2528 OSWEGO AVE",
        units: 1,
        ecb: 6,
        pros: 0,
        lat: 39.337117,
        lon: -76.659698
    }, {
        id: 363,
        landlord_num: 3,
        address: "1343 CAMBRIA ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.232053,
        lon: -76.591419
    }, {
        id: 364,
        landlord_num: 3,
        address: "710 N GRANTLEY ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.295642,
        lon: -76.677573
    }, {
        id: 365,
        landlord_num: 3,
        address: "1627 MONTPELIER ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.320122,
        lon: -76.596127
    }, {
        id: 366,
        landlord_num: 3,
        address: "2740 HUGO AVE",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.323765,
        lon: -76.589671
    }, {
        id: 367,
        landlord_num: 3,
        address: "2733 SAINT PAUL ST",
        units: 4,
        ecb: 3,
        pros: 0,
        lat: 39.321643,
        lon: -76.615256
    }, {
        id: 368,
        landlord_num: 3,
        address: "627 ARSAN AVE",
        units: 2,
        ecb: 3,
        pros: 0,
        lat: 39.238503,
        lon: -76.599944
    }, {
        id: 369,
        landlord_num: 3,
        address: "4209 PIMLICO ROAD",
        units: 2,
        ecb: 3,
        pros: 0,
        lat: 39.337814,
        lon: -76.662722
    }, {
        id: 370,
        landlord_num: 3,
        address: "1519 APPLETON ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.305812,
        lon: -76.648571
    }, {
        id: 371,
        landlord_num: 3,
        address: "2844 LAKE AVE",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.323528,
        lon: -76.572946
    }, {
        id: 372,
        landlord_num: 3,
        address: "508 E PATAPSCO AVE",
        units: 3,
        ecb: 2,
        pros: 0,
        lat: 39.236911,
        lon: -76.603399
    }, {
        id: 373,
        landlord_num: 3,
        address: "4831 PENNINGTON AVE",
        units: 2,
        ecb: 2,
        pros: 0,
        lat: 39.222329,
        lon: -76.587931
    }, {
        id: 374,
        landlord_num: 3,
        address: "2635 QUANTICO AVE",
        units: 2,
        ecb: 2,
        pros: 0,
        lat: 39.337335,
        lon: -76.662467
    }, {
        id: 375,
        landlord_num: 3,
        address: "1517 ELMTREE ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.224244,
        lon: -76.589
    }, {
        id: 376,
        landlord_num: 3,
        address: "4207 MORRISON CT",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.227361,
        lon: -76.587795
    }, {
        id: 377,
        landlord_num: 3,
        address: "4116 MORRISON CT",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.227846,
        lon: -76.58807
    }, {
        id: 378,
        landlord_num: 3,
        address: "835 JACK ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.231175,
        lon: -76.599788
    }, {
        id: 379,
        landlord_num: 3,
        address: "4670 YORK ROAD",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.34605,
        lon: -76.609948
    }, {
        id: 380,
        landlord_num: 3,
        address: "3607 ROBERTS PL",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.295482,
        lon: -76.567461
    }, {
        id: 381,
        landlord_num: 3,
        address: "1209 ASHBURTON ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.301759,
        lon: -76.661557
    }, {
        id: 382,
        landlord_num: 3,
        address: "1532 E BIDDLE ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.304361,
        lon: -76.596742
    }, {
        id: 383,
        landlord_num: 3,
        address: "1524 N ELLAMONT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.305191,
        lon: -76.670959
    }, {
        id: 384,
        landlord_num: 3,
        address: "2639 MILES AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.31917,
        lon: -76.622215
    }, {
        id: 385,
        landlord_num: 3,
        address: "2854 LAKE AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.323404,
        lon: -76.572816
    }, {
        id: 386,
        landlord_num: 3,
        address: "1916 E 31ST ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.326537,
        lon: -76.58844
    }, {
        id: 387,
        landlord_num: 3,
        address: "3519 REISTERSTOWN ROAD",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.328328,
        lon: -76.659509
    }, {
        id: 388,
        landlord_num: 3,
        address: "2804 OAKFORD AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.340928,
        lon: -76.661267
    }, {
        id: 389,
        landlord_num: 3,
        address: "1712 MADISON AVE",
        units: 6,
        ecb: 1,
        pros: 0,
        lat: 39.306444,
        lon: -76.631595
    }, {
        id: 390,
        landlord_num: 3,
        address: "702 N CAREY ST",
        units: 3,
        ecb: 1,
        pros: 0,
        lat: 39.29702,
        lon: -76.638875
    }, {
        id: 391,
        landlord_num: 3,
        address: "2537 MADISON AVE",
        units: 3,
        ecb: 1,
        pros: 0,
        lat: 39.314645,
        lon: -76.63932
    }, {
        id: 392,
        landlord_num: 3,
        address: "4007 SPRINGDALE AVE",
        units: 3,
        ecb: 1,
        pros: 0,
        lat: 39.326016,
        lon: -76.687676
    }, {
        id: 393,
        landlord_num: 3,
        address: "1429 FILBERT ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.224946,
        lon: -76.590199
    }, {
        id: 394,
        landlord_num: 3,
        address: "911 JACK ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.230993,
        lon: -76.599218
    }, {
        id: 395,
        landlord_num: 3,
        address: "823 E JEFFREY ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.232034,
        lon: -76.600074
    }, {
        id: 396,
        landlord_num: 3,
        address: "3716 2ND ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.236576,
        lon: -76.609647
    }, {
        id: 397,
        landlord_num: 3,
        address: "3610 3RD ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.237031,
        lon: -76.607645
    }, {
        id: 398,
        landlord_num: 3,
        address: "3541 4TH ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.238081,
        lon: -76.604567
    }, {
        id: 399,
        landlord_num: 3,
        address: "621 ARSAN AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.238634,
        lon: -76.600222
    }, {
        id: 400,
        landlord_num: 3,
        address: "3428 6TH ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.239965,
        lon: -76.600726
    }, {
        id: 401,
        landlord_num: 3,
        address: "3426 6TH ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.24001,
        lon: -76.600702
    }, {
        id: 402,
        landlord_num: 3,
        address: "5 N EAST AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.292796,
        lon: -76.572144
    }, {
        id: 403,
        landlord_num: 3,
        address: "3323 MCELDERRY ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.298001,
        lon: -76.570548
    }, {
        id: 404,
        landlord_num: 3,
        address: "1612 BRADDISH AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.306517,
        lon: -76.661084
    }, {
        id: 405,
        landlord_num: 3,
        address: "3304 ROYCE AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.341683,
        lon: -76.670165
    }, {
        id: 406,
        landlord_num: 3,
        address: "512 CORDING AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.361561,
        lon: -76.60801
    }, {
        id: 407,
        landlord_num: 3,
        address: "1601 CEDDOX ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.220989,
        lon: -76.587926
    }, {
        id: 408,
        landlord_num: 3,
        address: "1021 CHURCH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.221675,
        lon: -76.596478
    }, {
        id: 409,
        landlord_num: 3,
        address: "1029 CHURCH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.221762,
        lon: -76.596267
    }, {
        id: 410,
        landlord_num: 3,
        address: "4904 CURTIS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.222086,
        lon: -76.586789
    }, {
        id: 411,
        landlord_num: 3,
        address: "1612 CHURCH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.223234,
        lon: -76.587531
    }, {
        id: 412,
        landlord_num: 3,
        address: "1330 CYPRESS ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.22375,
        lon: -76.59205
    }, {
        id: 413,
        landlord_num: 3,
        address: "1636 HAZEL ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.226327,
        lon: -76.587526
    }, {
        id: 414,
        landlord_num: 3,
        address: "4219 MORRISON CT",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.227064,
        lon: -76.587773
    }, {
        id: 415,
        landlord_num: 3,
        address: "4215 MORRISON CT",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.22715,
        lon: -76.587779
    }, {
        id: 416,
        landlord_num: 3,
        address: "4215 GRACE CT",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.227173,
        lon: -76.587352
    }, {
        id: 417,
        landlord_num: 3,
        address: "4200 MORRISON CT",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.227488,
        lon: -76.588037
    }, {
        id: 418,
        landlord_num: 3,
        address: "1107 INNER CIR",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.230366,
        lon: -76.593865
    }, {
        id: 419,
        landlord_num: 3,
        address: "806 STOLL ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.231137,
        lon: -76.600717
    }, {
        id: 420,
        landlord_num: 3,
        address: "4041 6TH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.231335,
        lon: -76.60312
    }, {
        id: 421,
        landlord_num: 3,
        address: "4001 8TH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.231599,
        lon: -76.601216
    }, {
        id: 422,
        landlord_num: 3,
        address: "3830 8TH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.232872,
        lon: -76.601152
    }, {
        id: 423,
        landlord_num: 3,
        address: "3603 WEST BAY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.23331,
        lon: -76.594096
    }, {
        id: 424,
        landlord_num: 3,
        address: "845 PONTIAC AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.233749,
        lon: -76.598528
    }, {
        id: 425,
        landlord_num: 3,
        address: "3731 BROOKLYN AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.233943,
        lon: -76.600614
    }, {
        id: 426,
        landlord_num: 3,
        address: "3715 7TH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.234406,
        lon: -76.601264
    }, {
        id: 427,
        landlord_num: 3,
        address: "3722 6TH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.234602,
        lon: -76.603433
    }, {
        id: 428,
        landlord_num: 3,
        address: "3616 2ND ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.237455,
        lon: -76.609204
    }, {
        id: 429,
        landlord_num: 3,
        address: "3608 2ND ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.237591,
        lon: -76.609137
    }, {
        id: 430,
        landlord_num: 3,
        address: "506 MAUDE AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.239039,
        lon: -76.602394
    }, {
        id: 431,
        landlord_num: 3,
        address: "523 BALTIC AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.239679,
        lon: -76.601363
    }, {
        id: 432,
        landlord_num: 3,
        address: "2419 HARRIET AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.256275,
        lon: -76.651412
    }, {
        id: 433,
        landlord_num: 3,
        address: "2031 DEERING AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.262521,
        lon: -76.652495
    }, {
        id: 434,
        landlord_num: 3,
        address: "1627 INVERNESS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.263152,
        lon: -76.660878
    }, {
        id: 435,
        landlord_num: 3,
        address: "1103 SCOTT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.279615,
        lon: -76.628428
    }, {
        id: 436,
        landlord_num: 3,
        address: "811 SCOTT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280901,
        lon: -76.62848
    }, {
        id: 437,
        landlord_num: 3,
        address: "1264 WASHINGTON BLVD",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.281002,
        lon: -76.635267
    }, {
        id: 438,
        landlord_num: 3,
        address: "1152 WASHINGTON BLVD",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.28231,
        lon: -76.633556
    }, {
        id: 439,
        landlord_num: 3,
        address: "208 S LOUDON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.283212,
        lon: -76.68235
    }, {
        id: 440,
        landlord_num: 3,
        address: "1716 W PRATT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.285407,
        lon: -76.644498
    }, {
        id: 441,
        landlord_num: 3,
        address: "1918 LEMMON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.285767,
        lon: -76.647546
    }, {
        id: 442,
        landlord_num: 3,
        address: "904 W LOMBARD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.286969,
        lon: -76.632308
    }, {
        id: 443,
        landlord_num: 3,
        address: "2532 W FAIRMOUNT AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.28849,
        lon: -76.657479
    }, {
        id: 444,
        landlord_num: 3,
        address: "117 S CASTLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.290077,
        lon: -76.587946
    }, {
        id: 445,
        landlord_num: 3,
        address: "3327 EDMONDSON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.293794,
        lon: -76.673733
    }, {
        id: 446,
        landlord_num: 3,
        address: "605 DENISON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.294696,
        lon: -76.673785
    }, {
        id: 447,
        landlord_num: 3,
        address: "2915 ARUNAH AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.295017,
        lon: -76.665802
    }, {
        id: 448,
        landlord_num: 3,
        address: "216 N CONKLING ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.295652,
        lon: -76.568032
    }, {
        id: 449,
        landlord_num: 3,
        address: "609 N LAKEWOOD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.29812,
        lon: -76.579169
    }, {
        id: 450,
        landlord_num: 3,
        address: "707 N LUZERNE AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.299346,
        lon: -76.580661
    }, {
        id: 451,
        landlord_num: 3,
        address: "809 N CURLEY ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.300637,
        lon: -76.575849
    }, {
        id: 452,
        landlord_num: 3,
        address: "1652 N BENTALOU ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.307494,
        lon: -76.654182
    }, {
        id: 453,
        landlord_num: 3,
        address: "2427 E LANVALE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.309852,
        lon: -76.583453
    }, {
        id: 454,
        landlord_num: 3,
        address: "1806 N MONTFORD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.311485,
        lon: -76.584727
    }, {
        id: 455,
        landlord_num: 3,
        address: "1120 WHITELOCK ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.312297,
        lon: -76.638591
    }, {
        id: 456,
        landlord_num: 3,
        address: "1623 DARLEY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.314468,
        lon: -76.5958
    }, {
        id: 457,
        landlord_num: 3,
        address: "3172 RAVENWOOD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.315473,
        lon: -76.578729
    }, {
        id: 458,
        landlord_num: 3,
        address: "731 BARTLETT AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.315659,
        lon: -76.605894
    }, {
        id: 459,
        landlord_num: 3,
        address: "3211 LYNDALE AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.316285,
        lon: -76.578077
    }, {
        id: 460,
        landlord_num: 3,
        address: "647 BARTLETT AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.316336,
        lon: -76.606909
    }, {
        id: 461,
        landlord_num: 3,
        address: "1004 DARLEY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.317169,
        lon: -76.600164
    }, {
        id: 462,
        landlord_num: 3,
        address: "1765 MONTPELIER ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.319,
        lon: -76.594344
    }, {
        id: 463,
        landlord_num: 3,
        address: "1623 HOMESTEAD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.320767,
        lon: -76.595778
    }, {
        id: 464,
        landlord_num: 3,
        address: "4132 NORFOLK AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.323471,
        lon: -76.687907
    }, {
        id: 465,
        landlord_num: 3,
        address: "1118 HOMESTEAD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.325027,
        lon: -76.602391
    }, {
        id: 466,
        landlord_num: 3,
        address: "3307 PAINE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.32747,
        lon: -76.630059
    }, {
        id: 467,
        landlord_num: 3,
        address: "4249 NICHOLAS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.328092,
        lon: -76.562992
    }, {
        id: 468,
        landlord_num: 3,
        address: "4202 ARIZONA AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.340804,
        lon: -76.546734
    }, {
        id: 469,
        landlord_num: 3,
        address: "2454 W COLD SPRING LANE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.340883,
        lon: -76.660879
    }, {
        id: 470,
        landlord_num: 3,
        address: "5258 SAINT CHARLES AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.345533,
        lon: -76.684603
    }, {
        id: 471,
        landlord_num: 3,
        address: "3208 W BELVEDERE AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.348674,
        lon: -76.677041
    }, {
        id: 472,
        landlord_num: 3,
        address: "5609 GOVANE AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.358046,
        lon: -76.607082
    }, {
        id: 473,
        landlord_num: 3,
        address: "4820 CURTIS AVE",
        units: 6,
        ecb: 0,
        pros: 0,
        lat: 39.222394,
        lon: -76.586816
    }, {
        id: 474,
        landlord_num: 3,
        address: "3909 6TH ST",
        units: 5,
        ecb: 0,
        pros: 0,
        lat: 39.23233,
        lon: -76.603698
    }, {
        id: 475,
        landlord_num: 3,
        address: "1813 MADISON AVE",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.307555,
        lon: -76.631988
    }, {
        id: 476,
        landlord_num: 3,
        address: "30 S FULTON AVE",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.286938,
        lon: -76.645423
    }, {
        id: 477,
        landlord_num: 3,
        address: "1024 WILMINGTON AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.272712,
        lon: -76.664083
    }, {
        id: 478,
        landlord_num: 3,
        address: "1343 E PATAPSCO AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.232569,
        lon: -76.591017
    }, {
        id: 479,
        landlord_num: 3,
        address: "1349 E PATAPSCO AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.232494,
        lon: -76.590835
    }, {
        id: 480,
        landlord_num: 3,
        address: "2016 N BENTALOU ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.31116,
        lon: -76.654439
    }, {
        id: 481,
        landlord_num: 3,
        address: "2311 JEFFERSON ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.296458,
        lon: -76.584206
    }, {
        id: 482,
        landlord_num: 3,
        address: "3116 WOLCOTT AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.322814,
        lon: -76.684772
    }, {
        id: 483,
        landlord_num: 3,
        address: "3430 6TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.239917,
        lon: -76.600752
    }, {
        id: 484,
        landlord_num: 3,
        address: "3432 6TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.239868,
        lon: -76.600779
    }, {
        id: 485,
        landlord_num: 3,
        address: "3437 6TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.239097,
        lon: -76.600624
    }, {
        id: 486,
        landlord_num: 3,
        address: "3611 BROOKLYN AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.234796,
        lon: -76.599293
    }, {
        id: 487,
        landlord_num: 3,
        address: "3616 7TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.234973,
        lon: -76.601425
    }, {
        id: 488,
        landlord_num: 3,
        address: "3711 8TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.233697,
        lon: -76.599838
    }, {
        id: 489,
        landlord_num: 3,
        address: "3734 TOWANDA AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.330627,
        lon: -76.663324
    }, {
        id: 490,
        landlord_num: 3,
        address: "3925 GREENMOUNT AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.337662,
        lon: -76.609128
    }, {
        id: 491,
        landlord_num: 3,
        address: "4104 AUDREY AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.230472,
        lon: -76.603605
    }, {
        id: 492,
        landlord_num: 3,
        address: "4134 AUDREY AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.230052,
        lon: -76.604593
    }, {
        id: 493,
        landlord_num: 3,
        address: "4141 AUDREY AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.229596,
        lon: -76.60449
    }, {
        id: 494,
        landlord_num: 3,
        address: "4206 AUDREY AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.229732,
        lon: -76.605369
    }, {
        id: 495,
        landlord_num: 3,
        address: "425 N HIGHLAND AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.29703,
        lon: -76.569469
    }, {
        id: 496,
        landlord_num: 3,
        address: "4802 FREDERICK AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.281645,
        lon: -76.695112
    }, {
        id: 497,
        landlord_num: 3,
        address: "503 ARSAN AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.239257,
        lon: -76.602246
    }, {
        id: 498,
        landlord_num: 3,
        address: "511 BALTIC AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.23986,
        lon: -76.601774
    }, {
        id: 499,
        landlord_num: 3,
        address: "606 ANNABEL AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.237492,
        lon: -76.60112
    }, {
        id: 500,
        landlord_num: 3,
        address: "821 E JEFFREY ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.232064,
        lon: -76.600171
    }, {
        id: 501,
        landlord_num: 3,
        address: "837 BRINKWOOD ROAD",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.297772,
        lon: -76.698211
    }, {
        id: 502,
        landlord_num: 3,
        address: "9 WASHBURN AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.236712,
        lon: -76.611432
    }, {
        id: 503,
        landlord_num: 3,
        address: "903 STOLL ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.230409,
        lon: -76.599772
    }, {
        id: 504,
        landlord_num: 3,
        address: "1043 N MILTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.303384,
        lon: -76.582403
    }, {
        id: 505,
        landlord_num: 3,
        address: "1107 WICKLOW ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.298031,
        lon: -76.690589
    }, {
        id: 506,
        landlord_num: 3,
        address: "1114 S PACA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.279023,
        lon: -76.627561
    }, {
        id: 507,
        landlord_num: 3,
        address: "1117 INNER CIR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.230443,
        lon: -76.593379
    }, {
        id: 508,
        landlord_num: 3,
        address: "1130 N LONGWOOD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300772,
        lon: -76.667533
    }, {
        id: 509,
        landlord_num: 3,
        address: "1137 MONROE CIR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231137,
        lon: -76.592945
    }, {
        id: 510,
        landlord_num: 3,
        address: "115 E FORT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.27256,
        lon: -76.611108
    }, {
        id: 511,
        landlord_num: 3,
        address: "1157 CLEVELAND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.280795,
        lon: -76.63167
    }, {
        id: 512,
        landlord_num: 3,
        address: "1159 CLEVELAND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.280772,
        lon: -76.631699
    }, {
        id: 513,
        landlord_num: 3,
        address: "119 S COLLINS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284592,
        lon: -76.683182
    }, {
        id: 514,
        landlord_num: 3,
        address: "1212 JAMES ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.282213,
        lon: -76.635584
    }, {
        id: 515,
        landlord_num: 3,
        address: "1220 N DUKELAND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.302232,
        lon: -76.663833
    }, {
        id: 516,
        landlord_num: 3,
        address: "1225 CHURCH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.222511,
        lon: -76.593362
    }, {
        id: 517,
        landlord_num: 3,
        address: "1229 CHURCH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.222516,
        lon: -76.593265
    }, {
        id: 518,
        landlord_num: 3,
        address: "123 S CLINTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.290786,
        lon: -76.569978
    }, {
        id: 519,
        landlord_num: 3,
        address: "123 S COLLINS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284508,
        lon: -76.683176
    }, {
        id: 520,
        landlord_num: 3,
        address: "1230 CLEVELAND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.279966,
        lon: -76.633283
    }, {
        id: 521,
        landlord_num: 3,
        address: "1303 E PATAPSCO AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.232817,
        lon: -76.592088
    }, {
        id: 522,
        landlord_num: 3,
        address: "1305 E PATAPSCO AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.232771,
        lon: -76.592054
    }, {
        id: 523,
        landlord_num: 3,
        address: "1323 E PATAPSCO AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.232732,
        lon: -76.591549
    }, {
        id: 524,
        landlord_num: 3,
        address: "1406 LOCUST ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.226888,
        lon: -76.591145
    }, {
        id: 525,
        landlord_num: 3,
        address: "1410 CARROLL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278557,
        lon: -76.636189
    }, {
        id: 526,
        landlord_num: 3,
        address: "1417 OLMSTEAD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.227239,
        lon: -76.590744
    }, {
        id: 527,
        landlord_num: 3,
        address: "1508 PLUM ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.228523,
        lon: -76.58962
    }, {
        id: 528,
        landlord_num: 3,
        address: "1516 BYRD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.272197,
        lon: -76.611096
    }, {
        id: 529,
        landlord_num: 3,
        address: "1521 LEMMON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.285756,
        lon: -76.641656
    }, {
        id: 530,
        landlord_num: 3,
        address: "1609 E 28TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.323712,
        lon: -76.592398
    }, {
        id: 531,
        landlord_num: 3,
        address: "1613 ELMTREE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.224337,
        lon: -76.587572
    }, {
        id: 532,
        landlord_num: 3,
        address: "1614 W SARATOGA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292292,
        lon: -76.643307
    }, {
        id: 533,
        landlord_num: 3,
        address: "1626 E 28TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.324081,
        lon: -76.592132
    }, {
        id: 534,
        landlord_num: 3,
        address: "1649 CEDDOX ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.22109,
        lon: -76.586662
    }, {
        id: 535,
        landlord_num: 3,
        address: "1702 E 28TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.324084,
        lon: -76.591719
    }, {
        id: 536,
        landlord_num: 3,
        address: "1703 LIGHT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.270504,
        lon: -76.611341
    }, {
        id: 537,
        landlord_num: 3,
        address: "1704 CARSWELL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321522,
        lon: -76.593331
    }, {
        id: 538,
        landlord_num: 3,
        address: "1806 N DALLAS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.310958,
        lon: -76.597813
    }, {
        id: 539,
        landlord_num: 3,
        address: "1825 APPLETON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.309313,
        lon: -76.648744
    }, {
        id: 540,
        landlord_num: 3,
        address: "1907 W MULBERRY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292744,
        lon: -76.647491
    }, {
        id: 541,
        landlord_num: 3,
        address: "2027 CLIFTWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313423,
        lon: -76.589328
    }, {
        id: 542,
        landlord_num: 3,
        address: "2031 GRINNALDS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.266201,
        lon: -76.649489
    }, {
        id: 543,
        landlord_num: 3,
        address: "2104 WILKENS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.281358,
        lon: -76.64951
    }, {
        id: 544,
        landlord_num: 3,
        address: "2109 WESTWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308475,
        lon: -76.651894
    }, {
        id: 545,
        landlord_num: 3,
        address: "2121 BOLTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312312,
        lon: -76.629763
    }, {
        id: 546,
        landlord_num: 3,
        address: "229 S FULTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284508,
        lon: -76.64478
    }, {
        id: 547,
        landlord_num: 3,
        address: "2443 WASHINGTON BLVD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.267083,
        lon: -76.651601
    }, {
        id: 548,
        landlord_num: 3,
        address: "2699 SAINT BENEDICT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278587,
        lon: -76.658535
    }, {
        id: 549,
        landlord_num: 3,
        address: "2766 KINSEY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.28807,
        lon: -76.660878
    }, {
        id: 550,
        landlord_num: 3,
        address: "2806 ROCKROSE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.329363,
        lon: -76.661486
    }, {
        id: 551,
        landlord_num: 3,
        address: "2808 ROCKROSE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.329335,
        lon: -76.66156
    }, {
        id: 552,
        landlord_num: 3,
        address: "2833 SUNSET DR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.276893,
        lon: -76.664125
    }, {
        id: 553,
        landlord_num: 3,
        address: "2946 PRESSTMAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.304747,
        lon: -76.666884
    }, {
        id: 554,
        landlord_num: 3,
        address: "3106 BRIGHTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.305314,
        lon: -76.669662
    }, {
        id: 555,
        landlord_num: 3,
        address: "323 S NORRIS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283781,
        lon: -76.639828
    }, {
        id: 556,
        landlord_num: 3,
        address: "3321 BRENDAN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.32099,
        lon: -76.568385
    }, {
        id: 557,
        landlord_num: 3,
        address: "3327 WOODLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.343776,
        lon: -76.672502
    }, {
        id: 558,
        landlord_num: 3,
        address: "3395 SAINT BENEDICT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.273614,
        lon: -76.674259
    }, {
        id: 559,
        landlord_num: 3,
        address: "3428 W CATON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286717,
        lon: -76.673887
    }, {
        id: 560,
        landlord_num: 3,
        address: "3513 3RD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.23935,
        lon: -76.605945
    }, {
        id: 561,
        landlord_num: 3,
        address: "3536 7TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.236656,
        lon: -76.600639
    }, {
        id: 562,
        landlord_num: 3,
        address: "3601 SAINT VICTOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.234006,
        lon: -76.596588
    }, {
        id: 563,
        landlord_num: 3,
        address: "3656 S HANOVER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.237623,
        lon: -76.61032
    }, {
        id: 564,
        landlord_num: 3,
        address: "3710 2ND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.23684,
        lon: -76.609497
    }, {
        id: 565,
        landlord_num: 3,
        address: "3712 2ND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.236805,
        lon: -76.609516
    }, {
        id: 566,
        landlord_num: 3,
        address: "3716 8TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.233682,
        lon: -76.600302
    }, {
        id: 567,
        landlord_num: 3,
        address: "3718 WEST BAY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.232047,
        lon: -76.595171
    }, {
        id: 568,
        landlord_num: 3,
        address: "3732 SAINT VICTOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.232777,
        lon: -76.597691
    }, {
        id: 569,
        landlord_num: 3,
        address: "3810 WEST BAY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231592,
        lon: -76.595451
    }, {
        id: 570,
        landlord_num: 3,
        address: "3814 BAYONNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.347011,
        lon: -76.548213
    }, {
        id: 571,
        landlord_num: 3,
        address: "3814 SAINT MARGARET ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231719,
        lon: -76.596359
    }, {
        id: 572,
        landlord_num: 3,
        address: "3822 10TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231792,
        lon: -76.597369
    }, {
        id: 573,
        landlord_num: 3,
        address: "3824 WEST BAY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231255,
        lon: -76.59563
    }, {
        id: 574,
        landlord_num: 3,
        address: "3828 SAINT VICTOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231877,
        lon: -76.59815
    }, {
        id: 575,
        landlord_num: 3,
        address: "3837 8TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.23253,
        lon: -76.600986
    }, {
        id: 576,
        landlord_num: 3,
        address: "3916 RIDGEWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.336859,
        lon: -76.68348
    }, {
        id: 577,
        landlord_num: 3,
        address: "3927 GREENMOUNT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.33771,
        lon: -76.609267
    }, {
        id: 578,
        landlord_num: 3,
        address: "3965 BROOKLYN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.230814,
        lon: -76.602192
    }, {
        id: 579,
        landlord_num: 3,
        address: "402 CAMBRIA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.236695,
        lon: -76.605288
    }, {
        id: 580,
        landlord_num: 3,
        address: "4022 6TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231406,
        lon: -76.603697
    }, {
        id: 581,
        landlord_num: 3,
        address: "404 CAMBRIA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.236681,
        lon: -76.605249
    }, {
        id: 582,
        landlord_num: 3,
        address: "4110 CURTIS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.228086,
        lon: -76.587261
    }, {
        id: 583,
        landlord_num: 3,
        address: "4110 GRACE CT",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.228065,
        lon: -76.587661
    }, {
        id: 584,
        landlord_num: 3,
        address: "4118 CURTIS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.227848,
        lon: -76.587239
    }, {
        id: 585,
        landlord_num: 3,
        address: "4130 TOWNSEND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.228734,
        lon: -76.603364
    }, {
        id: 586,
        landlord_num: 3,
        address: "414 FREEMAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.237595,
        lon: -76.604116
    }, {
        id: 587,
        landlord_num: 3,
        address: "415 MOUNT HOLLY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292249,
        lon: -76.679329
    }, {
        id: 588,
        landlord_num: 3,
        address: "415 NORMANDY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292175,
        lon: -76.681275
    }, {
        id: 589,
        landlord_num: 3,
        address: "417 ROUNDVIEW ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.250556,
        lon: -76.620314
    }, {
        id: 590,
        landlord_num: 3,
        address: "4204 CURTIS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.227433,
        lon: -76.587194
    }, {
        id: 591,
        landlord_num: 3,
        address: "423 ANNABEL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.237795,
        lon: -76.60383
    }, {
        id: 592,
        landlord_num: 3,
        address: "424 CAMBRIA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.236513,
        lon: -76.604709
    }, {
        id: 593,
        landlord_num: 3,
        address: "4430 WRENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.343209,
        lon: -76.606507
    }, {
        id: 594,
        landlord_num: 3,
        address: "4704 DUNKIRK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283747,
        lon: -76.693586
    }, {
        id: 595,
        landlord_num: 3,
        address: "4708 HOMESDALE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321883,
        lon: -76.555333
    }, {
        id: 596,
        landlord_num: 3,
        address: "4718 YORK ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.346784,
        lon: -76.609889
    }, {
        id: 597,
        landlord_num: 3,
        address: "5006 NORWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.329501,
        lon: -76.699793
    }, {
        id: 598,
        landlord_num: 3,
        address: "507 NORMANDY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292807,
        lon: -76.68126
    }, {
        id: 599,
        landlord_num: 3,
        address: "510 CORDING AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.361717,
        lon: -76.608381
    }, {
        id: 600,
        landlord_num: 3,
        address: "5108 MIDWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.3506,
        lon: -76.603188
    }, {
        id: 601,
        landlord_num: 3,
        address: "518 CAMBRIA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.236068,
        lon: -76.603292
    }, {
        id: 602,
        landlord_num: 3,
        address: "521 N CLINTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297686,
        lon: -76.570513
    }, {
        id: 603,
        landlord_num: 3,
        address: "5309 CUTHBERT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.348263,
        lon: -76.682618
    }, {
        id: 604,
        landlord_num: 3,
        address: "533 N GLOVER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297673,
        lon: -76.579899
    }, {
        id: 605,
        landlord_num: 3,
        address: "543 CHATEAU AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.350527,
        lon: -76.607845
    }, {
        id: 606,
        landlord_num: 3,
        address: "601 N BELNORD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297966,
        lon: -76.57848
    }, {
        id: 607,
        landlord_num: 3,
        address: "6015 GREENSPRING AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.366651,
        lon: -76.67589
    }, {
        id: 608,
        landlord_num: 3,
        address: "614 ARSAN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.238895,
        lon: -76.599887
    }, {
        id: 609,
        landlord_num: 3,
        address: "616 E JEFFREY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.233195,
        lon: -76.602768
    }, {
        id: 610,
        landlord_num: 3,
        address: "620 GLENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.353839,
        lon: -76.606767
    }, {
        id: 611,
        landlord_num: 3,
        address: "711 LINNARD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295602,
        lon: -76.675843
    }, {
        id: 612,
        landlord_num: 3,
        address: "806 JACK ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231834,
        lon: -76.600631
    }, {
        id: 613,
        landlord_num: 3,
        address: "825 GLENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.352622,
        lon: -76.604038
    }, {
        id: 614,
        landlord_num: 3,
        address: "904 N PAYSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299099,
        lon: -76.649527
    }, {
        id: 615,
        landlord_num: 4,
        address: "824 GEORGE ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.295579,
        lon: -76.63203
    }, {
        id: 616,
        landlord_num: 4,
        address: "6808 BOSTON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280484,
        lon: -76.530277
    }, {
        id: 617,
        landlord_num: 4,
        address: "826 GEORGE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.295538,
        lon: -76.63227
    }, {
        id: 618,
        landlord_num: 4,
        address: "709 EDMONDSON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.295991,
        lon: -76.630343
    }, {
        id: 619,
        landlord_num: 4,
        address: "627 PERKINS ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.29634,
        lon: -76.628249
    }, {
        id: 620,
        landlord_num: 4,
        address: "100 N BROADWAY",
        units: 56,
        ecb: 0,
        pros: 0,
        lat: 39.292961,
        lon: -76.594589
    }, {
        id: 621,
        landlord_num: 4,
        address: "940 S LAKEWOOD AVE",
        units: 45,
        ecb: 0,
        pros: 0,
        lat: 39.281385,
        lon: -76.578528
    }, {
        id: 622,
        landlord_num: 4,
        address: "4025 FREDERICK AVE",
        units: 41,
        ecb: 0,
        pros: 0,
        lat: 39.281459,
        lon: -76.683063
    }, {
        id: 623,
        landlord_num: 4,
        address: "1300-1320 WASHINGTON BLVD",
        units: 32,
        ecb: 0,
        pros: 0,
        lat: 39.280497,
        lon: -76.635594
    }, {
        id: 624,
        landlord_num: 4,
        address: "1001 AISQUITH ST",
        units: 22,
        ecb: 0,
        pros: 0,
        lat: 39.302205,
        lon: -76.601776
    }, {
        id: 625,
        landlord_num: 4,
        address: "102 N BROADWAY",
        units: 18,
        ecb: 0,
        pros: 0,
        lat: 39.29359,
        lon: -76.594373
    }, {
        id: 626,
        landlord_num: 4,
        address: "2631 HOMEWOOD AVE",
        units: 15,
        ecb: 0,
        pros: 0,
        lat: 39.322208,
        lon: -76.600085
    }, {
        id: 627,
        landlord_num: 4,
        address: "1527-1533 GORSUCH AVE",
        units: 12,
        ecb: 0,
        pros: 0,
        lat: 39.322253,
        lon: -76.596292
    }, {
        id: 628,
        landlord_num: 4,
        address: "1606-1610 W LEXINGTON ST",
        units: 12,
        ecb: 0,
        pros: 0,
        lat: 39.290715,
        lon: -76.64292
    }, {
        id: 629,
        landlord_num: 4,
        address: "1400 HOMESTEAD ST",
        units: 12,
        ecb: 0,
        pros: 0,
        lat: 39.323343,
        lon: -76.599053
    }, {
        id: 630,
        landlord_num: 4,
        address: "1410 MONTPELIER ST",
        units: 12,
        ecb: 0,
        pros: 0,
        lat: 39.322654,
        lon: -76.599411
    }, {
        id: 631,
        landlord_num: 4,
        address: "1618-1622 W LEXINGTON ST",
        units: 12,
        ecb: 0,
        pros: 0,
        lat: 39.290949,
        lon: -76.643487
    }, {
        id: 632,
        landlord_num: 4,
        address: "1107 RACE ST",
        units: 5,
        ecb: 0,
        pros: 0,
        lat: 39.276336,
        lon: -76.616352
    }, {
        id: 633,
        landlord_num: 4,
        address: "38 W WEST ST",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.275521,
        lon: -76.616244
    }, {
        id: 634,
        landlord_num: 4,
        address: "1328 MOSHER ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.300107,
        lon: -76.639616
    }, {
        id: 635,
        landlord_num: 4,
        address: "1020 S HANOVER ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.277129,
        lon: -76.615833
    }, {
        id: 636,
        landlord_num: 4,
        address: "1109 RACE ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.276357,
        lon: -76.616392
    }, {
        id: 637,
        landlord_num: 4,
        address: "2013 E 32ND ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.32706,
        lon: -76.586968
    }, {
        id: 638,
        landlord_num: 4,
        address: "2120 N CALVERT ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.313929,
        lon: -76.614229
    }, {
        id: 639,
        landlord_num: 4,
        address: "314 E 20TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.312602,
        lon: -76.611971
    }, {
        id: 640,
        landlord_num: 4,
        address: "322 E 21ST ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.313624,
        lon: -76.61189
    }, {
        id: 641,
        landlord_num: 4,
        address: "418 E 20TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.31265,
        lon: -76.610379
    }, {
        id: 642,
        landlord_num: 4,
        address: "437 E 20TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.31222,
        lon: -76.609738
    }, {
        id: 643,
        landlord_num: 4,
        address: "630 MCCOLLOUGH CIR",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.297088,
        lon: -76.629247
    }, {
        id: 644,
        landlord_num: 4,
        address: "633 MCCOLLOUGH CIR",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.296731,
        lon: -76.629049
    }, {
        id: 645,
        landlord_num: 4,
        address: "902 N STRICKER ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.299094,
        lon: -76.641808
    }, {
        id: 646,
        landlord_num: 4,
        address: "927 N CAREY ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.299974,
        lon: -76.638591
    }, {
        id: 647,
        landlord_num: 4,
        address: "933 N MOUNT ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.29952,
        lon: -76.644144
    }, {
        id: 648,
        landlord_num: 4,
        address: "130 N BOND BOND",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293166,
        lon: -76.595863
    }, {
        id: 649,
        landlord_num: 4,
        address: "1007 CREEK ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.277254,
        lon: -76.616955
    }, {
        id: 650,
        landlord_num: 4,
        address: "1009 CREEK ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.277148,
        lon: -76.617004
    }, {
        id: 651,
        landlord_num: 4,
        address: "1099 ORLEANS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294786,
        lon: -76.603048
    }, {
        id: 652,
        landlord_num: 4,
        address: "501 GEORGE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295748,
        lon: -76.62257
    }, {
        id: 653,
        landlord_num: 4,
        address: "503 GEORGE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295747,
        lon: -76.622571
    }, {
        id: 654,
        landlord_num: 4,
        address: "652 W HOFFMAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297609,
        lon: -76.629909
    }, {
        id: 655,
        landlord_num: 4,
        address: "700 HARLEM AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296971,
        lon: -76.630719
    }, {
        id: 656,
        landlord_num: 4,
        address: "905 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278486,
        lon: -76.616336
    }, {
        id: 657,
        landlord_num: 4,
        address: "100 W CROSS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.276736,
        lon: -76.616493
    }, {
        id: 658,
        landlord_num: 4,
        address: "1003 LEADENHALL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.277609,
        lon: -76.617235
    }, {
        id: 659,
        landlord_num: 4,
        address: "1005 LEADENHALL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.27757,
        lon: -76.617249
    }, {
        id: 660,
        landlord_num: 4,
        address: "1007 ARGYLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297637,
        lon: -76.628703
    }, {
        id: 661,
        landlord_num: 4,
        address: "1007 LEADENHALL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.27754,
        lon: -76.617266
    }, {
        id: 662,
        landlord_num: 4,
        address: "1009 ARGYLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297628,
        lon: -76.628872
    }, {
        id: 663,
        landlord_num: 4,
        address: "1009 LEADENHALL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.27751,
        lon: -76.61728
    }, {
        id: 664,
        landlord_num: 4,
        address: "1011 LEADENHALL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.27748,
        lon: -76.617294
    }, {
        id: 665,
        landlord_num: 4,
        address: "1015 MYRTLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297165,
        lon: -76.630042
    }, {
        id: 666,
        landlord_num: 4,
        address: "1019 N MOUNT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300369,
        lon: -76.644184
    }, {
        id: 667,
        landlord_num: 4,
        address: "102 W CROSS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.276725,
        lon: -76.616542
    }, {
        id: 668,
        landlord_num: 4,
        address: "1022 ARGYLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297642,
        lon: -76.629522
    }, {
        id: 669,
        landlord_num: 4,
        address: "1026 N CAREY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300963,
        lon: -76.63909
    }, {
        id: 670,
        landlord_num: 4,
        address: "104 W CROSS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.276738,
        lon: -76.61658
    }, {
        id: 671,
        landlord_num: 4,
        address: "1115 MYRTLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297616,
        lon: -76.630613
    }, {
        id: 672,
        landlord_num: 4,
        address: "1124 LEADENHALL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.276349,
        lon: -76.618346
    }, {
        id: 673,
        landlord_num: 4,
        address: "116 N BETHEL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292906,
        lon: -76.5954
    }, {
        id: 674,
        landlord_num: 4,
        address: "116 N DALLAS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292773,
        lon: -76.596754
    }, {
        id: 675,
        landlord_num: 4,
        address: "117 N DALLAS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292873,
        lon: -76.596325
    }, {
        id: 676,
        landlord_num: 4,
        address: "118 N BETHEL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292965,
        lon: -76.595402
    }, {
        id: 677,
        landlord_num: 4,
        address: "118 N BOND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292924,
        lon: -76.596012
    }, {
        id: 678,
        landlord_num: 4,
        address: "118 N DALLAS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29283,
        lon: -76.596755
    }, {
        id: 679,
        landlord_num: 4,
        address: "119 N DALLAS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292943,
        lon: -76.596329
    }, {
        id: 680,
        landlord_num: 4,
        address: "120 N BETHEL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293027,
        lon: -76.595341
    }, {
        id: 681,
        landlord_num: 4,
        address: "120 N BOND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292977,
        lon: -76.59601
    }, {
        id: 682,
        landlord_num: 4,
        address: "120 N DALLAS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292878,
        lon: -76.596691
    }, {
        id: 683,
        landlord_num: 4,
        address: "121 N BOND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292963,
        lon: -76.595667
    }, {
        id: 684,
        landlord_num: 4,
        address: "121 N DALLAS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293002,
        lon: -76.596329
    }, {
        id: 685,
        landlord_num: 4,
        address: "122 N BETHEL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293069,
        lon: -76.595407
    }, {
        id: 686,
        landlord_num: 4,
        address: "122 N BOND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293029,
        lon: -76.596089
    }, {
        id: 687,
        landlord_num: 4,
        address: "1224 GLENHAVEN ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.363298,
        lon: -76.592313
    }, {
        id: 688,
        landlord_num: 4,
        address: "123 N BOND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29302,
        lon: -76.59567
    }, {
        id: 689,
        landlord_num: 4,
        address: "123 N DALLAS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293066,
        lon: -76.59633
    }, {
        id: 690,
        landlord_num: 4,
        address: "124 N BETHEL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29313,
        lon: -76.59541
    }, {
        id: 691,
        landlord_num: 4,
        address: "124 N BOND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293084,
        lon: -76.596006
    }, {
        id: 692,
        landlord_num: 4,
        address: "125 N BOND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293075,
        lon: -76.595674
    }, {
        id: 693,
        landlord_num: 4,
        address: "125 N DALLAS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293216,
        lon: -76.596362
    }, {
        id: 694,
        landlord_num: 4,
        address: "126 N BETHEL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293201,
        lon: -76.595339
    }, {
        id: 695,
        landlord_num: 4,
        address: "126 N Bond St.",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29314,
        lon: -76.596099
    }, {
        id: 696,
        landlord_num: 4,
        address: "126-128 N BOND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29317,
        lon: -76.59599
    }, {
        id: 697,
        landlord_num: 4,
        address: "127 N BOND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29312,
        lon: -76.595661
    }, {
        id: 698,
        landlord_num: 4,
        address: "128 N BETHEL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29325,
        lon: -76.595415
    }, {
        id: 699,
        landlord_num: 4,
        address: "129 N BOND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29318,
        lon: -76.595693
    }, {
        id: 700,
        landlord_num: 4,
        address: "129 W CROSS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.276688,
        lon: -76.617645
    }, {
        id: 701,
        landlord_num: 4,
        address: "130 N BETHEL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293317,
        lon: -76.595426
    }, {
        id: 702,
        landlord_num: 4,
        address: "131-133 N BOND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293282,
        lon: -76.595757
    }, {
        id: 703,
        landlord_num: 4,
        address: "1314 BERRY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.331632,
        lon: -76.637609
    }, {
        id: 704,
        landlord_num: 4,
        address: "1402 KINGSWAY ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.34443,
        lon: -76.594094
    }, {
        id: 705,
        landlord_num: 4,
        address: "1446 MEDFIELD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.339114,
        lon: -76.642893
    }, {
        id: 706,
        landlord_num: 4,
        address: "1516 E 28TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.324034,
        lon: -76.594461
    }, {
        id: 707,
        landlord_num: 4,
        address: "1517 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293206,
        lon: -76.596325
    }, {
        id: 708,
        landlord_num: 4,
        address: "1519 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293265,
        lon: -76.596273
    }, {
        id: 709,
        landlord_num: 4,
        address: "1519 MONTPELIER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321347,
        lon: -76.598059
    }, {
        id: 710,
        landlord_num: 4,
        address: "1521 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293265,
        lon: -76.596179
    }, {
        id: 711,
        landlord_num: 4,
        address: "1523 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293276,
        lon: -76.596102
    }, {
        id: 712,
        landlord_num: 4,
        address: "1550 CARSWELL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.322887,
        lon: -76.595488
    }, {
        id: 713,
        landlord_num: 4,
        address: "1601 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293401,
        lon: -76.595697
    }, {
        id: 714,
        landlord_num: 4,
        address: "1603 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293385,
        lon: -76.59566
    }, {
        id: 715,
        landlord_num: 4,
        address: "1605 E 33RD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.328079,
        lon: -76.5934
    }, {
        id: 716,
        landlord_num: 4,
        address: "1605 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293395,
        lon: -76.595592
    }, {
        id: 717,
        landlord_num: 4,
        address: "1607 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293441,
        lon: -76.595517
    }, {
        id: 718,
        landlord_num: 4,
        address: "1609 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293453,
        lon: -76.59544
    }, {
        id: 719,
        landlord_num: 4,
        address: "1609 W LEXINGTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.290454,
        lon: -76.642873
    }, {
        id: 720,
        landlord_num: 4,
        address: "1611 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293465,
        lon: -76.595355
    }, {
        id: 721,
        landlord_num: 4,
        address: "1611 W LEXINGTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29052,
        lon: -76.642935
    }, {
        id: 722,
        landlord_num: 4,
        address: "1613 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293585,
        lon: -76.595042
    }, {
        id: 723,
        landlord_num: 4,
        address: "1614 LAMLEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293431,
        lon: -76.595066
    }, {
        id: 724,
        landlord_num: 4,
        address: "1615 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293593,
        lon: -76.594985
    }, {
        id: 725,
        landlord_num: 4,
        address: "1616 LAMLEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293434,
        lon: -76.594979
    }, {
        id: 726,
        landlord_num: 4,
        address: "1617 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293648,
        lon: -76.594878
    }, {
        id: 727,
        landlord_num: 4,
        address: "1617 W LEXINGTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.290446,
        lon: -76.643128
    }, {
        id: 728,
        landlord_num: 4,
        address: "1618 LAMLEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293432,
        lon: -76.594829
    }, {
        id: 729,
        landlord_num: 4,
        address: "1619 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293644,
        lon: -76.594813
    }, {
        id: 730,
        landlord_num: 4,
        address: "1620 LAMLEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293443,
        lon: -76.594745
    }, {
        id: 731,
        landlord_num: 4,
        address: "1621 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293661,
        lon: -76.594711
    }, {
        id: 732,
        landlord_num: 4,
        address: "1622 LAMLEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293452,
        lon: -76.594667
    }, {
        id: 733,
        landlord_num: 4,
        address: "1623 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293701,
        lon: -76.594633
    }, {
        id: 734,
        landlord_num: 4,
        address: "1624 LAMLEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293462,
        lon: -76.594581
    }, {
        id: 735,
        landlord_num: 4,
        address: "1625 E FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293695,
        lon: -76.594581
    }, {
        id: 736,
        landlord_num: 4,
        address: "1628 W LEXINGTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.290846,
        lon: -76.643769
    }, {
        id: 737,
        landlord_num: 4,
        address: "1700-1704 W LEXINGTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.290864,
        lon: -76.644126
    }, {
        id: 738,
        landlord_num: 4,
        address: "1716 MONTPELIER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.319803,
        lon: -76.594795
    }, {
        id: 739,
        landlord_num: 4,
        address: "1722-1726 W LEXINGTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.290802,
        lon: -76.644712
    }, {
        id: 740,
        landlord_num: 4,
        address: "1804 E 28TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.324083,
        lon: -76.590449
    }, {
        id: 741,
        landlord_num: 4,
        address: "1912 E 30TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.325667,
        lon: -76.588686
    }, {
        id: 742,
        landlord_num: 4,
        address: "1920 E 28TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.324082,
        lon: -76.588986
    }, {
        id: 743,
        landlord_num: 4,
        address: "2002 GREENMOUNT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312858,
        lon: -76.609685
    }, {
        id: 744,
        landlord_num: 4,
        address: "2014 BARCLAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313074,
        lon: -76.611305
    }, {
        id: 745,
        landlord_num: 4,
        address: "2118 BARCLAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313904,
        lon: -76.611341
    }, {
        id: 746,
        landlord_num: 4,
        address: "2202 GUILFORD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.314727,
        lon: -76.612891
    }, {
        id: 747,
        landlord_num: 4,
        address: "2236 BARCLAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.315334,
        lon: -76.611441
    }, {
        id: 748,
        landlord_num: 4,
        address: "227 S BOULDIN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.289074,
        lon: -76.570746
    }, {
        id: 749,
        landlord_num: 4,
        address: "2514 AISQUITH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.318169,
        lon: -76.597692
    }, {
        id: 750,
        landlord_num: 4,
        address: "2618 GARRETT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.320255,
        lon: -76.597613
    }, {
        id: 751,
        landlord_num: 4,
        address: "2707 GLEN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.361646,
        lon: -76.676383
    }, {
        id: 752,
        landlord_num: 4,
        address: "2811 KENNEDY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.322984,
        lon: -76.593682
    }, {
        id: 753,
        landlord_num: 4,
        address: "3026 FENDALL ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.327769,
        lon: -76.706493
    }, {
        id: 754,
        landlord_num: 4,
        address: "309 E MELROSE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.366521,
        lon: -76.614774
    }, {
        id: 755,
        landlord_num: 4,
        address: "316 E 22ND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.314717,
        lon: -76.61209
    }, {
        id: 756,
        landlord_num: 4,
        address: "318 E 20 1/2 ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313041,
        lon: -76.61171
    }, {
        id: 757,
        landlord_num: 4,
        address: "319 E 21ST ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313263,
        lon: -76.611935
    }, {
        id: 758,
        landlord_num: 4,
        address: "326 E 20 1/2 ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313048,
        lon: -76.61154
    }, {
        id: 759,
        landlord_num: 4,
        address: "330 E 20TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312622,
        lon: -76.611499
    }, {
        id: 760,
        landlord_num: 4,
        address: "331 JOPLIN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.289655,
        lon: -76.53797
    }, {
        id: 761,
        landlord_num: 4,
        address: "3323 CHESLEY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.362093,
        lon: -76.540728
    }, {
        id: 762,
        landlord_num: 4,
        address: "338 E 20TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312627,
        lon: -76.611277
    }, {
        id: 763,
        landlord_num: 4,
        address: "3409 ROYSTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.35557,
        lon: -76.548142
    }, {
        id: 764,
        landlord_num: 4,
        address: "3600 BELLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.333983,
        lon: -76.674372
    }, {
        id: 765,
        landlord_num: 4,
        address: "410 E 20TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312641,
        lon: -76.610571
    }, {
        id: 766,
        landlord_num: 4,
        address: "415 E 20TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312277,
        lon: -76.610409
    }, {
        id: 767,
        landlord_num: 4,
        address: "4204 ETHLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.324256,
        lon: -76.691598
    }, {
        id: 768,
        landlord_num: 4,
        address: "424 E 20TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312671,
        lon: -76.610211
    }, {
        id: 769,
        landlord_num: 4,
        address: "430 E 20TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312643,
        lon: -76.610117
    }, {
        id: 770,
        landlord_num: 4,
        address: "432 E 20TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312666,
        lon: -76.610031
    }, {
        id: 771,
        landlord_num: 4,
        address: "4404 ARIZONA AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.338471,
        lon: -76.544058
    }, {
        id: 772,
        landlord_num: 4,
        address: "500 N FREMONT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294614,
        lon: -76.632193
    }, {
        id: 773,
        landlord_num: 4,
        address: "507 BRUNE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295155,
        lon: -76.630584
    }, {
        id: 774,
        landlord_num: 4,
        address: "508 BRUNE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295249,
        lon: -76.630979
    }, {
        id: 775,
        landlord_num: 4,
        address: "5402 FAIR OAKS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.355234,
        lon: -76.566681
    }, {
        id: 776,
        landlord_num: 4,
        address: "600 BRUNE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295623,
        lon: -76.63096
    }, {
        id: 777,
        landlord_num: 4,
        address: "611 BRUNE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295968,
        lon: -76.630628
    }, {
        id: 778,
        landlord_num: 4,
        address: "612 MCCOLLOUGH CIR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29762,
        lon: -76.628325
    }, {
        id: 779,
        landlord_num: 4,
        address: "612 MURPHY LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296592,
        lon: -76.627163
    }, {
        id: 780,
        landlord_num: 4,
        address: "614 MCCOLLOUGH CIR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297592,
        lon: -76.628405
    }, {
        id: 781,
        landlord_num: 4,
        address: "614 MURPHY LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296566,
        lon: -76.627238
    }, {
        id: 782,
        landlord_num: 4,
        address: "616 MURPHY LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296529,
        lon: -76.627297
    }, {
        id: 783,
        landlord_num: 4,
        address: "628 PERKINS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296628,
        lon: -76.628598
    }, {
        id: 784,
        landlord_num: 4,
        address: "629 PERKINS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296302,
        lon: -76.628315
    }, {
        id: 785,
        landlord_num: 4,
        address: "630 PERKINS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296568,
        lon: -76.628698
    }, {
        id: 786,
        landlord_num: 4,
        address: "631 PERKINS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296265,
        lon: -76.628358
    }, {
        id: 787,
        landlord_num: 4,
        address: "633 PERKINS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296327,
        lon: -76.628398
    }, {
        id: 788,
        landlord_num: 4,
        address: "636 MCCOLLOUGH CIR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296961,
        lon: -76.629428
    }, {
        id: 789,
        landlord_num: 4,
        address: "641 W HOFFMAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297726,
        lon: -76.629568
    }, {
        id: 790,
        landlord_num: 4,
        address: "651 W HOFFMAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297252,
        lon: -76.630142
    }, {
        id: 791,
        landlord_num: 4,
        address: "702 MURPHY LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295193,
        lon: -76.629151
    }, {
        id: 792,
        landlord_num: 4,
        address: "703 EDMONDSON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29605,
        lon: -76.630132
    }, {
        id: 793,
        landlord_num: 4,
        address: "704 MURPHY LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295162,
        lon: -76.629238
    }, {
        id: 794,
        landlord_num: 4,
        address: "705 BRUNE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29651,
        lon: -76.630674
    }, {
        id: 795,
        landlord_num: 4,
        address: "705 EDMONDSON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296005,
        lon: -76.630185
    }, {
        id: 796,
        landlord_num: 4,
        address: "707 BRUNE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296574,
        lon: -76.630688
    }, {
        id: 797,
        landlord_num: 4,
        address: "707 EDMONDSON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295995,
        lon: -76.630249
    }, {
        id: 798,
        landlord_num: 4,
        address: "709 BRUNE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296621,
        lon: -76.63069
    }, {
        id: 799,
        landlord_num: 4,
        address: "711 BRUNE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296678,
        lon: -76.630684
    }, {
        id: 800,
        landlord_num: 4,
        address: "711 EDMONDSON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296053,
        lon: -76.630587
    }, {
        id: 801,
        landlord_num: 4,
        address: "713 BRUNE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296743,
        lon: -76.630621
    }, {
        id: 802,
        landlord_num: 4,
        address: "715 BRUNE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296812,
        lon: -76.630631
    }, {
        id: 803,
        landlord_num: 4,
        address: "717 BRUNE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296884,
        lon: -76.630646
    }, {
        id: 804,
        landlord_num: 4,
        address: "717 N STREEPER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299651,
        lon: -76.577247
    }, {
        id: 805,
        landlord_num: 4,
        address: "718 MURPHY LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294929,
        lon: -76.629823
    }, {
        id: 806,
        landlord_num: 4,
        address: "722 MURPHY LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294921,
        lon: -76.629962
    }, {
        id: 807,
        landlord_num: 4,
        address: "732 MURPHY LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294866,
        lon: -76.630514
    }, {
        id: 808,
        landlord_num: 4,
        address: "800 GEORGE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295618,
        lon: -76.631069
    }, {
        id: 809,
        landlord_num: 4,
        address: "804 N LAKEWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.3002,
        lon: -76.579806
    }, {
        id: 810,
        landlord_num: 4,
        address: "815 GEORGE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295193,
        lon: -76.631658
    }, {
        id: 811,
        landlord_num: 4,
        address: "816 MURPHY LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294848,
        lon: -76.631792
    }, {
        id: 812,
        landlord_num: 4,
        address: "817 GEORGE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295209,
        lon: -76.631762
    }, {
        id: 813,
        landlord_num: 4,
        address: "818 GEORGE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295595,
        lon: -76.631822
    }, {
        id: 814,
        landlord_num: 4,
        address: "820 GEORGE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295593,
        lon: -76.631898
    }, {
        id: 815,
        landlord_num: 4,
        address: "822 GEORGE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295575,
        lon: -76.63198
    }, {
        id: 816,
        landlord_num: 4,
        address: "900 W FRANKLIN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294601,
        lon: -76.632242
    }, {
        id: 817,
        landlord_num: 4,
        address: "902 W FRANKLIN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294619,
        lon: -76.632376
    }, {
        id: 818,
        landlord_num: 4,
        address: "903 ARGYLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296643,
        lon: -76.627542
    }, {
        id: 819,
        landlord_num: 4,
        address: "903 MYRTLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295824,
        lon: -76.628411
    }, {
        id: 820,
        landlord_num: 4,
        address: "904 ARGYLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296321,
        lon: -76.627848
    }, {
        id: 821,
        landlord_num: 4,
        address: "904 W FRANKLIN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294612,
        lon: -76.632446
    }, {
        id: 822,
        landlord_num: 4,
        address: "905 ARGYLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296702,
        lon: -76.627612
    }, {
        id: 823,
        landlord_num: 4,
        address: "905 MYRTLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295847,
        lon: -76.628464
    }, {
        id: 824,
        landlord_num: 4,
        address: "906 ARGYLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296322,
        lon: -76.627907
    }, {
        id: 825,
        landlord_num: 4,
        address: "908 ARGYLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296367,
        lon: -76.627943
    }, {
        id: 826,
        landlord_num: 4,
        address: "908 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278421,
        lon: -76.61647
    }, {
        id: 827,
        landlord_num: 4,
        address: "910 ARGYLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296423,
        lon: -76.627977
    }, {
        id: 828,
        landlord_num: 4,
        address: "914 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278354,
        lon: -76.616444
    }, {
        id: 829,
        landlord_num: 4,
        address: "918 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278254,
        lon: -76.616433
    }, {
        id: 830,
        landlord_num: 4,
        address: "921 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278272,
        lon: -76.616174
    }, {
        id: 831,
        landlord_num: 4,
        address: "925 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278211,
        lon: -76.616171
    }, {
        id: 832,
        landlord_num: 4,
        address: "926 N GILMOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299543,
        lon: -76.643241
    }, {
        id: 833,
        landlord_num: 4,
        address: "927 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278141,
        lon: -76.616165
    }, {
        id: 834,
        landlord_num: 4,
        address: "931 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278077,
        lon: -76.616161
    }, {
        id: 835,
        landlord_num: 4,
        address: "935 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278016,
        lon: -76.616158
    }, {
        id: 836,
        landlord_num: 4,
        address: "935 N MOUNT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299558,
        lon: -76.644147
    }, {
        id: 837,
        landlord_num: 4,
        address: "2001 GUILFORD AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.312585,
        lon: -76.61236
    }, {
        id: 838,
        landlord_num: 4,
        address: "2810 OAKLEY AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.349095,
        lon: -76.666745
    }, {
        id: 839,
        landlord_num: 4,
        address: "2921 WOODLAND AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.346375,
        lon: -76.667531
    }, {
        id: 840,
        landlord_num: 4,
        address: "308 E 20 1/2 ST",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.313032,
        lon: -76.611921
    }, {
        id: 841,
        landlord_num: 4,
        address: "3527 HAYWARD AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.34825,
        lon: -76.680957
    }, {
        id: 842,
        landlord_num: 4,
        address: "3918 FERNHILL AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.337997,
        lon: -76.683165
    }, {
        id: 843,
        landlord_num: 4,
        address: "4005 FERNHILL AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.337445,
        lon: -76.68616
    }, {
        id: 844,
        landlord_num: 4,
        address: "401 E 23RD ST",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.315336,
        lon: -76.610743
    }, {
        id: 845,
        landlord_num: 4,
        address: "403 E 23RD ST",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.315339,
        lon: -76.61069
    }, {
        id: 846,
        landlord_num: 4,
        address: "417 E FAYETTE ST",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.290133,
        lon: -76.60941
    }, {
        id: 847,
        landlord_num: 4,
        address: "4203 RIDGEWOOD AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.336342,
        lon: -76.689708
    }, {
        id: 848,
        landlord_num: 4,
        address: "438 E 20TH ST",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.312673,
        lon: -76.609882
    }, {
        id: 849,
        landlord_num: 4,
        address: "4409 WILLSHIRE AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.336377,
        lon: -76.546309
    }, {
        id: 850,
        landlord_num: 4,
        address: "444 E 20TH ST",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.312679,
        lon: -76.609733
    }, {
        id: 851,
        landlord_num: 5,
        address: "1101 SAINT PAUL ST",
        units: 1,
        ecb: 5,
        pros: 0,
        lat: 39.302737,
        lon: -76.614064
    }, {
        id: 852,
        landlord_num: 5,
        address: "1211 CLEVELAND ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.279988,
        lon: -76.632686
    }, {
        id: 853,
        landlord_num: 5,
        address: "2877 BOOKERT DR",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.246003,
        lon: -76.627163
    }, {
        id: 854,
        landlord_num: 5,
        address: "4640 COLEHERNE ROAD",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.295102,
        lon: -76.695963
    }, {
        id: 855,
        landlord_num: 5,
        address: "2716 MOSHER ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.299585,
        lon: -76.662208
    }, {
        id: 856,
        landlord_num: 5,
        address: "300 NORTH BEND ROAD",
        units: 303,
        ecb: 0,
        pros: 0,
        lat: 39.283166,
        lon: -76.706064
    }, {
        id: 857,
        landlord_num: 5,
        address: "5000 W FOREST PARK AVE",
        units: 274,
        ecb: 0,
        pros: 0,
        lat: 39.320548,
        lon: -76.706581
    }, {
        id: 858,
        landlord_num: 5,
        address: "2500 EDGECOMBE CIRCLE NORTH",
        units: 228,
        ecb: 0,
        pros: 0,
        lat: 39.341449,
        lon: -76.660655
    }, {
        id: 859,
        landlord_num: 5,
        address: "820 BELGIAN AVE",
        units: 141,
        ecb: 0,
        pros: 0,
        lat: 39.340941,
        lon: -76.602602
    }, {
        id: 860,
        landlord_num: 5,
        address: "1201 N WOODINGTON ROAD",
        units: 113,
        ecb: 0,
        pros: 0,
        lat: 39.302072,
        lon: -76.68631
    }, {
        id: 861,
        landlord_num: 5,
        address: "2 N WOODINGTON ROAD",
        units: 100,
        ecb: 0,
        pros: 0,
        lat: 39.285932,
        lon: -76.687129
    }, {
        id: 862,
        landlord_num: 5,
        address: "3800 FORDS LANE",
        units: 84,
        ecb: 0,
        pros: 0,
        lat: 39.35762,
        lon: -76.699988
    }, {
        id: 863,
        landlord_num: 5,
        address: "901 BELGIAN AVE",
        units: 78,
        ecb: 0,
        pros: 0,
        lat: 39.340354,
        lon: -76.603366
    }, {
        id: 864,
        landlord_num: 5,
        address: "4132 MOUNTWOOD ROAD",
        units: 75,
        ecb: 0,
        pros: 0,
        lat: 39.301674,
        lon: -76.684449
    }, {
        id: 865,
        landlord_num: 5,
        address: "4000 FORDS LANE",
        units: 48,
        ecb: 0,
        pros: 0,
        lat: 39.356549,
        lon: -76.700929
    }, {
        id: 866,
        landlord_num: 5,
        address: "1101 N WOODINGTON ROAD",
        units: 46,
        ecb: 0,
        pros: 0,
        lat: 39.29944,
        lon: -76.686036
    }, {
        id: 867,
        landlord_num: 5,
        address: "513-563 THORNFIELD ROAD",
        units: 44,
        ecb: 0,
        pros: 0,
        lat: 39.2753,
        lon: -76.693814
    }, {
        id: 868,
        landlord_num: 5,
        address: "4516 PARKTON ST",
        units: 38,
        ecb: 0,
        pros: 0,
        lat: 39.278425,
        lon: -76.69201
    }, {
        id: 869,
        landlord_num: 5,
        address: "401 THORNFIELD ROAD",
        units: 34,
        ecb: 0,
        pros: 0,
        lat: 39.276965,
        lon: -76.692025
    }, {
        id: 870,
        landlord_num: 5,
        address: "400 COLLEEN ROAD",
        units: 33,
        ecb: 0,
        pros: 0,
        lat: 39.279391,
        lon: -76.694942
    }, {
        id: 871,
        landlord_num: 5,
        address: "5322 FREDERICK AVE",
        units: 32,
        ecb: 0,
        pros: 0,
        lat: 39.28069,
        lon: -76.705725
    }, {
        id: 872,
        landlord_num: 5,
        address: "500 S WICKHAM ROAD",
        units: 32,
        ecb: 0,
        pros: 0,
        lat: 39.277014,
        lon: -76.69761
    }, {
        id: 873,
        landlord_num: 5,
        address: "401 S BEECHFIELD AVE",
        units: 31,
        ecb: 0,
        pros: 0,
        lat: 39.279291,
        lon: -76.693743
    }, {
        id: 874,
        landlord_num: 5,
        address: "501 S WICKHAM ROAD",
        units: 27,
        ecb: 0,
        pros: 0,
        lat: 39.27694,
        lon: -76.696923
    }, {
        id: 875,
        landlord_num: 5,
        address: "501 HAZLETT AVE",
        units: 25,
        ecb: 0,
        pros: 0,
        lat: 39.277397,
        lon: -76.698087
    }, {
        id: 876,
        landlord_num: 5,
        address: "3901 FORDLEIGH ROAD",
        units: 24,
        ecb: 0,
        pros: 0,
        lat: 39.356188,
        lon: -76.697659
    }, {
        id: 877,
        landlord_num: 5,
        address: "3913 FORDLEIGH ROAD",
        units: 24,
        ecb: 0,
        pros: 0,
        lat: 39.355863,
        lon: -76.698256
    }, {
        id: 878,
        landlord_num: 5,
        address: "4001 FORDLEIGH ROAD",
        units: 24,
        ecb: 0,
        pros: 0,
        lat: 39.355194,
        lon: -76.699014
    }, {
        id: 879,
        landlord_num: 5,
        address: "500 COLLEEN ROAD",
        units: 24,
        ecb: 0,
        pros: 0,
        lat: 39.277224,
        lon: -76.696045
    }, {
        id: 880,
        landlord_num: 5,
        address: "919 CLAYMONT AVE",
        units: 22,
        ecb: 0,
        pros: 0,
        lat: 39.29896,
        lon: -76.660337
    }, {
        id: 881,
        landlord_num: 5,
        address: "1200 BRADDISH AVE",
        units: 20,
        ecb: 0,
        pros: 0,
        lat: 39.302052,
        lon: -76.661188
    }, {
        id: 882,
        landlord_num: 5,
        address: "3800 FORDLEIGH ROAD",
        units: 20,
        ecb: 0,
        pros: 0,
        lat: 39.357296,
        lon: -76.697365
    }, {
        id: 883,
        landlord_num: 5,
        address: "3801 FORDLEIGH ROAD",
        units: 20,
        ecb: 0,
        pros: 0,
        lat: 39.356855,
        lon: -76.696949
    }, {
        id: 884,
        landlord_num: 5,
        address: "3900 FORDLEIGH ROAD",
        units: 20,
        ecb: 0,
        pros: 0,
        lat: 39.356729,
        lon: -76.698053
    }, {
        id: 885,
        landlord_num: 5,
        address: "4000 FORDLEIGH ROAD",
        units: 19,
        ecb: 0,
        pros: 0,
        lat: 39.355409,
        lon: -76.699503
    }, {
        id: 886,
        landlord_num: 5,
        address: "1301 WILDWOOD PKWY",
        units: 16,
        ecb: 0,
        pros: 0,
        lat: 39.301129,
        lon: -76.683485
    }, {
        id: 887,
        landlord_num: 5,
        address: "3910 FORDLEIGH ROAD",
        units: 16,
        ecb: 0,
        pros: 0,
        lat: 39.356,
        lon: -76.698883
    }, {
        id: 888,
        landlord_num: 5,
        address: "1100 BRADDISH AVE",
        units: 12,
        ecb: 0,
        pros: 0,
        lat: 39.300801,
        lon: -76.661112
    }, {
        id: 889,
        landlord_num: 5,
        address: "4147 MOUNTWOOD ROAD",
        units: 12,
        ecb: 0,
        pros: 0,
        lat: 39.301518,
        lon: -76.68546
    }, {
        id: 890,
        landlord_num: 5,
        address: "1016 BRADDISH AVE",
        units: 11,
        ecb: 0,
        pros: 0,
        lat: 39.300071,
        lon: -76.661081
    }, {
        id: 891,
        landlord_num: 5,
        address: "4501 CEDARGARDEN ROAD",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.276229,
        lon: -76.692455
    }, {
        id: 892,
        landlord_num: 5,
        address: "1000 CLAYMONT AVE",
        units: 8,
        ecb: 0,
        pros: 0,
        lat: 39.299614,
        lon: -76.661052
    }, {
        id: 893,
        landlord_num: 5,
        address: "15 E EAGER ST",
        units: 8,
        ecb: 0,
        pros: 0,
        lat: 39.300807,
        lon: -76.614731
    }, {
        id: 894,
        landlord_num: 5,
        address: "4901 WILLISTON ST",
        units: 8,
        ecb: 0,
        pros: 0,
        lat: 39.276253,
        lon: -76.698516
    }, {
        id: 895,
        landlord_num: 5,
        address: "1124 BRADDISH AVE",
        units: 6,
        ecb: 0,
        pros: 0,
        lat: 39.30126,
        lon: -76.661133
    }, {
        id: 896,
        landlord_num: 5,
        address: "5000 WILLISTON ST",
        units: 6,
        ecb: 0,
        pros: 0,
        lat: 39.276779,
        lon: -76.698542
    }, {
        id: 897,
        landlord_num: 5,
        address: "930 CLAYMONT AVE",
        units: 6,
        ecb: 0,
        pros: 0,
        lat: 39.299096,
        lon: -76.661034
    }, {
        id: 898,
        landlord_num: 5,
        address: "918 CLAYMONT AVE",
        units: 4,
        ecb: 0,
        pros: 0,
        lat: 39.298688,
        lon: -76.661037
    }, {
        id: 899,
        landlord_num: 5,
        address: "2900 KESWICK ROAD",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.32236,
        lon: -76.628191
    }, {
        id: 900,
        landlord_num: 5,
        address: "926 CLAYMONT AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.29887,
        lon: -76.661024
    }, {
        id: 901,
        landlord_num: 5,
        address: "927 ASHBURTON ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.298838,
        lon: -76.661382
    }, {
        id: 902,
        landlord_num: 5,
        address: "122 W ROPEWALK LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.275228,
        lon: -76.61581
    }, {
        id: 903,
        landlord_num: 5,
        address: "32 W MONTGOMERY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.279845,
        lon: -76.615371
    }, {
        id: 904,
        landlord_num: 5,
        address: "34 W MONTGOMERY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.279844,
        lon: -76.615383
    }, {
        id: 905,
        landlord_num: 5,
        address: "6711 PARK HEIGHTS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.363087,
        lon: -76.70068
    }, {
        id: 906,
        landlord_num: 5,
        address: "1020 S CHARLES ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.277367,
        lon: -76.614647
    }, {
        id: 907,
        landlord_num: 5,
        address: "1138 WASHINGTON BLVD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.282472,
        lon: -76.633354
    }, {
        id: 908,
        landlord_num: 5,
        address: "1164 SARGEANT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.282611,
        lon: -76.634317
    }, {
        id: 909,
        landlord_num: 5,
        address: "1166 W HAMBURG ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.279752,
        lon: -76.631003
    }, {
        id: 910,
        landlord_num: 5,
        address: "1168 WASHINGTON BLVD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.282125,
        lon: -76.633812
    }, {
        id: 911,
        landlord_num: 5,
        address: "1178 SARGEANT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.282443,
        lon: -76.634531
    }, {
        id: 912,
        landlord_num: 5,
        address: "12 N ROSE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292537,
        lon: -76.581351
    }, {
        id: 913,
        landlord_num: 5,
        address: "1235 JAMES ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.281874,
        lon: -76.635411
    }, {
        id: 914,
        landlord_num: 5,
        address: "1305 W OSTEND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.281898,
        lon: -76.63452
    }, {
        id: 915,
        landlord_num: 5,
        address: "1309 W OSTEND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.281919,
        lon: -76.634588
    }, {
        id: 916,
        landlord_num: 5,
        address: "1323 N ELLWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306842,
        lon: -76.573649
    }, {
        id: 917,
        landlord_num: 5,
        address: "1516 E MADISON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299518,
        lon: -76.597127
    }, {
        id: 918,
        landlord_num: 5,
        address: "1525 ALICEANNA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.28328,
        lon: -76.595683
    }, {
        id: 919,
        landlord_num: 5,
        address: "1533 ALICEANNA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283258,
        lon: -76.595673
    }, {
        id: 920,
        landlord_num: 5,
        address: "1535 ALICEANNA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283257,
        lon: -76.595639
    }, {
        id: 921,
        landlord_num: 5,
        address: "1604 WADSWORTH WAY",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.362931,
        lon: -76.581982
    }, {
        id: 922,
        landlord_num: 5,
        address: "1829 GOUGH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.287592,
        lon: -76.590432
    }, {
        id: 923,
        landlord_num: 5,
        address: "1903 GRIFFIS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.26798,
        lon: -76.650698
    }, {
        id: 924,
        landlord_num: 5,
        address: "1930 NORTHBOURNE ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.353544,
        lon: -76.580397
    }, {
        id: 925,
        landlord_num: 5,
        address: "2301 AILSA AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.350864,
        lon: -76.57407
    }, {
        id: 926,
        landlord_num: 5,
        address: "2315 E FAIRMOUNT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29282,
        lon: -76.58395
    }, {
        id: 927,
        landlord_num: 5,
        address: "2317 E FAIRMOUNT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292822,
        lon: -76.583903
    }, {
        id: 928,
        landlord_num: 5,
        address: "2319 E FAIRMOUNT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292824,
        lon: -76.583858
    }, {
        id: 929,
        landlord_num: 5,
        address: "2321 E FAIRMOUNT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292825,
        lon: -76.583814
    }, {
        id: 930,
        landlord_num: 5,
        address: "242 S CHESTER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.288319,
        lon: -76.587504
    }, {
        id: 931,
        landlord_num: 5,
        address: "3004 GLEN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.359788,
        lon: -76.681081
    }, {
        id: 932,
        landlord_num: 5,
        address: "3105 ECHODALE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.348641,
        lon: -76.561596
    }, {
        id: 933,
        landlord_num: 5,
        address: "314 IMLA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.290051,
        lon: -76.539429
    }, {
        id: 934,
        landlord_num: 5,
        address: "3422 WOODSTOCK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.32518,
        lon: -76.576085
    }, {
        id: 935,
        landlord_num: 5,
        address: "3432 CHESTERFIELD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321383,
        lon: -76.564768
    }, {
        id: 936,
        landlord_num: 5,
        address: "3818 GREENSPRING AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.33462,
        lon: -76.656244
    }, {
        id: 937,
        landlord_num: 5,
        address: "409 S REGESTER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286255,
        lon: -76.592246
    }, {
        id: 938,
        landlord_num: 5,
        address: "509 S EAST AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.285921,
        lon: -76.571213
    }, {
        id: 939,
        landlord_num: 5,
        address: "5738 EDGEPARK ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.356735,
        lon: -76.576294
    }, {
        id: 940,
        landlord_num: 5,
        address: "703 S DALLAS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283162,
        lon: -76.595712
    }, {
        id: 941,
        landlord_num: 5,
        address: "705 S DALLAS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283119,
        lon: -76.595745
    }, {
        id: 942,
        landlord_num: 5,
        address: "714 S CHARLES ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.28063,
        lon: -76.614824
    }, {
        id: 943,
        landlord_num: 5,
        address: "806 WICKLOW ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295927,
        lon: -76.688218
    }, {
        id: 944,
        landlord_num: 5,
        address: "810 S DEAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283079,
        lon: -76.56619
    }, {
        id: 945,
        landlord_num: 5,
        address: "910 WILDWOOD PKWY",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.298141,
        lon: -76.6842
    }, {
        id: 946,
        landlord_num: 5,
        address: "5300 FREDERICK AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.280807,
        lon: -76.705517
    }, {
        id: 947,
        landlord_num: 5,
        address: "11426 YORK RD",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.497278,
        lon: -76.651209
    }, {
        id: 948,
        landlord_num: 5,
        address: "2133 ANNAPOLIS ROAD",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.264514,
        lon: -76.632726
    }, {
        id: 949,
        landlord_num: 5,
        address: "2313 E FAIRMOUNT AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.292819,
        lon: -76.583998
    }, {
        id: 950,
        landlord_num: 6,
        address: "207 HARMISON ST",
        units: 1,
        ecb: 6,
        pros: 0,
        lat: 39.284594,
        lon: -76.64899
    }, {
        id: 951,
        landlord_num: 6,
        address: "2139 EAGLE ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.279998,
        lon: -76.64967
    }, {
        id: 952,
        landlord_num: 6,
        address: "1211 N LUZERNE AVE",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.305119,
        lon: -76.581021
    }, {
        id: 953,
        landlord_num: 6,
        address: "110 S WASHINGTON ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.290257,
        lon: -76.589308
    }, {
        id: 954,
        landlord_num: 6,
        address: "2424 BARCLAY ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.317104,
        lon: -76.611726
    }, {
        id: 955,
        landlord_num: 6,
        address: "2204 WILKENS AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.280901,
        lon: -76.650883
    }, {
        id: 956,
        landlord_num: 6,
        address: "2113 MCHENRY ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.28393,
        lon: -76.650236
    }, {
        id: 957,
        landlord_num: 6,
        address: "751 N EDGEWOOD ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.296464,
        lon: -76.673825
    }, {
        id: 958,
        landlord_num: 6,
        address: "706 N LAKEWOOD AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.299374,
        lon: -76.579713
    }, {
        id: 959,
        landlord_num: 6,
        address: "1806 N WASHINGTON ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.311286,
        lon: -76.590622
    }, {
        id: 960,
        landlord_num: 6,
        address: "2125 EAGLE ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.280152,
        lon: -76.649374
    }, {
        id: 961,
        landlord_num: 6,
        address: "2031 GOUGH ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.287697,
        lon: -76.587907
    }, {
        id: 962,
        landlord_num: 6,
        address: "2534 LOYOLA SOUTHWAY",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.337592,
        lon: -76.660635
    }, {
        id: 963,
        landlord_num: 6,
        address: "5626 MIDWOOD AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.358244,
        lon: -76.600801
    }, {
        id: 964,
        landlord_num: 6,
        address: "3829 SAINT MARGARET ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.231271,
        lon: -76.596097
    }, {
        id: 965,
        landlord_num: 6,
        address: "2127 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280088,
        lon: -76.649396
    }, {
        id: 966,
        landlord_num: 6,
        address: "2121 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280134,
        lon: -76.649261
    }, {
        id: 967,
        landlord_num: 6,
        address: "2107 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.28024,
        lon: -76.648942
    }, {
        id: 968,
        landlord_num: 6,
        address: "607 S SMALLWOOD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280331,
        lon: -76.650024
    }, {
        id: 969,
        landlord_num: 6,
        address: "2124 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280426,
        lon: -76.649755
    }, {
        id: 970,
        landlord_num: 6,
        address: "2122 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280438,
        lon: -76.649712
    }, {
        id: 971,
        landlord_num: 6,
        address: "2120 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280454,
        lon: -76.649672
    }, {
        id: 972,
        landlord_num: 6,
        address: "2116 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280479,
        lon: -76.649586
    }, {
        id: 973,
        landlord_num: 6,
        address: "1250 WASHINGTON BLVD",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.281163,
        lon: -76.635056
    }, {
        id: 974,
        landlord_num: 6,
        address: "4729 AMBERLEY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.282022,
        lon: -76.694053
    }, {
        id: 975,
        landlord_num: 6,
        address: "1135 WASHINGTON BLVD",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.282116,
        lon: -76.633148
    }, {
        id: 976,
        landlord_num: 6,
        address: "1809 WILKENS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.282255,
        lon: -76.645139
    }, {
        id: 977,
        landlord_num: 6,
        address: "1807 WILKENS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.282263,
        lon: -76.645088
    }, {
        id: 978,
        landlord_num: 6,
        address: "319 S PULASKI ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.283395,
        lon: -76.649548
    }, {
        id: 979,
        landlord_num: 6,
        address: "2524 W PRATT ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.284919,
        lon: -76.65673
    }, {
        id: 980,
        landlord_num: 6,
        address: "2008 PENROSE AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.291362,
        lon: -76.649538
    }, {
        id: 981,
        landlord_num: 6,
        address: "1824 PENROSE AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.291506,
        lon: -76.646492
    }, {
        id: 982,
        landlord_num: 6,
        address: "2033 ORLEANS ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.295184,
        lon: -76.58822
    }, {
        id: 983,
        landlord_num: 6,
        address: "2422 E MADISON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.300052,
        lon: -76.582685
    }, {
        id: 984,
        landlord_num: 6,
        address: "1025 N CAREY ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.30074,
        lon: -76.638562
    }, {
        id: 985,
        landlord_num: 6,
        address: "2529 ASHLAND AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.300809,
        lon: -76.581481
    }, {
        id: 986,
        landlord_num: 6,
        address: "2603 BERYL AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.302868,
        lon: -76.580929
    }, {
        id: 987,
        landlord_num: 6,
        address: "1523 APPLETON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.305919,
        lon: -76.648576
    }, {
        id: 988,
        landlord_num: 6,
        address: "2203 E FEDERAL ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.308646,
        lon: -76.587068
    }, {
        id: 989,
        landlord_num: 6,
        address: "2939 W NORTH AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.308751,
        lon: -76.667163
    }, {
        id: 990,
        landlord_num: 6,
        address: "3200 RAVENWOOD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.315467,
        lon: -76.578369
    }, {
        id: 991,
        landlord_num: 6,
        address: "3025 BELAIR ROAD",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.31997,
        lon: -76.575172
    }, {
        id: 992,
        landlord_num: 6,
        address: "3414 CARDENAS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.323873,
        lon: -76.57461
    }, {
        id: 993,
        landlord_num: 6,
        address: "1614 E 30TH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.325531,
        lon: -76.592688
    }, {
        id: 994,
        landlord_num: 6,
        address: "3137 SEQUOIA AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.328015,
        lon: -76.666919
    }, {
        id: 995,
        landlord_num: 6,
        address: "1708 EUTAW PL",
        units: 11,
        ecb: 0,
        pros: 0,
        lat: 39.307075,
        lon: -76.630653
    }, {
        id: 996,
        landlord_num: 6,
        address: "3921 MAINE AVE",
        units: 8,
        ecb: 0,
        pros: 0,
        lat: 39.326629,
        lon: -76.685278
    }, {
        id: 997,
        landlord_num: 6,
        address: "1801 EUTAW PL",
        units: 4,
        ecb: 0,
        pros: 0,
        lat: 39.308159,
        lon: -76.630706
    }, {
        id: 998,
        landlord_num: 6,
        address: "2110 SAINT PAUL ST",
        units: 4,
        ecb: 0,
        pros: 0,
        lat: 39.313675,
        lon: -76.615448
    }, {
        id: 999,
        landlord_num: 6,
        address: "3916 MAINE AVE",
        units: 4,
        ecb: 0,
        pros: 0,
        lat: 39.327012,
        lon: -76.68491
    }, {
        id: 1e3,
        landlord_num: 6,
        address: "2419 EUTAW PL",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.313987,
        lon: -76.636997
    }, {
        id: 1001,
        landlord_num: 6,
        address: "5505 RICHARD AVE",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.352147,
        lon: -76.560018
    }, {
        id: 1002,
        landlord_num: 6,
        address: "2309 WICHITA AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.321998,
        lon: -76.656359
    }, {
        id: 1003,
        landlord_num: 6,
        address: "3434 W CATON AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.286928,
        lon: -76.67416
    }, {
        id: 1004,
        landlord_num: 6,
        address: "533 N LUZERNE AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.297503,
        lon: -76.580546
    }, {
        id: 1005,
        landlord_num: 6,
        address: "926 E PATAPSCO AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.23475,
        lon: -76.596242
    }, {
        id: 1006,
        landlord_num: 6,
        address: "1 N MONASTERY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286522,
        lon: -76.677844
    }, {
        id: 1007,
        landlord_num: 6,
        address: "10 N BENTALOU ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.288376,
        lon: -76.653135
    }, {
        id: 1008,
        landlord_num: 6,
        address: "1142 CARROLL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.281463,
        lon: -76.632522
    }, {
        id: 1009,
        landlord_num: 6,
        address: "116 N ELLWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293815,
        lon: -76.573665
    }, {
        id: 1010,
        landlord_num: 6,
        address: "1209 W LOMBARD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286374,
        lon: -76.636954
    }, {
        id: 1011,
        landlord_num: 6,
        address: "1221 ETTING ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.30124,
        lon: -76.628437
    }, {
        id: 1012,
        landlord_num: 6,
        address: "1426 E OLIVER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.307491,
        lon: -76.59866
    }, {
        id: 1013,
        landlord_num: 6,
        address: "1429 KITMORE ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.350877,
        lon: -76.592815
    }, {
        id: 1014,
        landlord_num: 6,
        address: "1506 KENHILL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308412,
        lon: -76.577947
    }, {
        id: 1015,
        landlord_num: 6,
        address: "1518 SHADYSIDE ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.338751,
        lon: -76.592578
    }, {
        id: 1016,
        landlord_num: 6,
        address: "1524 APPLETON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.305961,
        lon: -76.649063
    }, {
        id: 1017,
        landlord_num: 6,
        address: "1601 APPLETON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306693,
        lon: -76.648577
    }, {
        id: 1018,
        landlord_num: 6,
        address: "1603 APPLETON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306732,
        lon: -76.648579
    }, {
        id: 1019,
        landlord_num: 6,
        address: "1616 E 30TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.32553,
        lon: -76.592639
    }, {
        id: 1020,
        landlord_num: 6,
        address: "1622 APPLETON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.3071,
        lon: -76.649132
    }, {
        id: 1021,
        landlord_num: 6,
        address: "1715 APPLETON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308213,
        lon: -76.648679
    }, {
        id: 1022,
        landlord_num: 6,
        address: "1722 E OLIVER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.307688,
        lon: -76.593537
    }, {
        id: 1023,
        landlord_num: 6,
        address: "1804 MCCULLOH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306481,
        lon: -76.632979
    }, {
        id: 1024,
        landlord_num: 6,
        address: "1805 PENROSE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.291107,
        lon: -76.645959
    }, {
        id: 1025,
        landlord_num: 6,
        address: "1809 N CAROLINE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.310801,
        lon: -76.5981
    }, {
        id: 1026,
        landlord_num: 6,
        address: "1810 BAKER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306819,
        lon: -76.647527
    }, {
        id: 1027,
        landlord_num: 6,
        address: "1825 PENROSE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.291088,
        lon: -76.646468
    }, {
        id: 1028,
        landlord_num: 6,
        address: "1920 WALBROOK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.311024,
        lon: -76.648934
    }, {
        id: 1029,
        landlord_num: 6,
        address: "2004 PENROSE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.291365,
        lon: -76.649443
    }, {
        id: 1030,
        landlord_num: 6,
        address: "208 N LUZERNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294962,
        lon: -76.580852
    }, {
        id: 1031,
        landlord_num: 6,
        address: "213 S GILMOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.28503,
        lon: -76.641785
    }, {
        id: 1032,
        landlord_num: 6,
        address: "2201 BARCLAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.314828,
        lon: -76.610904
    }, {
        id: 1033,
        landlord_num: 6,
        address: "2220 W FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.289457,
        lon: -76.652186
    }, {
        id: 1034,
        landlord_num: 6,
        address: "223 FURROW ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284138,
        lon: -76.651797
    }, {
        id: 1035,
        landlord_num: 6,
        address: "228 N LUZERNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295346,
        lon: -76.580879
    }, {
        id: 1036,
        landlord_num: 6,
        address: "2305 ASHLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300685,
        lon: -76.584698
    }, {
        id: 1037,
        landlord_num: 6,
        address: "2412 E MONUMENT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.298971,
        lon: -76.5833
    }, {
        id: 1038,
        landlord_num: 6,
        address: "2422 FLEET ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.285216,
        lon: -76.582062
    }, {
        id: 1039,
        landlord_num: 6,
        address: "2436 BARCLAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.317387,
        lon: -76.611558
    }, {
        id: 1040,
        landlord_num: 6,
        address: "2702 E CHASE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.30399,
        lon: -76.579584
    }, {
        id: 1041,
        landlord_num: 6,
        address: "2703 JEFFERSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296681,
        lon: -76.578852
    }, {
        id: 1042,
        landlord_num: 6,
        address: "2723 MOSHER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299068,
        lon: -76.66236
    }, {
        id: 1043,
        landlord_num: 6,
        address: "2740 RIGGS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300561,
        lon: -76.662971
    }, {
        id: 1044,
        landlord_num: 6,
        address: "2799 THE ALAMEDA",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.323404,
        lon: -76.592625
    }, {
        id: 1045,
        landlord_num: 6,
        address: "2802 SPRINGHILL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.331258,
        lon: -76.662939
    }, {
        id: 1046,
        landlord_num: 6,
        address: "2919 FLEETWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.362374,
        lon: -76.554007
    }, {
        id: 1047,
        landlord_num: 6,
        address: "3024 BRIGHTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.305381,
        lon: -76.668102
    }, {
        id: 1048,
        landlord_num: 6,
        address: "3100 PINEWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.359893,
        lon: -76.548728
    }, {
        id: 1049,
        landlord_num: 6,
        address: "3117 RAVENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.315188,
        lon: -76.579845
    }, {
        id: 1050,
        landlord_num: 6,
        address: "313 LYNDHURST ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.291132,
        lon: -76.680235
    }, {
        id: 1051,
        landlord_num: 6,
        address: "3205 GWYNNS FALLS PKWY",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.314058,
        lon: -76.67154
    }, {
        id: 1052,
        landlord_num: 6,
        address: "323 E LANVALE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308746,
        lon: -76.611124
    }, {
        id: 1053,
        landlord_num: 6,
        address: "3806 W GARRISON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.343793,
        lon: -76.679857
    }, {
        id: 1054,
        landlord_num: 6,
        address: "3808 HUDSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.282836,
        lon: -76.564663
    }, {
        id: 1055,
        landlord_num: 6,
        address: "4100 WOODRIDGE ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297238,
        lon: -76.684474
    }, {
        id: 1056,
        landlord_num: 6,
        address: "414 N LAKEWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296128,
        lon: -76.579515
    }, {
        id: 1057,
        landlord_num: 6,
        address: "417 N PATTERSON PARK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296025,
        lon: -76.5847
    }, {
        id: 1058,
        landlord_num: 6,
        address: "418 NORMANDY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292276,
        lon: -76.681762
    }, {
        id: 1059,
        landlord_num: 6,
        address: "4211 HAMILTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.341537,
        lon: -76.545214
    }, {
        id: 1060,
        landlord_num: 6,
        address: "427 N ELLWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296545,
        lon: -76.573398
    }, {
        id: 1061,
        landlord_num: 6,
        address: "444 N LUZERNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29659,
        lon: -76.58099
    }, {
        id: 1062,
        landlord_num: 6,
        address: "4708 PIMLICO ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.345537,
        lon: -76.668734
    }, {
        id: 1063,
        landlord_num: 6,
        address: "4909 MORELLO ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.34769,
        lon: -76.570667
    }, {
        id: 1064,
        landlord_num: 6,
        address: "5 MARDREW ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284029,
        lon: -76.709264
    }, {
        id: 1065,
        landlord_num: 6,
        address: "5019 CROSSWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.342698,
        lon: -76.55835
    }, {
        id: 1066,
        landlord_num: 6,
        address: "502 BRUNSWICK ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.27901,
        lon: -76.659471
    }, {
        id: 1067,
        landlord_num: 6,
        address: "508 DRUID HILL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297,
        lon: -76.622351
    }, {
        id: 1068,
        landlord_num: 6,
        address: "511 N PORT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297176,
        lon: -76.582755
    }, {
        id: 1069,
        landlord_num: 6,
        address: "5126 HILLBURN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.342429,
        lon: -76.558007
    }, {
        id: 1070,
        landlord_num: 6,
        address: "515 N LINWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297362,
        lon: -76.576278
    }, {
        id: 1071,
        landlord_num: 6,
        address: "516 N ROSE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297318,
        lon: -76.581673
    }, {
        id: 1072,
        landlord_num: 6,
        address: "518 N COLLINGTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297214,
        lon: -76.586802
    }, {
        id: 1073,
        landlord_num: 6,
        address: "521 N ROSE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297414,
        lon: -76.581313
    }, {
        id: 1074,
        landlord_num: 6,
        address: "527 SHERIDAN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.354428,
        lon: -76.608792
    }, {
        id: 1075,
        landlord_num: 6,
        address: "529 N KENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297537,
        lon: -76.577713
    }, {
        id: 1076,
        landlord_num: 6,
        address: "5417 PEMBROKE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.3444,
        lon: -76.553226
    }, {
        id: 1077,
        landlord_num: 6,
        address: "5837 ARIZONA AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.335455,
        lon: -76.535998
    }, {
        id: 1078,
        landlord_num: 6,
        address: "6042 YORKSHIRE DR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.366363,
        lon: -76.604371
    }, {
        id: 1079,
        landlord_num: 6,
        address: "647 S DECKER AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284475,
        lon: -76.573316
    }, {
        id: 1080,
        landlord_num: 6,
        address: "705 N MILTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299023,
        lon: -76.582074
    }, {
        id: 1081,
        landlord_num: 6,
        address: "716 N PORT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299389,
        lon: -76.583228
    }, {
        id: 1082,
        landlord_num: 6,
        address: "736 S CONKLING ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283785,
        lon: -76.567269
    }, {
        id: 1083,
        landlord_num: 6,
        address: "819 MANGOLD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.281104,
        lon: -76.627658
    }, {
        id: 1084,
        landlord_num: 6,
        address: "840 S EAST AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.282535,
        lon: -76.571508
    }, {
        id: 1085,
        landlord_num: 7,
        address: "943 BENNETT PL",
        units: 2,
        ecb: 7,
        pros: 0,
        lat: 39.294853,
        lon: -76.633362
    }, {
        id: 1086,
        landlord_num: 7,
        address: "1011 W LOMBARD ST",
        units: 1,
        ecb: 7,
        pros: 0,
        lat: 39.286595,
        lon: -76.634245
    }, {
        id: 1087,
        landlord_num: 7,
        address: "527 ANNABEL AVE",
        units: 1,
        ecb: 6,
        pros: 0,
        lat: 39.237318,
        lon: -76.602406
    }, {
        id: 1088,
        landlord_num: 7,
        address: "901 DUNDALK AVE",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.283503,
        lon: -76.536454
    }, {
        id: 1089,
        landlord_num: 7,
        address: "903 BENNETT PL",
        units: 2,
        ecb: 2,
        pros: 0,
        lat: 39.294856,
        lon: -76.632384
    }, {
        id: 1090,
        landlord_num: 7,
        address: "1118 DUNDALK AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.28094,
        lon: -76.535485
    }, {
        id: 1091,
        landlord_num: 7,
        address: "1105 HARLEM AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.296559,
        lon: -76.635973
    }, {
        id: 1092,
        landlord_num: 7,
        address: "2568 EDMONDSON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.294902,
        lon: -76.658581
    }, {
        id: 1093,
        landlord_num: 7,
        address: "944 BENNETT PL",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.295128,
        lon: -76.633546
    }, {
        id: 1094,
        landlord_num: 7,
        address: "5608 READY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.35812,
        lon: -76.608999
    }, {
        id: 1095,
        landlord_num: 7,
        address: "5610 READY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.358161,
        lon: -76.608999
    }, {
        id: 1096,
        landlord_num: 7,
        address: "5633 READY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.358689,
        lon: -76.608597
    }, {
        id: 1097,
        landlord_num: 7,
        address: "905 HARLEM AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.296657,
        lon: -76.633441
    }, {
        id: 1098,
        landlord_num: 7,
        address: "926 BENNETT PL",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.295147,
        lon: -76.633099
    }, {
        id: 1099,
        landlord_num: 7,
        address: "1606 DIVISION ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.303734,
        lon: -76.633114
    }, {
        id: 1100,
        landlord_num: 7,
        address: "1742 MONTPELIER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.319455,
        lon: -76.594266
    }, {
        id: 1101,
        landlord_num: 7,
        address: "2016 FLEET ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284933,
        lon: -76.588156
    }, {
        id: 1102,
        landlord_num: 7,
        address: "215 WASHBURN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.235736,
        lon: -76.608961
    }, {
        id: 1103,
        landlord_num: 7,
        address: "2419 WOODBROOK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.310872,
        lon: -76.64132
    }, {
        id: 1104,
        landlord_num: 7,
        address: "409 N ROCK GLEN ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286781,
        lon: -76.707722
    }, {
        id: 1105,
        landlord_num: 7,
        address: "503 TOLNA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286789,
        lon: -76.551059
    }, {
        id: 1106,
        landlord_num: 8,
        address: "2861 EDGECOMBE CIRCLE NORTH",
        units: 35,
        ecb: 3,
        pros: 0,
        lat: 39.343097,
        lon: -76.663553
    }, {
        id: 1107,
        landlord_num: 8,
        address: "1508 E 29TH ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.324817,
        lon: -76.594455
    }, {
        id: 1108,
        landlord_num: 8,
        address: "531 COVENTRY ROAD",
        units: 23,
        ecb: 1,
        pros: 0,
        lat: 39.27807,
        lon: -76.700186
    }, {
        id: 1109,
        landlord_num: 8,
        address: "531 RANDOM ROAD",
        units: 22,
        ecb: 1,
        pros: 0,
        lat: 39.27835,
        lon: -76.701069
    }, {
        id: 1110,
        landlord_num: 8,
        address: "4020 N ROGERS AVE",
        units: 21,
        ecb: 1,
        pros: 0,
        lat: 39.339409,
        lon: -76.699353
    }, {
        id: 1111,
        landlord_num: 8,
        address: "3937 EDMONDSON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.293495,
        lon: -76.682372
    }, {
        id: 1112,
        landlord_num: 8,
        address: "3935 EDMONDSON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.2935,
        lon: -76.682301
    }, {
        id: 1113,
        landlord_num: 8,
        address: "2914 OAKFORD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.341585,
        lon: -76.663436
    }, {
        id: 1114,
        landlord_num: 8,
        address: "6000 AMBERWOOD ROAD",
        units: 198,
        ecb: 0,
        pros: 0,
        lat: 39.317822,
        lon: -76.543235
    }, {
        id: 1115,
        landlord_num: 8,
        address: "4704 GREENSPRING AVE",
        units: 75,
        ecb: 0,
        pros: 0,
        lat: 39.345654,
        lon: -76.659952
    }, {
        id: 1116,
        landlord_num: 8,
        address: "1901 N FOREST PARK AVE",
        units: 55,
        ecb: 0,
        pros: 0,
        lat: 39.307399,
        lon: -76.708352
    }, {
        id: 1117,
        landlord_num: 8,
        address: "6807 PARK HEIGHTS AVE",
        units: 51,
        ecb: 0,
        pros: 0,
        lat: 39.364585,
        lon: -76.701475
    }, {
        id: 1118,
        landlord_num: 8,
        address: "4907 FREDERICK AVE",
        units: 47,
        ecb: 0,
        pros: 0,
        lat: 39.28113,
        lon: -76.696221
    }, {
        id: 1119,
        landlord_num: 8,
        address: "5606 ALBANENE PL",
        units: 33,
        ecb: 0,
        pros: 0,
        lat: 39.335513,
        lon: -76.536878
    }, {
        id: 1120,
        landlord_num: 8,
        address: "6052 MORAVIA PARK DR",
        units: 33,
        ecb: 0,
        pros: 0,
        lat: 39.315718,
        lon: -76.540628
    }, {
        id: 1121,
        landlord_num: 8,
        address: "2700 TALBOT ROAD",
        units: 24,
        ecb: 0,
        pros: 0,
        lat: 39.317372,
        lon: -76.690977
    }, {
        id: 1122,
        landlord_num: 8,
        address: "7211 PARK HEIGHTS AVE",
        units: 24,
        ecb: 0,
        pros: 0,
        lat: 39.369002,
        lon: -76.707243
    }, {
        id: 1123,
        landlord_num: 8,
        address: "4018 N ROGERS AVE",
        units: 23,
        ecb: 0,
        pros: 0,
        lat: 39.339192,
        lon: -76.699891
    }, {
        id: 1124,
        landlord_num: 8,
        address: "4171 FAIRVIEW AVE",
        units: 22,
        ecb: 0,
        pros: 0,
        lat: 39.321587,
        lon: -76.689342
    }, {
        id: 1125,
        landlord_num: 8,
        address: "4208 FAIRFAX ROAD",
        units: 22,
        ecb: 0,
        pros: 0,
        lat: 39.320418,
        lon: -76.688979
    }, {
        id: 1126,
        landlord_num: 8,
        address: "5619 FRANKFORD AVE",
        units: 22,
        ecb: 0,
        pros: 0,
        lat: 39.321054,
        lon: -76.542016
    }, {
        id: 1127,
        landlord_num: 8,
        address: "5623-5625 FRANKFORD AVE",
        units: 22,
        ecb: 0,
        pros: 0,
        lat: 39.321075,
        lon: -76.541412
    }, {
        id: 1128,
        landlord_num: 8,
        address: "5627-5629 FRANKFORD AVE",
        units: 22,
        ecb: 0,
        pros: 0,
        lat: 39.32124,
        lon: -76.54133
    }, {
        id: 1129,
        landlord_num: 8,
        address: "4500 WESTCHESTER ROAD",
        units: 21,
        ecb: 0,
        pros: 0,
        lat: 39.318127,
        lon: -76.690879
    }, {
        id: 1130,
        landlord_num: 8,
        address: "2801 VIRGINIA AVE",
        units: 20,
        ecb: 0,
        pros: 0,
        lat: 39.344924,
        lon: -76.660073
    }, {
        id: 1131,
        landlord_num: 8,
        address: "2805 VIRGINIA AVE",
        units: 20,
        ecb: 0,
        pros: 0,
        lat: 39.344669,
        lon: -76.660519
    }, {
        id: 1132,
        landlord_num: 8,
        address: "2700 VIRGINIA AVE",
        units: 19,
        ecb: 0,
        pros: 0,
        lat: 39.345343,
        lon: -76.661635
    }, {
        id: 1133,
        landlord_num: 8,
        address: "4503 GARRISON BLVD",
        units: 17,
        ecb: 0,
        pros: 0,
        lat: 39.338406,
        lon: -76.684177
    }, {
        id: 1134,
        landlord_num: 8,
        address: "3812 N ROGERS AVE",
        units: 14,
        ecb: 0,
        pros: 0,
        lat: 39.337282,
        lon: -76.701786
    }, {
        id: 1135,
        landlord_num: 8,
        address: "4240 BONNER ROAD",
        units: 11,
        ecb: 0,
        pros: 0,
        lat: 39.321378,
        lon: -76.689252
    }, {
        id: 1136,
        landlord_num: 8,
        address: "2810 DUPONT AVE",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.344215,
        lon: -76.664236
    }, {
        id: 1137,
        landlord_num: 8,
        address: "2800 VIRGINIA AVE",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.345073,
        lon: -76.66321
    }, {
        id: 1138,
        landlord_num: 8,
        address: "2815 VIRGINIA AVE",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.344847,
        lon: -76.661388
    }, {
        id: 1139,
        landlord_num: 8,
        address: "707 NOTTINGHAM ROAD",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.294642,
        lon: -76.702168
    }, {
        id: 1140,
        landlord_num: 8,
        address: "4128 NORFOLK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.32351,
        lon: -76.687782
    }, {
        id: 1141,
        landlord_num: 9,
        address: "334 E 25TH ST",
        units: 6,
        ecb: 1,
        pros: 1,
        lat: 39.318381,
        lon: -76.611772
    }, {
        id: 1142,
        landlord_num: 9,
        address: "17 S ELLAMONT ST",
        units: 1,
        ecb: 1,
        pros: 1,
        lat: 39.28532,
        lon: -76.670173
    }, {
        id: 1143,
        landlord_num: 9,
        address: "2505 MOSHER ST",
        units: 2,
        ecb: 0,
        pros: 1,
        lat: 39.299333,
        lon: -76.656876
    }, {
        id: 1144,
        landlord_num: 9,
        address: "3529 ESTHER PL",
        units: 1,
        ecb: 0,
        pros: 1,
        lat: 39.294119,
        lon: -76.567833
    }, {
        id: 1145,
        landlord_num: 9,
        address: "4325 NORFOLK AVE",
        units: 1,
        ecb: 18,
        pros: 0,
        lat: 39.322244,
        lon: -76.690547
    }, {
        id: 1146,
        landlord_num: 9,
        address: "5307 CORDELIA AVE",
        units: 1,
        ecb: 9,
        pros: 0,
        lat: 39.347748,
        lon: -76.683347
    }, {
        id: 1147,
        landlord_num: 9,
        address: "5307 CORDELIA AVE",
        units: 0,
        ecb: 9,
        pros: 0,
        lat: 39.347748,
        lon: -76.683347
    }, {
        id: 1148,
        landlord_num: 9,
        address: "1515 E 29TH ST",
        units: 1,
        ecb: 7,
        pros: 0,
        lat: 39.324391,
        lon: -76.594915
    }, {
        id: 1149,
        landlord_num: 9,
        address: "211 ALLENDALE ST",
        units: 1,
        ecb: 6,
        pros: 0,
        lat: 39.290594,
        lon: -76.677928
    }, {
        id: 1150,
        landlord_num: 9,
        address: "2018 LINDEN AVE",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.311212,
        lon: -76.633479
    }, {
        id: 1151,
        landlord_num: 9,
        address: "3916 GLENGYLE AVE",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.363965,
        lon: -76.710503
    }, {
        id: 1152,
        landlord_num: 9,
        address: "1713 GUILFORD AVE",
        units: 3,
        ecb: 3,
        pros: 0,
        lat: 39.309315,
        lon: -76.61202
    }, {
        id: 1153,
        landlord_num: 9,
        address: "408 S BENTALOU ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.282821,
        lon: -76.652823
    }, {
        id: 1154,
        landlord_num: 9,
        address: "11 N ELLAMONT ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.286284,
        lon: -76.670216
    }, {
        id: 1155,
        landlord_num: 9,
        address: "314 N HILTON ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.290996,
        lon: -76.672851
    }, {
        id: 1156,
        landlord_num: 9,
        address: "3706 GELSTON DR",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.295874,
        lon: -76.679129
    }, {
        id: 1157,
        landlord_num: 9,
        address: "4400 SIDEHILL ROAD",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.297031,
        lon: -76.693141
    }, {
        id: 1158,
        landlord_num: 9,
        address: "3117 SEQUOIA AVE",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.327725,
        lon: -76.665963
    }, {
        id: 1159,
        landlord_num: 9,
        address: "1715 GUILFORD AVE",
        units: 3,
        ecb: 2,
        pros: 0,
        lat: 39.309365,
        lon: -76.612023
    }, {
        id: 1160,
        landlord_num: 9,
        address: "818 WINSTON AVE",
        units: 2,
        ecb: 2,
        pros: 0,
        lat: 39.349837,
        lon: -76.603285
    }, {
        id: 1161,
        landlord_num: 9,
        address: "4412 PARKTON ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.277637,
        lon: -76.690408
    }, {
        id: 1162,
        landlord_num: 9,
        address: "313 S AUGUSTA AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.280763,
        lon: -76.684343
    }, {
        id: 1163,
        landlord_num: 9,
        address: "38 N MONASTERY AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.287186,
        lon: -76.677769
    }, {
        id: 1164,
        landlord_num: 9,
        address: "400 MOUNT HOLLY ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.291826,
        lon: -76.679741
    }, {
        id: 1165,
        landlord_num: 9,
        address: "704 N EDGEWOOD ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.295553,
        lon: -76.675454
    }, {
        id: 1166,
        landlord_num: 9,
        address: "4208 SHELDON AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.328593,
        lon: -76.564299
    }, {
        id: 1167,
        landlord_num: 9,
        address: "4802 FRANKFORD AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.332387,
        lon: -76.544862
    }, {
        id: 1168,
        landlord_num: 9,
        address: "5039 QUEENSBERRY AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.349969,
        lon: -76.671601
    }, {
        id: 1169,
        landlord_num: 9,
        address: "4004 OAKFORD AVE",
        units: 4,
        ecb: 1,
        pros: 0,
        lat: 39.336033,
        lon: -76.685731
    }, {
        id: 1170,
        landlord_num: 9,
        address: "4037 EDGEWOOD ROAD",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.332811,
        lon: -76.667564
    }, {
        id: 1171,
        landlord_num: 9,
        address: "3009 JANICE AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.255488,
        lon: -76.65168
    }, {
        id: 1172,
        landlord_num: 9,
        address: "607 LINNARD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.294384,
        lon: -76.676214
    }, {
        id: 1173,
        landlord_num: 9,
        address: "805 N LAKEWOOD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.30021,
        lon: -76.579308
    }, {
        id: 1174,
        landlord_num: 9,
        address: "3002 GRAYSON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.306678,
        lon: -76.668168
    }, {
        id: 1175,
        landlord_num: 9,
        address: "2810 PRESBURY ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.307473,
        lon: -76.664413
    }, {
        id: 1176,
        landlord_num: 9,
        address: "626 E 35TH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.331023,
        lon: -76.607349
    }, {
        id: 1177,
        landlord_num: 9,
        address: "3804 BOARMAN AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.334669,
        lon: -76.679249
    }, {
        id: 1178,
        landlord_num: 9,
        address: "618 E 38TH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.335794,
        lon: -76.606696
    }, {
        id: 1179,
        landlord_num: 9,
        address: "4613 KERNWOOD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.345061,
        lon: -76.610371
    }, {
        id: 1180,
        landlord_num: 9,
        address: "423 W SARATOGA ST",
        units: 9,
        ecb: 0,
        pros: 0,
        lat: 39.292603,
        lon: -76.6222
    }, {
        id: 1181,
        landlord_num: 9,
        address: "2110 N CHARLES ST",
        units: 6,
        ecb: 0,
        pros: 0,
        lat: 39.313644,
        lon: -76.617055
    }, {
        id: 1182,
        landlord_num: 9,
        address: "7058 SURREY DR",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.363283,
        lon: -76.710435
    }, {
        id: 1183,
        landlord_num: 9,
        address: "125 S KOSSUTH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.285021,
        lon: -76.676825
    }, {
        id: 1184,
        landlord_num: 9,
        address: "1703 RUXTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.307774,
        lon: -76.654726
    }, {
        id: 1185,
        landlord_num: 9,
        address: "18 N KOSSUTH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.287919,
        lon: -76.674482
    }, {
        id: 1186,
        landlord_num: 9,
        address: "2319 WINCHESTER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.301418,
        lon: -76.65462
    }, {
        id: 1187,
        landlord_num: 9,
        address: "2563 ARUNAH AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295183,
        lon: -76.659015
    }, {
        id: 1188,
        landlord_num: 9,
        address: "2701 N ROSEDALE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.317051,
        lon: -76.669176
    }, {
        id: 1189,
        landlord_num: 9,
        address: "2911 BRIGHTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.305077,
        lon: -76.666408
    }, {
        id: 1190,
        landlord_num: 9,
        address: "2932 WINCHESTER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.301527,
        lon: -76.666896
    }, {
        id: 1191,
        landlord_num: 9,
        address: "3017 GRAYSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306334,
        lon: -76.668138
    }, {
        id: 1192,
        landlord_num: 9,
        address: "3108 LEEDS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.282941,
        lon: -76.668379
    }, {
        id: 1193,
        landlord_num: 9,
        address: "3117 LAWNVIEW AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.319625,
        lon: -76.574483
    }, {
        id: 1194,
        landlord_num: 9,
        address: "3219 LEVERTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.291677,
        lon: -76.570536
    }, {
        id: 1195,
        landlord_num: 9,
        address: "3309 EDMONDSON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293814,
        lon: -76.673188
    }, {
        id: 1196,
        landlord_num: 9,
        address: "3312 W FRANKLIN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292983,
        lon: -76.673521
    }, {
        id: 1197,
        landlord_num: 9,
        address: "332 GWYNN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.291273,
        lon: -76.673907
    }, {
        id: 1198,
        landlord_num: 9,
        address: "3328 LAWNVIEW AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.319103,
        lon: -76.571107
    }, {
        id: 1199,
        landlord_num: 9,
        address: "3340 MONDAWMIN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.315429,
        lon: -76.674174
    }, {
        id: 1200,
        landlord_num: 9,
        address: "35 S KOSSUTH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286266,
        lon: -76.675454
    }, {
        id: 1201,
        landlord_num: 9,
        address: "3503 GLEN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.356081,
        lon: -76.687041
    }, {
        id: 1202,
        landlord_num: 9,
        address: "3638 ROBERTS PL",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295887,
        lon: -76.566603
    }, {
        id: 1203,
        landlord_num: 9,
        address: "3813 CRANSTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296274,
        lon: -76.680709
    }, {
        id: 1204,
        landlord_num: 9,
        address: "406 ROSECROFT TERR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.279631,
        lon: -76.68292
    }, {
        id: 1205,
        landlord_num: 9,
        address: "413 S BENTALOU ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.282326,
        lon: -76.652295
    }, {
        id: 1206,
        landlord_num: 9,
        address: "416 N HILTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292321,
        lon: -76.672956
    }, {
        id: 1207,
        landlord_num: 9,
        address: "417 ROSECROFT TERR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.279387,
        lon: -76.682274
    }, {
        id: 1208,
        landlord_num: 9,
        address: "4202 POTTER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278626,
        lon: -76.685124
    }, {
        id: 1209,
        landlord_num: 9,
        address: "4250 PIMLICO ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.338721,
        lon: -76.663968
    }, {
        id: 1210,
        landlord_num: 9,
        address: "4252 PIMLICO ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.338767,
        lon: -76.664001
    }, {
        id: 1211,
        landlord_num: 9,
        address: "4254 PIMLICO ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.338802,
        lon: -76.664036
    }, {
        id: 1212,
        landlord_num: 9,
        address: "441 YALE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.279061,
        lon: -76.685187
    }, {
        id: 1213,
        landlord_num: 9,
        address: "4415 PALL MALL ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.339849,
        lon: -76.662663
    }, {
        id: 1214,
        landlord_num: 9,
        address: "451 N MILTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296636,
        lon: -76.581901
    }, {
        id: 1215,
        landlord_num: 9,
        address: "4521 MARX AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.329175,
        lon: -76.55504
    }, {
        id: 1216,
        landlord_num: 9,
        address: "509 NORMANDY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292863,
        lon: -76.68126
    }, {
        id: 1217,
        landlord_num: 9,
        address: "612 N MONTFORD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.298239,
        lon: -76.583937
    }, {
        id: 1218,
        landlord_num: 9,
        address: "6223 WOODCREST AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.366858,
        lon: -76.684849
    }, {
        id: 1219,
        landlord_num: 9,
        address: "719 N GRANTLEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29574,
        lon: -76.676791
    }, {
        id: 1220,
        landlord_num: 9,
        address: "824 MOUNT HOLLY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297344,
        lon: -76.680188
    }, {
        id: 1221,
        landlord_num: 9,
        address: "912 MOUNT HOLLY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.298363,
        lon: -76.680223
    } ]
};

$(document).ready(function() {
    worstLandlords.init();
    console.log("connected");
});