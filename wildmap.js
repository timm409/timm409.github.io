/*JS file for the Wildlife Map*/

var map;

function initMap() {

  var osm;
  var bing_aerial;
  var myview;
  var hallasan_np;
  var subalpine;
  var mesic_forest;
  var subtropical;
  var wild_boar_2000;
  var wild_boar_2010;
  var roe_deer_2000;
  var roe_deer_2010;
 
	// Create a Tile layer getting tiles from OpenTopoMap
	osm = new ol.layer.Tile(
		{
		preload: Infinity,
		source: new ol.source.OSM({
			url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
			}),
		title: 'Open Topo Map',
		type: 'base'
		}
	);
  
    // Create a Tile layer getting tiles from Bing source
	bing_aerial = new ol.layer.Tile(
		{
		source:new ol.source.BingMaps(
			{
			key: 'As27GUULRo9YXDVAB65kXqeeplTp5AOYoiMXKBHA5jSnKWAr14lWuEMYxmnN6Ek-',
			imagerySet: 'aerial'
			}
		),
		title: 'Bing Aerial',
		type: 'base'
		}
	);
	
	
	// WMS Layer - Hallasan NP
	hallasan_np = new ol.layer.Tile(
		{
		source: new ol.source.TileWMS(
			{
			url: 'http://54.175.166.213:8080/geoserver/egm715/wms',
			params: {'LAYERS': 'egm715:hallasan_np'},
			}
		),
		opacity: 0.2,
		}
	);
	
	// WMS Layer - Subalpine
	subalpine = new ol.layer.Tile(
		{
		source: new ol.source.TileWMS(
			{
			url: 'http://54.175.166.213:8080/geoserver/egm715/wms',
			params: {'LAYERS': 'egm715:subalpine'},
			}
		),
		opacity: 0.5,
		title: 'Biome - Subalpine'
		}
	);
	
	
	// WMS Layer - Mesic Forest
	mesic_forest = new ol.layer.Tile(
		{
		source: new ol.source.TileWMS(
			{
			url: 'http://54.175.166.213:8080/geoserver/egm715/wms',
			params: {'LAYERS': 'egm715:mesic_forest'},
			}
		),
		opacity: 0.5,
		title: 'Biome - Mesic Forest'
		}
	);
	
	
	// WMS Layer - Subtropical
	subtropical = new ol.layer.Tile(
		{
		source: new ol.source.TileWMS(
			{
			url: 'http://54.175.166.213:8080/geoserver/egm715/wms',
			params: {'LAYERS': 'egm715:subtropical'},
			}
		),
		opacity: 0.5,
		title: 'Biome - Subtropical'
		}
	);
		
	
	// WMS Layer - Wild Boar 2000
	wild_boar_2000 = new ol.layer.Tile(
		{
		source: new ol.source.TileWMS(
			{
			url: 'http://54.175.166.213:8080/geoserver/egm715/wms',
			params: {'LAYERS': 'egm715:wild_boar_2000'},
			}
		),
		title: 'Wild Boar 2000'
		}
	);

	// WMS Layer - Wild Boar 2010
	wild_boar_2010 = new ol.layer.Tile(
		{
		source: new ol.source.TileWMS(
			{
			url: 'http://54.175.166.213:8080/geoserver/egm715/wms',
			params: {'LAYERS': 'egm715:wild_boar_2010'},
			}
		),
		title: 'Wild Boar 2010'
		}
	);
	

	// WMS Layer - Roe Deer 2000
	roe_deer_2000 = new ol.layer.Tile(
		{
		source: new ol.source.TileWMS(
			{
			url: 'http://54.175.166.213:8080/geoserver/egm715/wms',
			params: {'LAYERS': 'egm715:roe_deer_2000'},
			}
		),
		title: 'Roe Deer 2000'
		}
	);
	
	// WMS Layer - Roe Deer 2010
	roe_deer_2010 = new ol.layer.Tile(
		{
		source: new ol.source.TileWMS(
			{
			url: 'http://54.175.166.213:8080/geoserver/egm715/wms',
			params: {'LAYERS': 'egm715:roe_deer_2010'},
			}
		),
		title: 'Roe Deer 2010'
		}
	);

	// Create a view centered on Hallasan
	myview = new ol.View(
		{
		center: ol.proj.fromLonLat([126.54, 33.36], "EPSG:3857"),
		zoom: 11.5,
		projection: 'EPSG:3857'
		}
	);

	// Create a map
	map = new ol.Map(
		{
		target: 'mymap',
		layers:[bing_aerial, osm, hallasan_np, subtropical, mesic_forest, subalpine, wild_boar_2000, wild_boar_2010,
		roe_deer_2000, roe_deer_2010],
		view: myview,
		controls:[
			new ol.control.Zoom(),
			new ol.control.ZoomSlider(),
			new ol.control.ScaleLine(),
			new ol.control.LayerSwitcher(),
			new ol.control.FullScreen(),
			new ol.control.ZoomToExtent({ label: 'FE', tipLabel: 'Full Extent', extent: [14076087.584676482, 3931720.4576672805, 14096649.145285193, 3954651.566152833] 
		})
		]
    }
  );
  
}