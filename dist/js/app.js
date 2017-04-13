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
            var url = "http://data.baltimoresun.com/news/dismissed/landlords/";
            var twitter_url = "https://twitter.com/intent/tweet?text=" + tweet + "&url=" + url + "&tw_p=tweetbutton";
            window.open(twitter_url, "mywin", "left=200,top=200,width=500,height=300,toolbar=1,resizable=0");
            return false;
        });
        $(".icon-facebook").on("click", function() {
            var picture = "";
            var title = "Baltimore's worst landlords";
            var description = "See which landlords in Baltimore have the worst track records based on compiled data.";
            var url = "http://data.baltimoresun.com/news/dismissed/landlords/";
            var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link=" + url + "&picture=" + picture + "&name=" + title + "&description=" + description + "&redirect_uri=http://www.facebook.com";
            window.open(facebook_url, "mywin", "left=200,top=200,width=500,height=300,toolbar=1,resizable=0");
            return false;
        });
    },
    mapInit: function() {
        var landlords = [ landlord0 = new L.LayerGroup(), landlord1 = new L.LayerGroup(), landlord2 = new L.LayerGroup(), landlord3 = new L.LayerGroup(), landlord4 = new L.LayerGroup(), landlord5 = new L.LayerGroup(), landlord6 = new L.LayerGroup(), landlord7 = new L.LayerGroup(), landlord8 = new L.LayerGroup(), landlord9 = new L.LayerGroup(), landlord10 = new L.LayerGroup() ];
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
        var landlordsList = [ "HABC", "M.A.R.M.", "DUNN WRIGHT", "MARYLAND PROPERTY MANAGEMENT, LLC", "SAGE MANAGEMENT", "PROGRESSIVE PROPERTY INC", "C BROWN POPERTIES", "BLUE STAR", "BLUE OCEAN", "ATLANTIC REALTY MANAGEMENT INC.", "WAZ INVESTMENT" ];
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
                var property = $('.property[data-id="' + divID + '"]');
                $(".property.active").removeClass("active");
                property.addClass("active");
                propDiv.animate({
                    scrollTop: propDiv.scrollTop() - propDiv.offset().top + property.offset().top - 100
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
        $(".buttonDiv--splash").on("click", function() {
            $(".splashWrapper").addClass("top");
        });
        $(".methodologyOut").on("click", function() {
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
        id: 0,
        name: "HABC",
        numProperties: 77,
        numUnits: 182,
        numViolations: 67,
        lhsSum: 66,
        ecbSum: 1,
        habcSum: 0
    }, {
        id: 1,
        name: "M.A.R.M.",
        numProperties: 0,
        numUnits: 0,
        numViolations: 46,
        lhsSum: 46,
        ecbSum: 0,
        habcSum: 0
    }, {
        id: 2,
        name: "DUNN WRIGHT",
        numProperties: 194,
        numUnits: 253,
        numViolations: 185,
        lhsSum: 34,
        ecbSum: 149,
        habcSum: 2
    }, {
        id: 3,
        name: "MARYLAND PROPERTY MANAGEMENT, LLC",
        numProperties: 80,
        numUnits: 99,
        numViolations: 72,
        lhsSum: 29,
        ecbSum: 43,
        habcSum: 0
    }, {
        id: 4,
        name: "SAGE MANAGEMENT",
        numProperties: 4,
        numUnits: 84,
        numViolations: 27,
        lhsSum: 26,
        ecbSum: 1,
        habcSum: 0
    }, {
        id: 5,
        name: "PROGRESSIVE PROPERTY INC",
        numProperties: 10,
        numUnits: 15,
        numViolations: 38,
        lhsSum: 20,
        ecbSum: 18,
        habcSum: 0
    }, {
        id: 6,
        name: "C BROWN POPERTIES",
        numProperties: 21,
        numUnits: 25,
        numViolations: 32,
        lhsSum: 19,
        ecbSum: 13,
        habcSum: 0
    }, {
        id: 7,
        name: "BLUE STAR",
        numProperties: 162,
        numUnits: 182,
        numViolations: 155,
        lhsSum: 18,
        ecbSum: 137,
        habcSum: 0
    }, {
        id: 8,
        name: "BLUE OCEAN",
        numProperties: 34,
        numUnits: 1254,
        numViolations: 19,
        lhsSum: 15,
        ecbSum: 4,
        habcSum: 0
    }, {
        id: 9,
        name: "ATLANTIC REALTY MANAGEMENT INC.",
        numProperties: 7,
        numUnits: 418,
        numViolations: 10,
        lhsSum: 10,
        ecbSum: 0,
        habcSum: 0
    }, {
        id: 10,
        name: "WAZ INVESTMENT",
        numProperties: 7,
        numUnits: 15,
        numViolations: 22,
        lhsSum: 10,
        ecbSum: 12,
        habcSum: 0
    } ],
    properties: [ {
        id: 1,
        landlord_num: 6,
        address: "891 N HOWARD ST",
        units: 2,
        ecb: 2,
        pros: 0,
        lat: 39.300704,
        lon: -76.619891
    }, {
        id: 2,
        landlord_num: 2,
        address: "4802 FREDERICK AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.281645,
        lon: -76.695112
    }, {
        id: 3,
        landlord_num: 3,
        address: "1807 WILKENS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.282263,
        lon: -76.645088
    }, {
        id: 4,
        landlord_num: 3,
        address: "1809 WILKENS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.282255,
        lon: -76.645139
    }, {
        id: 5,
        landlord_num: 3,
        address: "2107 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.28024,
        lon: -76.648942
    }, {
        id: 6,
        landlord_num: 3,
        address: "2113 MCHENRY ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.28393,
        lon: -76.650236
    }, {
        id: 7,
        landlord_num: 3,
        address: "2116 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280479,
        lon: -76.649586
    }, {
        id: 8,
        landlord_num: 3,
        address: "2120 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280454,
        lon: -76.649672
    }, {
        id: 9,
        landlord_num: 3,
        address: "2121 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280134,
        lon: -76.649261
    }, {
        id: 10,
        landlord_num: 3,
        address: "2122 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280438,
        lon: -76.649712
    }, {
        id: 11,
        landlord_num: 3,
        address: "2124 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280426,
        lon: -76.649755
    }, {
        id: 12,
        landlord_num: 3,
        address: "2125 EAGLE ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.280152,
        lon: -76.649374
    }, {
        id: 13,
        landlord_num: 3,
        address: "2127 EAGLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280088,
        lon: -76.649396
    }, {
        id: 14,
        landlord_num: 3,
        address: "2139 EAGLE ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.279998,
        lon: -76.64967
    }, {
        id: 15,
        landlord_num: 3,
        address: "2204 WILKENS AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.280901,
        lon: -76.650883
    }, {
        id: 16,
        landlord_num: 3,
        address: "607 S SMALLWOOD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280331,
        lon: -76.650024
    }, {
        id: 17,
        landlord_num: 8,
        address: "2900 WYNHAM ROAD",
        units: 32,
        ecb: 0,
        pros: 0,
        lat: 39.319401,
        lon: -76.69397
    }, {
        id: 18,
        landlord_num: 8,
        address: "4401 FAIRVIEW AVE",
        units: 23,
        ecb: 0,
        pros: 0,
        lat: 39.320807,
        lon: -76.691453
    }, {
        id: 19,
        landlord_num: 8,
        address: "4501 BONNER ROAD",
        units: 33,
        ecb: 0,
        pros: 0,
        lat: 39.319813,
        lon: -76.692203
    }, {
        id: 20,
        landlord_num: 8,
        address: "4501 FAIRVIEW AVE",
        units: 75,
        ecb: 0,
        pros: 0,
        lat: 39.320315,
        lon: -76.692929
    }, {
        id: 21,
        landlord_num: 8,
        address: "4501 WAKEFIELD ROAD",
        units: 19,
        ecb: 0,
        pros: 0,
        lat: 39.319002,
        lon: -76.691694
    }, {
        id: 22,
        landlord_num: 8,
        address: "4509 WAKEFIELD ROAD",
        units: 9,
        ecb: 0,
        pros: 0,
        lat: 39.318487,
        lon: -76.692721
    }, {
        id: 23,
        landlord_num: 3,
        address: "1135 WASHINGTON BLVD",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.282116,
        lon: -76.633148
    }, {
        id: 24,
        landlord_num: 3,
        address: "1708 EUTAW PL",
        units: 11,
        ecb: 0,
        pros: 0,
        lat: 39.307075,
        lon: -76.630653
    }, {
        id: 25,
        landlord_num: 3,
        address: "1801 EUTAW PL",
        units: 4,
        ecb: 0,
        pros: 0,
        lat: 39.308159,
        lon: -76.630706
    }, {
        id: 26,
        landlord_num: 2,
        address: "425 N HIGHLAND AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.29703,
        lon: -76.569469
    }, {
        id: 27,
        landlord_num: 2,
        address: "115 E FORT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.27256,
        lon: -76.611108
    }, {
        id: 28,
        landlord_num: 2,
        address: "1516 BYRD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.272197,
        lon: -76.611096
    }, {
        id: 29,
        landlord_num: 2,
        address: "1703 LIGHT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.270504,
        lon: -76.611341
    }, {
        id: 30,
        landlord_num: 2,
        address: "510 CORDING AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.361717,
        lon: -76.608381
    }, {
        id: 31,
        landlord_num: 2,
        address: "512 CORDING AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.361561,
        lon: -76.60801
    }, {
        id: 32,
        landlord_num: 7,
        address: "2503 BARCLAY ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.318524,
        lon: -76.610832
    }, {
        id: 33,
        landlord_num: 2,
        address: "4104 AUDREY AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.230472,
        lon: -76.603605
    }, {
        id: 34,
        landlord_num: 2,
        address: "503 ARSAN AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.239257,
        lon: -76.602246
    }, {
        id: 35,
        landlord_num: 2,
        address: "2766 KINSEY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.28807,
        lon: -76.660878
    }, {
        id: 36,
        landlord_num: 8,
        address: "4300 SEMINOLE AVE",
        units: 82,
        ecb: 0,
        pros: 0,
        lat: 39.298671,
        lon: -76.694177
    }, {
        id: 37,
        landlord_num: 3,
        address: "228 N LUZERNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295346,
        lon: -76.580879
    }, {
        id: 38,
        landlord_num: 3,
        address: "444 N LUZERNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29659,
        lon: -76.58099
    }, {
        id: 39,
        landlord_num: 7,
        address: "105 N JANNEY ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.294139,
        lon: -76.560596
    }, {
        id: 40,
        landlord_num: 7,
        address: "130 N COLLINGTON AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.293774,
        lon: -76.586593
    }, {
        id: 41,
        landlord_num: 7,
        address: "1406 WHITELOCK ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.311432,
        lon: -76.640013
    }, {
        id: 42,
        landlord_num: 7,
        address: "145 N POTOMAC ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.294244,
        lon: -76.574661
    }, {
        id: 43,
        landlord_num: 7,
        address: "226 S CALHOUN ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.284888,
        lon: -76.639562
    }, {
        id: 44,
        landlord_num: 7,
        address: "27 N KRESSON ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.293738,
        lon: -76.559782
    }, {
        id: 45,
        landlord_num: 7,
        address: "311 BAYLIS ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.288062,
        lon: -76.568028
    }, {
        id: 46,
        landlord_num: 7,
        address: "402 N PORT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.295944,
        lon: -76.583007
    }, {
        id: 47,
        landlord_num: 7,
        address: "403 N PORT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.295977,
        lon: -76.582663
    }, {
        id: 48,
        landlord_num: 7,
        address: "405 N PORT ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.296012,
        lon: -76.582665
    }, {
        id: 49,
        landlord_num: 7,
        address: "407 N PORT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.296047,
        lon: -76.582668
    }, {
        id: 50,
        landlord_num: 7,
        address: "409 N PORT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.296062,
        lon: -76.582717
    }, {
        id: 51,
        landlord_num: 7,
        address: "411 N PORT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.296116,
        lon: -76.582673
    }, {
        id: 52,
        landlord_num: 7,
        address: "418 N PORT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.296203,
        lon: -76.583025
    }, {
        id: 53,
        landlord_num: 7,
        address: "423 N PORT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.296325,
        lon: -76.582689
    }, {
        id: 54,
        landlord_num: 7,
        address: "424 N PORT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.296301,
        lon: -76.583032
    }, {
        id: 55,
        landlord_num: 7,
        address: "426 N PORT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.296334,
        lon: -76.583035
    }, {
        id: 56,
        landlord_num: 7,
        address: "427 N BRADFORD ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.296316,
        lon: -76.584105
    }, {
        id: 57,
        landlord_num: 7,
        address: "428 N PORT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.296366,
        lon: -76.583039
    }, {
        id: 58,
        landlord_num: 7,
        address: "514 S CLINTON ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.28576,
        lon: -76.570133
    }, {
        id: 59,
        landlord_num: 7,
        address: "519 N PORT ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.297307,
        lon: -76.582762
    }, {
        id: 60,
        landlord_num: 7,
        address: "611 S SMALLWOOD ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.280258,
        lon: -76.649999
    }, {
        id: 61,
        landlord_num: 7,
        address: "631 S MACON ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.285371,
        lon: -76.556973
    }, {
        id: 62,
        landlord_num: 7,
        address: "646 S MACON ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.285077,
        lon: -76.55738
    }, {
        id: 63,
        landlord_num: 7,
        address: "801 N BRADFORD ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.300128,
        lon: -76.584346
    }, {
        id: 64,
        landlord_num: 7,
        address: "936 MONTPELIER ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.32478,
        lon: -76.603753
    }, {
        id: 65,
        landlord_num: 3,
        address: "1809 N CAROLINE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.310801,
        lon: -76.5981
    }, {
        id: 66,
        landlord_num: 3,
        address: "2412 E MONUMENT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.298971,
        lon: -76.5833
    }, {
        id: 67,
        landlord_num: 3,
        address: "417 N PATTERSON PARK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296025,
        lon: -76.5847
    }, {
        id: 68,
        landlord_num: 3,
        address: "533 N LUZERNE AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.297503,
        lon: -76.580546
    }, {
        id: 69,
        landlord_num: 3,
        address: "5626 MIDWOOD AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.358244,
        lon: -76.600801
    }, {
        id: 70,
        landlord_num: 2,
        address: "4001 8TH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.231599,
        lon: -76.601216
    }, {
        id: 71,
        landlord_num: 2,
        address: "4141 AUDREY AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.229596,
        lon: -76.60449
    }, {
        id: 72,
        landlord_num: 2,
        address: "835 JACK ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.231175,
        lon: -76.599788
    }, {
        id: 73,
        landlord_num: 5,
        address: "1118 DUNDALK AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.28094,
        lon: -76.535485
    }, {
        id: 74,
        landlord_num: 5,
        address: "5608 READY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.35812,
        lon: -76.608999
    }, {
        id: 75,
        landlord_num: 5,
        address: "5610 READY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.358161,
        lon: -76.608999
    }, {
        id: 76,
        landlord_num: 5,
        address: "5633 READY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.358689,
        lon: -76.608597
    }, {
        id: 77,
        landlord_num: 5,
        address: "901 DUNDALK AVE",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.283503,
        lon: -76.536454
    }, {
        id: 78,
        landlord_num: 8,
        address: "6810 PARK HEIGHTS AVE",
        units: 53,
        ecb: 0,
        pros: 0,
        lat: 39.364346,
        lon: -76.702699
    }, {
        id: 79,
        landlord_num: 3,
        address: "2702 E CHASE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.30399,
        lon: -76.579584
    }, {
        id: 80,
        landlord_num: 7,
        address: "2410 SAINT PAUL ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.316746,
        lon: -76.61551
    }, {
        id: 81,
        landlord_num: 7,
        address: "2700 ROSLYN AVE",
        units: 8,
        ecb: 0,
        pros: 0,
        lat: 39.318358,
        lon: -76.678451
    }, {
        id: 82,
        landlord_num: 8,
        address: "3932 W NORTHERN PKWY",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.350383,
        lon: -76.69
    }, {
        id: 83,
        landlord_num: 8,
        address: "3951 W NORTHERN PKWY",
        units: 10,
        ecb: 2,
        pros: 0,
        lat: 39.349558,
        lon: -76.689729
    }, {
        id: 84,
        landlord_num: 8,
        address: "3952 W NORTHERN PKWY",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.350097,
        lon: -76.690295
    }, {
        id: 85,
        landlord_num: 8,
        address: "4001 W NORTHERN PKWY",
        units: 10,
        ecb: 1,
        pros: 0,
        lat: 39.349299,
        lon: -76.690176
    }, {
        id: 86,
        landlord_num: 3,
        address: "1601 APPLETON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306693,
        lon: -76.648577
    }, {
        id: 87,
        landlord_num: 3,
        address: "1715 APPLETON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308213,
        lon: -76.648679
    }, {
        id: 88,
        landlord_num: 2,
        address: "3327 WOODLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.343776,
        lon: -76.672502
    }, {
        id: 89,
        landlord_num: 8,
        address: "2730 N LONGWOOD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.317991,
        lon: -76.669135
    }, {
        id: 90,
        landlord_num: 8,
        address: "2742 N ROSEDALE ST",
        units: 54,
        ecb: 0,
        pros: 0,
        lat: 39.317497,
        lon: -76.670684
    }, {
        id: 91,
        landlord_num: 6,
        address: "1055 ELLICOTT DR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299737,
        lon: -76.668735
    }, {
        id: 92,
        landlord_num: 6,
        address: "1606 MORELAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306538,
        lon: -76.656075
    }, {
        id: 93,
        landlord_num: 6,
        address: "3215 PHELPS LANE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.287316,
        lon: -76.67082
    }, {
        id: 94,
        landlord_num: 0,
        address: "410 E 20TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312641,
        lon: -76.610571
    }, {
        id: 95,
        landlord_num: 2,
        address: "1627 INVERNESS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.263152,
        lon: -76.660878
    }, {
        id: 96,
        landlord_num: 2,
        address: "2733 SAINT PAUL ST",
        units: 4,
        ecb: 3,
        pros: 0,
        lat: 39.321643,
        lon: -76.615256
    }, {
        id: 97,
        landlord_num: 7,
        address: "1621 N BENTALOU ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306894,
        lon: -76.653638
    }, {
        id: 98,
        landlord_num: 7,
        address: "1729 N BENTALOU ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308317,
        lon: -76.653718
    }, {
        id: 99,
        landlord_num: 7,
        address: "308 S PULASKI ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283666,
        lon: -76.650052
    }, {
        id: 100,
        landlord_num: 7,
        address: "328 S FULTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283567,
        lon: -76.645173
    }, {
        id: 101,
        landlord_num: 3,
        address: "5505 RICHARD AVE",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.352147,
        lon: -76.560018
    }, {
        id: 102,
        landlord_num: 3,
        address: "2939 W NORTH AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.308751,
        lon: -76.667163
    }, {
        id: 103,
        landlord_num: 3,
        address: "5837 ARIZONA AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.335455,
        lon: -76.535998
    }, {
        id: 104,
        landlord_num: 7,
        address: "16 S MONROE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.287297,
        lon: -76.64713
    }, {
        id: 105,
        landlord_num: 6,
        address: "1021 N ROSEDALE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.300064,
        lon: -76.667849
    }, {
        id: 106,
        landlord_num: 6,
        address: "2203 HOMEWOOD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.314776,
        lon: -76.606921
    }, {
        id: 107,
        landlord_num: 6,
        address: "721 BARTLETT AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.315746,
        lon: -76.606102
    }, {
        id: 108,
        landlord_num: 3,
        address: "5417 PEMBROKE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.3444,
        lon: -76.553226
    }, {
        id: 109,
        landlord_num: 7,
        address: "1052 N IRIS AVE",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.304316,
        lon: -76.562909
    }, {
        id: 110,
        landlord_num: 7,
        address: "2930 WINDSOR AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.31248,
        lon: -76.667591
    }, {
        id: 111,
        landlord_num: 7,
        address: "3627 ELMORA AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.315777,
        lon: -76.567274
    }, {
        id: 112,
        landlord_num: 7,
        address: "4742 ELISON AVE",
        units: 1,
        ecb: 5,
        pros: 0,
        lat: 39.322643,
        lon: -76.554964
    }, {
        id: 113,
        landlord_num: 7,
        address: "3910 MOUNT PLEASANT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.291097,
        lon: -76.564212
    }, {
        id: 114,
        landlord_num: 7,
        address: "1336 N LUZERNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306749,
        lon: -76.581628
    }, {
        id: 115,
        landlord_num: 7,
        address: "151 DENISON ST",
        units: 2,
        ecb: 5,
        pros: 0,
        lat: 39.289588,
        lon: -76.675434
    }, {
        id: 116,
        landlord_num: 7,
        address: "1526 N SPRING ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.30801,
        lon: -76.599152
    }, {
        id: 117,
        landlord_num: 7,
        address: "615 N BELNORD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.298232,
        lon: -76.5785
    }, {
        id: 118,
        landlord_num: 0,
        address: "940 S LAKEWOOD AVE",
        units: 45,
        ecb: 0,
        pros: 0,
        lat: 39.281385,
        lon: -76.578528
    }, {
        id: 119,
        landlord_num: 0,
        address: "1019 N MOUNT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300369,
        lon: -76.644184
    }, {
        id: 120,
        landlord_num: 0,
        address: "1026 N CAREY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300963,
        lon: -76.63909
    }, {
        id: 121,
        landlord_num: 0,
        address: "1328 MOSHER ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.300107,
        lon: -76.639616
    }, {
        id: 122,
        landlord_num: 0,
        address: "902 N STRICKER ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.299094,
        lon: -76.641808
    }, {
        id: 123,
        landlord_num: 0,
        address: "926 N GILMOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299543,
        lon: -76.643241
    }, {
        id: 124,
        landlord_num: 0,
        address: "927 N CAREY ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.299974,
        lon: -76.638591
    }, {
        id: 125,
        landlord_num: 0,
        address: "933 N MOUNT ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.29952,
        lon: -76.644144
    }, {
        id: 126,
        landlord_num: 0,
        address: "935 N MOUNT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299558,
        lon: -76.644147
    }, {
        id: 127,
        landlord_num: 0,
        address: "100 W CROSS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.276736,
        lon: -76.616493
    }, {
        id: 128,
        landlord_num: 0,
        address: "1003 LEADENHALL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.277609,
        lon: -76.617235
    }, {
        id: 129,
        landlord_num: 0,
        address: "1005 LEADENHALL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.27757,
        lon: -76.617249
    }, {
        id: 130,
        landlord_num: 0,
        address: "1007 CREEK ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.277254,
        lon: -76.616955
    }, {
        id: 131,
        landlord_num: 0,
        address: "1007 LEADENHALL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.27754,
        lon: -76.617266
    }, {
        id: 132,
        landlord_num: 0,
        address: "1009 CREEK ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.277148,
        lon: -76.617004
    }, {
        id: 133,
        landlord_num: 0,
        address: "1009 LEADENHALL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.27751,
        lon: -76.61728
    }, {
        id: 134,
        landlord_num: 0,
        address: "1011 LEADENHALL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.27748,
        lon: -76.617294
    }, {
        id: 135,
        landlord_num: 0,
        address: "102 W CROSS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.276725,
        lon: -76.616542
    }, {
        id: 136,
        landlord_num: 0,
        address: "1020 S HANOVER ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.277129,
        lon: -76.615833
    }, {
        id: 137,
        landlord_num: 0,
        address: "104 W CROSS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.276738,
        lon: -76.61658
    }, {
        id: 138,
        landlord_num: 0,
        address: "1124 LEADENHALL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.276349,
        lon: -76.618346
    }, {
        id: 139,
        landlord_num: 0,
        address: "129 W CROSS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.276688,
        lon: -76.617645
    }, {
        id: 140,
        landlord_num: 0,
        address: "905 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278486,
        lon: -76.616336
    }, {
        id: 141,
        landlord_num: 0,
        address: "908 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278421,
        lon: -76.61647
    }, {
        id: 142,
        landlord_num: 0,
        address: "914 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278354,
        lon: -76.616444
    }, {
        id: 143,
        landlord_num: 0,
        address: "918 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278254,
        lon: -76.616433
    }, {
        id: 144,
        landlord_num: 0,
        address: "921 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278272,
        lon: -76.616174
    }, {
        id: 145,
        landlord_num: 0,
        address: "925 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278211,
        lon: -76.616171
    }, {
        id: 146,
        landlord_num: 0,
        address: "927 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278141,
        lon: -76.616165
    }, {
        id: 147,
        landlord_num: 0,
        address: "931 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278077,
        lon: -76.616161
    }, {
        id: 148,
        landlord_num: 0,
        address: "935 BEVAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.278016,
        lon: -76.616158
    }, {
        id: 149,
        landlord_num: 7,
        address: "1700 S CHARLES ST",
        units: 4,
        ecb: 0,
        pros: 0,
        lat: 39.270427,
        lon: -76.614199
    }, {
        id: 150,
        landlord_num: 2,
        address: "1712 MADISON AVE",
        units: 6,
        ecb: 0,
        pros: 0,
        lat: 39.306444,
        lon: -76.631595
    }, {
        id: 151,
        landlord_num: 0,
        address: "1001 AISQUITH ST",
        units: 22,
        ecb: 0,
        pros: 0,
        lat: 39.302205,
        lon: -76.601776
    }, {
        id: 152,
        landlord_num: 8,
        address: "901 NOTTINGHAM ROAD",
        units: 80,
        ecb: 0,
        pros: 0,
        lat: 39.297297,
        lon: -76.705182
    }, {
        id: 153,
        landlord_num: 2,
        address: "1024 WILMINGTON AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.272712,
        lon: -76.664083
    }, {
        id: 154,
        landlord_num: 3,
        address: "511 N PORT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297176,
        lon: -76.582755
    }, {
        id: 155,
        landlord_num: 2,
        address: "3830 8TH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.232872,
        lon: -76.601152
    }, {
        id: 156,
        landlord_num: 7,
        address: "1310 W LEXINGTON ST",
        units: 3,
        ecb: 2,
        pros: 0,
        lat: 39.291216,
        lon: -76.638803
    }, {
        id: 157,
        landlord_num: 7,
        address: "2827 MILES AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.320903,
        lon: -76.623574
    }, {
        id: 158,
        landlord_num: 7,
        address: "2908 MILES AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.321627,
        lon: -76.624504
    }, {
        id: 159,
        landlord_num: 7,
        address: "510 N PORT ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.297147,
        lon: -76.583076
    }, {
        id: 160,
        landlord_num: 7,
        address: "605 N HIGHLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.298426,
        lon: -76.569578
    }, {
        id: 161,
        landlord_num: 7,
        address: "809 PONCA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283772,
        lon: -76.554475
    }, {
        id: 162,
        landlord_num: 2,
        address: "2804 OAKFORD AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.340928,
        lon: -76.661267
    }, {
        id: 163,
        landlord_num: 8,
        address: "3320 PRESSTMAN ST",
        units: 18,
        ecb: 0,
        pros: 0,
        lat: 39.304567,
        lon: -76.672974
    }, {
        id: 164,
        landlord_num: 8,
        address: "3329 BRIGHTON ST",
        units: 12,
        ecb: 0,
        pros: 0,
        lat: 39.304789,
        lon: -76.673157
    }, {
        id: 165,
        landlord_num: 8,
        address: "3333 WINTERBOURNE ROAD",
        units: 46,
        ecb: 0,
        pros: 0,
        lat: 39.305756,
        lon: -76.673406
    }, {
        id: 166,
        landlord_num: 8,
        address: "1600 N HILTON ST",
        units: 122,
        ecb: 0,
        pros: 0,
        lat: 39.305503,
        lon: -76.672454
    }, {
        id: 167,
        landlord_num: 3,
        address: "3100 PINEWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.359893,
        lon: -76.548728
    }, {
        id: 168,
        landlord_num: 2,
        address: "1230 CLEVELAND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.279966,
        lon: -76.633283
    }, {
        id: 169,
        landlord_num: 2,
        address: "1350 CARROLL ST",
        units: 1,
        ecb: 13,
        pros: 0,
        lat: 39.279218,
        lon: -76.635368
    }, {
        id: 170,
        landlord_num: 2,
        address: "3731 BROOKLYN AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.233943,
        lon: -76.600614
    }, {
        id: 171,
        landlord_num: 2,
        address: "1614 W SARATOGA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292292,
        lon: -76.643307
    }, {
        id: 172,
        landlord_num: 7,
        address: "2134 BOYD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.286581,
        lon: -76.651095
    }, {
        id: 173,
        landlord_num: 7,
        address: "613 N BELNORD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.298195,
        lon: -76.578497
    }, {
        id: 174,
        landlord_num: 2,
        address: "1157 CLEVELAND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.280795,
        lon: -76.63167
    }, {
        id: 175,
        landlord_num: 2,
        address: "3513 3RD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.23935,
        lon: -76.605945
    }, {
        id: 176,
        landlord_num: 3,
        address: "3806 W GARRISON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.343793,
        lon: -76.679857
    }, {
        id: 177,
        landlord_num: 2,
        address: "3307 PAINE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.32747,
        lon: -76.630059
    }, {
        id: 178,
        landlord_num: 2,
        address: "4249 NICHOLAS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.328092,
        lon: -76.562992
    }, {
        id: 179,
        landlord_num: 2,
        address: "845 PONTIAC AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.233749,
        lon: -76.598528
    }, {
        id: 180,
        landlord_num: 2,
        address: "2419 HARRIET AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.256275,
        lon: -76.651412
    }, {
        id: 181,
        landlord_num: 7,
        address: "1711 N BENTALOU ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.307965,
        lon: -76.653703
    }, {
        id: 182,
        landlord_num: 2,
        address: "3432 6TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.239868,
        lon: -76.600779
    }, {
        id: 183,
        landlord_num: 8,
        address: "5683 PURDUE AVE",
        units: 41,
        ecb: 0,
        pros: 0,
        lat: 39.358922,
        lon: -76.592867
    }, {
        id: 184,
        landlord_num: 8,
        address: "2304 WINCHESTER ST",
        units: 228,
        ecb: 0,
        pros: 0,
        lat: 39.301887,
        lon: -76.654328
    }, {
        id: 185,
        landlord_num: 7,
        address: "2325 W LANVALE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296816,
        lon: -76.654499
    }, {
        id: 186,
        landlord_num: 2,
        address: "1813 MADISON AVE",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.307555,
        lon: -76.631988
    }, {
        id: 187,
        landlord_num: 2,
        address: "2121 BOLTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312312,
        lon: -76.629763
    }, {
        id: 188,
        landlord_num: 5,
        address: "1105 HARLEM AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.296559,
        lon: -76.635973
    }, {
        id: 189,
        landlord_num: 5,
        address: "903 BENNETT PL",
        units: 2,
        ecb: 2,
        pros: 0,
        lat: 39.294856,
        lon: -76.632384
    }, {
        id: 190,
        landlord_num: 5,
        address: "905 HARLEM AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.296657,
        lon: -76.633441
    }, {
        id: 191,
        landlord_num: 5,
        address: "926 BENNETT PL",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.295147,
        lon: -76.633099
    }, {
        id: 192,
        landlord_num: 5,
        address: "943 BENNETT PL",
        units: 2,
        ecb: 7,
        pros: 0,
        lat: 39.294853,
        lon: -76.633362
    }, {
        id: 193,
        landlord_num: 3,
        address: "2919 FLEETWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.362374,
        lon: -76.554007
    }, {
        id: 194,
        landlord_num: 3,
        address: "3205 GWYNNS FALLS PKWY",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.314058,
        lon: -76.67154
    }, {
        id: 195,
        landlord_num: 2,
        address: "1107 INNER CIR",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.230366,
        lon: -76.593865
    }, {
        id: 196,
        landlord_num: 2,
        address: "3607 ROBERTS PL",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.295482,
        lon: -76.567461
    }, {
        id: 197,
        landlord_num: 8,
        address: "5906 PARK HEIGHTS AVE",
        units: 54,
        ecb: 0,
        pros: 0,
        lat: 39.356068,
        lon: -76.689692
    }, {
        id: 198,
        landlord_num: 2,
        address: "1612 BRADDISH AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.306517,
        lon: -76.661084
    }, {
        id: 199,
        landlord_num: 7,
        address: "1537 POPLAR GROVE ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.305732,
        lon: -76.665251
    }, {
        id: 200,
        landlord_num: 2,
        address: "4215 GRACE CT",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.227173,
        lon: -76.587352
    }, {
        id: 201,
        landlord_num: 6,
        address: "38 S PULASKI ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286331,
        lon: -76.650194
    }, {
        id: 202,
        landlord_num: 7,
        address: "605 OLDHAM ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.285862,
        lon: -76.555479
    }, {
        id: 203,
        landlord_num: 2,
        address: "1021 CHURCH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.221675,
        lon: -76.596478
    }, {
        id: 204,
        landlord_num: 2,
        address: "117 S CASTLE ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.290077,
        lon: -76.587946
    }, {
        id: 205,
        landlord_num: 2,
        address: "1225 CHURCH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.222511,
        lon: -76.593362
    }, {
        id: 206,
        landlord_num: 2,
        address: "1229 CHURCH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.222516,
        lon: -76.593265
    }, {
        id: 207,
        landlord_num: 2,
        address: "1343 CAMBRIA ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.232053,
        lon: -76.591419
    }, {
        id: 208,
        landlord_num: 2,
        address: "1429 FILBERT ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.224946,
        lon: -76.590199
    }, {
        id: 209,
        landlord_num: 2,
        address: "1612 CHURCH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.223234,
        lon: -76.587531
    }, {
        id: 210,
        landlord_num: 2,
        address: "3437 6TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.239097,
        lon: -76.600624
    }, {
        id: 211,
        landlord_num: 2,
        address: "3608 2ND ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.237591,
        lon: -76.609137
    }, {
        id: 212,
        landlord_num: 2,
        address: "3616 2ND ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.237455,
        lon: -76.609204
    }, {
        id: 213,
        landlord_num: 2,
        address: "3716 8TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.233682,
        lon: -76.600302
    }, {
        id: 214,
        landlord_num: 2,
        address: "3722 6TH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.234602,
        lon: -76.603433
    }, {
        id: 215,
        landlord_num: 2,
        address: "402 CAMBRIA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.236695,
        lon: -76.605288
    }, {
        id: 216,
        landlord_num: 2,
        address: "4022 6TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231406,
        lon: -76.603697
    }, {
        id: 217,
        landlord_num: 2,
        address: "404 CAMBRIA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.236681,
        lon: -76.605249
    }, {
        id: 218,
        landlord_num: 2,
        address: "414 FREEMAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.237595,
        lon: -76.604116
    }, {
        id: 219,
        landlord_num: 2,
        address: "523 BALTIC AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.239679,
        lon: -76.601363
    }, {
        id: 220,
        landlord_num: 2,
        address: "621 ARSAN AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.238634,
        lon: -76.600222
    }, {
        id: 221,
        landlord_num: 2,
        address: "627 ARSAN AVE",
        units: 2,
        ecb: 3,
        pros: 0,
        lat: 39.238503,
        lon: -76.599944
    }, {
        id: 222,
        landlord_num: 2,
        address: "823 E JEFFREY ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.232034,
        lon: -76.600074
    }, {
        id: 224,
        landlord_num: 6,
        address: "253 S LOUDON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.282246,
        lon: -76.681673
    }, {
        id: 225,
        landlord_num: 6,
        address: "26 S MONASTERY AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.286208,
        lon: -76.678522
    }, {
        id: 226,
        landlord_num: 2,
        address: "903 STOLL ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.230409,
        lon: -76.599772
    }, {
        id: 227,
        landlord_num: 2,
        address: "806 JACK ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231834,
        lon: -76.600631
    }, {
        id: 228,
        landlord_num: 3,
        address: "1804 MCCULLOH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306481,
        lon: -76.632979
    }, {
        id: 229,
        landlord_num: 6,
        address: "2125 MCCULLOH ST",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.309552,
        lon: -76.636025
    }, {
        id: 230,
        landlord_num: 6,
        address: "2125-1/2 MCCULLOH ST",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.309552,
        lon: -76.636025
    }, {
        id: 231,
        landlord_num: 2,
        address: "1652 N BENTALOU ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.307494,
        lon: -76.654182
    }, {
        id: 232,
        landlord_num: 2,
        address: "2740 HUGO AVE",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.323765,
        lon: -76.589671
    }, {
        id: 233,
        landlord_num: 7,
        address: "2001 CECIL AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.313126,
        lon: -76.605032
    }, {
        id: 234,
        landlord_num: 2,
        address: "1004 DARLEY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.317169,
        lon: -76.600164
    }, {
        id: 235,
        landlord_num: 7,
        address: "2230 CEDLEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.263307,
        lon: -76.632116
    }, {
        id: 236,
        landlord_num: 3,
        address: "2740 RIGGS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300561,
        lon: -76.662971
    }, {
        id: 237,
        landlord_num: 8,
        address: "3912 W NORTHERN PKWY",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.350459,
        lon: -76.689562
    }, {
        id: 238,
        landlord_num: 2,
        address: "2946 PRESSTMAN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.304747,
        lon: -76.666884
    }, {
        id: 239,
        landlord_num: 8,
        address: "3703 CLARKS LANE",
        units: 32,
        ecb: 0,
        pros: 0,
        lat: 39.360481,
        lon: -76.701009
    }, {
        id: 240,
        landlord_num: 0,
        address: "1314 BERRY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.331632,
        lon: -76.637609
    }, {
        id: 241,
        landlord_num: 0,
        address: "1446 MEDFIELD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.339114,
        lon: -76.642893
    }, {
        id: 242,
        landlord_num: 0,
        address: "2707 GLEN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.361646,
        lon: -76.676383
    }, {
        id: 243,
        landlord_num: 7,
        address: "1706 MALVERN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.273313,
        lon: -76.534217
    }, {
        id: 244,
        landlord_num: 0,
        address: "4204 ETHLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.324256,
        lon: -76.691598
    }, {
        id: 245,
        landlord_num: 0,
        address: "3026 FENDALL ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.327769,
        lon: -76.706493
    }, {
        id: 246,
        landlord_num: 7,
        address: "2247 CECIL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.314482,
        lon: -76.603939
    }, {
        id: 247,
        landlord_num: 2,
        address: "119 S COLLINS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284592,
        lon: -76.683182
    }, {
        id: 248,
        landlord_num: 2,
        address: "1209 ASHBURTON ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.301759,
        lon: -76.661557
    }, {
        id: 249,
        landlord_num: 2,
        address: "1612 ABBOTSTON ST",
        units: 1,
        ecb: 6,
        pros: 0,
        lat: 39.322767,
        lon: -76.593943
    }, {
        id: 250,
        landlord_num: 2,
        address: "1627 MONTPELIER ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.320122,
        lon: -76.596127
    }, {
        id: 251,
        landlord_num: 2,
        address: "1806 N DALLAS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.310958,
        lon: -76.597813
    }, {
        id: 252,
        landlord_num: 2,
        address: "1918 LEMMON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.285767,
        lon: -76.647546
    }, {
        id: 253,
        landlord_num: 2,
        address: "2016 N BENTALOU ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.31116,
        lon: -76.654439
    }, {
        id: 254,
        landlord_num: 2,
        address: "2528 OSWEGO AVE",
        units: 1,
        ecb: 6,
        pros: 0,
        lat: 39.337117,
        lon: -76.659698
    }, {
        id: 255,
        landlord_num: 2,
        address: "5258 SAINT CHARLES AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.345533,
        lon: -76.684603
    }, {
        id: 256,
        landlord_num: 2,
        address: "647 BARTLETT AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.316336,
        lon: -76.606909
    }, {
        id: 257,
        landlord_num: 2,
        address: "731 BARTLETT AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.315659,
        lon: -76.605894
    }, {
        id: 258,
        landlord_num: 0,
        address: "2202 GUILFORD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.314727,
        lon: -76.612891
    }, {
        id: 259,
        landlord_num: 2,
        address: "3603 WEST BAY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.23331,
        lon: -76.594096
    }, {
        id: 260,
        landlord_num: 2,
        address: "3715 7TH ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.234406,
        lon: -76.601264
    }, {
        id: 261,
        landlord_num: 2,
        address: "506 MAUDE AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.239039,
        lon: -76.602394
    }, {
        id: 262,
        landlord_num: 2,
        address: "911 JACK ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.230993,
        lon: -76.599218
    }, {
        id: 263,
        landlord_num: 7,
        address: "621 E 30TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.32412,
        lon: -76.607865
    }, {
        id: 264,
        landlord_num: 0,
        address: "2118 BARCLAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313904,
        lon: -76.611341
    }, {
        id: 265,
        landlord_num: 0,
        address: "3600 BELLE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.333983,
        lon: -76.674372
    }, {
        id: 266,
        landlord_num: 0,
        address: "3323 CHESLEY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.362093,
        lon: -76.540728
    }, {
        id: 267,
        landlord_num: 0,
        address: "227 S BOULDIN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.289074,
        lon: -76.570746
    }, {
        id: 268,
        landlord_num: 0,
        address: "331 JOPLIN ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.289655,
        lon: -76.53797
    }, {
        id: 269,
        landlord_num: 8,
        address: "705 NOTTINGHAM ROAD",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.294319,
        lon: -76.701867
    }, {
        id: 270,
        landlord_num: 8,
        address: "707 NOTTINGHAM ROAD",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.294642,
        lon: -76.702168
    }, {
        id: 271,
        landlord_num: 8,
        address: "709 NOTTINGHAM ROAD",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.295028,
        lon: -76.702277
    }, {
        id: 272,
        landlord_num: 8,
        address: "700 NOTTINGHAM ROAD",
        units: 30,
        ecb: 0,
        pros: 0,
        lat: 39.294241,
        lon: -76.703418
    }, {
        id: 273,
        landlord_num: 8,
        address: "706 NOTTINGHAM ROAD",
        units: 20,
        ecb: 0,
        pros: 0,
        lat: 39.294668,
        lon: -76.702929
    }, {
        id: 274,
        landlord_num: 8,
        address: "707 COOKS LANE",
        units: 5,
        ecb: 1,
        pros: 0,
        lat: 39.293956,
        lon: -76.703463
    }, {
        id: 275,
        landlord_num: 7,
        address: "2622 PARK HEIGHTS TERR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.338556,
        lon: -76.662368
    }, {
        id: 276,
        landlord_num: 0,
        address: "5402 FAIR OAKS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.355234,
        lon: -76.566681
    }, {
        id: 277,
        landlord_num: 0,
        address: "3409 ROYSTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.35557,
        lon: -76.548142
    }, {
        id: 278,
        landlord_num: 0,
        address: "6808 BOSTON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.280484,
        lon: -76.530277
    }, {
        id: 279,
        landlord_num: 2,
        address: "3711 8TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.233697,
        lon: -76.599838
    }, {
        id: 280,
        landlord_num: 7,
        address: "2434 DRUID PARK DR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.329021,
        lon: -76.655998
    }, {
        id: 281,
        landlord_num: 7,
        address: "615 OLDHAM ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.285681,
        lon: -76.555415
    }, {
        id: 282,
        landlord_num: 6,
        address: "317 S FREMONT AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.284764,
        lon: -76.626355
    }, {
        id: 283,
        landlord_num: 7,
        address: "416 E LORRAINE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.320235,
        lon: -76.610575
    }, {
        id: 284,
        landlord_num: 7,
        address: "4124 FAIRVIEW AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.322867,
        lon: -76.687216
    }, {
        id: 285,
        landlord_num: 7,
        address: "4131 MARY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.344745,
        lon: -76.54308
    }, {
        id: 286,
        landlord_num: 3,
        address: "5223 TABARD CT",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.353551,
        lon: -76.613057
    }, {
        id: 287,
        landlord_num: 6,
        address: "316 N HILTON ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.291041,
        lon: -76.672883
    }, {
        id: 288,
        landlord_num: 2,
        address: "1623 DARLEY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.314468,
        lon: -76.5958
    }, {
        id: 289,
        landlord_num: 3,
        address: "1518 SHADYSIDE ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.338751,
        lon: -76.592578
    }, {
        id: 290,
        landlord_num: 6,
        address: "2004 ELLSWORTH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306216,
        lon: -76.589539
    }, {
        id: 291,
        landlord_num: 8,
        address: "3915-3921 BELVIEU AVE",
        units: 24,
        ecb: 0,
        pros: 0,
        lat: 39.339451,
        lon: -76.683419
    }, {
        id: 292,
        landlord_num: 8,
        address: "4610-4614 WALLINGTON AVE",
        units: 18,
        ecb: 0,
        pros: 0,
        lat: 39.33954,
        lon: -76.682987
    }, {
        id: 293,
        landlord_num: 3,
        address: "1825 PENROSE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.291088,
        lon: -76.646468
    }, {
        id: 294,
        landlord_num: 2,
        address: "323 S NORRIS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283781,
        lon: -76.639828
    }, {
        id: 295,
        landlord_num: 3,
        address: "1806 N WASHINGTON ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.311286,
        lon: -76.590622
    }, {
        id: 296,
        landlord_num: 2,
        address: "2532 W FAIRMOUNT AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.28849,
        lon: -76.657479
    }, {
        id: 297,
        landlord_num: 7,
        address: "1623 MORELAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.307025,
        lon: -76.655559
    }, {
        id: 298,
        landlord_num: 2,
        address: "1524 N ELLAMONT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.305191,
        lon: -76.670959
    }, {
        id: 299,
        landlord_num: 7,
        address: "3225 BRIGHTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.304857,
        lon: -76.671808
    }, {
        id: 300,
        landlord_num: 2,
        address: "2915 ARUNAH AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.295017,
        lon: -76.665802
    }, {
        id: 301,
        landlord_num: 2,
        address: "605 DENISON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.294696,
        lon: -76.673785
    }, {
        id: 302,
        landlord_num: 2,
        address: "4132 NORFOLK AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.323471,
        lon: -76.687907
    }, {
        id: 303,
        landlord_num: 7,
        address: "3919 BOARMAN AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.33406,
        lon: -76.681623
    }, {
        id: 304,
        landlord_num: 7,
        address: "807 LYNDHURST ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296689,
        lon: -76.681123
    }, {
        id: 305,
        landlord_num: 7,
        address: "947 MONTPELIER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.324461,
        lon: -76.603876
    }, {
        id: 306,
        landlord_num: 7,
        address: "3013 HERBERT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.309524,
        lon: -76.668377
    }, {
        id: 307,
        landlord_num: 2,
        address: "3304 ROYCE AVE",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.341683,
        lon: -76.670165
    }, {
        id: 308,
        landlord_num: 6,
        address: "2533 LOYOLA SOUTHWAY",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.33727,
        lon: -76.660307
    }, {
        id: 309,
        landlord_num: 6,
        address: "3622 COTTAGE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.330752,
        lon: -76.658466
    }, {
        id: 310,
        landlord_num: 2,
        address: "2635 QUANTICO AVE",
        units: 2,
        ecb: 2,
        pros: 0,
        lat: 39.337335,
        lon: -76.662467
    }, {
        id: 311,
        landlord_num: 7,
        address: "1918 N CHARLES ST",
        units: 3,
        ecb: 8,
        pros: 0,
        lat: 39.311896,
        lon: -76.616886
    }, {
        id: 312,
        landlord_num: 3,
        address: "2201 BARCLAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.314828,
        lon: -76.610904
    }, {
        id: 313,
        landlord_num: 0,
        address: "316 E 22ND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.314524,
        lon: -76.612091
    }, {
        id: 314,
        landlord_num: 3,
        address: "2436 BARCLAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.317387,
        lon: -76.611558
    }, {
        id: 315,
        landlord_num: 3,
        address: "2424 BARCLAY ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.317104,
        lon: -76.611726
    }, {
        id: 316,
        landlord_num: 0,
        address: "1402 KINGSWAY ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.34443,
        lon: -76.594094
    }, {
        id: 317,
        landlord_num: 2,
        address: "1765 MONTPELIER ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.319,
        lon: -76.594344
    }, {
        id: 318,
        landlord_num: 2,
        address: "3172 RAVENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.315473,
        lon: -76.578729
    }, {
        id: 319,
        landlord_num: 2,
        address: "3211 LYNDALE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.316285,
        lon: -76.578077
    }, {
        id: 320,
        landlord_num: 0,
        address: "1224 GLENHAVEN ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.363298,
        lon: -76.592313
    }, {
        id: 321,
        landlord_num: 0,
        address: "4404 ARIZONA AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.338471,
        lon: -76.544058
    }, {
        id: 322,
        landlord_num: 0,
        address: "4409 WILLSHIRE AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.336377,
        lon: -76.546309
    }, {
        id: 323,
        landlord_num: 2,
        address: "3323 MCELDERRY ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.298001,
        lon: -76.570548
    }, {
        id: 324,
        landlord_num: 3,
        address: "116 N ELLWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293815,
        lon: -76.573665
    }, {
        id: 325,
        landlord_num: 3,
        address: "2703 JEFFERSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296681,
        lon: -76.578852
    }, {
        id: 326,
        landlord_num: 3,
        address: "414 N LAKEWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296128,
        lon: -76.579515
    }, {
        id: 327,
        landlord_num: 3,
        address: "427 N ELLWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296545,
        lon: -76.573398
    }, {
        id: 328,
        landlord_num: 3,
        address: "515 N LINWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297362,
        lon: -76.576278
    }, {
        id: 329,
        landlord_num: 3,
        address: "529 N KENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297537,
        lon: -76.577713
    }, {
        id: 330,
        landlord_num: 7,
        address: "2805 ERDMAN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.323089,
        lon: -76.576449
    }, {
        id: 331,
        landlord_num: 7,
        address: "3214 CLIFTMONT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.319044,
        lon: -76.573326
    }, {
        id: 332,
        landlord_num: 7,
        address: "38 N MORLEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.287706,
        lon: -76.673462
    }, {
        id: 333,
        landlord_num: 7,
        address: "2542 ASHLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.301178,
        lon: -76.581199
    }, {
        id: 334,
        landlord_num: 2,
        address: "216 N CONKLING ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295652,
        lon: -76.568032
    }, {
        id: 335,
        landlord_num: 2,
        address: "609 N LAKEWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29812,
        lon: -76.579169
    }, {
        id: 336,
        landlord_num: 2,
        address: "707 N LUZERNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299346,
        lon: -76.580661
    }, {
        id: 337,
        landlord_num: 0,
        address: "2236 BARCLAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.315334,
        lon: -76.611441
    }, {
        id: 338,
        landlord_num: 2,
        address: "3916 RIDGEWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.336859,
        lon: -76.68348
    }, {
        id: 339,
        landlord_num: 7,
        address: "1127 ASHBURTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.30106,
        lon: -76.66151
    }, {
        id: 340,
        landlord_num: 7,
        address: "2317 LAURETTA AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.293946,
        lon: -76.653724
    }, {
        id: 341,
        landlord_num: 2,
        address: "614 ARSAN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.238895,
        lon: -76.599887
    }, {
        id: 342,
        landlord_num: 0,
        address: "1527-1533 GORSUCH AVE",
        units: 12,
        ecb: 0,
        pros: 0,
        lat: 39.322253,
        lon: -76.596292
    }, {
        id: 343,
        landlord_num: 7,
        address: "626 DENISON ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.295075,
        lon: -76.674518
    }, {
        id: 344,
        landlord_num: 7,
        address: "3421 E BALTIMORE ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.292299,
        lon: -76.568724
    }, {
        id: 345,
        landlord_num: 2,
        address: "702 N CAREY ST",
        units: 3,
        ecb: 2,
        pros: 0,
        lat: 39.29702,
        lon: -76.638875
    }, {
        id: 346,
        landlord_num: 7,
        address: "3706 OLD YORK ROAD",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.333723,
        lon: -76.60787
    }, {
        id: 347,
        landlord_num: 0,
        address: "1300-1320 WASHINGTON BLVD",
        units: 32,
        ecb: 0,
        pros: 0,
        lat: 39.280497,
        lon: -76.635594
    }, {
        id: 348,
        landlord_num: 2,
        address: "811 SCOTT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.280901,
        lon: -76.62848
    }, {
        id: 349,
        landlord_num: 3,
        address: "1426 E OLIVER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.307491,
        lon: -76.59866
    }, {
        id: 350,
        landlord_num: 7,
        address: "1411 N CAROLINE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306608,
        lon: -76.597839
    }, {
        id: 351,
        landlord_num: 7,
        address: "1028 N EDEN ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.30239,
        lon: -76.599684
    }, {
        id: 352,
        landlord_num: 7,
        address: "3020 MCELDERRY ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.298234,
        lon: -76.574318
    }, {
        id: 353,
        landlord_num: 3,
        address: "4100 WOODRIDGE ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297238,
        lon: -76.684474
    }, {
        id: 354,
        landlord_num: 3,
        address: "418 NORMANDY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292276,
        lon: -76.681762
    }, {
        id: 355,
        landlord_num: 2,
        address: "1107 WICKLOW ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.298031,
        lon: -76.690589
    }, {
        id: 356,
        landlord_num: 2,
        address: "2808 ROCKROSE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.329335,
        lon: -76.66156
    }, {
        id: 357,
        landlord_num: 2,
        address: "1120 WHITELOCK ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312297,
        lon: -76.638591
    }, {
        id: 358,
        landlord_num: 2,
        address: "2537 MADISON AVE",
        units: 3,
        ecb: 2,
        pros: 0,
        lat: 39.314645,
        lon: -76.63932
    }, {
        id: 359,
        landlord_num: 0,
        address: "415 E 20TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312277,
        lon: -76.610409
    }, {
        id: 360,
        landlord_num: 0,
        address: "437 E 20TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.31222,
        lon: -76.609738
    }, {
        id: 361,
        landlord_num: 0,
        address: "430 E 20TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312643,
        lon: -76.610117
    }, {
        id: 362,
        landlord_num: 0,
        address: "330 E 20TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312622,
        lon: -76.611499
    }, {
        id: 363,
        landlord_num: 0,
        address: "314 E 20TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.312602,
        lon: -76.611971
    }, {
        id: 364,
        landlord_num: 0,
        address: "2001 GUILFORD AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.312585,
        lon: -76.61236
    }, {
        id: 365,
        landlord_num: 0,
        address: "308 E 20 1/2 ST",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.313032,
        lon: -76.611921
    }, {
        id: 366,
        landlord_num: 0,
        address: "318 E 20 1/2 ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313041,
        lon: -76.61171
    }, {
        id: 367,
        landlord_num: 0,
        address: "326 E 20 1/2 ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313048,
        lon: -76.61154
    }, {
        id: 368,
        landlord_num: 7,
        address: "402 E LORRAINE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.320199,
        lon: -76.610917
    }, {
        id: 369,
        landlord_num: 7,
        address: "434 E LORRAINE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.320224,
        lon: -76.610118
    }, {
        id: 370,
        landlord_num: 7,
        address: "429 WHITRIDGE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321422,
        lon: -76.61029
    }, {
        id: 371,
        landlord_num: 7,
        address: "1009 N PAYSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300269,
        lon: -76.649067
    }, {
        id: 372,
        landlord_num: 7,
        address: "1200 N LUZERNE AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.304906,
        lon: -76.581503
    }, {
        id: 373,
        landlord_num: 7,
        address: "1535 N WOODYEAR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306868,
        lon: -76.640988
    }, {
        id: 374,
        landlord_num: 7,
        address: "2811 E BIDDLE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.304747,
        lon: -76.578041
    }, {
        id: 375,
        landlord_num: 2,
        address: "1118 HOMESTEAD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.325027,
        lon: -76.602391
    }, {
        id: 376,
        landlord_num: 3,
        address: "3414 CARDENAS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.323873,
        lon: -76.57461
    }, {
        id: 377,
        landlord_num: 8,
        address: "6101 PARK HEIGHTS AVE",
        units: 36,
        ecb: 0,
        pros: 0,
        lat: 39.357861,
        lon: -76.691641
    }, {
        id: 378,
        landlord_num: 8,
        address: "6001 PARK HEIGHTS AVE",
        units: 27,
        ecb: 0,
        pros: 0,
        lat: 39.356983,
        lon: -76.689555
    }, {
        id: 379,
        landlord_num: 7,
        address: "5402 NARCISSUS AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.349018,
        lon: -76.684669
    }, {
        id: 380,
        landlord_num: 2,
        address: "4202 ARIZONA AVE",
        units: 1,
        ecb: 6,
        pros: 0,
        lat: 39.340804,
        lon: -76.546734
    }, {
        id: 381,
        landlord_num: 2,
        address: "3616 7TH ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.234973,
        lon: -76.601425
    }, {
        id: 382,
        landlord_num: 2,
        address: "806 STOLL ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.231137,
        lon: -76.600717
    }, {
        id: 383,
        landlord_num: 2,
        address: "4820 CURTIS AVE",
        units: 6,
        ecb: 0,
        pros: 0,
        lat: 39.222394,
        lon: -76.586816
    }, {
        id: 384,
        landlord_num: 2,
        address: "1330 CYPRESS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.22375,
        lon: -76.59205
    }, {
        id: 385,
        landlord_num: 2,
        address: "4200 MORRISON CT",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.227488,
        lon: -76.588037
    }, {
        id: 386,
        landlord_num: 2,
        address: "4219 MORRISON CT",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.227064,
        lon: -76.587773
    }, {
        id: 387,
        landlord_num: 2,
        address: "4215 MORRISON CT",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.22715,
        lon: -76.587779
    }, {
        id: 388,
        landlord_num: 2,
        address: "4207 MORRISON CT",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.227361,
        lon: -76.587795
    }, {
        id: 389,
        landlord_num: 2,
        address: "4118 CURTIS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.227848,
        lon: -76.587239
    }, {
        id: 390,
        landlord_num: 2,
        address: "4116 MORRISON CT",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.227846,
        lon: -76.58807
    }, {
        id: 391,
        landlord_num: 2,
        address: "5006 NORWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.329501,
        lon: -76.699793
    }, {
        id: 392,
        landlord_num: 7,
        address: "1027 N CARROLLTON AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.300956,
        lon: -76.637177
    }, {
        id: 393,
        landlord_num: 7,
        address: "1117 N CAREY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.301604,
        lon: -76.638595
    }, {
        id: 394,
        landlord_num: 7,
        address: "1129 N CARROLLTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.301858,
        lon: -76.6372
    }, {
        id: 395,
        landlord_num: 7,
        address: "1132 N CARROLLTON AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.301922,
        lon: -76.637713
    }, {
        id: 396,
        landlord_num: 7,
        address: "1140 N CARROLLTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.302072,
        lon: -76.637721
    }, {
        id: 397,
        landlord_num: 7,
        address: "118 S MONROE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.285759,
        lon: -76.64702
    }, {
        id: 398,
        landlord_num: 7,
        address: "1610 W FRANKLIN ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.294166,
        lon: -76.643268
    }, {
        id: 399,
        landlord_num: 7,
        address: "1629 RUTLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.309546,
        lon: -76.592654
    }, {
        id: 400,
        landlord_num: 7,
        address: "1636 N FULTON AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.307451,
        lon: -76.646612
    }, {
        id: 401,
        landlord_num: 7,
        address: "1708 N CAREY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308842,
        lon: -76.643131
    }, {
        id: 402,
        landlord_num: 7,
        address: "1713 N PATTERSON PARK AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.310347,
        lon: -76.585567
    }, {
        id: 403,
        landlord_num: 7,
        address: "1739 N CASTLE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.310516,
        lon: -76.589112
    }, {
        id: 404,
        landlord_num: 6,
        address: "1624 BRADDISH AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306704,
        lon: -76.661092
    }, {
        id: 405,
        landlord_num: 6,
        address: "2816 RIGGS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.30051,
        lon: -76.66403
    }, {
        id: 406,
        landlord_num: 7,
        address: "1228 E EAGER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.301807,
        lon: -76.600789
    }, {
        id: 407,
        landlord_num: 2,
        address: "3395 SAINT BENEDICT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.273614,
        lon: -76.674259
    }, {
        id: 408,
        landlord_num: 2,
        address: "904 W LOMBARD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286969,
        lon: -76.632308
    }, {
        id: 409,
        landlord_num: 2,
        address: "1152 WASHINGTON BLVD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.28231,
        lon: -76.633556
    }, {
        id: 410,
        landlord_num: 2,
        address: "1103 SCOTT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.279615,
        lon: -76.628428
    }, {
        id: 411,
        landlord_num: 2,
        address: "1114 S PACA ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.279023,
        lon: -76.627561
    }, {
        id: 412,
        landlord_num: 7,
        address: "733 N LINWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300028,
        lon: -76.576514
    }, {
        id: 413,
        landlord_num: 7,
        address: "524 N CHESTER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297191,
        lon: -76.588051
    }, {
        id: 414,
        landlord_num: 7,
        address: "2335 EDMONDSON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294532,
        lon: -76.65434
    }, {
        id: 415,
        landlord_num: 7,
        address: "805 N KENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300265,
        lon: -76.577891
    }, {
        id: 416,
        landlord_num: 7,
        address: "822 N KENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300579,
        lon: -76.578398
    }, {
        id: 417,
        landlord_num: 2,
        address: "3428 W CATON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286717,
        lon: -76.673887
    }, {
        id: 418,
        landlord_num: 0,
        address: "4005 FERNHILL AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.337445,
        lon: -76.68616
    }, {
        id: 419,
        landlord_num: 7,
        address: "3802 BONNER ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.323315,
        lon: -76.681876
    }, {
        id: 420,
        landlord_num: 3,
        address: "2802 SPRINGHILL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.331258,
        lon: -76.662939
    }, {
        id: 421,
        landlord_num: 7,
        address: "2544 QUANTICO AVE",
        units: 1,
        ecb: 8,
        pros: 0,
        lat: 39.338284,
        lon: -76.660674
    }, {
        id: 422,
        landlord_num: 0,
        address: "2002 GREENMOUNT AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312858,
        lon: -76.609685
    }, {
        id: 423,
        landlord_num: 0,
        address: "401 E 23RD ST",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.315336,
        lon: -76.610743
    }, {
        id: 424,
        landlord_num: 0,
        address: "403 E 23RD ST",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.315339,
        lon: -76.61069
    }, {
        id: 425,
        landlord_num: 7,
        address: "422 E LORRAINE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.3202,
        lon: -76.610423
    }, {
        id: 426,
        landlord_num: 0,
        address: "2810 OAKLEY AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.349095,
        lon: -76.666745
    }, {
        id: 427,
        landlord_num: 0,
        address: "2921 WOODLAND AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.346375,
        lon: -76.667531
    }, {
        id: 428,
        landlord_num: 4,
        address: "2801 VIRGINIA AVE",
        units: 20,
        ecb: 0,
        pros: 0,
        lat: 39.344924,
        lon: -76.660073
    }, {
        id: 429,
        landlord_num: 4,
        address: "2805 VIRGINIA AVE",
        units: 20,
        ecb: 0,
        pros: 0,
        lat: 39.344669,
        lon: -76.660519
    }, {
        id: 430,
        landlord_num: 2,
        address: "4670 YORK ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.34605,
        lon: -76.609948
    }, {
        id: 431,
        landlord_num: 2,
        address: "4718 YORK ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.346784,
        lon: -76.609889
    }, {
        id: 432,
        landlord_num: 2,
        address: "3536 7TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.236656,
        lon: -76.600639
    }, {
        id: 433,
        landlord_num: 2,
        address: "1343 E PATAPSCO AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.232569,
        lon: -76.591017
    }, {
        id: 434,
        landlord_num: 2,
        address: "1349 E PATAPSCO AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.232494,
        lon: -76.590835
    }, {
        id: 435,
        landlord_num: 0,
        address: "4203 RIDGEWOOD AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.336342,
        lon: -76.689708
    }, {
        id: 436,
        landlord_num: 7,
        address: "3646 KENYON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.318675,
        lon: -76.562219
    }, {
        id: 437,
        landlord_num: 3,
        address: "926 E PATAPSCO AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.23475,
        lon: -76.596242
    }, {
        id: 438,
        landlord_num: 2,
        address: "423 ANNABEL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.237795,
        lon: -76.60383
    }, {
        id: 439,
        landlord_num: 2,
        address: "2844 LAKE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.323528,
        lon: -76.572946
    }, {
        id: 440,
        landlord_num: 2,
        address: "415 MOUNT HOLLY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292249,
        lon: -76.679329
    }, {
        id: 441,
        landlord_num: 2,
        address: "521 N CLINTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297686,
        lon: -76.570513
    }, {
        id: 442,
        landlord_num: 7,
        address: "3813 WHITE AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.347427,
        lon: -76.547774
    }, {
        id: 443,
        landlord_num: 3,
        address: "736 S CONKLING ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283785,
        lon: -76.567269
    }, {
        id: 444,
        landlord_num: 7,
        address: "917 BENNETT PL",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294833,
        lon: -76.632729
    }, {
        id: 445,
        landlord_num: 7,
        address: "928 BENNETT PL",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.295146,
        lon: -76.63315
    }, {
        id: 446,
        landlord_num: 2,
        address: "1264 WASHINGTON BLVD",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.281002,
        lon: -76.635267
    }, {
        id: 447,
        landlord_num: 7,
        address: "1800 N CHAPEL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.311125,
        lon: -76.5911
    }, {
        id: 448,
        landlord_num: 3,
        address: "502 BRUNSWICK ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.27901,
        lon: -76.659471
    }, {
        id: 449,
        landlord_num: 2,
        address: "3327 EDMONDSON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.293794,
        lon: -76.673733
    }, {
        id: 450,
        landlord_num: 2,
        address: "507 NORMANDY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292868,
        lon: -76.681322
    }, {
        id: 451,
        landlord_num: 7,
        address: "2848 BOARMAN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.337501,
        lon: -76.669402
    }, {
        id: 452,
        landlord_num: 2,
        address: "4209 PIMLICO ROAD",
        units: 2,
        ecb: 6,
        pros: 0,
        lat: 39.337814,
        lon: -76.662722
    }, {
        id: 453,
        landlord_num: 7,
        address: "522 E 27TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321036,
        lon: -76.608326
    }, {
        id: 454,
        landlord_num: 3,
        address: "3025 BELAIR ROAD",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.319979,
        lon: -76.575191
    }, {
        id: 455,
        landlord_num: 3,
        address: "3200 RAVENWOOD AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.315467,
        lon: -76.578369
    }, {
        id: 456,
        landlord_num: 2,
        address: "620 GLENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.353839,
        lon: -76.606767
    }, {
        id: 457,
        landlord_num: 2,
        address: "627 GLENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 1,
        lat: 39.353276,
        lon: -76.606719
    }, {
        id: 458,
        landlord_num: 2,
        address: "825 GLENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.352622,
        lon: -76.604038
    }, {
        id: 459,
        landlord_num: 2,
        address: "3828 SAINT VICTOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231877,
        lon: -76.59815
    }, {
        id: 460,
        landlord_num: 2,
        address: "4206 AUDREY AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.229732,
        lon: -76.605369
    }, {
        id: 461,
        landlord_num: 2,
        address: "4134 AUDREY AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.230052,
        lon: -76.604593
    }, {
        id: 462,
        landlord_num: 2,
        address: "3601 SAINT VICTOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.234006,
        lon: -76.596588
    }, {
        id: 463,
        landlord_num: 2,
        address: "3718 WEST BAY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.232047,
        lon: -76.595171
    }, {
        id: 464,
        landlord_num: 2,
        address: "3814 BAYONNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.347011,
        lon: -76.548213
    }, {
        id: 465,
        landlord_num: 2,
        address: "3822 10TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231792,
        lon: -76.597369
    }, {
        id: 466,
        landlord_num: 2,
        address: "821 E JEFFREY ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.232064,
        lon: -76.600171
    }, {
        id: 467,
        landlord_num: 2,
        address: "4831 PENNINGTON AVE",
        units: 2,
        ecb: 2,
        pros: 0,
        lat: 39.222329,
        lon: -76.587931
    }, {
        id: 468,
        landlord_num: 2,
        address: "1303 E PATAPSCO AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.232817,
        lon: -76.592088
    }, {
        id: 469,
        landlord_num: 6,
        address: "3013 ELIZABETH AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.254993,
        lon: -76.650938
    }, {
        id: 470,
        landlord_num: 2,
        address: "837 BRINKWOOD ROAD",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.297772,
        lon: -76.698211
    }, {
        id: 471,
        landlord_num: 2,
        address: "4704 DUNKIRK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283747,
        lon: -76.693586
    }, {
        id: 472,
        landlord_num: 0,
        address: "309 E MELROSE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.366521,
        lon: -76.614774
    }, {
        id: 473,
        landlord_num: 2,
        address: "2854 LAKE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.323404,
        lon: -76.572816
    }, {
        id: 474,
        landlord_num: 10,
        address: "2018 LINDEN AVE",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.311212,
        lon: -76.633479
    }, {
        id: 475,
        landlord_num: 10,
        address: "408 S BENTALOU ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.282821,
        lon: -76.652823
    }, {
        id: 476,
        landlord_num: 10,
        address: "4412 PARKTON ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.277637,
        lon: -76.690408
    }, {
        id: 477,
        landlord_num: 7,
        address: "1531 RALWORTH ROAD",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.339114,
        lon: -76.592006
    }, {
        id: 478,
        landlord_num: 2,
        address: "415 NORMANDY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292175,
        lon: -76.681275
    }, {
        id: 479,
        landlord_num: 7,
        address: "1300 MCHENRY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284728,
        lon: -76.638023
    }, {
        id: 480,
        landlord_num: 7,
        address: "5110 HOLDER AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.345697,
        lon: -76.559379
    }, {
        id: 481,
        landlord_num: 7,
        address: "1302 MCHENRY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284728,
        lon: -76.638067
    }, {
        id: 482,
        landlord_num: 6,
        address: "14 N CHESTER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.292363,
        lon: -76.587824
    }, {
        id: 483,
        landlord_num: 7,
        address: "540 E PATAPSCO AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.236539,
        lon: -76.602414
    }, {
        id: 484,
        landlord_num: 3,
        address: "840 S EAST AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.282535,
        lon: -76.571508
    }, {
        id: 485,
        landlord_num: 2,
        address: "2031 GRINNALDS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.266201,
        lon: -76.649489
    }, {
        id: 486,
        landlord_num: 2,
        address: "4110 CURTIS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.228086,
        lon: -76.587261
    }, {
        id: 487,
        landlord_num: 10,
        address: "4325 NORFOLK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.322244,
        lon: -76.690547
    }, {
        id: 488,
        landlord_num: 10,
        address: "3706 GELSTON DR",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.295874,
        lon: -76.679129
    }, {
        id: 489,
        landlord_num: 2,
        address: "3428 6TH ST",
        units: 2,
        ecb: 1,
        pros: 0,
        lat: 39.239965,
        lon: -76.600726
    }, {
        id: 490,
        landlord_num: 3,
        address: "3137 SEQUOIA AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.328015,
        lon: -76.666919
    }, {
        id: 491,
        landlord_num: 3,
        address: "110 S WASHINGTON ST",
        units: 1,
        ecb: 3,
        pros: 0,
        lat: 39.290257,
        lon: -76.589308
    }, {
        id: 492,
        landlord_num: 2,
        address: "2833 SUNSET DR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.276893,
        lon: -76.664126
    }, {
        id: 493,
        landlord_num: 2,
        address: "3710 2ND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.23684,
        lon: -76.609497
    }, {
        id: 494,
        landlord_num: 2,
        address: "3965 BROOKLYN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.230814,
        lon: -76.602192
    }, {
        id: 495,
        landlord_num: 2,
        address: "4708 HOMESDALE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.321883,
        lon: -76.555333
    }, {
        id: 496,
        landlord_num: 2,
        address: "1517 ELMTREE ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.224244,
        lon: -76.589
    }, {
        id: 497,
        landlord_num: 2,
        address: "1825 APPLETON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.309313,
        lon: -76.648744
    }, {
        id: 498,
        landlord_num: 2,
        address: "1519 APPLETON ST",
        units: 1,
        ecb: 6,
        pros: 0,
        lat: 39.305812,
        lon: -76.648571
    }, {
        id: 499,
        landlord_num: 2,
        address: "904 N PAYSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299099,
        lon: -76.649527
    }, {
        id: 500,
        landlord_num: 2,
        address: "30 S FULTON AVE",
        units: 3,
        ecb: 0,
        pros: 0,
        lat: 39.286938,
        lon: -76.645423
    }, {
        id: 501,
        landlord_num: 2,
        address: "1716 W PRATT ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.285407,
        lon: -76.644498
    }, {
        id: 502,
        landlord_num: 2,
        address: "229 S FULTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.284508,
        lon: -76.64478
    }, {
        id: 503,
        landlord_num: 2,
        address: "1212 JAMES ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.282213,
        lon: -76.635584
    }, {
        id: 504,
        landlord_num: 10,
        address: "423 W SARATOGA ST",
        units: 9,
        ecb: 0,
        pros: 0,
        lat: 39.292603,
        lon: -76.6222
    }, {
        id: 505,
        landlord_num: 3,
        address: "323 E LANVALE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308746,
        lon: -76.611124
    }, {
        id: 506,
        landlord_num: 7,
        address: "1217 E FEDERAL ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308119,
        lon: -76.601568
    }, {
        id: 507,
        landlord_num: 2,
        address: "601 N BELNORD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297966,
        lon: -76.57848
    }, {
        id: 508,
        landlord_num: 2,
        address: "2311 JEFFERSON ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.296458,
        lon: -76.584206
    }, {
        id: 509,
        landlord_num: 3,
        address: "208 N LUZERNE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294962,
        lon: -76.580852
    }, {
        id: 510,
        landlord_num: 3,
        address: "313 LYNDHURST ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.291132,
        lon: -76.680235
    }, {
        id: 511,
        landlord_num: 3,
        address: "751 N EDGEWOOD ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.296464,
        lon: -76.673825
    }, {
        id: 512,
        landlord_num: 2,
        address: "2109 WESTWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308475,
        lon: -76.651894
    }, {
        id: 513,
        landlord_num: 2,
        address: "1220 N DUKELAND ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.302232,
        lon: -76.663833
    }, {
        id: 514,
        landlord_num: 2,
        address: "1707 ASHBURTON ST",
        units: 1,
        ecb: 0,
        pros: 1,
        lat: 39.307587,
        lon: -76.661861
    }, {
        id: 515,
        landlord_num: 10,
        address: "3017 GRAYSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306334,
        lon: -76.668138
    }, {
        id: 516,
        landlord_num: 2,
        address: "1130 N LONGWOOD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300772,
        lon: -76.667533
    }, {
        id: 517,
        landlord_num: 2,
        address: "3106 BRIGHTON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.305314,
        lon: -76.669662
    }, {
        id: 518,
        landlord_num: 2,
        address: "711 LINNARD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295602,
        lon: -76.675843
    }, {
        id: 519,
        landlord_num: 2,
        address: "208 S LOUDON AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.283212,
        lon: -76.68235
    }, {
        id: 520,
        landlord_num: 2,
        address: "3116 WOLCOTT AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.322814,
        lon: -76.684772
    }, {
        id: 521,
        landlord_num: 2,
        address: "3734 TOWANDA AVE",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.330627,
        lon: -76.663324
    }, {
        id: 522,
        landlord_num: 2,
        address: "2806 ROCKROSE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.329363,
        lon: -76.661486
    }, {
        id: 523,
        landlord_num: 7,
        address: "2508 WOODBROOK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312067,
        lon: -76.643379
    }, {
        id: 524,
        landlord_num: 7,
        address: "2533 WOODBROOK AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312847,
        lon: -76.643689
    }, {
        id: 525,
        landlord_num: 7,
        address: "2709 PELHAM AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.326377,
        lon: -76.5739
    }, {
        id: 526,
        landlord_num: 0,
        address: "338 E 20TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.312627,
        lon: -76.611277
    }, {
        id: 527,
        landlord_num: 0,
        address: "2014 BARCLAY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313074,
        lon: -76.611305
    }, {
        id: 528,
        landlord_num: 7,
        address: "4018 WILSBY AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.338657,
        lon: -76.604755
    }, {
        id: 529,
        landlord_num: 7,
        address: "1732 E 30TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.325529,
        lon: -76.591038
    }, {
        id: 530,
        landlord_num: 2,
        address: "2027 CLIFTWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313423,
        lon: -76.589328
    }, {
        id: 531,
        landlord_num: 0,
        address: "3527 HAYWARD AVE",
        units: 0,
        ecb: 0,
        pros: 0,
        lat: 39.34825,
        lon: -76.680957
    }, {
        id: 532,
        landlord_num: 2,
        address: "3208 W BELVEDERE AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.348643,
        lon: -76.677011
    }, {
        id: 533,
        landlord_num: 2,
        address: "543 CHATEAU AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.350527,
        lon: -76.607845
    }, {
        id: 534,
        landlord_num: 2,
        address: "5108 MIDWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.3506,
        lon: -76.603188
    }, {
        id: 535,
        landlord_num: 2,
        address: "4430 WRENWOOD AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.343209,
        lon: -76.606507
    }, {
        id: 536,
        landlord_num: 7,
        address: "3020 BRENDAN AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.323053,
        lon: -76.570466
    }, {
        id: 537,
        landlord_num: 7,
        address: "115 N JANNEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294315,
        lon: -76.560604
    }, {
        id: 538,
        landlord_num: 7,
        address: "117 N JANNEY ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294349,
        lon: -76.560609
    }, {
        id: 539,
        landlord_num: 7,
        address: "4326 E LOMBARD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.291916,
        lon: -76.560184
    }, {
        id: 540,
        landlord_num: 2,
        address: "3837 8TH ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.23253,
        lon: -76.600986
    }, {
        id: 541,
        landlord_num: 2,
        address: "1649 CEDDOX ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.22109,
        lon: -76.586662
    }, {
        id: 542,
        landlord_num: 2,
        address: "4204 CURTIS AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.227433,
        lon: -76.587194
    }, {
        id: 543,
        landlord_num: 2,
        address: "1417 OLMSTEAD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.227239,
        lon: -76.590744
    }, {
        id: 544,
        landlord_num: 2,
        address: "1406 LOCUST ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.226888,
        lon: -76.591145
    }, {
        id: 545,
        landlord_num: 2,
        address: "3824 WEST BAY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.231255,
        lon: -76.59563
    }, {
        id: 546,
        landlord_num: 4,
        address: "4018 N ROGERS AVE",
        units: 23,
        ecb: 0,
        pros: 0,
        lat: 39.339192,
        lon: -76.699891
    }, {
        id: 547,
        landlord_num: 4,
        address: "4020 N ROGERS AVE",
        units: 21,
        ecb: 1,
        pros: 0,
        lat: 39.339409,
        lon: -76.699353
    }, {
        id: 548,
        landlord_num: 7,
        address: "4710 PARKSIDE DR",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.322524,
        lon: -76.556999
    }, {
        id: 549,
        landlord_num: 3,
        address: "1506 KENHILL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.308412,
        lon: -76.577947
    }, {
        id: 550,
        landlord_num: 7,
        address: "1807 LAURETTA AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.294375,
        lon: -76.646501
    }, {
        id: 551,
        landlord_num: 7,
        address: "1836 W NORTH AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.310063,
        lon: -76.647787
    }, {
        id: 552,
        landlord_num: 7,
        address: "1843 DRUID HILL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.306651,
        lon: -76.634006
    }, {
        id: 553,
        landlord_num: 7,
        address: "1933 HARLEM AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296167,
        lon: -76.648538
    }, {
        id: 554,
        landlord_num: 7,
        address: "2007 HOLLINS ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286863,
        lon: -76.648874
    }, {
        id: 555,
        landlord_num: 7,
        address: "2032 ROBB ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313701,
        lon: -76.603159
    }, {
        id: 556,
        landlord_num: 7,
        address: "2038 W FAYETTE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.289558,
        lon: -76.649902
    }, {
        id: 557,
        landlord_num: 7,
        address: "216 S PAYSON ST",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.284398,
        lon: -76.648693
    }, {
        id: 558,
        landlord_num: 7,
        address: "2301 E LAFAYETTE AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.31084,
        lon: -76.585386
    }, {
        id: 559,
        landlord_num: 7,
        address: "2553 W LOMBARD ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.285528,
        lon: -76.657441
    }, {
        id: 560,
        landlord_num: 7,
        address: "2611 HAFER ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283047,
        lon: -76.658072
    }, {
        id: 561,
        landlord_num: 7,
        address: "305 S PAYSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283999,
        lon: -76.648137
    }, {
        id: 562,
        landlord_num: 7,
        address: "316 S PAYSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.283792,
        lon: -76.648667
    }, {
        id: 563,
        landlord_num: 7,
        address: "344 S FULTON AVE",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.283293,
        lon: -76.645139
    }, {
        id: 564,
        landlord_num: 7,
        address: "419 N PORT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.296256,
        lon: -76.582684
    }, {
        id: 565,
        landlord_num: 7,
        address: "421 N PORT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29629,
        lon: -76.582686
    }, {
        id: 566,
        landlord_num: 7,
        address: "428 S PAYSON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.282109,
        lon: -76.648192
    }, {
        id: 567,
        landlord_num: 7,
        address: "600 N PAYSON ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.295404,
        lon: -76.649314
    }, {
        id: 568,
        landlord_num: 7,
        address: "645 GUTMAN AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.31704,
        lon: -76.606606
    }, {
        id: 569,
        landlord_num: 7,
        address: "722 N PORT ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299488,
        lon: -76.583217
    }, {
        id: 570,
        landlord_num: 7,
        address: "913 N GILMOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.299573,
        lon: -76.642711
    }, {
        id: 571,
        landlord_num: 7,
        address: "917 N GILMOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29969,
        lon: -76.642718
    }, {
        id: 572,
        landlord_num: 7,
        address: "932 N GILMOR ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.29966,
        lon: -76.643247
    }, {
        id: 573,
        landlord_num: 3,
        address: "2203 E FEDERAL ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.308646,
        lon: -76.587068
    }, {
        id: 574,
        landlord_num: 3,
        address: "2305 ASHLAND AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.300685,
        lon: -76.584698
    }, {
        id: 575,
        landlord_num: 3,
        address: "2422 E MADISON ST",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.300052,
        lon: -76.582685
    }, {
        id: 576,
        landlord_num: 3,
        address: "2529 ASHLAND AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.300809,
        lon: -76.581481
    }, {
        id: 577,
        landlord_num: 3,
        address: "518 N COLLINGTON AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297214,
        lon: -76.586802
    }, {
        id: 578,
        landlord_num: 3,
        address: "521 N ROSE ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297414,
        lon: -76.581313
    }, {
        id: 579,
        landlord_num: 2,
        address: "5609 GOVANE AVE",
        units: 1,
        ecb: 1,
        pros: 0,
        lat: 39.358046,
        lon: -76.607082
    }, {
        id: 580,
        landlord_num: 3,
        address: "2422 FLEET ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.285216,
        lon: -76.582062
    }, {
        id: 581,
        landlord_num: 3,
        address: "508 DRUID HILL AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.297,
        lon: -76.622351
    }, {
        id: 582,
        landlord_num: 7,
        address: "2711 E CHASE ST",
        units: 1,
        ecb: 2,
        pros: 0,
        lat: 39.303658,
        lon: -76.579336
    }, {
        id: 583,
        landlord_num: 2,
        address: "4110 GRACE CT",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.228065,
        lon: -76.587661
    }, {
        id: 584,
        landlord_num: 2,
        address: "3314 CARLISLE AVE",
        units: 6,
        ecb: 10,
        pros: 0,
        lat: 39.319645,
        lon: -76.674549
    }, {
        id: 585,
        landlord_num: 3,
        address: "1211 N LUZERNE AVE",
        units: 1,
        ecb: 4,
        pros: 0,
        lat: 39.305119,
        lon: -76.581021
    }, {
        id: 586,
        landlord_num: 3,
        address: "1 N MONASTERY AVE",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.286522,
        lon: -76.677844
    }, {
        id: 587,
        landlord_num: 3,
        address: "819 MANGOLD ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.281104,
        lon: -76.627658
    }, {
        id: 588,
        landlord_num: 9,
        address: "513-563 THORNFIELD ROAD",
        units: 44,
        ecb: 0,
        pros: 0,
        lat: 39.2753,
        lon: -76.693814
    }, {
        id: 589,
        landlord_num: 9,
        address: "401 THORNFIELD ROAD",
        units: 34,
        ecb: 0,
        pros: 0,
        lat: 39.276965,
        lon: -76.692025
    }, {
        id: 590,
        landlord_num: 9,
        address: "4501 CEDARGARDEN ROAD",
        units: 10,
        ecb: 0,
        pros: 0,
        lat: 39.276186,
        lon: -76.692237
    }, {
        id: 591,
        landlord_num: 9,
        address: "4516 PARKTON ST",
        units: 38,
        ecb: 0,
        pros: 0,
        lat: 39.277949,
        lon: -76.691227
    }, {
        id: 592,
        landlord_num: 9,
        address: "2500 EDGECOMBE CIRCLE NORTH",
        units: 228,
        ecb: 0,
        pros: 0,
        lat: 39.341449,
        lon: -76.660655
    }, {
        id: 593,
        landlord_num: 0,
        address: "319 E 21ST ST",
        units: 1,
        ecb: 0,
        pros: 0,
        lat: 39.313263,
        lon: -76.611935
    }, {
        id: 594,
        landlord_num: 0,
        address: "322 E 21ST ST",
        units: 2,
        ecb: 0,
        pros: 0,
        lat: 39.313624,
        lon: -76.61189
    }, {
        id: 595,
        landlord_num: 9,
        address: "400 COLLEEN ROAD",
        units: 33,
        ecb: 0,
        pros: 0,
        lat: 39.279391,
        lon: -76.694942
    }, {
        id: 596,
        landlord_num: 9,
        address: "401 S BEECHFIELD AVE",
        units: 31,
        ecb: 0,
        pros: 0,
        lat: 39.2797,
        lon: -76.694427
    } ]
};

$(document).ready(function() {
    worstLandlords.init();
    console.log("connected");
});