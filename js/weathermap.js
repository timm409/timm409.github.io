/* JS file for the Weather Map */	
	
	// Create a Tile layer from Open Weather Map
	
	var precipitation = new ol.layer.Tile({
		title: "Precipitation",
		source: new ol.source.XYZ({
			url: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=bcb73b7799f5ba135eb24784b0834eba',
		})
	});
	
	var clouds = new ol.layer.Tile({
		title: "Clouds",
		visible: false,
		source: new ol.source.XYZ({
			url: 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=bcb73b7799f5ba135eb24784b0834eba',
		})
	});
	
	var wind = new ol.layer.Tile({
		title: "Wind",
		visible: false,
		source: new ol.source.XYZ({
			url: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=bcb73b7799f5ba135eb24784b0834eba',
		})
	});
	
	// Create a Tile layer getting tiles from Bing source
	bing_CanvasGray = new ol.layer.Tile(
		{
		source:new ol.source.BingMaps(
			{
			key: 'As27GUULRo9YXDVAB65kXqeeplTp5AOYoiMXKBHA5jSnKWAr14lWuEMYxmnN6Ek-',
			imagerySet: 'CanvasGray'
			}
		),
		type: 'base'
		}
	);

	//Create a view
	myview = new ol.View(
		{
		center: ol.proj.fromLonLat([126.54, 33.36], "EPSG:3857"),
		zoom: 7
		}
	);

	//Create a map
	map = new ol.Map(
		{
		target: 'map',
		layers:[bing_CanvasGray, precipitation, clouds, wind],
		view: myview,
		controls:[
			new ol.control.LayerSwitcher()
			]
		}
	);
	
	//Add marker at Mt Hallasan
    var layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([126.54, 33.36])),
                })]
			}),
			style: new ol.style.Style({
				image: new ol.style.RegularShape({
				fill: new ol.style.Fill({
				color: 'green'
				}),
				stroke: new ol.style.Stroke({
				color: 'black', 
				width: 0.5
				}),
				points: 3,
				radius: 8,
				angle: 0
			})
		})			
	});
        map.addLayer(layer);

	//Initialise the popup

    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
		map.addOverlay(overlay);

    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
	
	//Function for openinig popup when you click on it
    map.on('singleclick', function (event) {
        if (map.hasFeatureAtPixel(event.pixel) === true) {
            var coordinate = event.coordinate;

            content.innerHTML = '<strong>Mt Hallasan</strong><br/>(1947m)';
            overlay.setPosition(coordinate);
        } else {
            overlay.setPosition(undefined);
            closer.blur();
        }
    });
	
	//Popup opening by default
    content.innerHTML = '<strong>Mt Hallasan</strong><br/>(1947m)';
    overlay.setPosition(ol.proj.fromLonLat([126.54, 33.36]));