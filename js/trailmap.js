
var bing_aerial,

	//Bing Aerial Tile Layer
	bing_aerial = new ol.layer.Tile(
		{
		source:new ol.source.BingMaps(
			{
			key: 'As27GUULRo9YXDVAB65kXqeeplTp5AOYoiMXKBHA5jSnKWAr14lWuEMYxmnN6Ek-',
			imagerySet: 'aerial'
			}
		),
		}
	);
	
	//Brown Trail
	var trailStyle = new ol.style.Style({
		stroke: new ol.style.Stroke({
		color: [153,102,51,1.0],
		lineDash: [2, 8],
        width: 4,
        lineJoin: 'round',
        lineCap: 'square'
        })
	});
	
	//Pink Trail
	var trailStyle2 = new ol.style.Style({
		stroke: new ol.style.Stroke({
		color: [204,102,255,1.0],
		lineDash: [2, 8],
        width: 4,
        lineJoin: 'round',
        lineCap: 'square'
        })
	});
	
	//Blue Trail
	var trailStyle3 = new ol.style.Style({
		stroke: new ol.style.Stroke({
		color: [0,0,102,1.0],
		lineDash: [2, 8],
        width: 4,
        lineJoin: 'round',
        lineCap: 'square'
        })
	});
	
	//Red Trail
		var trailStyle4 = new ol.style.Style({
		stroke: new ol.style.Stroke({
		color: [200,0,0,1.0],
		lineDash: [2, 8],
        width: 4,
        lineJoin: 'round',
        lineCap: 'square'
        })
	});
	
	//Shelter Style - Icon
		var shelterStyle = new ol.style.Style({
		image: new ol.style.Icon({
          size: [500, 500],
          opacity: 0.75,
          scale: 0.05,
          src: 'images/shelter.jpg',
        })
    });	
	  
	  
	 //Park Style
	    var parkStyle = new ol.style.Style({
          fill: new ol.style.Fill({
          color: [0,153,0, 0.2]
        }),
        stroke: new ol.style.Stroke({
          color: [127,127,127,1.0],
          width: 1,
          lineJoin: 'round'
        })
    });
	
	// shelters
	shelters = new ol.layer.Vector(
		{
		source: new ol.source.Vector(
			{
			format: new ol.format.GeoJSON(),
			url: 'data/shelters.geojson',
			}
		),
		title: 'Shelters',
		visible: true,
		style: shelterStyle
		}
	);
	
	// park area
	hallasan_np = new ol.layer.Vector(
		{
		source: new ol.source.Vector(
			{
			format: new ol.format.GeoJSON(),
			url: 'data/hallasan_np.geojson',
			}
		),
		title: 'Hallasan National Park',
		visible: true,
		style: parkStyle,
		}
	);
	
	// seongpanak trail layer
	seongpanak_trail = new ol.layer.Vector(
		{
		source: new ol.source.Vector(
			{
			format: new ol.format.GeoJSON(),
			url: 'data/seongpanak_trail.geojson',
			}
		),
		style: trailStyle,
		}
	);
	
	// gwaneumsa trail layer
	gwaneumsa_trail = new ol.layer.Vector(
		{
		source: new ol.source.Vector(
			{
			format: new ol.format.GeoJSON(),
			url: 'data/gwaneumsa_trail.geojson',
			}
		),
		style: trailStyle2
		}
	);
	
	// eorimok trail layer
	eorimok_trail = new ol.layer.Vector(
		{
		source: new ol.source.Vector(
			{
			format: new ol.format.GeoJSON(),
			url: 'data/eorimok_trail.geojson',
			}
		),
		style: trailStyle3
		}
	);
	
	// yeongsil trail layer
	yeongsil_trail = new ol.layer.Vector(
		{
		source: new ol.source.Vector(
			{
			format: new ol.format.GeoJSON(),
			url: 'data/yeongsil_trail.geojson',
			}
		),
		style: trailStyle4,
		}
	);

	// park area
	hallasan_np = new ol.layer.Vector(
		{
		source: new ol.source.Vector(
			{
			format: new ol.format.GeoJSON(),
			url: 'data/hallasan_np.geojson',
			}
		),
		title: 'Hallasan National Park',
		visible: true,
		style:parkStyle
		}
	);

	//Create and Render map on div with zoom and center
	class OLMap {
	  constructor(map_div, zoom, center) {
		this.map = new ol.Map({
		  target: map_div,
		  layers: [bing_aerial, hallasan_np, yeongsil_trail, eorimok_trail, gwaneumsa_trail, seongpanak_trail, shelters],
		  controls:[
			new ol.control.Zoom(),
			new ol.control.ZoomSlider(),
			new ol.control.ScaleLine(),
			new ol.control.FullScreen(),
			new ol.control.ZoomToExtent({ label: 'FE', tipLabel: 'Full Extent', extent: [14076087.584676482, 3931720.4576672805, 14096649.145285193, 3954651.566152833]}) 
		],
		  view: new ol.View({
			center: ol.proj.fromLonLat(center),
			zoom: zoom
		  })
		});
	  }
	}

	//Create Vector Layer
	class VectorLayer{
	  constructor(title, map) {
		this.layer = new ol.layer.Vector({
		  title: title,      
		  source: new ol.source.Vector({
			projection:map.getView().projection
		  }),
		  style: new ol.style.Style({        
			stroke: new ol.style.Stroke({
			  color: '#0e97fa',
			  width:3
			})
		  })
		});
	  }
	}

	//Create overlay
	class Overlay {
	  constructor(map, element = document.getElementById("popup"), offset = [0, -15], positioning = 'bottom-center',   className = 'ol-tooltip-measure ol-tooltip .ol-tooltip-static') {
		this.map = map;
		this.overlay = new ol.Overlay({
		  element: element,
		  offset: offset,
		  positioning: positioning,
		  className: className
		});
		this.overlay.setPosition([0,0]);
		this.overlay.element.style.display = 'block';      
		this.map.addOverlay(this.overlay);    
		
	  }
	}



	//Create a Draw interaction for LineString and Polygon
	class Draw {  
	  constructor(type, map, vector_layer) {
		this.map = map;
		this.vector_layer = vector_layer;
		this.draw = new ol.interaction.Draw({
			type: type,
			stopClick: true
		});
		this.draw.on('drawstart', this.onDrawStart);
		this.draw.on('drawend', this.onDrawEnd);
		this.map.addInteraction(this.draw);    
		
	  } 
  

  
	//This function will be called when you start drawing
	  onDrawStart = (e) => {      
		//It will store the coordinates length of geometry
		this.coordinates_length = 0;

		//partDistanceOverlay is used to display the label of distance measurements on each segment of Line and Polygon geomtry
		this.partDistanceOverlay = null;

		//totalAreaDistanceOverlay is used to display the total distance if geomtery is LineString or it will display the area if geomtry is Polygon
		this.totalAreaDistanceOverlay = new Overlay(this.map).overlay;

		//lastPartLineOverlay is used to display the distance measurement of last segment of Polygon which is its last two coordinates
		this.lastPartLineOverlay = new Overlay(this.map).overlay;
		
		//Binding onGeomChange function with drawing feature
		e.feature.getGeometry().on('change', this.onGeomChange); 
	  }
	  

	 
	  //This function will be called when drawing is finished
	  onDrawEnd = (e) => {  
		//Add drawn geometry to vector layer          
		this.vector_layer.getSource().addFeature(e.feature);
	  }



		//This function will called when ever there will be a change in geometry like increase in length, area, position,
		onGeomChange = (e) => {    
		let geomType = e.target.getType();
		let coordinates = e.target.getCoordinates();
		if(geomType == "Polygon"){
		  coordinates = e.target.getCoordinates()[0];
		}    

		//This logic will check if the new coordinates are added to geometry. If yes, then It will create a overlay for the new segment
		if (coordinates.length > this.coordinates_length) {                
		  this.partDistanceOverlay = new Overlay(this.map).overlay;
		  this.coordinates_length =  coordinates.length;      
		}
		else {                     
		  this.coordinates_length =  coordinates.length;            
		}    
		
		let partLine = new ol.geom.LineString([coordinates[this.coordinates_length-2], coordinates[this.coordinates_length-1]]);    

		if(geomType == "Polygon") {
		  partLine = new ol.geom.LineString([coordinates[this.coordinates_length-3], coordinates[this.coordinates_length-2]]);    
		}  

		//the calculates the length of a segment and position the overlay at the midpoint of it
		this.calDistance(this.partDistanceOverlay, partLine.getFlatMidpoint(), partLine.getLength());  

		//if geometry is LineString and coordinates_length is greater than 2, then calculate the total length of the line and set the position of the overlay at last coordninates
		if (geomType == "LineString" && this.coordinates_length > 2 && e.target.getLength() > new ol.geom.LineString([coordinates[0], coordinates[1]]).getLength()) {
		  this.calDistance(this.totalAreaDistanceOverlay, coordinates[this.coordinates_length-1], e.target.getLength());
		}  

		//If geometry is Polygon, then it will create the overlay for area measurement and last segment of it which is its first and last coordinates.
		if (geomType == "Polygon" && this.coordinates_length > 3) {
		  this.calArea(this.totalAreaDistanceOverlay, e.target.getFlatInteriorPoint(), e.target.getArea());      
		  partLine = new ol.geom.LineString([coordinates[this.coordinates_length-2], coordinates[this.coordinates_length-1]]);    
		  this.calDistance(this.lastPartLineOverlay, partLine.getFlatMidpoint(), partLine.getLength());
		} 
	  }

	  //Calculates the length of a segment and position the overlay at the midpoint of it.
	  calDistance = (overlay, overlayPosition, distance) => {  
		if(parseInt(distance) == 0) {    
		  overlay.setPosition([0,0]);       
		}
		else {
		  overlay.setPosition(overlayPosition);      
		  if (distance >= 1000) {
			overlay.element.innerHTML = (distance/1000).toFixed(2) + ' km';
		  }
		  else {
			overlay.element.innerHTML = distance.toFixed(2) + ' m';
		  }
		}    
	  }

	  //Calculates the area of Polygon and position the overlay at the center of polygon
	  calArea = (overlay, overlayPosition, area) => {    
		if(parseInt(area) == 0) {    
		  overlay.setPosition([0,0]);  
		}
		else {
		  overlay.setPosition(overlayPosition);  
		  if (area >= 10000) {
			overlay.element.innerHTML = Math.round((area / 1000000) * 100) / 100  + ' km<sup>2<sup>';
		  }
		  else {
			overlay.element.innerHTML =  Math.round(area * 100) / 100  + ' m<sup>2<sup>';
		  }
		}   
	  }

	}

	//Create map and vector layer
	let map = new OLMap('map', 12, [126.538649, 33.365491]).map;
	let vector_layer = new VectorLayer('Temp Layer', map).layer
	map.addLayer(vector_layer);


	//Add Interaction to map depending on your selection
	let draw = null;
	let btnClick = (e) => {  
	  removeInteractions();
	  let geomType = e.srcElement.attributes.geomtype.nodeValue;
	  //Create interaction
	  draw = new Draw(geomType, map, vector_layer);
	}


	//Remove map interactions except default interactions
	let removeInteractions = () => {  
	  map.getInteractions().getArray().forEach((interaction, i) => {
		if(i > 8) {
		  map.removeInteraction(interaction);
		}
	  });
	}

	//Clear vector features and overlays and remove any interaction
	let clear = () => {
	  removeInteractions();
	  map.getOverlays().clear();
	  vector_layer.getSource().clear();
	}

	//Bind methods to click events of buttons
	let distanceMeasure = document.getElementById('btn1');
	distanceMeasure.onclick = btnClick;

	let areaMeasure = document.getElementById('btn2');
	areaMeasure.onclick = btnClick;

	let clearGraphics = document.getElementById('btn3');
	clearGraphics.onclick = clear;